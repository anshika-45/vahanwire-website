import React, { useRef, useEffect } from "react";
import demoVideo from "../assets/mechanicMovie.mp4";
import captionFile from "../assets/mechanicMovie.vtt";
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
      >
        <track kind="captions" src={captionFile} srcLang="en" label="English" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
});
VideoSection.displayName = "VideoSection";
export default VideoSection;
