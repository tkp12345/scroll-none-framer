import {MotionValue, useAnimationFrame} from "framer-motion";

const SOFT_SCROLL_RATIO = 0.7;

export const useSmoothDrawAnimationFrame = ({smoothIndex,images,drawImageCb}:{smoothIndex: MotionValue<number>,images:HTMLImageElement[],drawImageCb:(index:number)=>void}) => {
let displayIndex = 0;
const lastUpdate =0;
const throttleDelay=16

    useAnimationFrame((time)=> {
        //To prevent it from being too fast or causing performance issues.
        if (time - lastUpdate < throttleDelay) return;

        const targetIndex = smoothIndex.get()
        displayIndex += (targetIndex - displayIndex) * SOFT_SCROLL_RATIO;

        const index = Math.floor(Math.min(Math.max(1, displayIndex), images.length - 1))

        drawImageCb(index);
    })
};