import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import bannerImg1 from '../../../../assets/banner-img-1.png';
import bannerImg2 from '../../../../assets/banner-img-2.jpeg';
import bannerImg3 from '../../../../assets/banner-img-3.jpeg';
import bannerImg4 from '../../../../assets/banner-img-4.jpeg';

const Header = () => {
  return (
    <div className="h-screen px-4 py-6">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={false}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide className="px-20">
          <div className="grid grid-cols-5">
            <div className="col-span-3 w-ful relative">
              <div className="mr-20">
                <h1 className="text-5xl font-bold tracking-[3px]">
                  Donate for <br /> great causes.
                </h1>
                <p className="text-xl tracking-wide text-justify font-semibold my-6">
                  Every mother deserves the best possible start for their child,
                  but not every pregnancy journey is easy. Many expectant
                  mothers from underprivileged backgrounds face immense
                  challenges that impact both their health and the health of
                  their unborn babies. Donate for those needy mothers and their
                  unborn babies.
                </p>
                <button className="my-btn">Donate Now</button>
              </div>
              <div className="bg-primary h-28 absolute bottom-0 left-0 right-0">
                <div className="ml-20 mt-4">
                  <h2 className="text-xl font-semibold tracking-wider">
                    Raised so far
                  </h2>
                  <h1 className="text-4xl tracking-[2px] text-justify font-extrabold text-[#002147]">
                    ৳ 825,300
                  </h1>
                </div>
              </div>
            </div>

            <div className="w-full col-span-2 h-[520px]">
              <img
                className="w-full rounded-br-[60px]"
                src={bannerImg1}
                alt="banner-image"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="px-20">
          <div className="grid grid-cols-5">
            <div className="col-span-3 w-ful relative">
              <div className="mr-20">
                <h1 className="text-5xl font-bold tracking-[3px]">
                  Empower Mothers for a Healthy Pregnancy!
                </h1>
                <p className="text-xl tracking-wide text-justify font-semibold my-6">
                  There are many great causes to donate to, and your donation
                  can make a real difference. Whether you're interested in
                  helping children, animals, the environment, or any other
                  cause, there's a charity that needs your help.
                </p>
                <button className="my-btn">Donate Now</button>
              </div>
              <div className="bg-primary h-28 absolute bottom-0 left-0 right-0">
                <div className="ml-20 mt-4">
                  <h2 className="text-xl font-semibold tracking-wider">
                    Raised so far
                  </h2>
                  <h1 className="text-4xl tracking-[2px] text-justify font-extrabold text-[#002147]">
                    ৳ 825,300
                  </h1>
                </div>
              </div>
            </div>

            <div className="w-full col-span-2 h-[520px]">
              <img
                className="w-full rounded-br-[60px]"
                src={bannerImg2}
                alt="banner-image"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="px-20">
          <div className="grid grid-cols-5">
            <div className="col-span-3 w-ful relative">
              <div className="mr-20">
                <h1 className="text-4xl font-bold tracking-[3px]">
                  Help Homeless <br />
                  Children Today!
                </h1>
                <p className="text-lg tracking-wide text-justify font-semibold my-6">
                  Natural disasters can strike without warning, leaving
                  destruction, devastation, and heartache in their wake. Whether
                  it's a hurricane, earthquake, flood, wildfire, or any other
                  catastrophe, the impact on communities and individuals is
                  profound. Thousands lose their homes, belongings, and
                  sometimes even their loved ones. Stand with us in solidarity
                  and make a difference in the lives of those who need it most.
                </p>
                <button className="my-btn">Donate Now</button>
              </div>
              <div className="bg-primary h-28 absolute bottom-0 left-0 right-0">
                <div className="ml-20 mt-4">
                  <h2 className="text-xl font-semibold tracking-wider">
                    Raised so far
                  </h2>
                  <h1 className="text-4xl tracking-[2px] text-justify font-extrabold text-[#002147]">
                    ৳ 825,300
                  </h1>
                </div>
              </div>
            </div>

            <div className="w-full col-span-2 h-[520px]">
              <img
                className="w-full rounded-br-[60px]"
                src={bannerImg3}
                alt="banner-image"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="px-20">
          <div className="grid grid-cols-5">
            <div className="col-span-3 w-ful relative">
              <div className="mr-20">
                <h1 className="text-5xl font-bold tracking-[3px] mb-10">
                  Support Victims of <br /> Natural Disasters.
                </h1>
                <p className="text-xl tracking-wide text-justify font-semibold my-6">
                  There are many great causes to donate to, and your donation
                  can make a real difference. Whether you're interested in
                  helping children, animals, the environment, or any other
                  cause, there's a charity that needs your help.
                </p>
                <button className="my-btn">Donate Now</button>
              </div>
              <div className="bg-primary h-28 absolute bottom-0 left-0 right-0">
                <div className="ml-20 mt-4">
                  <h2 className="text-xl font-semibold tracking-wider">
                    Raised so far
                  </h2>
                  <h1 className="text-4xl tracking-[2px] text-justify font-extrabold text-[#002147]">
                    ৳ 825,300
                  </h1>
                </div>
              </div>
            </div>

            <div className="w-full col-span-2 h-[520px]">
              <img
                className="w-full rounded-br-[60px]"
                src={bannerImg4}
                alt="banner-image"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Header;
