'use client';
import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './detailPage.module.scss';
import Image from 'next/image';
import GlassElement from '@/src/ui/glassElement';
import Link from 'next/link';
import { ProjectData } from '@/src/types/project';

type Props = {
  project: ProjectData;
};

const DetailPage = ({ project }: Props) => {
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
            background: project.hero.gradientColors
              ? project.hero.gradientColors.top
              : 'transparent',
          }}
        ></div>
        <div
        // style={{
        //   transform: `translateY(${scrollY * 0.08}px)`,
        // }}
        >
          <Image
            src={project.hero.image}
            alt={`${project.title}-hero-image`}
            width={3840}
            height={2468}
            className={styles.heroImage}
          />
        </div>
        <div
          className={styles.bottomGradient}
          style={{
            transform: 'none !important',
            background: project.hero.gradientColors
              ? project.hero.gradientColors.bottom
              : 'transparent',
          }}
        ></div>
      </div>
      <div className={styles.bodyTextData}>
        <Image
          src={project.description.backgroundImage}
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
              <Typography
                variant="h2"
                sx={{ fontSize: 120, marginLeft: 3 }}
                style={{
                  transform: `translateY(-${scrollY * 0.04}px)`,
                }}
              >
                {project.description.title}
              </Typography>
              <GlassElement
                style={{
                  transform: `translateY(-${scrollY * 0.05}px)`,
                }}
                sx={{
                  marginTop: -7,
                  zIndex: 2,
                  position: 'relative',
                  paddingX: 2,
                  paddingY: 5,
                }}
              >
                {project.description.content}
              </GlassElement>
            </Grid>
            <Grid
              container
              alignItems={'center'}
              justifyContent={'flex-end'}
              columnSpacing={3}
            >
              <Grid
                size={4}
                container
                alignItems={'center'}
                justifyContent={'center'}
                rowGap={2}
                sx={{ marginTop: 4 }}
              >
                {project.making.images.map((image, index) => (
                  <Grid
                    key={index}
                    size={12}
                    container
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Image
                      src={image}
                      alt={`making image ${index + 1}`}
                      width={398}
                      height={224}
                      className={styles.makingImage}
                    />
                  </Grid>
                ))}
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
                    style={{
                      transform: `translateY(-${scrollY * 0.04}px)`,
                    }}
                  >
                    {project.making.title}
                  </Typography>
                  <GlassElement
                    style={{
                      transform: `translateY(-${scrollY * 0.05}px)`,
                    }}
                    sx={{
                      marginTop: -7,
                      zIndex: 2,
                      position: 'relative',
                      paddingX: 5,
                      paddingY: 8,
                    }}
                  >
                    {project.making.content}
                  </GlassElement>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={styles.mokup}>
        <Image
          src={project.mockup.backgroundImage1}
          alt="mokupbg"
          width={3147}
          height={4140}
          className={styles.bgimage1}
          style={{
            transform: `translateY(${scrollY * 0.04}px)`,
          }}
        />
        <Container>
          <Typography
            variant="h2"
            sx={{ fontSize: 120 }}
            style={{
              transform: `translateY(-${scrollY * 0.04}px)`,
            }}
          >
            {project.mockup.title}
          </Typography>
          <GlassElement
            sx={{ marginTop: -6 }}
            style={{
              transform: `translateY(-${scrollY * 0.05}px)`,
            }}
          >
            <div className={styles.glassElement}>
              <Image
                src={project.mockup.mockupImage}
                alt={`${project.title}-mockup`}
                height={2666}
                width={4000}
                className={styles.mockupImage}
              />
              <Image
                src={project.mockup.bodyImage}
                alt={`${project.title}-body`}
                height={4424}
                width={2280}
                className={styles.bodyImage}
              />
            </div>
          </GlassElement>
        </Container>
        <Image
          src={project.mockup.backgroundImage2}
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
