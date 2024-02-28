import { useRouter } from 'next/router';

const LanguageToggleButton: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const { locale } = router;
  const changeLanguageHandler = () => {
    router.replace(router.asPath, undefined, {
      locale: router.locale === 'en' ? 'th' : 'en',
    });
  };
  return (
    <img
      src={locale === 'en' ? '/img/language-switch.png' : '/img/th-language.png'}
      onClick={changeLanguageHandler}
      className={`cursor-pointer ${className ?? ''}`}
      alt=""
    />
  );
};

export default LanguageToggleButton;
