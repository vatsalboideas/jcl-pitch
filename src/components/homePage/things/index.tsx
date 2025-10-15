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
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const [overlayVars, setOverlayVars] = useState<React.CSSProperties>({});
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // Fade in animation on load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => {
      clearTimeout(timer);
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

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    if (opening) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setOverlayVars({
      // CSS variables consumed by .blob
      ['--x' as any]: `${x}px`,
      ['--y' as any]: `${y}px`,
      ['--w' as any]: `${Math.max(120, rect.width)}px`,
      ['--h' as any]: `${Math.max(80, rect.height)}px`,
    });
    setOpening(true);

    window.setTimeout(() => {
      router.push('/nmacc');
    }, 650);
  };

  return (
    <>
      <Box
        component={'section'}
        className={`${styles.section} ${
          isLoaded ? styles.fadeIn : styles.fadeOut
        }`}
        ref={aboutRef}
      >
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

        <div
          className={styles.openOverlay}
          data-animate={opening ? 'true' : 'false'}
          aria-hidden
        >
          <div className="blob" style={overlayVars} />
        </div>
      </Box>
    </>
  );
};

export default Things;
