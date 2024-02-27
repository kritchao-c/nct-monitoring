import Lottie from 'lottie-react';

import sliding from '../../../../public/lotties/sliding.json';

const SlidingDot: React.FC<{ className?: string }> = ({ className }) => {
  return <Lottie animationData={sliding} className={className} />;
};

export default SlidingDot;
