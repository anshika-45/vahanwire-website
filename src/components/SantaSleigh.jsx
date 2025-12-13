import Lottie from 'lottie-react';
import santaSleighAnimation from '../assets/santa-sleigh.json';

export default function SantaSleigh() {
  return (
    <div className="absolute left-0 w-full z-50 pointer-events-none top-0 h-full flex items-center justify-center">
      <Lottie
        animationData={santaSleighAnimation}
        loop={true}
        autoplay={true}
        speed={1}
      />
    </div>
  );
}
