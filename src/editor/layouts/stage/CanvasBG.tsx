export const CanvasBG = () => {
  return (
    <svg className="canvas-bg">
      <pattern id="pattern" x="5.049716803020769" y="7.097860289490246" width="7.3505349276274385"
               height="7.3505349276274385" patternUnits="userSpaceOnUse">
        <circle cx="0.22970421648835745" cy="0.22970421648835745" r="0.22970421648835745"
                fill="rgba(0, 0, 0, 0.65)"></circle>
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"></rect>
    </svg>
  );
};