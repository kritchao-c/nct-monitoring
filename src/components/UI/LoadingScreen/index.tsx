import Lottie from 'lottie-react';

import sliding from '../../../../public/lotties/loading.json';

const LoadingScreen: React.FC<{ className?: string; opacity?: string | number }> = ({ className, opacity }) => {
  return (
    <div
      className="min-size-screen fixed inset-0 flex items-center justify-center bg-white"
      style={{
        opacity: opacity || '100%',
        zIndex: 9999,
      }}
    >
      <Lottie animationData={sliding} className={`size-72 ${className}`} />
    </div>
  );
};

export default LoadingScreen;
