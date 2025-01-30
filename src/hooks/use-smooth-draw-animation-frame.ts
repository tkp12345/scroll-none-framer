import { MotionValue, useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';

const SOFT_SCROLL_RATIO = 0.7;

export const useSmoothDrawAnimationFrame = ({
  smoothIndex,
  images,
  drawImageCb,
}: {
  smoothIndex: MotionValue<number>;
  images: HTMLImageElement[];
  drawImageCb: (index: number) => void;
}) => {
  const displayIndex = useRef(0);
  const lastUpdate = useRef(0);
  const throttleDelay = 16;

  useAnimationFrame((time) => {
    //To prevent it from being too fast or causing performance issues.
    if (time - lastUpdate.current < throttleDelay) return;

    const targetIndex = smoothIndex.get();

    //    displayIndex가 목표 targetIndex로 부드럽게 변화함.
    displayIndex.current +=
      (targetIndex - displayIndex.current) * SOFT_SCROLL_RATIO;

    const index = Math.floor(
      Math.min(Math.max(1, displayIndex.current), images.length - 1),
    );

    drawImageCb(index);
  });
};
