import React, { useState, useEffect } from 'react';

function Pointer() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
   useEffect(() => {
    const handleMouseMove = (event) => {
      setCoords({
        x: event.clientX + 1,
        y: event.clientY + 3
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ left: coords.x + "px", top: coords.y + "px" }} className="pointer"></div>
  );
}

export default Pointer;
