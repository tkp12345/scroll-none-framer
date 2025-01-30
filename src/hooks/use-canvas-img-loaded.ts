import { useEffect, useState } from 'react';

const TACT_SLEEVE_IMG_COUNT = 100;

export const useCanvasImgLoaded = () => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = []; // 로드된 이미지를 저장할 배열

      // 이미지 로드를 Promise로 처리
      const imagePromises = Array.from(
        { length: TACT_SLEEVE_IMG_COUNT },
        (_, i) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = `/images/${i}.webp`;
            // img.src = `/images/${i}.webp`;

            img.onload = () => {
              loadedImages.push(img); // 이미지가 성공적으로 로드되면 배열에 추가
              resolve();
            };

            img.onerror = () => {
              console.error(`Failed to load image: /images/${i}.webp`);
              resolve(); // 에러 발생 시에도 진행을 위해 resolve 호출
            };
          });
        },
      );

      await Promise.all(imagePromises); // 모든 이미지 로드 완료 대기
      setImages(loadedImages); // 모든 이미지가 로드된 후 상태 업데이트
      setIsLoaded(true); // 로드 완료 상태 업데이트
    };

    loadImages();
  }, []);
  return {
    images,
    isLoaded,
  };
};
