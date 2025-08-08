"use client";

import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

import useUserStore from "@/store/userStore";

import { findFavoriteReviews } from "../action";

export default function ToStoreToken() {
  const { setUser, user } = useUserStore();

  const { data: session, status } = useSession();

  const hasSetUser = useRef(false);

  useEffect(() => {
    if (status === "loading" || hasSetUser.current || user.data) return; // Wait for session to load

    if (status === "unauthenticated") {
      hasSetUser.current = false;
    }

    const fetchToken = async () => {
      if (session) {
        const favorite = await findFavoriteReviews(session.user!.id);
        setUser({
          data: { ...session.user, favoriteReviews: favorite || [] },
          type: "oauth",
        });
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

  return null; // This component does not render anything
}
