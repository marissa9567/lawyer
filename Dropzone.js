import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'image',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} style={{
      border: '2px dashed gray',
      padding: '20px',
      backgroundColor: isOver ? 'lightgreen' : 'white',
    }}>
      {canDrop ? 'Release to drop' : 'Drag an image here'}
    </div>
  );
};

export default DropZone;
