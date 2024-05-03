"use client";
import { default as nextDynamic } from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.minimal.css";
// import { ToastContainer } from "react-toastify";

const ToastContainer = nextDynamic(
  () => import("react-toastify").then((module) => module.ToastContainer),
  {
    ssr: false,
  }
);

interface ToastProviderProps {
  children: React.ReactNode;
}

const contextClass = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-gray-500",
  warning: "bg-orange-500",
  default: "bg-indigo-500",
  dark: "bg-white-600 text-gray-300",
};

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) => {
          return ` ${contextClass[context?.type || "default"]} relative flex min-h-10 rounded-md justify-between overflow-hidden cursor-pointer mb-4 p-3`;
        }}
        bodyClassName={() =>
          "flex items-center text-sm font-white font-med block p-3"
        }
        position="top-right"
        autoClose={3000}
      />
    </>
  );
}
