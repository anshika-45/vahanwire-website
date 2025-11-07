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
  return (
    <section>
      <div className="max-w-full text-center">
        <video
          ref={videoRef}
          src={demoVideo}
          controls
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="shadow-lg w-full mx-auto select-none pointer-events-none"
        />
      </div>
    </section>
  );
});
VideoSection.displayName = "VideoSection";
export default VideoSection;


