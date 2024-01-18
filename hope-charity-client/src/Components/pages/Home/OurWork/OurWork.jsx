import React from 'react';
import ourWorks01 from '../../../../assets/ourWorks01.png';
import ourWorks02 from '../../../../assets/ourWorks02.png';
import ourWorks03 from '../../../../assets/ourWorks03.png';
import ourWorks04 from '../../../../assets/ourWorks04.png';
import ourWorks05 from '../../../../assets/ourWorks05.png';
import ourWorks06 from '../../../../assets/ourWorks06.png';
import ourWorks07 from '../../../../assets/ourWorks07.png';
import ourWorks08 from '../../../../assets/ourWorks08.png';
import ourWorks09 from '../../../../assets/ourWorks09.png';
import ourWorks10 from '../../../../assets/ourWorks10.png';
import ourWorks11 from '../../../../assets/ourWorks11.png';
import bannerImg4 from "../../../../assets/banner-img-4.jpeg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OurWork = () => {
  return (
    <div className="my-container">
      <h1 className="text-center text-5xl font-extrabold tracking-[4px] mb-6">
        Our <span className='text-primary'>Work</span>
      </h1>
      <p className="text-center text-gray-600 text-xl font-semibold tracking-wide">
        Click on any photo to learn more
      </p>

      <section className="text-gray-600 body-font">
        <div className="container px-5 pt-24 pb-4 mx-auto flex flex-wrap">
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks01}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks03}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks02}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks05}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks04}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks06}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto flex flex-wrap">
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks08}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks10}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={bannerImg4}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks11}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks07}
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <LazyLoadImage
                  alt="gallery"
                  effect="blur"
                  className="object-cover h-full object-center block"
                  src={ourWorks09}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWork;