import { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from 'sweetalert2'
import { AuthContext } from '../../../Providers/AuthProvider';
import SocialLogin from '../../Shared/SocialLogin';
import logo from "../../../assets/Hope charity.png";

const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInputType, setPasswordInputType] = useState("password");

    const from = location.state?.from?.pathname || "/";

    const  onSubmit  = (data) => {
        console.log(data.email, data.password);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(error=>{
                setError(error)
            })
    }

    
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setPasswordInputType((prevInputType) =>
      prevInputType === "password" ? "text" : "password"
    );
  };

  const PasswordIcon = showPassword ? AiFillEyeInvisible : AiFillEye;


    return (
      <>
        <Helmet>
          <title> Hope charity | Login</title>
        </Helmet>

        <section className="grid grid-cols-2 justify-center items-center">
          <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring  ring-primary lg:max-w-xl">
              <h1 className="text-3xl font-semibold text-center text-primary underline uppercase decoration-wavy">
                Login
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={passwordInputType}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      })}
                      className="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <PasswordIcon
                      size={20}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password must be less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one Uppercase one lower case, one
                      number and one special character.
                    </p>
                  )}
                </div>
                <a href="#" className="text-xs text-orange-600 hover:underline">
                  Forget Password?
                </a>
                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white bg-primary rounded-md focus:outline-none focus:bg-red-600 hover:bg-red-800 hover:text-white hover:border-0 transition duration-500 ease-in-out transform hover:scale-95">
                    Login
                  </button>
                </div>
              </form>
              {error && <p className="text-red-600">{error.message}</p>}

              <p className="mt-8 text-xs font-light text-center text-gray-700">
                {" "}
                Don't Have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-orange-600 hover:underline"
                >
                  signup
                </Link>
              </p>
              <SocialLogin></SocialLogin>
            </div>
          </div>
          <div>
            <img src={logo} alt="logo-img" />
          </div>
        </section>
      </>
    );
};

export default Login;