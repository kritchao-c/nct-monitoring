const Dashboard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width={29}
      height={29}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.41634 11.1771V5.4375C2.41634 4.95417 2.59759 4.53125 2.96009 4.16875C3.32259 3.80625 3.74551 3.625 4.22884 3.625H24.7705C25.2538 3.625 25.6768 3.80625 26.0393 4.16875C26.4018 4.53125 26.583 4.95417 26.583 5.4375V11.1771H24.7705V5.4375H4.22884V11.1771H2.41634ZM4.22884 21.75C3.74551 21.75 3.32259 21.5687 2.96009 21.2062C2.59759 20.8437 2.41634 20.4208 2.41634 19.9375V12.9896H4.22884V19.9375H24.7705V12.9896H26.583V19.9375C26.583 20.4208 26.4018 20.8437 26.0393 21.2062C25.6768 21.5687 25.2538 21.75 24.7705 21.75H4.22884ZM1.20801 25.375V23.5625H27.7913V25.375H1.20801ZM2.41634 12.9896V11.1771H9.66634C9.83069 11.1771 9.98759 11.2174 10.137 11.2979C10.2864 11.3785 10.4014 11.4993 10.482 11.6604L12.1434 15.0437L16.1007 8.06562C16.1813 7.90451 16.2971 7.78871 16.4481 7.71823C16.5992 7.64774 16.7564 7.6125 16.9199 7.6125C17.0834 7.6125 17.2395 7.64774 17.3882 7.71823C17.5368 7.78871 17.6514 7.90451 17.732 8.06562L19.2591 11.1771H26.583V12.9896H18.6986C18.5325 12.9896 18.3739 12.9493 18.2229 12.8687C18.0718 12.7882 17.9585 12.6674 17.883 12.5062L16.8559 10.4219L12.8986 17.3396C12.8237 17.5007 12.7112 17.6215 12.5612 17.7021C12.4112 17.7826 12.2538 17.8229 12.0888 17.8229C11.9238 17.8229 11.7658 17.7826 11.6148 17.7021C11.4637 17.6215 11.3479 17.5007 11.2674 17.3396L9.09238 12.9896H2.41634Z"
        fill="#414141"
      />
    </svg>
  );
};

export default Dashboard;
