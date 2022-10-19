import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import styles from './VideoPlayer.module.css';

const defaultConfig = {
  url: [
    {
      src: 'https://vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4',
    },
  ],
  volume: 0.4,
  controls: true,
};

interface VideoPlayerProps {
  lastPlayedTo: number;
  setLastPlayedTo: Dispatch<SetStateAction<number>>;
  setFinished: Dispatch<SetStateAction<boolean>>;
  config: { progressControl: boolean; resume: boolean };
}

export default function VideoPlayer({ lastPlayedTo, setLastPlayedTo, setFinished, config }: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);
  const [playerState, setPlayerState] = useState({} as any);

  const playerStateRef = useRef(playerState);
  useEffect(() => {
    playerStateRef.current = playerState;
  }, [playerState]);

  useEffect(() => {
    config.resume && playerRef.current?.seekTo(lastPlayedTo, 'seconds');
  }, []);

  useEffect(() => {
    return () => {
      setLastPlayedTo(playerStateRef.current.playedSeconds || 0);
    };
  }, []);

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        onEnded={() => setFinished(true)}
        onProgress={(state: any) => setPlayerState(state)}
        className={config.progressControl ? '' : styles.noSeekBar}
        {...defaultConfig}
      />
      <span>{JSON.stringify(playerState)}</span>
    </div>
  );
}
