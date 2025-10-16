import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface FadeIn {
  children?: ReactNode;
  direction?: string;
  delay?: number;
  speed?: string;
  className?: string;
}

// Reusable FadeIn component
const FadeIn = ({
  children,
  direction = 'up',
  delay = 0,
  speed = 'normal',
  className = '',
}: FadeIn) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const getAnimationClass = () => {
    if (!isVisible) return '';
    return `fade-in-${direction} active`;
  };

  const getSpeedClass = () => {
    if (speed === 'fast') return 'fade-in-fast';
    if (speed === 'slow') return 'fade-in-slow';
    if (speed === 'slower') return 'fade-in-slower';
    return '';
  };

  const getDelayClass = () => {
    if (delay > 0 && delay <= 5) return `fade-in-delay-${delay}`;
    return '';
  };

  return (
    <div
      ref={elementRef}
      className={`fade-in-${direction} ${getAnimationClass()} ${getSpeedClass()} ${getDelayClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
