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
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        onClick={() => dispatch(setAuthState(true))}
      >
        Login
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => dispatch(setAuthState(false))}
      >
        Logout
      </button>
      <div className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        <Link href="/test/counter">Go to Counter</Link>
      </div>
    </div>
  );
}
