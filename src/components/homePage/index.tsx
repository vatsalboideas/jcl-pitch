import React from 'react';
import Home from './home';
import About from './about';
import Design from './design';
import Things from './things';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <Home />
      <About />
      <Things />
    </>
  );
};

export default HomePage;
