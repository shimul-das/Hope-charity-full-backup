import React from 'react';
import "./Quick_Access.css";
import share from './assets/Share.png';
import volunteer from './assets/Favorite_duotone.png';
import note from './assets/Image.png';
import logo from './assets/logo.png';
import events from './assets/events.png';

const Quick_Access = () => {
  return (
    <section className='mt-10 mb-16'>
      <h1 className="text-center text-5xl font-extrabold tracking-[4px] mb-12">
        Quick <span className="text-primary">Access</span>
      </h1>
      <div class="quick-container">
        <div class="A bg-[#002147]">
          <div className="text-center">
            <div className="flex justify-center items-center">
              <img src={share} alt="" />
            </div>
            <h3 className="text-2xl font-bold text-[#FF5757]">Share</h3>
          </div>
        </div>
        <div class="B bg-[#002147]">
          <div className="text-center">
            <div className="flex justify-center items-center">
              <img src={note} alt="" />
            </div>
            <h3 className="text-2xl font-bold text-[#FF5757]">
              Current Events
            </h3>
          </div>
        </div>
        <div class="C bg-[#002147]">
          <div className="text-center">
            <div className="flex justify-center items-center">
              <img src={volunteer} alt="" />
            </div>
            <h3 className="text-2xl font-bold text-[#FF5757]">Volunteer</h3>
          </div>
        </div>
        <div class="D bg-[#002147] flex justify-center items-center">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-[#FF5757]">Donate</h3>
          </div>
        </div>
        <div class="E bg-[#002147] flex justify-center items-center">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-[#FF5757]">Reviews</h3>
          </div>
        </div>

        <div class="F bg-[#002147]">
          <div className="text-center">
            <div className="flex justify-center items-center pt-5">
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
        <div class="G bg-[#002147] flex justify-center items-center">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-[#FF5757]">Newsletter</h3>
          </div>
        </div>
        <div class="H bg-[#002147] flex justify-center items-center">
          <div class="w-30 p-5">
            <div class="flex justify-center items-center h-full">
              <h3 class="text-2xl font-bold text-[#FF5757]">Events</h3>
            </div>
          </div>
          <div className="w-70">
            <div className="flex  w-full h-full">
              <img
                src={events}
                alt=""
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quick_Access;
