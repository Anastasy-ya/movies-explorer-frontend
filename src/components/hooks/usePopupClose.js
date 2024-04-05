// custom hook for closing popup by clicking on an empty space, pressing ESC
import { useEffect } from "react";

// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук
// custom hooks should always start with the verb `use` so that React understands that it is a hook
function usePopupClose({ isOpen, handleOpenClosePopup }) {
  useEffect(() => {
    if (!isOpen) return; // stop effect if popup is closed

    const handleOverlay = (event) => {
      // if there is `popup_opened` in blocks classes it means clicked on overlay
      if (event.target.classList.contains("popup_opened")) {
        handleOpenClosePopup();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleOpenClosePopup();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    // to be sure to remove handlers
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
    // be sure to monitor `isOpen` so that it only works when opening, 
    // and not during any redrawing of the component
  }, [isOpen, handleOpenClosePopup]);
}

export default usePopupClose;
