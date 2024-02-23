const Graph: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width={26}
      height={27}
      viewBox="0 0 26 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.25 23.25V21.1917L4.875 19.5667V23.25H3.25ZM7.71875 23.25V16.8583L9.34375 15.2333V23.25H7.71875ZM12.1875 23.25V15.2333L13.8125 16.8854V23.25H12.1875ZM16.6562 23.25V16.8854L18.2812 15.2604V23.25H16.6562ZM21.125 23.25V12.525L22.75 10.9V23.25H21.125ZM3.25 16.8583V14.5563L10.8333 7.02708L15.1667 11.3604L22.75 3.75V6.05208L15.1667 13.6625L10.8333 9.32917L3.25 16.8583Z"
        fill="black"
      />
    </svg>
  );
};

export default Graph;
