"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useVideoAutoplay() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoaded = useCallback(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force muted (required for autoplay policy)
        video.muted = true;

        // If the video is already loaded (cached / fast load before hydration),
        // mark it as loaded immediately. readyState >= 2 means HAVE_CURRENT_DATA.
        if (video.readyState >= 2) {
            setIsLoaded(true);
        }

        const attemptPlay = () => {
            // Also mark as loaded when any play-ready event fires
            setIsLoaded(true);
            if (video.paused) {
                video.play().catch(() => {
                    // Silently fail — fallback image is shown
                });
            }
        };

        // Attempt play immediately
        attemptPlay();

        // Retry on these events (covers cached video, slow loads, hydration races)
        video.addEventListener("canplay", attemptPlay);
        video.addEventListener("loadeddata", attemptPlay);
        video.addEventListener("loadedmetadata", attemptPlay);

        // Retry after a short delay to handle hydration timing
        const retryTimer = setTimeout(attemptPlay, 500);

        // Handle tab visibility changes
        const handleVisibility = () => {
            if (document.visibilityState === "visible") {
                attemptPlay();
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            clearTimeout(retryTimer);
            video.removeEventListener("canplay", attemptPlay);
            video.removeEventListener("loadeddata", attemptPlay);
            video.removeEventListener("loadedmetadata", attemptPlay);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    return { videoRef, isLoaded, handleLoaded };
}
