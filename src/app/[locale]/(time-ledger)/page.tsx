"use client";
import { ToastType, showToast } from "@/helper/toastHelper";
import {
  ITimeLedgerState,
  TaskState,
  continueExcution,
  createTask,
  execute,
  finished,
  pause,
  setCompletionPercentage,
  startNewTask,
  undoFinished,
  updateTaskField,
} from "@/redux/features/timeLedger/timeLedgerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { numberToStringWithPrecision } from "@/utils/numberUtils";
import { toSafeString } from "@/utils/stringUtils";
import {
  convertSecondsToTime,
  formatTimestampToDateTime,
} from "@/utils/timeUtils";
import { Button, Input, Slider, Textarea, Tooltip } from "@nextui-org/react";
import { Variants, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { QRCodeSVG } from "qrcode.react";
import AudioPlayer, {
  AudioPlayerHandles,
} from "@/components/common/AudioPlayer";
import useTaskTimer from "@/hooks/timeLedger/useTaskTimer";
import useTaskAudioEffect from "@/hooks/timeLedger/useTaskAudioEffect";
import { useTranslations } from "next-intl";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import useCancelTask from "@/hooks/timeLedger/useCancelTask";
import { IoVolumeMediumSharp, IoVolumeMute } from "react-icons/io5";

// Arrow animation configuration
const arrowVariants: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-10, 0, -10],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

// Text animation configuration
const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.1 } },
};

// sloganLetter animation
const sloganLetterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const inputWrapperStyles = [
  "shadow-lg",
  "bg-orange-50",
  "backdrop-blur-xl",
  "hover:bg-orange-50",
  "group-data-[focused=true]:bg-orange-50",
  "dark:group-data-[focused=true]:bg-orange-50",
  "!cursor-text",
];

export default function TimeLedger() {
  const t = useTranslations("TimeLedger");
  const slogan = t("slogan");
  const sloganLetters = slogan.split("");

  const dispatch = useAppDispatch();

  const {
    taskState,
    taskTitle,
    taskDescription,
    hours,
    minutes,
    seconds,
    countdown,
    completionPercentage,
    review,
    id,
    startTime,
    finishedTime,
  } = useAppSelector((state) => state.timeLedger);

  const [totalTime, setTotalTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const {
    hours: remainHours,
    minutes: remainMinutes,
    seconds: remainSeconds,
  } = convertSecondsToTime(countdown);

  const receiptRef = useRef<any | null>(null);

  const audioPlayerRef = useRef<AudioPlayerHandles | null>(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const calculateTotalTime = () => {
    const totalSeconds =
      (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0) - countdown;
    return convertSecondsToTime(totalSeconds);
  };

  useEffect(() => {
    if (taskState === TaskState.FINISHED) {
      setTotalTime(calculateTotalTime());
    }
  }, [taskState]);

  const { isAutoInfoDialogOpen, closeAutoInfoDialog, confirmContinue } =
    useTaskTimer(taskState, countdown);
  useTaskAudioEffect(taskState, audioPlayerRef);

  const {
    isCancelConfirmDialogOpen,
    closeCancelConfirmDialog,
    handleOnCancelClick,
    handleCancelConfirm,
  } = useCancelTask();

  const [mute, setMute] = useState(false); // audioPlayer

  const handleMuteToggle = () => {
    if (!audioPlayerRef.current) {
      return;
    }
    if (mute) {
      audioPlayerRef.current.unmute();
    } else {
      audioPlayerRef.current.mute();
    }
    setMute(!mute);
  };

  const handleExecuteClick = () => {
    try {
      dispatch(execute());
    } catch (err) {
      let errorMessage = t("unknownError");
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      showToast(ToastType.Warning, t(errorMessage));
    }
  };

  return (
    <>
      <div className="w-full max-w-screen-lg">
        {/* Slogan */}
        {taskState === TaskState.NONE && (
          <div className="flex flex-col items-center">
            <Button
              className="mb-6 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={() => dispatch(createTask())}
            >
              {/* Spend Your Life */}
              {t("createTask")}
            </Button>
            <motion.div
              className="my-6 text-4xl"
              initial="hidden"
              animate="visible"
              variants={arrowVariants}
            >
              ⬆️
            </motion.div>
            <motion.div
              className="mb-12 text-center"
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              {sloganLetters.map((letter, index) => (
                <motion.span key={index} variants={sloganLetterVariants}>
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </div>
        )}
        {/* Task Content */}
        {taskState !== TaskState.NONE && (
          <div className="mb-4 flex w-full flex-wrap justify-center gap-4">
            {/* Cancel Confirm Dialog */}
            <ConfirmDialog
              isOpen={isCancelConfirmDialogOpen}
              onClose={closeCancelConfirmDialog}
              onConfirm={handleCancelConfirm}
              title={t("cancelConfirmTitle")}
              body={t("cancelConfirmBody")}
              confirmText={t("confirmButton")}
              cancelText={t("cancelButton")}
            ></ConfirmDialog>
            {/* Time's up Dialog */}
            <ConfirmDialog
              isOpen={isAutoInfoDialogOpen}
              onClose={closeAutoInfoDialog}
              onConfirm={confirmContinue}
              title={t("timeUpTitle")}
              body={t("timeUpBody")}
              confirmText={t("continueButton")}
              cancelText={t("stopButton")}
            ></ConfirmDialog>
            <AudioPlayer
              ref={audioPlayerRef}
              src={"/sounds/clock-tick.mp3"}
              initialLoop={true}
              initialPlaybackRate={0.9}
            />
            <div className="w-full  flex-grow rounded bg-orange-100 p-6 shadow-lg md:basis-1/3">
              {/* Task Title */}
              <h3 className="mb-2 font-bold">{t("taskTitle")}</h3>
              <Input
                type="text"
                readOnly={taskState !== TaskState.CREATING}
                classNames={{
                  input: ["bg-transparent"],
                  innerWrapper: "bg-transparent",
                  inputWrapper: inputWrapperStyles,
                }}
                maxLength={50}
                placeholder={t("enterTitle")}
                name="taskTitle"
                value={taskTitle}
                onChange={(e) =>
                  dispatch(
                    updateTaskField({
                      field: e.target.name as keyof ITimeLedgerState,
                      value: e.target.value,
                    })
                  )
                }
                className="mb-4"
              />
              {/* Task Description */}
              <h3 className="mb-2 font-bold ">{t("taskDescription")}</h3>
              <Textarea
                value={toSafeString(taskDescription)}
                readOnly={taskState !== TaskState.CREATING}
                classNames={{
                  input: ["bg-transparent"],
                  innerWrapper: "bg-transparent",
                  inputWrapper: inputWrapperStyles,
                }}
                maxLength={200}
                name="taskDescription"
                onChange={(e) =>
                  dispatch(
                    updateTaskField({
                      field: e.target.name as keyof ITimeLedgerState,
                      value: e.target.value,
                    })
                  )
                }
                placeholder={t("enterDescription")}
                className="mb-4"
              />
              <div className="mb-4 flex flex-col justify-between gap-2 lg:flex-row">
                <div
                  className={
                    TaskState.CREATING !== taskState
                      ? "w-full lg:w-1/2"
                      : "w-full"
                  }
                >
                  {/* Time Setting */}
                  <h3 className="mb-3 font-bold">{t("timeSetting")}</h3>
                  <div className="flex  gap-2">
                    {/* hours */}
                    <Input
                      type="number"
                      readOnly={taskState !== TaskState.CREATING}
                      classNames={{
                        input: ["bg-transparent", "text-right", "min-w-[30px]"],
                        innerWrapper: "bg-transparent",
                        inputWrapper: inputWrapperStyles,
                      }}
                      name="hours"
                      onChange={(e) => {
                        const valueAsNumber = parseInt(e.target.value, 10);
                        dispatch(
                          updateTaskField({
                            field: e.target.name as keyof ITimeLedgerState,
                            value: !isNaN(valueAsNumber)
                              ? valueAsNumber
                              : undefined,
                          })
                        );
                      }}
                      defaultValue="0"
                      value={numberToStringWithPrecision(hours)}
                      min={0}
                      step={1}
                      endContent={t("hours")}
                    />
                    {/* minutes */}
                    <Input
                      type="number"
                      readOnly={taskState !== TaskState.CREATING}
                      classNames={{
                        input: ["bg-transparent", "text-right", "min-w-[30px]"],
                        innerWrapper: "bg-transparent",
                        inputWrapper: inputWrapperStyles,
                      }}
                      name="minutes"
                      onChange={(e) => {
                        const valueAsNumber = parseInt(e.target.value, 10);
                        dispatch(
                          updateTaskField({
                            field: e.target.name as keyof ITimeLedgerState,
                            value: !isNaN(valueAsNumber)
                              ? valueAsNumber
                              : undefined,
                          })
                        );
                      }}
                      defaultValue="0"
                      value={numberToStringWithPrecision(minutes)}
                      min={0}
                      max={59}
                      step={1}
                      endContent={t("minutes")}
                    />
                    {/* seconds */}
                    <Input
                      type="number"
                      readOnly={taskState !== TaskState.CREATING}
                      classNames={{
                        input: ["bg-transparent", "text-right", "min-w-[30px]"],
                        innerWrapper: "bg-transparent",
                        inputWrapper: inputWrapperStyles,
                      }}
                      name="seconds"
                      onChange={(e) => {
                        const valueAsNumber = parseInt(e.target.value, 10);
                        dispatch(
                          updateTaskField({
                            field: e.target.name as keyof ITimeLedgerState,
                            value: !isNaN(valueAsNumber)
                              ? valueAsNumber
                              : undefined,
                          })
                        );
                      }}
                      defaultValue="0"
                      value={numberToStringWithPrecision(seconds)}
                      min={0}
                      max={59}
                      step={1}
                      endContent={t("seconds")}
                    />
                  </div>
                </div>
                {/* Counting Down */}
                {TaskState.CREATING !== taskState && (
                  <div className="w-full lg:w-1/2">
                    <div className="mb-3 flex items-center">
                      <h3 className="font-bold">{t("countingDown")}</h3>
                      {audioPlayerRef.current && (
                        <Button
                          variant="light"
                          className="h-6 w-6 min-w-0 p-0"
                          onClick={handleMuteToggle}
                        >
                          {mute ? <IoVolumeMute /> : <IoVolumeMediumSharp />}
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        classNames={{
                          input: [
                            "bg-transparent",
                            "text-right",
                            "min-w-[30px]",
                            "font-bold",
                            "text-xl",
                          ],
                          innerWrapper: "bg-transparent",
                          inputWrapper: inputWrapperStyles,
                        }}
                        defaultValue="0"
                        value={remainHours.toString()}
                        endContent={t("hours")}
                        readOnly
                      />
                      <Input
                        type="number"
                        classNames={{
                          input: [
                            "bg-transparent",
                            "text-right",
                            "min-w-[30px]",
                            "font-bold",
                            "text-xl",
                          ],
                          innerWrapper: "bg-transparent",
                          inputWrapper: inputWrapperStyles,
                        }}
                        defaultValue="0"
                        value={remainMinutes.toString()}
                        endContent={t("minutes")}
                        readOnly
                      />
                      <Input
                        type="number"
                        classNames={{
                          input: [
                            "bg-transparent",
                            "text-right",
                            "min-w-[30px]",
                            "font-bold",
                            "text-xl",
                          ],
                          innerWrapper: "bg-transparent",
                          inputWrapper: inputWrapperStyles,
                        }}
                        defaultValue="0"
                        value={remainSeconds.toString()}
                        endContent={t("seconds")}
                        readOnly
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap justify-end gap-2">
                  {taskState === TaskState.CREATING && (
                    <Button
                      radius="md"
                      onClick={handleExecuteClick}
                      className="bg-green-500 font-bold text-white"
                    >
                      {t("execute")}
                    </Button>
                  )}
                  {taskState === TaskState.EXECUTING && (
                    <Button
                      radius="md"
                      onClick={() => dispatch(pause())}
                      className="bg-yellow-500 font-bold text-white"
                    >
                      {t("pause")}
                    </Button>
                  )}
                  {taskState === TaskState.PAUSED && (
                    <Button
                      radius="md"
                      onClick={() => dispatch(continueExcution())}
                      className="bg-teal-500 font-bold text-white"
                    >
                      {t("continue")}
                    </Button>
                  )}

                  {[TaskState.EXECUTING, TaskState.PAUSED].includes(
                    taskState
                  ) && (
                    <Button
                      radius="md"
                      onClick={() => dispatch(finished())}
                      className="bg-blue-500 font-bold text-white"
                    >
                      {t("finished")}
                    </Button>
                  )}
                  {[
                    TaskState.EXECUTING,
                    TaskState.PAUSED,
                    TaskState.CREATING,
                  ].includes(taskState) && (
                    <Button
                      radius="md"
                      onClick={handleOnCancelClick}
                      className="bg-red-500 font-bold text-white"
                    >
                      {t("cancel")}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {taskState === TaskState.FINISHED && (
              <div className="w-full  flex-grow rounded bg-orange-100 p-6 shadow-lg md:basis-1/3 ">
                {/* Review */}
                <div>
                  <h3 className="mb-2 font-bold">{t("review")}</h3>
                  <Textarea
                    value={review}
                    maxLength={300}
                    classNames={{
                      input: ["bg-transparent"],
                      innerWrapper: "bg-transparent",
                      inputWrapper: inputWrapperStyles,
                    }}
                    name="review"
                    onChange={(e) =>
                      dispatch(
                        updateTaskField({
                          field: e.target.name as keyof ITimeLedgerState,
                          value: e.target.value,
                        })
                      )
                    }
                    placeholder={t("enterReview")}
                    className="mb-4"
                  />
                  <div className="mb-4">
                    <h3 className="mb-2 font-bold">{t("totalSpend")}</h3>
                    {taskState === TaskState.FINISHED && (
                      <p>
                        {totalTime.hours} {t("hours")} : {totalTime.minutes}{" "}
                        {t("minutes")} : {totalTime.seconds} {t("seconds")}
                      </p>
                    )}
                  </div>
                  <Slider
                    label={t("selfAssessment")}
                    classNames={{
                      label: "font-bold",
                      value: "font-bold",
                    }}
                    value={completionPercentage}
                    getValue={(completionPercentage) =>
                      `${completionPercentage} %`
                    }
                    step={1}
                    maxValue={100}
                    minValue={0}
                    onChange={(value) => {
                      dispatch(
                        setCompletionPercentage(
                          Array.isArray(value) ? value[0] : value
                        )
                      );
                    }}
                    defaultValue={0}
                    className="mb-4 max-w-md"
                  />
                  <div className="flex justify-end gap-2">
                    {/* If you mistakenly finished, you can return to the previous state. */}
                    <Tooltip
                      content={t("ifMistakenlyFinishedTooltip")}
                      placement="bottom-start"
                    >
                      <Button
                        radius="md"
                        onClick={() => dispatch(undoFinished())}
                        className="bg-gray-500 font-bold text-white"
                      >
                        {t("undo")}
                      </Button>
                    </Tooltip>
                    <Button
                      radius="md"
                      onClick={() => {
                        handlePrint();
                      }}
                      className="bg-purple-500 font-bold text-white"
                    >
                      {t("printReceipt")}
                    </Button>
                    <Button
                      radius="md"
                      onClick={() => dispatch(startNewTask())}
                      className="bg-orange-500 font-bold text-white"
                    >
                      {t("startNewTask")}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Task Finished Receipt Area */}
      {taskState === TaskState.FINISHED && (
        <div
          className="print-only flex h-screen w-full items-center justify-center  bg-gray-100 p-10"
          ref={receiptRef}
        >
          <div className="w-4/5  bg-white p-6">
            <div className="flex items-center justify-between">
              <h1 className="mb-4 text-3xl font-bold">
                {t("lifeSpentReceipt")}
              </h1>
              <p className="text-sm italic text-gray-500">
                {formatTimestampToDateTime(startTime)}
              </p>
            </div>

            <hr className="mb-4 border-2" />
            <div className=" flex  items-center  justify-start gap-4">
              <p className="text-xl font-bold">{t("taskTitleLabel")}:</p>
              <p className="text-xl">{taskTitle}</p>
            </div>
            <hr className="mb-4 border-2" />
            <p className="mb-2 text-xl font-bold">{t("taskDescription")}:</p>
            <div className="mb-2  flex   justify-start gap-4  text-wrap text-xl">
              <p className="w-full break-all text-xl"> {taskDescription}</p>
            </div>
            <hr className="mb-4 border-2" />
            <div className=" flex  items-center  justify-start gap-4">
              <p className="text-xl font-bold">{t("totalTimeSpentLabel")}:</p>
              <p className="text-xl">
                {`${totalTime.hours} ${t("hours")} : ${totalTime.minutes} ${t("minutes")} : ${totalTime.seconds} ${t("seconds")}`}
                {` / ( ${hours} ${t("hours")} : ${minutes} ${t("minutes")} : ${seconds} ${t("seconds")} )`}
              </p>
            </div>
            <hr className="mb-4 border-2" />
            <div className=" flex  items-center  justify-start gap-4">
              <p className="text-xl font-bold">
                {t("completionPercentageLabel")}:
              </p>
              <p className="text-xl">{completionPercentage} %</p>
            </div>
            <hr className="mb-4 border-2" />
            <p className="mb-2 text-xl font-bold">{t("review")}:</p>
            <div className="mb-2  flex   justify-start gap-4  text-wrap text-xl">
              <p className="w-full break-all text-xl">
                {review || t("nothing")}
              </p>
            </div>
            <hr className="mb-4 border-2" />

            <div className="relative mt-6 flex w-full items-center justify-between text-center">
              <QRCodeSVG
                value={JSON.stringify({
                  taskState,
                  taskTitle,
                  taskDescription,
                  hours,
                  minutes,
                  seconds,
                  completionPercentage,
                  review,
                  id,
                  startTime,
                  finishedTime,
                  totalTime: totalTime,
                })}
                size={128}
              />
              <p className="absolute bottom-0 right-0 text-sm italic text-gray-500">
                {formatTimestampToDateTime(finishedTime)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
