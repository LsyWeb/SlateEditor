'use client';

import { Card } from "antd";
import { FC, ReactNode, useRef } from "react";
import useOutsideClick from "../../utils/useOutsideClick";
import "./index.css";
import { createPortal } from "react-dom";

export type PopupCardProps = {
  position?: {
    top: number;
    left: number;
  };
  visible: boolean;
  setPosition?: (position: { top: number; left: number }) => void;
  setVisible: (visible: boolean) => void;
  children?: ReactNode;
};

const PopupCard: FC<PopupCardProps> = ({
  children,
  position,
  visible,
  setPosition,
  setVisible,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(cardRef, () => {
    setVisible(false);
    setPosition?.({
      top: 0,
      left: 0,
    });
  });
  const content = visible && (
    <Card
      className="popup-card"
      contentEditable={false}
      ref={cardRef}
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{
        top: position?.top,
        left: position?.left,
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </Card>
  );

  return createPortal(content, document.body);
};

export default PopupCard;
