import { ProjectData } from '@/src/types/project';

export const projects: ProjectData[] = [
  {
    id: 'brewHouse',
    title: 'Brew House',
    scrollCard: '/card1.png',
    hero: {
      image: '/brew-house/hero.png',
      gradientColors: {
        top: 'linear-gradient(180deg, #4A2E2D 0%, rgba(74, 46, 45, 0) 100%)',

        bottom:
          'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
      },
    },
    description: {
      title: 'DESCRIPTION',
      content:
        'This project is digital extension of Brew House’s rebrand, a product website that celebrates the ritual of brewing authentic filter coffee while maintaining the brand’s refreshed, contemporary identity.',
      backgroundImage: '/details1.png',
    },
    making: {
      title: 'MAKING',
      content:
        'We translated the new brand language into an immersive digital experience, highlighting the decoction’s story, brewing process, and cultural roots through warm visuals and thoughtful interaction design.',
      images: [
        '/brew-house/card1.png',
        '/brew-house/card2.png',
        '/brew-house/card3.png',
      ],
    },
    mockup: {
      title: 'MOCKUP',
      backgroundImage1: '/mokup1.png',
      backgroundImage2: '/mokup2.png',
      mockupImage: '/brew-house/mokup.png',
      bodyImage: '/brew-house/body.png',
    },
  },
  {
    id: 'nmacc',
    title: 'NMACC India Weekend',
    scrollCard: '/card2.png',
    hero: {
      image: '/namcc.png',
      gradientColors: {
        top: 'linear-gradient(180deg,hsla(323, 100%, 43%, 0.50) 0%,rgba(255, 255, 255, 0)100%)',
        bottom:
          'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
      },
    },
    description: {
      title: 'DESCRIPTION',
      content:
        'Lorem ipsum dolor sit amet consectetur. Ultrices tincidunt nibh varius at. Purus vulputate et pellentesque at a odio tempor ut. Sed vestibulum tortor gravida consequat. Neque tincidunt tempus sed congue posuere mattis.',
      backgroundImage: '/details1.png',
    },
    making: {
      title: 'MAKING',
      content:
        'For the NMACC India Weekend in New York City, we designed and developed a dynamic website that evolved from the announcement phase to the final show day. Our process began with analysing each act and curating the content hierarchy to highlight what mattered most to visitors. We prioritised user flow and clarity, structured the data to give equal importance to every performance, and continuously refined the interface to keep the experience fresh and intuitive — ensuring the event reached full bookings seamlessly.',
      images: ['/making1.png', '/making2.png', '/making3.png'],
    },
    mockup: {
      title: 'MOCKUP',
      backgroundImage1: '/mokup1.png',
      backgroundImage2: '/mokup2.png',
      mockupImage: '/nmacc-mokup.png',
      bodyImage: '/nmacc-body.png',
    },
  },

  {
    id: 'jcl',
    title: 'Jio Creative Labs',
    scrollCard: '/card3.png',
    hero: {
      image: '/jcl/hero.png',
    },
    description: {
      title: 'DESCRIPTION',
      content:
        'Lorem ipsum dolor sit amet consectetur. Ultrices tincidunt nibh varius at. Purus vulputate et pellentesque at a odio tempor ut. Sed vestibulum tortor gravida consequat. Neque tincidunt tempus sed congue posuere mattis. ',
      backgroundImage: '/details1.png',
    },
    making: {
      title: 'MAKING',
      content:
        'For the NMACC India Weekend in New York City, we designed and developed a dynamic website that evolved from the announcement phase to the final show day. Our process began with analysing each act and curating the content hierarchy to highlight what mattered most to visitors. We prioritised user flow and clarity, structured the data to give equal importance to every performance, and continuously refined the interface to keep the experience fresh and intuitive — ensuring the event reached full bookings seamlessly.',
      images: ['/jcl/card1.png', '/jcl/card2.png', '/jcl/card3.png'],
    },
    mockup: {
      title: 'MOCKUP',
      backgroundImage1: '/mokup1.png',
      backgroundImage2: '/mokup2.png',
      mockupImage: '/jcl/mokup.png',
      bodyImage: '/jcl/body.png',
    },
  },
];

export const getProjectById = (id: string): ProjectData | undefined => {
  return projects.find((project) => project.id === id);
};
