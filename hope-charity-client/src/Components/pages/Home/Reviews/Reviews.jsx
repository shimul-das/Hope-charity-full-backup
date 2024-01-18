import { FaAngleLeft, FaAngleRight, FaCheckCircle } from "react-icons/fa";
import review1 from "../../../../assets/review1.png";
import review2 from "../../../../assets/review2.png";
import review3 from "../../../../assets/review3.png";

const Reviews = () => {
  return (
    <>
      <div className="my-container">
        <h1 className="text-center text-5xl font-extrabold tracking-[4px] mb-16">
          Hear From Our <br /> Regular
          <span className="text-primary ml-2">Donators</span>
        </h1>
        <div className="grid md:grid-cols-3 gap-12">
          {/* card 1 */}
          <div className=" rounded-lg bg-slate-100 shadow-xl">
            <div className="p-10 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full w-16 h-16 border border-primary"
                    src={review1}
                    alt=""
                  />
                  <div className="">
                    <h3 className="font-bold from-black">
                      Md. Rajibul Palas
                      <FaCheckCircle className="inline-block ml-2 text-blue-600"></FaCheckCircle>
                    </h3>
                    <p className="text-sm">24-04-2023</p>
                  </div>
                </div>
              </div>
              <p>
                The donation system is better than anything I've ever seen.
                Probably the best place to donate worry free and help out
                others. They provide all the things I need to donate in one
                place and it is amazing.
              </p>
            </div>
          </div>
          {/* card 2 */}
          <div className=" rounded-lg bg-slate-100 shadow-xl">
            <div className="p-10 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full w-16 h-16 border border-primary"
                    src={review2}
                    alt=""
                  />
                  <div className="">
                    <h3 className="font-bold from-black">
                      Akram Hossain
                      <FaCheckCircle className="inline-block ml-2 text-blue-600"></FaCheckCircle>
                    </h3>
                    <p className="text-sm">24-04-2023</p>
                  </div>
                </div>
              </div>
              <p>
                This donation system is top-notch! It's the best place to
                contribute without any worries, making it so easy to help
                others. They provide everything I need in one convenient spot,
                and it's simply amazing
              </p>
            </div>
          </div>
          {/* card 3 */}
          <div className=" rounded-lg bg-slate-100 shadow-xl">
            <div className="p-10 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full w-16 h-16 border border-primary"
                    src={review3}
                    alt=""
                  />
                  <div className="">
                    <h3 className="font-bold from-black">
                      Anderson carbonara
                      <FaCheckCircle className="inline-block ml-2 text-blue-600"></FaCheckCircle>
                    </h3>
                    <p className="text-sm">24-04-2023</p>
                  </div>
                </div>
              </div>
              <p>
                This donation system is a game-changer! It's the absolute best
                way to give back and support those in need without any stress.
                With all the tools and resources in one place, it's truly
                exceptional!
              </p>
            </div>
          </div>
        </div>
        <div className="text-center font-bold text-4xl mt-4 mb-10">
          <FaAngleLeft className="inline-block cursor-pointer text-[#F65900]"></FaAngleLeft>{" "}
          <FaAngleRight className="inline-block cursor-pointer text-[#F65900]"></FaAngleRight>
        </div>
      </div>
    </>
  );
};

export default Reviews;
