import * as React from "react";

const TransactionCount: React.FC<React.SVGProps<SVGElement>> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="12"
    fill="none"
    viewBox="0 0 13 12"
  >
    <circle
      cx="6.713"
      cy="6"
      r="5.501"
      fill="#fff"
      stroke="#C80000"
      opacity="0.25"
    ></circle>
    <circle cx="6.713" cy="6.002" r="3.429" fill="#C80000"></circle>
  </svg>
);

export default TransactionCount;
