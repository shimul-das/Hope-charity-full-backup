import React from "react";
import HelpUs01 from "../../../../assets/HelpUs01.png";
import HelpUs02 from "../../../../assets/HelpUs02.png";
import HelpUs03 from "../../../../assets/HelpUs03.png";

const HelpUs = () => {
  return (
    <div className="my-container">
      <h1 className="text-center text-5xl font-extrabold tracking-[4px] mb-10">
        Want to <span className="text-primary">help</span> us?
      </h1>
      <p className="text-center text-gray-600 text-xl font-semibold tracking-wide">
        There are countless ways you can help us. You can make a donation
        (however big or small), join our fundraiser events, or volunteer as one
        of us and help by working directly with us. Sometimes the best thing you
        can donate is your time.
      </p>
      <section className="grid grid-cols-3 mt-16">
        <div>
          <img className="w-full" src={HelpUs01} alt="help-us-img" />
          <div className="mt-2 flex justify-center">
            <div className="mt-6">
              <button className="py-2 px-4 text-sm bg-secondary rounded-lg tracking-wider text-white font-extrabold hover:bg-primary hover:text-white border-0 hover:border-0 border-gray-500 transition duration-500 ease-in-out transform ">
                Donate
              </button>
            </div>
          </div>
        </div>
        <div>
          <img className="w-full" src={HelpUs02} alt="help-us-img" />
          <div className="mt-2 flex justify-center">
            <div className="mt-6">
              <button className="py-2 px-4 text-sm bg-secondary rounded-lg tracking-wider text-white font-extrabold hover:bg-primary hover:text-white border-0 hover:border-0 border-gray-500 transition duration-500 ease-in-out transform ">
                Join
              </button>
            </div>
          </div>
        </div>
        <div>
          <img className="w-full" src={HelpUs03} alt="help-us-img" />
          <div className="mt-2 flex justify-center">
            <div className="mt-6">
              <button className="py-2 px-4 text-sm bg-secondary rounded-lg tracking-wider text-white font-extrabold hover:bg-primary hover:text-white border-0 hover:border-0 border-gray-500 transition duration-500 ease-in-out transform ">
                Volunteer
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpUs;
