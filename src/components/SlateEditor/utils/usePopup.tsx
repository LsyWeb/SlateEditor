import { useState, useEffect } from "react";

function usePopup(popupRef: any) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      const clickedComponent = e.target;
      if (!popupRef?.current?.contains(clickedComponent)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [showPopup, setShowPopup];
}

export default usePopup;
