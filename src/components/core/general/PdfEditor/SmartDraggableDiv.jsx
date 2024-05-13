import React, { useState } from 'react';
import './Resizable.css'; // Create a CSS file for styling

const SmartDraggableDiv = ({parentRef}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 200, height: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  console.log("parent ref " , parentRef);
  //const parentRef = React.createRef();

  const handleMouseDown = (event) => {
    if (event.target.classList.contains('drag-handle')) {
      setIsDragging(true);
    } else if (event.target.classList.contains('resize-handle')) {
      setIsResizing(true);
    }
  };
  /*
  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - size.width / 2,
        y: event.clientY - size.height / 2,
      });
    } else if (isResizing) {
      setSize({
        width: event.clientX - position.x,
        height: event.clientY - position.y,
      });
    }
  };
 */
  const handleMouseMove = (event) => {
   // const parentRect = parentRef.current.getBoundingClientRect();
     const parentRect = {
        width:595,
        height:841,
        x:0,
        y:0
     }
    
    if (isDragging) {
      const newX = Math.max(Math.min(event.clientX - size.width / 2, parentRect.width - size.width), 0);
      const newY = Math.max(Math.min(event.clientY - size.height / 2, parentRect.height - size.height), 0);

      setPosition({ x: newX, y: newY });
    } else if (isResizing) {
      const newWidth = Math.max(Math.min(event.clientX - position.x, parentRect.width - position.x), 50);
      const newHeight = Math.max(Math.min(event.clientY - position.y, parentRect.height - position.y), 50);

      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  return (
  
      <div
        className="resizable-div"
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="drag-handle"></div>
        <div className="resize-handle"></div>
        <p>Move and resize me</p>
      </div>
  
  );
};

export default SmartDraggableDiv;