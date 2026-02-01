"use client";

import { useEffect, useRef, useState } from "react";

export function useVideoAutoplay() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const playVideo = async () => {
            try {
                await video.play();
                setIsPlaying(true);
            } catch {
                // Autoplay was prevented, try muted
                video.muted = true;
                try {
                    await video.play();
                    setIsPlaying(true);
                } catch {
                    // Still couldn't play
                    setIsPlaying(false);
                }
            }
        };

        // Try to play when video is ready
        if (video.readyState >= 3) {
            playVideo();
        } else {
            video.addEventListener("canplay", playVideo, { once: true });
        }

        return () => {
            video.removeEventListener("canplay", playVideo);
        };
    }, []);

    return { videoRef, isPlaying };
}
