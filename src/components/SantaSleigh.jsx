import Lottie from 'lottie-react';
import santaSleighAnimation from '../assets/santa-sleigh.json';

export default function SantaSleigh() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-start overflow-hidden" style={{ zIndex: -1 }}>
      <div style={{ transform: 'scale(1.5)', width: '100%', height: '100%', opacity: 0.6 }}>
        <Lottie
          animationData={santaSleighAnimation}
          loop={true}
          autoplay={true}
          speed={0.2}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
