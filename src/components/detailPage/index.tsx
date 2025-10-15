'use client';
import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './detailPage.module.scss';
import Image from 'next/image';
import GlassElement from '@/src/ui/glassElement';
import Link from 'next/link';

type Props = {};

const DetailPage = (props: Props) => {
  const [scrollY, setScrollY] = useState(0);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than 100px
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll animation
    });
  };

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
    <Box className={styles.container}>
      <Link href={'/'}>
        <button className={styles.backButton}>
          <Image
            src={'/back-button.svg'}
            alt="back-button"
            height={30}
            width={30}
          />
        </button>
      </Link>
      <div className={styles.imageBox}>
        <div
          className={styles.topGradient}
          style={{
            transform: 'none !important',
          }}
        ></div>
        <div
        // style={{
        //   transform: `translateY(${scrollY * 0.08}px)`,
        // }}
        >
          <Image
            src={'/namcc.png'}
            alt="namcc-first-frame"
            width={3840}
            height={2468}
            className={styles.heroImage}
          />
        </div>
        <div
          className={styles.bottomGradient}
          style={{
            transform: 'none !important',
          }}
        ></div>
      </div>
      <div className={styles.bodyTextData}>
        <Image
          src={'/details1.png'}
          alt="bg"
          width={1864}
          height={3326}
          className={styles.bgImage}
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
          }}
        />
        <Container>
          <Grid container rowGap={20}>
            <Grid container size={9}>
              <Typography variant="h2" sx={{ fontSize: 120, marginLeft: 3 }}>
                DESCRIPTION
              </Typography>
              <GlassElement
                sx={{
                  marginTop: -7,
                  zIndex: 2,
                  position: 'relative',
                  paddingX: 2,
                  paddingY: 5,
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Ultrices tincidunt nibh
                varius at. Purus vulputate et pellentesque at a odio tempor ut.
                Sed vestibulum tortor gravida consequat. Neque tincidunt tempus
                sed congue posuere mattis.
              </GlassElement>
            </Grid>
            <Grid container justifyContent={'flex-end'} columnSpacing={3}>
              <Grid
                size={4}
                container
                alignItems={'center'}
                justifyContent={'center'}
                rowGap={2}
                sx={{ marginTop: 4 }}
              >
                <Grid
                  size={12}
                  container
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Image
                    src={'/making1.png'}
                    alt="makingimage 1 "
                    width={398}
                    height={224}
                    className={styles.makingImage}
                  />
                </Grid>
                <Grid
                  container
                  size={12}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Image
                    src={'/making2.png'}
                    alt="makingimage 1 "
                    width={398}
                    height={224}
                    className={styles.makingImage}
                  />
                </Grid>
                <Grid
                  container
                  size={12}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Image
                    src={'/making3.png'}
                    alt="makingimage 1 "
                    width={398}
                    height={224}
                    className={styles.makingImage}
                  />
                </Grid>
              </Grid>
              <Grid
                size={8}
                container
                alignItems={'flex-start'}
                justifyContent={'flex-end'}
                sx={{ paddingTop: 5 }}
              >
                <Grid
                  container
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                >
                  <Typography
                    variant="h2"
                    sx={{ fontSize: 120, marginRight: 5 }}
                  >
                    MAKING
                  </Typography>
                  <GlassElement
                    sx={{
                      marginTop: -7,
                      zIndex: 2,
                      position: 'relative',
                      paddingX: 5,
                      paddingY: 8,
                    }}
                  >
                    For the NMACC India Weekend in New York City, we designed
                    and developed a dynamic website that evolved from the
                    announcement phase to the final show day. Our process began
                    with analysing each act and curating the content hierarchy
                    to highlight what mattered most to visitors. We prioritised
                    user flow and clarity, structured the data to give equal
                    importance to every performance, and continuously refined
                    the interface to keep the experience fresh and intuitive —
                    ensuring the event reached full bookings seamlessly.
                  </GlassElement>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={styles.mokup}>
        <Image
          src={'/mokup1.png'}
          alt="mokupbg"
          width={3147}
          height={4140}
          className={styles.bgimage1}
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        />
        <Container>
          <Typography variant="h2" sx={{ fontSize: 120 }}>
            MOCKUP
          </Typography>
          <GlassElement sx={{ marginTop: -6 }}>
            <div className={styles.glassElement}>
              <Image
                src={'/nmacc-mokup.png'}
                alt="nmacc-mokup"
                height={2666}
                width={4000}
                className={styles.mockupImage}
              />
              <Image
                src={'/nmacc-body.png'}
                alt="nmacc-body"
                height={4424}
                width={2280}
                className={styles.bodyImage}
              />
            </div>
          </GlassElement>
        </Container>
        <Image
          src={'/mokup2.png'}
          alt="mokupbg"
          width={3840}
          height={5682}
          className={styles.bgimage2}
          style={{
            transform: `translateY(${scrollY * -0.04}px)`,
          }}
        />
      </div>
      {showButton && (
        <button className={styles.upButton} onClick={scrollToTop}>
          <Image
            src={'/back-button.svg'}
            alt="back-button"
            height={30}
            width={30}
          />
        </button>
      )}
    </Box>
  );
};

export default DetailPage;
