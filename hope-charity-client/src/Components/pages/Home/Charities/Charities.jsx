import React from 'react';
import charitiesImg1 from '../../../../assets/charitiesImg1.png';
import charitiesImg2 from '../../../../assets/charitiesImg2.png';
import charitiesImg3 from '../../../../assets/charitiesImg3.png';
import charitiesImg4 from '../../../../assets/charitiesImg4.png';

const Charities = () => {
  return (
    <div className="my-container">
      <h1 className="text-center text-5xl font-extrabold tracking-[4px] mb-10">
        Charities
      </h1>
      <p className="text-center text-gray-600 text-xl font-semibold tracking-wide">
        We provide information about a variety of charities, including their
        mission, programs, and impact. We also make it easy to donate to your
        favorite charities. If you are looking for a way to make a difference in
        the world, we encourage you to browse different options below and decide
        yourself where you want to donate.
      </p>
      <section className="grid grid-cols-4 gap-14 mt-20">
        <div>
          <img className="w-full" src={charitiesImg1} alt="charities-img" />
          <div className="mt-2 flex justify-center">
            <div>
              <p className="text-xl font-bold tracking-wider text-center mb-4">
                Poor <br /> Pregnancy
              </p>
              <button className="py-1 px-4 text-sm bg-transparent rounded-lg tracking-wider text-secondary font-extrabold hover:bg-primary hover:text-white border-2 hover:border-0 border-gray-500 transition duration-500 ease-in-out transform ">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div>
          <img className="w-full" src={charitiesImg2} alt="charities-img" />
          <div className="mt-2 flex justify-center">
            <div>
              <p className="text-xl font-bold tracking-wider text-center mb-4">
                Elder
                <br />
                Homes
              </p>
              <button className="py-1 px-4 text-sm bg-transparent rounded-lg tracking-wider text-secondary font-extrabold hover:bg-primary hover:text-white border-2 hover:border-0 border-gray-500 transition duration-500 ease-in-out transform ">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div>
          <img className="w-full" src={charitiesImg3} alt="charities-img" />
          <div className="mt-2 flex justify-center">
            <div>
              <p className="text-xl font-bold tracking-wider text-center mb-4">
                Homeless
                <br />
                Children
              </p>
              <button className="py-1 px-4 text-sm bg-transparent rounded-lg tracking-wider text-secondary font-extrabold hover:bg-primary hover:text-white border-2 hover:border-0 border-gray-500 transition duration-500 ease-in-out transform ">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div>
          <img className="w-full" src={charitiesImg4} alt="charities-img" />
          <div className="mt-2 flex justify-center">
            <div>
              <p className="text-xl font-bold tracking-wider text-center mb-4">
                Natural
                <br />
                Disasters
              </p>
              <button className="py-1 px-4 text-sm bg-transparent rounded-lg tracking-wider text-secondary font-extrabold hover:bg-primary hover:text-white border-2 hover:border-0 border-gray-500 transition duration-500 ease-in-out transform ">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Charities;