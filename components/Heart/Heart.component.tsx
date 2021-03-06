import React from "react";
const Heart = ({ perc }: { perc: string }) => {
  return (
    <svg
      height="300"
      viewBox="0 -20 464 464"
      width="300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <linearGradient id="lg" x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stop-opacity="1" stop-color="royalblue" />
        <stop offset="60%" stop-opacity="1" stop-color="royalblue" />
        <stop offset={`${perc}%`} stop-opacity="0" stop-color="royalblue" />
        <stop offset={`${perc}%`} stop-opacity="0" stop-color="royalblue" />
      </linearGradient>
      <path
        d="m340 0c-44.773438.00390625-86.066406 24.164062-108 63.199219-21.933594-39.035157-63.226562-63.19531275-108-63.199219-68.480469 0-124 63.519531-124 132 0 172 232 292 232 292s232-120 232-292c0-68.480469-55.519531-132-124-132zm0 0"
        fill="url(#lg)"
        stroke="black"
      />
    </svg>
  );
};

export default Heart;
