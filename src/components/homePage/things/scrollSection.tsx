'use client';
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './things.scss';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('.panel');

    const totalWidth = (sections.length - 1) * window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: `+=${totalWidth}`,
          markers: true, // remove in production
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="horizontal-section">
      <div ref={sectionRef} className="scroll-container">
        <div className="panel bg-red-400">Section 1</div>
        <div className="panel bg-blue-400">Section 2</div>
        <div className="panel bg-green-400">Section 3</div>
        <div className="panel bg-yellow-400">Section 4</div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
