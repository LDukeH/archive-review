"use client";

import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

import useUserStore from "@/store/userStore";

export default function ToStoreToken() {
  const { setUser, user } = useUserStore();
  const { data: session, status } = useSession();

  const hasSetUser = useRef(false);

  useEffect(() => {
    if (status === "loading" || hasSetUser.current) return; // Wait for session to load

    if (status === "unauthenticated") {
      hasSetUser.current = false;
    }

    const fetchToken = async () => {
      if (session) {
        setUser({ data: session, type: "oauth" });
        hasSetUser.current = true;
      } else {
        const response = await fetch("/api/auth/token");
        if (!response.ok) {
          console.error("Failed to fetch token");
          setUser({ data: null, type: "" });
          hasSetUser.current = false;
          return;
        }

        const data = await response.json();
        setUser({ data, type: "token" });
        hasSetUser.current = true;
      }
    };
    fetchToken();
  }, [session, status]);

  console.log("User in ToStoreToken:", user);

  return null;
}
