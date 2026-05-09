import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const authed = localStorage.getItem("cv_authed");
    if (!authed || authed !== "true") {
      throw redirect({ to: "/auth" });
    }
    const archetype = localStorage.getItem("cv_archetype");
    throw redirect({ to: archetype ? "/watchlist" : "/onboarding" });
  },
  component: () => null,
});
