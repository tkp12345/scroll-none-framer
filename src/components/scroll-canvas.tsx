import { useEffect, useRef } from 'react';
import { useCanvasReSize } from '../hooks/use-canvas-re-size.ts';
import { useSmoothScrollIndex } from '../hooks/use-smooth-scroll-index.ts';
import { useSmoothDrawAnimationFrame } from '../hooks/use-smooth-draw-animation-frame.ts';
import { drawImageOnCanvas } from '../utils/draw-image-on-canvas.ts';

export const ScrollCanvas = ({ images }: { images: HTMLImageElement[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //scroll to smooth
  const smoothIndex = useSmoothScrollIndex({ canvasRef, range: images.length });

  // resize canvas for devicePixelRatio
  const canvasSize = useCanvasReSize({
    canvasRef,
    defaultSize: {
      width: 708,
      height: 800,
      mobileWidth: 360,
      mobileHeight: 318,
    },
  });

  useSmoothDrawAnimationFrame({
    smoothIndex,
    images,
    drawImageCb: (index) => {
      if (canvasRef.current) {
        drawImageOnCanvas(canvasRef, images[index], canvasSize);
      }
    },
  });

  // 초기 렌더링 시 첫 번째 이미지 draw
  useEffect(() => {
    if (canvasRef.current) {
      drawImageOnCanvas(canvasRef, images[0], canvasSize);
    }
  }, [images]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};
