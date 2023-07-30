import React, { useState, useRef, useEffect } from "react";

import UI from "../../lib/UI";

export default function CanvasSheet() {
  const canvas = useRef();
  const [ui, setUI] = useState();
  useEffect(() => {
    const ui = new UI(canvas.current);
    setUI(ui);
  }, [canvas, setUI]);

  return <div ref={canvas} className="flex flex-1 relative" />;
}
