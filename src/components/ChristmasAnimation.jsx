import Lottie from 'lottie-react';
import christmasAnimation from '../assets/christmas-wind-chimes.json';

export default function ChristmasAnimation() {
  return (
    <div className="absolute -right-2 -bottom-24 w-24 h-24 sm:-bottom-24 sm:w-32 sm:h-32 md:-bottom-40 md:w-40 md:h-40 lg:-bottom-48 lg:w-48 lg:h-48 pointer-events-none">
      <Lottie
        animationData={christmasAnimation}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}
