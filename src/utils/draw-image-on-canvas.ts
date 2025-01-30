import { RefObject } from 'react';

/*
 캔버스 해상도, 캔버스 크기를 조정한 그리기
 */
export const drawImageOnCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  image: HTMLImageElement,
  canvasSize: { width: number; height: number },
) => {
  const canvas = canvasRef.current;
  if (!canvas || !canvasSize || !image) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 이미지가 로드되지 않은 경우 실행 중지
  if (!image.complete) {
    return;
  }

  // devicePixelRatio를 고려한 해상도 설정
  const pixelRatio = window.devicePixelRatio || 1;

  // 캔버스 해상도 설정
  canvas.width = canvasSize.width * pixelRatio;
  canvas.height = canvasSize.height * pixelRatio;

  // CSS 스타일 크기 화면 크기에 맞게 설정
  canvas.style.width = `${canvasSize.width}px`;
  canvas.style.height = `${canvasSize.height}px`;

  // pixelRatio를 적용
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  // 원본 이미지 비율
  const imageAspectRatio = image.width / image.height;
  const canvasAspectRatio = canvasSize.width / canvasSize.height;

  let drawWidth, drawHeight;
  let offsetX = 0,
    offsetY = 0;

  // 이미지 비율에 맞게 크기 조정
  if (imageAspectRatio > canvasAspectRatio) {
    // 이미지가 더 넓을 경우, 너비를 캔버스에 맞추고 높이 조정
    drawWidth = canvasSize.width;
    drawHeight = canvasSize.width / imageAspectRatio;
    offsetY = (canvasSize.height - drawHeight) / 2; // 세로 여백을 중앙 정렬
  } else {
    // 이미지가 더 좁을 경우, 높이를 캔버스에 맞추고 너비 조정
    drawHeight = canvasSize.height;
    drawWidth = canvasSize.height * imageAspectRatio;
    offsetX = (canvasSize.width - drawWidth) / 2; // 가로 여백을 중앙 정렬
  }

  // 캔버스를 지우고 새로 그리기
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
};
