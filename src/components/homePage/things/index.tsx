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
import Link from 'next/link';
import { projects } from '@/src/data/projects';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

type Props = {};

const Things = (props: Props) => {
  const horizontalRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollHintRef = useRef(null);
  // Removed fade-in state
  const [scrollY, setScrollY] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   const horizontal = horizontalRef.current;
  //   const sections = gsap.utils.toArray<HTMLElement>('.hzPanel');

  //   // ✅ Properly sum the offsetWidths of all sections
  //   const totalWidth = sections.reduce(
  //     (acc, section) => acc + section.offsetWidth,
  //     0,
  //   );

  //   console.log('Sections:', sections, 'Total Width:', totalWidth);

  //   // ✅ Create the horizontal scroll animation
  //   const scrollTween = gsap.to(horizontal, {
  //     x: () => -totalWidth,
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: `top top+=${sections[0].offsetHeight}`,
  //       end: () => `+=${totalWidth}`,
  //       scrub: 1,
  //       pin: true,
  //       anticipatePin: 1,
  //       invalidateOnRefresh: true,
  //       markers: true,
  //       onUpdate: (self) => {
  //         if (self.progress === 0) gsap.set(horizontal, { x: 0 });
  //       },
  //     },
  //   });

  //   // ✅ Fade out scroll hint (optional)
  //   if (scrollHintRef.current) {
  //     gsap.to(scrollHintRef.current, {
  //       opacity: 0,
  //       scrollTrigger: {
  //         start: 'top top',
  //         end: '+=300',
  //         scrub: true,
  //       },
  //     });
  //   }

  //   // ✅ Refresh ScrollTrigger after layout settles
  //   const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

  //   return () => {
  //     clearTimeout(timer);
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const horizontal = horizontalRef.current;
    const sections = gsap.utils.toArray<HTMLElement>('.hzPanel');

    const totalWidth = sections.reduce(
      (acc, section) => acc + section.offsetWidth,
      0,
    );

    // console.log('Sections:', sections, 'Total Width:', totalWidth);

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
        // markers: true,
        onUpdate: (self) => {
          if (self.progress === 0) gsap.set(horizontal, { x: 0 });

          // ✅ Calculate which card is in the center
          const viewportCenter = window.innerWidth / 2;
          let cumulativeX = 0;

          sections.forEach((section) => {
            const sectionWidth = section.offsetWidth;
            const sectionStart = cumulativeX;
            const sectionEnd = cumulativeX + sectionWidth;
            const sectionCenter = sectionStart + sectionWidth / 1.1;

            // Calculate the current x position based on scroll progress
            const currentX = -self.progress * totalWidth;

            // Check if section center is near viewport center
            const sectionCenterOnScreen = sectionCenter + currentX;
            const distanceFromCenter = Math.abs(
              sectionCenterOnScreen - viewportCenter,
            );

            // Add/remove class based on proximity to center (adjust threshold as needed)
            if (distanceFromCenter < sectionWidth / 2) {
              section.classList.add(styles.isCentered);
            } else {
              section.classList.remove(styles.isCentered);
            }

            cumulativeX += sectionWidth;
          });
        },
      },
    });

    // Pin the heading/text container to the top while horizontal section scrolls
    const PIN_OFFSET = 0; // px from top while pinned
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: 'top-=100px top',
      end: () => `+=${totalWidth}`,
      pin: textRef.current as HTMLElement | null,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // markers: true,
      onToggle: (self) => {
        if (textRef.current) {
          gsap.set(textRef.current, { y: self.isActive ? PIN_OFFSET : 0 });
        }
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

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
        <Container className={styles.textBox} ref={textRef}>
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
                style={{
                  transform: `translateY(-${scrollY * 0.01}px)`,
                }}
              >
                THINGS WE'VE <br />
                CRAFTED
              </Typography>
              <GlassElement
                sx={{
                  paddingX: 10,
                  paddingY: 5,
                  marginTop: -4,
                }}
                style={{
                  transform: `translateY(-${scrollY * 0.02}px)`,
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
              {projects.map((project, index) => (
                <Link key={project.id} href={`/${project.id}`}>
                  <div
                    className={`${styles.panel} hzPanel ${
                      index === 0 ? styles.isCentered : ''
                    }`}
                  >
                    <Image
                      src={project.scrollCard}
                      alt={`${project.title} card`}
                      width={1284}
                      height={854}
                      className={styles.image}
                    />
                  </div>
                </Link>
              ))}
              {/* Duplicate projects for seamless scrolling */}
              {projects.map((project, index) => (
                <Link key={`${project.id}-dup`} href={`/${project.id}`}>
                  <div className={`${styles.panel} hzPanel`}>
                    <Image
                      src={project.scrollCard}
                      alt={`${project.title} card`}
                      width={1284}
                      height={854}
                      className={styles.image}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Things;
