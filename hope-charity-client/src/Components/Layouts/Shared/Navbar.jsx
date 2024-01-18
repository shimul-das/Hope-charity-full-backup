// import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { Link, NavLink } from "react-router-dom";
// import logo from "../../../assets/Hope Charity logo.png";
// import { AuthContext } from "../../../Providers/AuthProvider";
// import useAdmin from "../../../hooks/useAdmin";
// import useStudent from "../../../hooks/useStudent";



// const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showDashboard, setShowDashboard] = useState(false);

//   const handleDashboardToggle = () => {
//     setShowDashboard(!showDashboard);
//   };

//   const [isAdmin] = useAdmin();
//   console.log(isAdmin)
//   const [isStudent] = useStudent();
//   console.log(isStudent)


//   return (
//     <div>
//       <nav id="navbar" className="text-lg pt-2 pb-3  mx-auto  w-full">
//         <div>
//           <div className="relative  flex items-center justify-between px-4 lg:px-16 mx-auto   ">
//             <div className="flex items-center gap-4 ">
//               {/*Website logo */}
//               <Link to="/">
//                 <img
//                   className="h-[70px] w-[140px]"
//                   src={logo}
//                   alt="fliqaIndiaLogo"
//                 />
//               </Link>
//             </div>

//             <ul className="items-center text-black text-ellipsis hidden space-x-8 lg:flex">
//               <li>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     isActive ? "active" : "default"
//                   }
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about-us"
//                   className={({ isActive }) =>
//                     isActive ? "active" : "default"
//                   }
//                 >
//                   About Us
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/events"
//                   className={({ isActive }) =>
//                     isActive ? "active" : "default"
//                   }
//                 >
//                   Events
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/charities"
//                   className={({ isActive }) =>
//                     isActive ? "active" : "default"
//                   }
//                 >
//                   Charities
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/our-work"
//                   className={({ isActive }) =>
//                     isActive ? "active" : "default"
//                   }
//                 >
//                   Our Work
//                 </NavLink>
//               </li>
//               <li>
//                 {user ? (
//                   <div className="flex items-center">
//                     <img
//                       className="h-8 w-8 rounded-full cursor-pointer"
//                       src={user.photoURL}
//                       alt={user.name}
//                       onClick={handleDashboardToggle}
//                     />
//                     <span className="ml-2">{user.name}</span>
//                     {showDashboard && (
//                       <div>
//                         <button onClick={logOut}>Logout</button>
//                         {/* <Link to="/dashboard">
//                           <button>Dashboard</button>
//                         </Link> */}
//                         {isAdmin && (
//                           <Link
//                             to="/dashboard/adminhome"
//                             className="block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-400  hover:bg-gray-700"
//                           >
//                             Dashboard
//                           </Link>
//                         )}
//                         {isStudent && (
//                           <Link
//                             to="/dashboard/userhome"
//                             className="block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-400   hover:bg-gray-700"
//                           >
//                             Dashboard
//                           </Link>
//                         )} 
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link to="/login">
//                     <button className="my-btn">Login</button>
//                   </Link>
//                 )}
//               </li>
//               <li>
//                 <Link to="/payment">
//                   <button className="my-btn">Donate Now</button>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Hope Charity logo.png";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useStudent from "../../../hooks/useStudent";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleDashboardToggle = () => {
    setShowDashboard(!showDashboard);
  };

  const [isAdmin] = useAdmin();
  const [isStudent] = useStudent();

  return (
    <div>
      <nav id="navbar" className="text-lg pt-2 pb-3 mx-auto w-full">
        <div>
          <div className="relative flex items-center justify-between px-4 lg:px-16 mx-auto">
            <div className="flex items-center gap-4">
              <Link to="/">
                <img
                  className="h-[70px] w-[140px]"
                  src={logo}
                  alt="fliqaIndiaLogo"
                />
              </Link>
            </div>

            <ul className="items-center text-black text-ellipsis hidden space-x-8 lg:flex">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "default")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive ? "active" : "default"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    isActive ? "active" : "default"
                  }
                >
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/charities"
                  className={({ isActive }) =>
                    isActive ? "active" : "default"
                  }
                >
                  Charities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/our-work"
                  className={({ isActive }) =>
                    isActive ? "active" : "default"
                  }
                >
                  Our Work
                </NavLink>
              </li>
              <li>
                {user ? (
                  <div className="flex items-center relative">
                    <img
                      className="h-8 w-8 rounded-full cursor-pointer"
                      src={user.photoURL}
                      alt={user.name}
                      onClick={handleDashboardToggle}
                    />
                    {/* <div
                      className={`absolute right-0 top-full bg-white mt-2 p-2 rounded-md shadow-md ${showDashboard ? "block" : "hidden"
                        }`}
                    >
                      <button className="block relative px-3 py-2 rounded-md text-base font-medium text-white bg-emerald-600 hover:bg-gray-700 mb-2" onClick={logOut}>Logout</button>
                      {isAdmin && (
                        <Link
                          to="/dashboard/adminhome"
                          className="block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-400 hover:bg-gray-700"
                        >
                          Dashboard
                        </Link>
                      )}
                      {isStudent && (
                        <Link
                          to="/dashboard/userhome"
                          className=" block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-400 hover:bg-gray-700"
                        >
                          Dashboard
                        </Link>
                      )}
                    </div> */}
                    <div
                      className={`absolute right-0 top-full bg-white mt-2 p-2 rounded-md shadow-md z-50 ${showDashboard ? "block" : "hidden"}`}
                    >
                      <button className="block relative px-3 py-2 rounded-md text-base font-medium text-white bg-emerald-600 hover:bg-gray-700 mb-2" onClick={logOut}>Logout</button>
                      {isAdmin && (
                        <Link
                          to="/dashboard/adminhome"
                          className="block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-400 hover:bg-gray-700"
                        >
                          Dashboard
                        </Link>
                      )}
                      {isStudent && (
                        <Link
                          to="/dashboard/userhome"
                          className=" block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-400 hover:bg-gray-700"
                        >
                          Dashboard
                        </Link>
                      )}
                    </div>

                  </div>
                ) : (
                  <Link to="/login">
                    <button className="my-btn">Login</button>
                  </Link>
                )}
              </li>
              <li>
                <Link to="/payment">
                  <button className="my-btn">Donate Now</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
