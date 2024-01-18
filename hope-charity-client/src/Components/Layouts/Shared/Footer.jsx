import React from "react";

const Footer = () => {
  return (
    <div className=" bg-gray-800 text-white">
      <footer className=" py-4 lg:py-12 px-8 lg:px-40 lg:flex justify-between items-center">
        <div className="grid  lg:grid-cols-4 justify-between items-center gap-x-[6rem] lg:gap-x-[12rem]">
          <div className="mt-6 col-span-2">
            <p className="font-bold font-serif tracking-wider ">Our Address</p>{" "}
            <br />
            <p>Level-4, 39, Awal Centre, Banani, Dhaka, Bangladesh</p>
            <p>Support: hope@charity.com</p>
            <p>Helpline: (+880) 17-600173 , (+880) 17-206301</p>
            <p>Available : sun - Sat, 10:00 AM to 9:00 PM</p>
          </div>

          <div className="mt-6">
            <p className="font-bold font-serif tracking-wider ">Useful Links</p>
            <br />
            <a className="link link-hover">Newsletter</a>
            <br />
            <a className="link link-hover">About Us</a>
            <br />
            <a className="link link-hover">Our Work</a> <br />
            <a className="link link-hover">Terms and Conditions</a>
            <br />
          </div>

          <div className="mt-6">
            <p className="font-bold font-serif tracking-wider ">Social</p>
            <br />
            <a className="link link-hover">Youtube</a> <br />
            <a className="link link-hover">Facebook</a> <br />
            <a className="link link-hover">Instagram</a> <br />
            <a className="link link-hover">Twitter</a>
          </div>
        </div>
      </footer>
      <div className="py-6 text-sm text-center text-white tracking-widest">
        © 2023 Hope charity Inc. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
