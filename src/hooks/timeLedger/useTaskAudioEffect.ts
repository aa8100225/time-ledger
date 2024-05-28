import { AudioPlayerHandles } from "@/components/common/AudioPlayer";
import { TaskState } from "@/redux/features/timeLedger/timeLedgerSlice";
import { useEffect } from "react";

const useTaskAudioEffect = (
  taskState: TaskState,
  audioPlayerRef: React.RefObject<AudioPlayerHandles | null>
) => {
  useEffect(() => {
    const play = () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.play();
      }
    };

    const stop = () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.stop();
      }
    };

    if (TaskState.EXECUTING === taskState) {
      play();
    } else {
      stop();
    }
  }, [taskState]);
};

export default useTaskAudioEffect;
