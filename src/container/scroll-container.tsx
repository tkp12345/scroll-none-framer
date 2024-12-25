import { ScrollCanvas } from '../components/scroll-canvas.tsx';

export const ScrollContainer = () => {
  const imagePaths = Array.from(
    { length: 85 },
    (_, index) => `/public/images/${index + 1}.webp`,
  );

  const images: HTMLImageElement[] = imagePaths.map((path) => {
    const img = new Image();
    img.src = path;
    return img;
  });

  return (
    <div>
      <ScrollCanvas images={images} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Image ${index + 1}`}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              border: '1px solid #ccc',
            }}
          />
        ))}
      </div>
    </div>
  );
};
