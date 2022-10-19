import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import videojs, { VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  lastPlayedTo: number;
  setLastPlayedTo: Dispatch<SetStateAction<number>>;
  setFinished: Dispatch<SetStateAction<boolean>>;
  config: { progressControl: boolean; resume: boolean };
}

const defaultConfig: VideoJsPlayerOptions = {
  controls: true,
  controlBar: {
    progressControl: false,
  },
  sources: [
    {
      src: "https://vjs.zencdn.net/v/oceans.mp4",
      type: "video/mp4",
    },
  ],
};

export default function VideoPlayer({
  lastPlayedTo,
  setLastPlayedTo,
  setFinished,
  config,
}: VideoPlayerProps) {
  const videoRef = useRef(null);

  useEffect(() => {
    const p = videojs(videoRef.current!, {
      ...defaultConfig,
      controlBar: {
        progressControl: config.progressControl,
      },
    });

    p.ready(function () {
      if (config.resume) {
        this.currentTime(lastPlayedTo);
      }

      this.on("ended", () => {
        setFinished(true);
      });
    });

    return function cleanup() {
      if (p) {
        setLastPlayedTo(p.currentTime());
        p.dispose();
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}
