import {useScroll, useSpring, useTransform} from "framer-motion";
import {RefObject} from "react";

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
    canvasRef:RefObject<HTMLCanvasElement>;
    range:number
}
export const useSmoothScrollIndex = ({canvasRef,range}:Props) => {

    const {scrollYProgress} =useScroll({
        target: canvasRef,
        offset:["start 90%","end 0%"]
    });

    const currnetIndex = useTransform(
        scrollYProgress,
        [SCROLL_START_RANGE,SCROLL_END_RANGE],
        [1,range]
    )

    const smoothIndex = useSpring(currnetIndex,{
        stiffness:SCROLL_SMOOTH_RANGE,
        damping:SCROLL_STOP_RANGE,
    })

    return smoothIndex

};