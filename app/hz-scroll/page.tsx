'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HorizontalScroll() {
  const horizontalRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollHintRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const horizontal = horizontalRef.current;
    const sections = gsap.utils.toArray('.panel');
    const totalWidth = sections.length * window.innerWidth;

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(horizontal, {
      x: () => -(totalWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: true,
        onUpdate: (self) => {
          // Ensure smooth start
          if (self.progress === 0) {
            gsap.set(horizontal, { x: 0 });
          }
        },
      },
    });

    // Fade out scroll hint
    gsap.to(scrollHintRef.current, {
      opacity: 0,
      scrollTrigger: {
        start: 'top top',
        end: '+=300',
        scrub: true,
      },
    });

    // Refresh ScrollTrigger after a brief delay to ensure proper calculation
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          background: #000;
        }
        .intro {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          font-size: 3rem;
          text-align: center;
          padding: 20px;
        }
        .scroll-hint {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 1.2rem;
          z-index: 100;
          animation: bounce 2s infinite;
          text-align: center;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }
        .horizontal-section {
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
        .sticky-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }
        .horizontal-scroll {
          display: flex;
          height: 100vh;
          width: fit-content;
        }
        .panel {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          color: white;
          font-weight: bold;
          flex-shrink: 0;
        }
        .panel:nth-child(1) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .panel:nth-child(2) {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .panel:nth-child(3) {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        .panel:nth-child(4) {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }
        .panel:nth-child(5) {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }
        .spacer {
          height: 100vh;
        }
      `}</style>

      <div className="intro">
        <div>
          <h1>Horizontal Scroll Demo</h1>
          <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>
            Scroll down to see the magic ✨
          </p>
        </div>
      </div>

      <div className="scroll-hint" ref={scrollHintRef}>
        ↓ Keep Scrolling ↓
      </div>

      <div className="horizontal-section" ref={sectionRef}>
        <div className="sticky-wrapper">
          <div className="horizontal-scroll" ref={horizontalRef}>
            <div className="panel">Section 1</div>
            <div className="panel">Section 2</div>
            <div className="panel">Section 3</div>
            <div className="panel">Section 4</div>
            <div className="panel">Section 5</div>
          </div>
        </div>
      </div>

      <div className="spacer"></div>
    </>
  );
}
