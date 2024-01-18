
// import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaUtensils, FaBook, FaUsers, FaAtlas, FaOdnoklassniki, FaBookOpen, FaDollarSign } from 'react-icons/fa';
// import { useContext } from "react";
// import useAdmin from "../../../hooks/useAdmin";
// import useStudent from "../../../hooks/useStudent";
// import { AuthContext } from "../../../Providers/AuthProvider";

// const Dashboard = () => {
//     const [isAdmin] = useAdmin();
//     const [isStudent] = useStudent();
//     const navigate = useNavigate();

//     const { user, logOut } = useContext(AuthContext);
//     const handleLogOut = () => {
//         logOut()
//             .then(() => {
//                 navigate('/')
//             })
//             .catch(error => console.log(error));
//     };

//     return (
//         <div className="drawer drawer-mobile ">
//             <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content">
//                 <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
//                     Open drawer
//                 </label>
//                 <Outlet></Outlet>
//             </div>
//             <div className="drawer-side bg-[#7E22CE]">
//                 <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
//                 <ul className="menu p-4 w-80 text-[#F79256]">
//                 <div className="rounded-full overflow-hidden mx-auto w-32 h-32">
//                     <img src={user.photoURL} alt="Image" className="w-full h-full object-cover" />
//                 </div>
//                 <div className="text-center">
//                 <p className="text-lg text-[white] mt-4">{user.displayName}</p>
//                 <p className="text-base text-[white]">{user.email}</p>
//                 <hr className="m-2"></hr>
//                 </div>
//                     {isAdmin ? (
//                         <>
//                             <li>
//                                 <NavLink to="/dashboard/adminhome">
//                                     <FaHome></FaHome> Admin Home
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/dashboard/manageclasses">
//                                     <FaBook></FaBook> Manage Classes
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/dashboard/allusers">
//                                     <FaUsers></FaUsers> All Users
//                                 </NavLink>
//                             </li>
//                         </>
//                     ) : isStudent ? (
//                         <>
//                             <li>
//                                 <NavLink to="/dashboard/userhome">
//                                     <FaHome></FaHome> Student Home
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/dashboard/myselectedclass">
//                                     <FaCalendarAlt></FaCalendarAlt> My Selected Class
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/dashboard/myenrolledclass">
//                                     <FaWallet></FaWallet>My Enrolled Class
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/dashboard/paymenthistory">
//                                     <FaDollarSign></FaDollarSign>Payment History
//                                 </NavLink>
//                             </li>
//                         </>
//                     )  : (
//                         <>
//                             {/* Default menu items for other roles */}
//                         </>
//                     )}
//                     <div className="divider"></div>
//                     <li>
//                         <NavLink to="/">
//                             <FaHome></FaHome> Home
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/instructors">
//                             <FaOdnoklassniki></FaOdnoklassniki> Instructors
//                         </NavLink>
//                     </li>

//                     <li>
//                         <NavLink to="/approvedclass">
//                             <FaBookOpen></FaBookOpen> Classes
//                         </NavLink>
//                     </li>
//                     <li>
//                         <button className="btn bg-[#278066]" onClick={handleLogOut}>Logout</button>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaUtensils, FaBook, FaUsers, FaAtlas, FaOdnoklassniki, FaBookOpen, FaDollarSign, FaSignOutAlt, FaEvernote } from 'react-icons/fa';
import { useContext } from "react";
import useAdmin from "../../../hooks/useAdmin";
import useStudent from "../../../hooks/useStudent";
import { AuthContext } from "../../../Providers/AuthProvider";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isStudent] = useStudent();
    const navigate = useNavigate();

    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="flex">
            <div className="bg-[#7E22CE] text-white w-80 h-[100vh] p-4">
                <div className="text-center mb-4">
                    <div className="rounded-full overflow-hidden mx-auto w-32 h-32">
                        <img src={user.photoURL} alt="Image" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-lg mt-4">{user.displayName}</p>
                    <p className="text-base">{user.email}</p>
                    <hr className="my-2" />
                </div>
                <ul className="menu">
                    {isAdmin ? (
                        <>
                            <li className="flex items-center mb-2">
                                <NavLink className="flex items-center" to="/dashboard/adminhome">
                                    <FaHome className="mr-2" /> Admin Home
                                </NavLink>
                            </li>
                            <li className="flex items-center mb-2">
                                <NavLink className="flex items-center" to="/dashboard/allusers">
                                    <FaUsers className="mr-2" /> All Users
                                </NavLink>
                            </li>
                            <li className="flex items-center mb-2">
                                <NavLink className="flex items-center" to="/dashboard/adminpaymenthistory">
                                <FaDollarSign className="mr-2" /> Payment History
                                </NavLink>
                            </li>
                            {/* <li className="flex items-center mb-2">
                                <NavLink className="flex items-center" to="/dashboard/adminallusers">
                                    <FaHome className="mr-2" /> All Users
                                </NavLink>
                            </li> */}
                            <li className="flex items-center mb-2">
                                <NavLink className="flex items-center" to="/dashboard/addevent">
                                    <FaEvernote className="mr-2" /> Add Event
                                </NavLink>
                            </li>
                            <li className="flex items-center mb-2">
                                <NavLink className="flex items-center" to="/dashboard/adminallevents">
                                    <FaBook className="mr-2" /> All Events
                                </NavLink>
                            </li>
                        </>
                    ) : isStudent ? (
                        <>
                            <li className="flex items-center mb-2">
                                <NavLink className="flex items-center" to="/dashboard/userhome">
                                    <FaHome className="mr-2" /> User Home
                                </NavLink>
                            </li>
                            <li className="flex items-center mb-2">
                                <NavLink className="flex items-center" to="/dashboard/userjoinedevents">
                                    <FaCalendarAlt className="mr-2" /> Your Joined Events
                                </NavLink>
                            </li>
                            <li className="flex items-center mb-2">
                                <NavLink className="flex items-center" to="/dashboard/userpaymenthistory">
                                    <FaDollarSign className="mr-2" /> User Payment History
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* Default menu items for other roles */}
                        </>
                    )}
                    <hr className="my-2" />
                    <li className="flex items-center mb-2">
                        <NavLink className="flex items-center" to="/">
                            <FaHome className="mr-2" /> Home
                        </NavLink>
                    </li>
                    <li className="flex items-center mb-2">
                        <button className="btn flex items-center px-5 py-3 rounded-lg hover:bg-lime-600 bg-[#278066]" onClick={handleLogOut}>
                            <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex-grow p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

