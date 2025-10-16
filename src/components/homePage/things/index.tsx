'use client';
import { Box, Container, Grid, Typography } from '@mui/material';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './things.module.scss';
import GlassElement from '@/src/ui/glassElement';
import Image from 'next/image';
// Swiper imports (ensure dependency installed: npm i swiper@^11)
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import './things.scss';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

type Props = {};

const Things = (props: Props) => {
  const horizontalRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollHintRef = useRef(null);
  // Removed fade-in state
  const [scrollY, setScrollY] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   const horizontal = horizontalRef.current;
  //   const sections = gsap.utils.toArray('.hzPanel');

  //   // Sum up all offset widths
  //   const totalWidth = sections.reduce(
  //     (acc, section) => acc + section && section.offsetWidth,
  //     0,
  //   );

  //   console.log(sections, 'section', totalWidth, 'totalWidth');

  //   // Create the horizontal scroll animation
  //   const scrollTween = gsap.to(horizontal, {
  //     x: () => -(totalWidth - window.innerWidth),
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: 'top top',
  //       end: () => `+=${totalWidth}`,
  //       scrub: 1,
  //       pin: true,
  //       anticipatePin: 1,
  //       invalidateOnRefresh: true,
  //       markers: true,
  //       onUpdate: (self) => {
  //         // Ensure smooth start
  //         if (self.progress === 0) {
  //           gsap.set(horizontal, { x: 0 });
  //         }
  //       },
  //     },
  //   });

  //   // Fade out scroll hint
  //   gsap.to(scrollHintRef.current, {
  //     opacity: 0,
  //     scrollTrigger: {
  //       start: 'top top',
  //       end: '+=300',
  //       scrub: true,
  //     },
  //   });

  //   // Refresh ScrollTrigger after a brief delay to ensure proper calculation
  //   const timer = setTimeout(() => {
  //     ScrollTrigger.refresh();
  //   }, 100);

  //   return () => {
  //     clearTimeout(timer);
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const horizontal = horizontalRef.current;
    const sections = gsap.utils.toArray<HTMLElement>('.hzPanel');

    // ✅ Properly sum the offsetWidths of all sections
    const totalWidth = sections.reduce(
      (acc, section) => acc + section.offsetWidth,
      0,
    );

    console.log('Sections:', sections, 'Total Width:', totalWidth);

    // ✅ Create the horizontal scroll animation
    const scrollTween = gsap.to(horizontal, {
      x: () => -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: `top top+=${sections[0].offsetHeight}`,
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: true,
        onUpdate: (self) => {
          if (self.progress === 0) gsap.set(horizontal, { x: 0 });
        },
      },
    });

    // ✅ Fade out scroll hint (optional)
    if (scrollHintRef.current) {
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        scrollTrigger: {
          start: 'top top',
          end: '+=300',
          scrub: true,
        },
      });
    }

    // ✅ Refresh ScrollTrigger after layout settles
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Box component={'section'} className={`${styles.section}`} ref={aboutRef}>
        <Image
          src={'/things.png'}
          alt="about bg"
          width={1920}
          height={1080}
          className={styles.aboutBg}
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        <Container>
          <Grid container>
            <Grid
              alignItems={'center'}
              justifyContent={'center'}
              size={12}
              container
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: 200,
                  lineHeight: 0.8,
                }}
              >
                THINGS WE'VE <br />
                CRAFTED
              </Typography>
              <GlassElement
                sx={{
                  paddingX: 10,
                  paddingY: 5,
                  // marginTop: -12,
                }}
              >
                A collection of projects that blend strategy, storytelling, and
                design. Each crafted with intention to shape digital experiences
                that inspire and engage.
              </GlassElement>
            </Grid>
          </Grid>
        </Container>

        <div className={styles.horizontalSection} ref={sectionRef}>
          <div className={styles.stickyWrapper}>
            <div className={styles.horizontalScroll} ref={horizontalRef}>
              <div className={`${styles.panel} hzPanel`}>
                <Image
                  src={'/card1.png'}
                  alt="cardImage"
                  width={1284}
                  height={854}
                  className={styles.image}
                />
              </div>
              <div className={`${styles.panel} hzPanel`}>
                <Image
                  src={'/card2.png'}
                  alt="cardImage"
                  width={1284}
                  height={854}
                  className={styles.image}
                />
              </div>
              <div className={`${styles.panel} hzPanel`}>
                <Image
                  src={'/card3.png'}
                  alt="cardImage"
                  width={1284}
                  height={854}
                  className={styles.image}
                />
              </div>
              <div className={`${styles.panel} hzPanel`}>
                <Image
                  src={'/card1.png'}
                  alt="cardImage"
                  width={1284}
                  height={854}
                  className={styles.image}
                />
              </div>
              <div className={`${styles.panel} hzPanel`}>
                <Image
                  src={'/card2.png'}
                  alt="cardImage"
                  width={1284}
                  height={854}
                  className={styles.image}
                />
              </div>
              <div className={`${styles.panel} hzPanel`}>
                <Image
                  src={'/card3.png'}
                  alt="cardImage"
                  width={1284}
                  height={854}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Things;
