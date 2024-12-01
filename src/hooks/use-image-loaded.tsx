import {useEffect, useState} from "react";

export const useImageLoaded = ({imageSrcs}:{ imageSrcs:string[]}) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false)



useEffect(()=>{
    const loadImages = async ()=>{
        const imagePromises = imageSrcs.map((src)=>{
            return new Promise<HTMLImageElement>((resolve)=>{
                const img = new Image();
                img.src = src ;
                img.onload = ()=> resolve(img)
                img.onerror = ()=>{
                    img.onload =()=> resolve(img);
                    img.onerror = ()=>resolve(img);
                }
            })
        })

        const loadedImages = await Promise.all(imagePromises); //all image wait
        setImages(loadedImages)
        setIsLoaded(true)
    }

    loadImages()
},[imageSrcs])

return{
        images,
    isLoaded
}

};