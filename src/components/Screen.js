import React, { useContext, useRef, useEffect  } from "react"
import { CalcContext } from "../context/CalcContext"


const Screen = () => {
  const{ calc }=useContext(CalcContext);
  const screenRef = useRef();

  useEffect(() => {
    // Adjust font size on component mount and whenever calc changes
    adjustFontSize();
  }, [calc]);

  const adjustFontSize = () => {
    const screenElement = screenRef.current;
    if (screenElement) {
      // Set a base font size (you can adjust this as needed)
      let fontSize = 4;

      // Reset font size before each adjustment
      screenElement.style.fontSize = '';

      // Adjust font size dynamically based on the content and container width
      while (
        screenElement.scrollWidth > screenElement.clientWidth &&
        fontSize > 1
      ) {
        fontSize -= 0.1;
        screenElement.style.fontSize = `${fontSize}rem`;
      }
    }
  };

  return (
    <div ref={screenRef} className="screen">
      {calc.num ? calc.num : calc.res}
    </div>
  );

}

export default Screen