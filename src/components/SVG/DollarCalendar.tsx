const DollarCalendar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width={28}
      height={29}
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 26.1668C4.78333 26.1668 4.375 25.9918 4.025 25.6418C3.675 25.2918 3.5 24.8835 3.5 24.4168V6.3335C3.5 5.86683 3.675 5.4585 4.025 5.1085C4.375 4.7585 4.78333 4.5835 5.25 4.5835H7.14583V2.8335H9.04167V4.5835H18.9583V2.8335H20.8542V4.5835H22.75C23.2167 4.5835 23.625 4.7585 23.975 5.1085C24.325 5.4585 24.5 5.86683 24.5 6.3335V24.4168C24.5 24.8835 24.325 25.2918 23.975 25.6418C23.625 25.9918 23.2167 26.1668 22.75 26.1668H5.25ZM5.25 24.4168H22.75V11.8752H5.25V24.4168ZM5.25 10.1252H22.75V6.3335H5.25V10.1252Z"
        fill="#001E2E"
      />
      <path
        d="M13.4086 23.012V21.8426C12.8796 21.7497 12.4457 21.5479 12.1069 21.237C11.7682 20.926 11.5245 20.5339 11.376 20.0606L12.1557 19.7404C12.3134 20.1859 12.5408 20.5177 12.8378 20.7358C13.1348 20.9539 13.4921 21.0629 13.9098 21.0629C14.3553 21.0629 14.7219 20.9516 15.0096 20.7288C15.2973 20.5061 15.4412 20.1998 15.4412 19.81C15.4412 19.4016 15.3136 19.0861 15.0583 18.8633C14.8031 18.6406 14.3228 18.4132 13.6174 18.1811C12.9492 17.9677 12.4503 17.6846 12.1208 17.3319C11.7914 16.9792 11.6266 16.5384 11.6266 16.0094C11.6266 15.4989 11.7914 15.072 12.1208 14.7286C12.4503 14.3852 12.8796 14.1903 13.4086 14.1439V12.9883H14.2439V14.1439C14.6616 14.1903 15.0212 14.3272 15.3228 14.5545C15.6245 14.7819 15.8542 15.072 16.012 15.4246L15.2323 15.7588C15.1024 15.4618 14.9284 15.246 14.7103 15.1114C14.4922 14.9768 14.2068 14.9095 13.8541 14.9095C13.4272 14.9095 13.0884 15.007 12.8378 15.2019C12.5872 15.3968 12.4619 15.6613 12.4619 15.9954C12.4619 16.3481 12.6011 16.6335 12.8796 16.8516C13.158 17.0697 13.6731 17.2948 14.4249 17.5268C15.056 17.7217 15.5224 18.0025 15.824 18.3691C16.1257 18.7357 16.2765 19.1974 16.2765 19.7543C16.2765 20.339 16.1048 20.81 15.7614 21.1673C15.418 21.5247 14.9121 21.7544 14.2439 21.8565V23.012H13.4086Z"
        fill="#001E2E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.1704 23.2502V22.0369C12.6897 21.9243 12.2788 21.718 11.9459 21.4124C11.5738 21.071 11.3088 20.6419 11.1488 20.1319L11.0833 19.9233L12.2966 19.425L12.3802 19.6609C12.5265 20.074 12.7299 20.361 12.9788 20.5438C13.2296 20.728 13.5358 20.8247 13.9098 20.8247C14.3146 20.8247 14.6265 20.7242 14.8638 20.5405C15.0886 20.3664 15.203 20.1322 15.203 19.81C15.203 19.455 15.0945 19.211 14.9017 19.0428C14.6856 18.8541 14.2461 18.6387 13.544 18.4077C12.8539 18.1872 12.3137 17.8873 11.9468 17.4945C11.572 17.0933 11.3884 16.5924 11.3884 16.0094C11.3884 15.4423 11.5737 14.9548 11.949 14.5637C12.2753 14.2235 12.6863 14.0155 13.1704 13.9342V12.7502H14.4821V13.9386C14.8508 14.008 15.1804 14.1489 15.4662 14.3643C15.8007 14.6165 16.0556 14.9388 16.2294 15.3274L16.3282 15.5483L15.1089 16.0708L15.0141 15.8542C14.8985 15.5898 14.7523 15.4172 14.5852 15.3141C14.4163 15.2099 14.1786 15.1477 13.8541 15.1477C13.462 15.1477 13.1805 15.2372 12.984 15.3899C12.7949 15.537 12.7001 15.7303 12.7001 15.9954C12.7001 16.2747 12.8055 16.491 13.0265 16.6641C13.2676 16.853 13.7455 17.0679 14.4951 17.2992C15.154 17.5027 15.6672 17.8036 16.008 18.2178C16.3505 18.6341 16.5147 19.1522 16.5147 19.7543C16.5147 20.3887 16.3267 20.9228 15.9331 21.3324C15.5806 21.6992 15.0896 21.9351 14.4821 22.0564V23.2502H13.1704ZM14.2439 21.8565C14.9121 21.7544 15.418 21.5247 15.7614 21.1673C16.1048 20.81 16.2765 20.339 16.2765 19.7543C16.2765 19.1974 16.1257 18.7357 15.824 18.3691C15.5224 18.0025 15.056 17.7217 14.4249 17.5268C13.6731 17.2948 13.158 17.0697 12.8796 16.8516C12.6011 16.6335 12.4619 16.3481 12.4619 15.9954C12.4619 15.6613 12.5872 15.3968 12.8378 15.2019C13.0884 15.007 13.4272 14.9095 13.8541 14.9095C14.2068 14.9095 14.4922 14.9768 14.7103 15.1114C14.9284 15.246 15.1024 15.4618 15.2323 15.7588L16.012 15.4246C15.979 15.351 15.9429 15.2801 15.9037 15.2119C15.7551 14.9536 15.5615 14.7344 15.3228 14.5545C15.0212 14.3272 14.6616 14.1903 14.2439 14.1439V12.9883H13.4086V14.1439C12.8796 14.1903 12.4503 14.3852 12.1208 14.7286C11.7914 15.072 11.6266 15.4989 11.6266 16.0094C11.6266 16.5384 11.7914 16.9792 12.1208 17.3319C12.4503 17.6846 12.9492 17.9677 13.6174 18.1811C14.3228 18.4132 14.8031 18.6406 15.0583 18.8633C15.3136 19.0861 15.4412 19.4016 15.4412 19.81C15.4412 20.1998 15.2973 20.5061 15.0096 20.7288C14.7219 20.9516 14.3553 21.0629 13.9098 21.0629C13.4921 21.0629 13.1348 20.9539 12.8378 20.7358C12.5923 20.5554 12.3943 20.2974 12.2439 19.9616C12.2124 19.8913 12.183 19.8175 12.1557 19.7404L11.376 20.0606C11.5245 20.5339 11.7682 20.926 12.1069 21.237C12.4457 21.5479 12.8796 21.7497 13.4086 21.8426V23.012H14.2439V21.8565Z"
        fill="#001E2E"
      />
    </svg>
  );
};

export default DollarCalendar;
