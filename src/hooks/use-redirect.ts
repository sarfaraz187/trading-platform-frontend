import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// This hook is used to redirect the user after a successful login or signup attempt
export function useAuthRedirect(authAttempted: boolean, onFail?: () => void) {
  const attempts = useRef(0);
  const router = useRouter();

  useEffect(() => {
    if (!authAttempted) return;

    const poll = async () => {
      try {
        const response = await fetch("/api/auth/check-cookie");
        const data = await response.json();

        if (data.authenticated) {
          router.push("/");
        } else if (attempts.current < 5) {
          attempts.current++;
          setTimeout(poll, 200);
        } else {
          onFail?.();
        }
      } catch (error) {
        console.error("Error polling cookie:", error);
        onFail?.();
      }
    };

    poll();
  }, [authAttempted]);
}
