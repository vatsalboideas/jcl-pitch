'use client';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import localFont from 'next/font/local';
import GlassElement from '@/src/ui/glassElement';
import styles from './home.module.scss';

const myFont = localFont({
  src: '../../../../public/fonts/New_Science_SemiBold.otf',
});

type Props = {};

const Home = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in animation on load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

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

  return (
    <>
      <Box
        component={'section'}
        className={`${styles.mainElement} ${
          isLoaded ? styles.fadeIn : styles.fadeOut
        }`}
        ref={homeRef}
      >
        <Image
          src={'/home-bg.png'}
          alt="homebg"
          width={1920}
          height={1080}
          className={styles.bgImage}
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />
        <Grid
          container
          alignItems={'center'}
          justifyContent={'center'}
          rowGap={10}
          size={12}
        >
          <Grid
            size={12}
            alignItems={'center'}
            justifyContent={'center'}
            container
          >
            <Image
              src={'/jcl-logo.svg'}
              alt="jcl-logo"
              height={200}
              width={200}
            />
          </Grid>

          <Box component={'div'} className={styles.bgImageBox}>
            <Image
              src={'/left.png'}
              alt="left.png"
              height={196}
              width={1284}
              className={styles.leftImage}
              style={{
                transform: `translateY(${scrollY * -0.1}px)`,
              }}
            />
            <GlassElement
              sx={{
                paddingX: 6,
                paddingY: 2,
                zIndex: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: myFont.style.fontFamily,
                  fontSize: 91,
                  textAlign: 'center',
                }}
              >
                SHAPING
              </Typography>
              <Typography
                sx={{
                  fontFamily: myFont.style.fontFamily,
                  fontSize: 48,
                  textAlign: 'center',
                  marginTop: -3,
                }}
              >
                TOMORROW'S INTERACTIONS
              </Typography>
            </GlassElement>
            <Image
              src={'/right.png'}
              alt="right.png"
              height={256}
              width={2450}
              className={styles.rightImage}
              style={{
                transform: `translateY(${scrollY * -0.08}px)`,
              }}
            />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
