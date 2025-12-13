import { useEffect } from 'react';

export default function Snowfall() {
  useEffect(() => {
    const canvas = document.getElementById('snowfall-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes = [];
    const snowflakeCount = 100;
    
    const getSnowflakeSize = () => {
      const width = window.innerWidth;
      if (width < 640) return Math.random() * 0.8 + 0.5;
      if (width < 1024) return Math.random() * 1.2 + 0.8;
      return Math.random() * 1.5 + 1.2;
    };

    class Snowflake {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = getSnowflakeSize();
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 + 1;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > canvas.height) {
          this.y = -this.size;
          this.x = Math.random() * canvas.width;
        }

        if (this.x > canvas.width) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = canvas.width;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push(new Snowflake());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((snowflake) => {
        snowflake.update();
        snowflake.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      id="snowfall-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  );
}
