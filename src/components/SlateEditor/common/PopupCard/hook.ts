import  { useState } from "react";
import { PopupCardProps } from ".";

type UsePopupProps = () => PopupCardProps & {
  show: (dom: HTMLElement) => void;
  handleOutsideClick: () => void;
  hide: () => void;
};

const usePopup: UsePopupProps = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleOutsideClick = () => {
    setVisible(false);
  };

  const show = (dom: HTMLElement) => {
    const rect = dom.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;
    const height = rect.height;

    setPosition?.({
      top: top + height,
      left,
    });
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return {
    visible,
    setVisible,
    position,
    setPosition,
    handleOutsideClick,
    show,
    hide,
  };
};

export default usePopup;
