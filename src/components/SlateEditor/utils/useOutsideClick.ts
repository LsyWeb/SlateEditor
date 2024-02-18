'use client';

import { MutableRefObject, useEffect, useRef } from "react";

const useOutsideClick = (
  ref: MutableRefObject<HTMLDivElement | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      // 检查点击的元素是否是组件之外的元素
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    // 添加全局点击事件监听器
    document.addEventListener("click", handleOutsideClick);

    // 在组件卸载时移除事件监听器
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref, onOutsideClick]);
};

export default useOutsideClick;
