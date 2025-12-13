import Lottie from 'lottie-react';
import santaSleighAnimation from '../assets/santa-sleigh.json';

export default function SantaSleigh() {
  return (
    <div className="fixed left-0 w-full z-10 pointer-events-none top-64 h-40 sm:top-80 sm:h-65 md:top-64 md:h-80 lg:top-72 lg:h-96">
      <Lottie
        animationData={santaSleighAnimation}
        loop={true}
        autoplay={true}
        speed={1}
      />
    </div>
  );
}
