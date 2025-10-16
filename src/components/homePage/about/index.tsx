'use client';
import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styles from './about.module.scss';
import GlassElement from '@/src/ui/glassElement';
import Image from 'next/image';

type Props = {};

const About = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <Box
        component={'section'}
        className={`${styles.section} ${
          isLoaded ? styles.fadeIn : styles.fadeOut
        }`}
        ref={aboutRef}
      >
        <div
          className={styles.bgBox}
          // style={{
          //   transform: `translateY(${scrollY * 0.12}px)`,
          // }}
        >
          <Image
            src={'/about.png'}
            alt="about bg"
            width={1920}
            height={1080}
            className={`${styles.aboutBg} fade-in-up`}
          />
        </div>
        <Container>
          <Grid container alignItems={'center'} justifyContent={'center'}>
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
                }}
                style={{
                  transform: `translateY(-${scrollY * 0.01}px)`,
                }}
              >
                ABOUT
              </Typography>
              <GlassElement
                sx={{
                  paddingX: 10,
                  paddingY: 20,
                  marginTop: -12,
                }}
                style={{
                  transform: `translateY(-${scrollY * 0.04}px)`,
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Ultrices tincidunt nibh
                varius at. Purus vulputate et pellentesque at a odio tempor ut.
                Sed vestibulum tortor gravida consequat. Neque tincidunt tempus
                sed congue posuere mattis.Netus ut massa ut adipiscing
                hendrerit. Habitasse vel pellentesque turpis lorem mauris aenean
                ultricies diam tellus.
              </GlassElement>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default About;
