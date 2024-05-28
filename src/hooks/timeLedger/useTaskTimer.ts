import {
  TaskState,
  continueExcution,
  decrementCountdown,
  pause,
} from "@/redux/features/timeLedger/timeLedgerSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";

const useTaskTimer = (taskState: TaskState, countdown: number) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dispatch = useAppDispatch();

  const [isAutoInfoDialogOpen, setIsAutoInfoDialogOpen] = useState(false);

  const closeAutoInfoDialog = () => {
    setIsAutoInfoDialogOpen(false);
  };

  const confirmContinue = () => {
    if (taskState !== TaskState.PAUSED) {
      return;
    }
    dispatch(continueExcution());
    closeAutoInfoDialog();
  };

  useEffect(() => {
    const handleCountdown = () => {
      if (countdown === 1 && taskState === TaskState.EXECUTING) {
        dispatch(decrementCountdown());
        dispatch(pause());
        setIsAutoInfoDialogOpen(true);
      } else {
        dispatch(decrementCountdown());
      }
    };

    const startInterval = () => {
      intervalRef.current = setInterval(handleCountdown, 1000);
    };

    const stopInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (taskState === TaskState.EXECUTING && !intervalRef.current) {
      startInterval();
    } else if (taskState !== TaskState.EXECUTING) {
      stopInterval();
    }
    return () => {
      stopInterval();
    };
  }, [taskState, dispatch, countdown]);

  return {
    isAutoInfoDialogOpen,
    closeAutoInfoDialog,
    confirmContinue,
  };
};

export default useTaskTimer;
