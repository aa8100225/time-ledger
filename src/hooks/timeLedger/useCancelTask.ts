import {
  TaskState,
  cancel,
  pause,
} from "@/redux/features/timeLedger/timeLedgerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";

const useCancelTask = () => {
  const dispatch = useAppDispatch();
  const taskState = useAppSelector((state) => state.timeLedger.taskState);
  const [isCancelConfirmDialogOpen, setIsCancelConfirmDialogOpen] =
    useState(false);
  const openCancelConfirmDialog = () => setIsCancelConfirmDialogOpen(true);
  const closeCancelConfirmDialog = () => {
    setIsCancelConfirmDialogOpen(false);
  };

  const handleOnCancelClick = () => {
    if (TaskState.EXECUTING === taskState) {
      dispatch(pause());
    }
    openCancelConfirmDialog();
  };

  const handleCancelConfirm = () => {
    dispatch(cancel());
    closeCancelConfirmDialog();
  };
  return {
    isCancelConfirmDialogOpen,
    closeCancelConfirmDialog,
    handleOnCancelClick,
    handleCancelConfirm,
  };
};

export default useCancelTask;
