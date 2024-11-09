import React from 'react';
import { useDrag } from 'react-dnd';

const ImageItem = ({ imageSrc }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { imageSrc },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <img
      ref={drag}
      src={imageSrc}
      alt=""
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      width="100px"
    />
  );
};

export default ImageItem;
