import { useScroll, useSpring, useTransform } from 'framer-motion';
import { RefObject } from 'react';

/*
 scroll start end range
 */
const SCROLL_START_RANGE = 0;
const SCROLL_END_RANGE = 0.9;
/*
scroll smooth range
 */
const SCROLL_SMOOTH_RANGE = 1000;
const SCROLL_STOP_RANGE = 100;

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
  range: number;
}

/*
 useScroll
 - react 스크롤 관련 animation hooks
=> reason:  특정 요소의 스크롤을 추적하여 스크롤 위치를 기반으로 다양한 애니메이션 효과를 적용
=> 네 가지 주요 motion values를  반환 currentIndex → smoothIndex로 변환

1. scrollYProgress (0~1) - useScroll을 사용하여 특정 요소(canvasRef)의 스크롤 진행도(scrollYProgress)를 추적.
2. currentIndex 로 변환 - 진행도(0 ~ 0.9)를 1 ~ range(예: 이미지 개수) 사이의 값으로 매핑
3. 부드로운 애니메이션 적용
 */
export const useSmoothScrollIndex = ({ canvasRef, range }: Props) => {
  //scrollYProgress :(0~1) canvasRef가 차지하는비율
  const { scrollYProgress } = useScroll({
    target: canvasRef,
    offset: ['start 90%', 'end 0%'], // 캔버스 화면 90% 위치시 스크롤시작 ,0% 캔버스 사라질떄 스크롤 끝남
  });

  //스크롤이 0% 진행되면 currentIndex = 1, 90% 진행되면 currentIndex = range로 변환.
  const currentIndex = useTransform(
    scrollYProgress,
    [SCROLL_START_RANGE, SCROLL_END_RANGE],
    [1, range],
  );

  const smoothIndex = useSpring(currentIndex, {
    stiffness: SCROLL_SMOOTH_RANGE,
    damping: SCROLL_STOP_RANGE,
  });

  //  smoothIndex 값이 바뀔 때마다 콘솔에 출력
  // useEffect(() => {
  //   const unsubscribe = smoothIndex.onChange((value) => {
  //     console.log('smoothIndex 변화:', value);
  //   });
  //
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [smoothIndex]);

  return smoothIndex;
};
