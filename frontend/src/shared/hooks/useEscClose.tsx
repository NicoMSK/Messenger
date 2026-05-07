import { useEffect } from "react";

const ESC_CODE = 27;

export function useEscClose(callback: () => void, active: boolean = true) {
  useEffect(() => {
    if (!active) return;

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape" || event.keyCode === ESC_CODE) {
        callback();
      }
    }
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [callback, active]);
}
