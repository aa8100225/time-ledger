import { isIntegerWithinRange } from "@/utils/numberUtils";
import { isStringEmpty } from "@/utils/stringUtils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const validateTime = ({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  if (
    !isIntegerWithinRange(hours, { min: 0 }) ||
    !isIntegerWithinRange(minutes, { min: 0, max: 59 }) ||
    !isIntegerWithinRange(seconds, { min: 0, max: 59 })
  ) {
    throw new Error("invalidTimeSettings");
  }
};

export enum TaskState {
  NONE = "NONE",
  CREATING = "CREATING",
  EXECUTING = "EXECUTING",
  PAUSED = "PAUSED",
  FINISHED = "FINISHED",
}

export interface ITimeLedgerState {
  id: undefined | string;
  taskState: TaskState;
  taskTitle: string;
  taskDescription?: string;
  hours?: number;
  minutes?: number;
  seconds?: number;
  countdown: number;
  startTime?: number;
  finishedTime?: number;
  completionPercentage: number;
  review?: string;
}

const initialState: ITimeLedgerState = {
  taskState: TaskState.NONE,
  taskTitle: "",
  hours: 0,
  minutes: 0,
  seconds: 0,
  countdown: 0,
  completionPercentage: 0,
  id: crypto.randomUUID(),
};

const timeLedgerSlice = createSlice({
  name: "timeLedger",
  initialState,
  reducers: {
    createTask(state) {
      state.taskState = TaskState.CREATING;
    },
    updateTaskField<K extends keyof ITimeLedgerState>(
      state: ITimeLedgerState,
      action: PayloadAction<{ field: K; value: ITimeLedgerState[K] }>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
    },

    setHours(state, action: PayloadAction<number | undefined>) {
      state.hours = action.payload;
    },
    setMinutes(state, action: PayloadAction<number>) {
      state.minutes = action.payload;
    },
    setSeconds(state, action: PayloadAction<number>) {
      state.seconds = action.payload;
    },
    execute(state) {
      if (isStringEmpty(state.taskTitle) || state.taskTitle.length > 50) {
        throw new Error("taskTitleError");
      }
      if (
        !isStringEmpty(state.taskDescription) &&
        state.taskDescription!.length > 200
      ) {
        throw new Error("taskDescriptionError");
      }
      if (!state.hours && !state.minutes && !state.seconds) {
        throw new Error("taskTimeNotSet");
      }
      validateTime({
        hours: state.hours!,
        minutes: state.minutes!,
        seconds: state.seconds!,
      });

      state.hours = !state.hours ? 0 : state.hours;
      state.minutes = !state.minutes ? 0 : state.minutes;
      state.seconds = !state.seconds ? 0 : state.seconds;
      state.startTime = Date.now();
      state.countdown = state.hours * 3600 + state.minutes * 60 + state.seconds;
      state.taskState = TaskState.EXECUTING;
    },
    decrementCountdown(state) {
      state.countdown -= 1;
    },
    pause(state) {
      state.taskState = TaskState.PAUSED;
    },
    continueExcution(state) {
      state.taskState = TaskState.EXECUTING;
    },
    finished(state) {
      state.taskState = TaskState.FINISHED;
      state.finishedTime = Date.now();
    },
    undoFinished(state) {
      state.taskState = TaskState.PAUSED;
      state.finishedTime = undefined;
    },
    cancel(state) {
      return initialState;
    },
    startNewTask(state) {
      return {
        ...initialState,
        taskState: TaskState.CREATING,
      };
    },
    setCompletionPercentage(state, action: PayloadAction<number>) {
      state.completionPercentage = action.payload;
    },
    setReview(state, action: PayloadAction<string>) {
      state.review = action.payload;
    },
  },
});

export const {
  createTask,
  setHours,
  setMinutes,
  setSeconds,
  execute,
  decrementCountdown,
  pause,
  continueExcution,
  finished,
  undoFinished,
  cancel,
  startNewTask,
  setCompletionPercentage,
  setReview,
  updateTaskField,
} = timeLedgerSlice.actions;
export const timeLedgerReducer = timeLedgerSlice.reducer;
