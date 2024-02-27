import { useRouter } from 'next/router';

const LanguageToggleButton: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const changeLanguageHandler = () => {
    router.replace(router.asPath, undefined, {
      locale: router.locale === 'en' ? 'th' : 'en',
    });
  };
  return (
    <img
      src="/img/language-switch.png"
      onClick={changeLanguageHandler}
      className={`cursor-pointer ${className ?? ''}`}
      alt=""
    />
  );
};

export default LanguageToggleButton;
