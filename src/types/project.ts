export interface ProjectData {
  id: string;
  title: string;
  scrollCard: string;
  hero: {
    image: string;
    gradientColors?: {
      top: string;
      bottom: string;
    };
  };
  description: {
    title: string;
    content: string;
    backgroundImage: string;
  };
  making: {
    title: string;
    content: string;
    images: string[];
  };
  mockup: {
    title: string;
    backgroundImage1: string;
    backgroundImage2: string;
    mockupImage: string;
    bodyImage: string;
  };
}
