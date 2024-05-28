"use client";

import { setAuthState } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";

export default function Page() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Auth Page</h1>
      <p>{isAuth ? "Logged In" : "Logged Out"}</p>
      <button
        className="mr-2 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => dispatch(setAuthState(true))}
      >
        Login
      </button>
      <button
        className="rounded bg-red-500 px-4 py-2 text-white"
        onClick={() => dispatch(setAuthState(false))}
      >
        Logout
      </button>
      <div className="mt-4 rounded bg-green-500 px-4 py-2 text-white">
        <Link href="/test/counter">Go to Counter</Link>
      </div>
    </div>
  );
}
