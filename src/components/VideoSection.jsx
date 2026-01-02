import React, { useRef, useEffect } from "react";
import demoVideo from "../assets/mechanicMovie.mp4";

const VideoSection = React.memo(() => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === videoRef.current) {
        document.exitFullscreen();
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      Array.from(videoRef.current.textTracks).forEach(track => {
        track.mode = "disabled";
      });
    }
  }, []);
  

  return (
    <div className="max-w-full text-center mt-4 sm:mt-6 md:mt-4">
      <video
        ref={videoRef}
        src={demoVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="shadow-lg w-full mx-auto select-none"
        controls={false}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
});

VideoSection.displayName = "VideoSection";
export default VideoSection;
