import { RefObject, useEffect, useState } from 'react';
import { throttle } from '../utils/throttle.ts';

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
  defaultSize: {
    width: number;
    height: number;
    mobileWidth: number;
    mobileHeight: number;
  };
}

const REACTIVE_WIDTH = 768;

/*
 반응형 Canvas 크기 조정
 */
export const useCanvasReSize = ({ canvasRef, defaultSize }: Props) => {
  const { width, height, mobileWidth, mobileHeight } = defaultSize;
  const [canvasSize, setCanvasSize] = useState({ width, height });

  const updateCanvasSize = () => {
    // 현재 디바이스가 몇 배의 픽셀을 사용
    const pixelRatio = window.devicePixelRatio || 1; //device pixel ratio

    const cssWidth = window.innerWidth < REACTIVE_WIDTH ? mobileWidth : width;
    const cssHeight =
      window.innerWidth < REACTIVE_WIDTH ? mobileHeight : height;

    setCanvasSize({ width: cssWidth, height: cssHeight });

    if (canvasRef.current) {
      //update canvas width/height
      canvasRef.current.width = cssWidth * pixelRatio;
      canvasRef.current.height = cssHeight * pixelRatio;
      canvasRef.current.style.width = `${cssWidth}px`;
      canvasRef.current.style.height = `${cssHeight}px`;

      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      }
    }
  };

  const throttleUpdateCanvasSize = throttle(updateCanvasSize, 100);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateCanvasSize(); //init

      window.addEventListener('resize', throttleUpdateCanvasSize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', throttleUpdateCanvasSize);
      }
    };
  }, [canvasRef]);

  return canvasSize;
};
