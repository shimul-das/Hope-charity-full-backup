import React from 'react';
import Header from './Header/Header';
import Charities from './Charities/Charities';
import Events from './Events/Events';
import Quick_Access from './Quick Access/Quick_Access';
import HelpUs from './HelpUs/HelpUs';
import AboutUs from './AboutUs/About';
import OurWork from './OurWork/OurWork';
import Reviews from './Reviews/Reviews';


const Home = () => {
  return (
    <div>
      <Header />
      <Charities />
      <Events />
      <Quick_Access />
      <HelpUs />
      <AboutUs />
      <OurWork />
      <Reviews/>
    </div>
  );
};

export default Home;