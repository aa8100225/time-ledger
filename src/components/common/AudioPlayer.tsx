import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import ReactHowler from "react-howler";

interface AudioPlayerProps {
  src: string;
  initialLoop?: boolean;
  initialPlaybackRate?: number;
}

export interface AudioPlayerHandles {
  play: () => void;
  pause: () => void;
  stop: () => void;
  toggleLoop: () => void;
  mute: () => void;
  unmute: () => void;
  setPlaybackRate: (rate: number) => void;
  seek: (time: number) => void;
}

const AudioPlayer = forwardRef<AudioPlayerHandles, AudioPlayerProps>(
  ({ src, initialLoop = false, initialPlaybackRate = 1.0 }, ref) => {
    const [playing, setPlaying] = useState(false);
    const [loop, setLoop] = useState(initialLoop);
    const [muted, setMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(initialPlaybackRate);
    const playerRef = useRef<ReactHowler>(null);

    useImperativeHandle(ref, () => ({
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
      stop: () => {
        setPlaying(false);
        if (playerRef.current) {
          playerRef.current.stop();
        }
      },
      toggleLoop: () => setLoop((prevLoop) => !prevLoop),
      mute: () => setMuted(true),
      unmute: () => setMuted(false),
      setPlaybackRate: (rate: number) => setPlaybackRate(rate),
      seek: (time: number) => {
        if (playerRef.current) {
          playerRef.current.seek(time);
        }
      },
    }));

    useEffect(() => {
      setLoop(initialLoop);
    }, [initialLoop]);

    useEffect(() => {
      setPlaybackRate(initialPlaybackRate);
    }, [initialPlaybackRate]);

    return (
      <ReactHowler
        src={src}
        playing={playing}
        loop={loop}
        mute={muted}
        rate={playbackRate}
        ref={playerRef}
      />
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
