import { ScrollCanvas } from '../components/scroll-canvas.tsx';
import { useCanvasImgLoaded } from '../hooks/use-canvas-img-loaded.ts';

export const ScrollContainer = () => {
  const { images } = useCanvasImgLoaded();
  return (
    <div>
      <div className="align-center flex w-full flex-col gap-6 laptop:flex-row">
        <ScrollCanvas images={images} />
      </div>
    </div>
  );
};
