import React, { useContext, useState } from "react";
import { CardElement, useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useForm, useWatch, } from "react-hook-form";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from 'sweetalert2';

const DonateNow = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [donationAmount, setDonationAmount] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFields, setShowFields] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false); // New state for showing PaymentForm
  const [data, setData] = useState({});

  const { user } = useContext(AuthContext);

  const toggleFields = () => {
    setShowFields(!showFields);
  };

  const generateRandomName = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `Guest${randomNumber}`;
  };

  const handleDonateButtonClick = async (e, data) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe or Elements not yet available
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card element is null");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      // Handle payment method creation error
      return;
    }

    const responseIntent = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: data.selectedAmount }), // Use the amount from form data
    });

    const { clientSecret } = await responseIntent.json();

    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (paymentError) {
      console.error(paymentError);
      // Handle payment confirmation error
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      const transactionId = paymentIntent.id;

      // Save donation data
      const donationData = {
        selectedAmount: data.selectedAmount,
        selectedCategory: data.selectedCategory,
        email: data.email || user.email,
        name: data.name || user.displayName,
        message: data.message,
        transactionId: transactionId,
        // Add other fields as needed
      };

      try {
        console.log("shimul")
        const response = await axios.post('http://localhost:5000/save-donation', donationData);

        if (response.status === 200) {
          // Donation data saved successfully
          Swal.fire({
            icon: 'success',
            title: 'Donation Saved!',
            text: 'Thank you for your donation.',
            text: `Your Transaction ID: ${transactionId}`,
          });
        } else {
          // Handle unsuccessful donation data save
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to save donation details',
          });
        }
      } catch (error) {
        console.error(error);
        // Handle error during donation data save
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to save donation details',
        });
      }
    } else {
      // Payment was not successful
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed!',
        text: 'Payment was not successful. Please try again.',
      });
    }
  };



  const onSubmit = async (data) => {
    console.log(data);
    if (!data.selectedAmount) {
      data.selectedAmount = parseInt(donationAmount || data.customAmount);
    }
    if (!data.selectedCategory) {
      data.selectedCategory = selectedCategory;
    }

    if (!data.selectedAmount && data.customAmount) {
      data.selectedAmount = parseInt(data.customAmount);
    }
    setData(data);
    setShowPaymentForm(true);
    console.log(data);
  };

  const handleCustomAmountChange = (e) => {
    setDonationAmount(e.target.value);
  };


  return (
    <div className="relative my-3 flex flex-col justify-center min-h-screen overflow-hidden">
      {!showPaymentForm && (<div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring  ring-primary lg:max-w-4xl">
        <h1 className="text-5xl font-semibold text-center text-primary uppercase mb-12">
          Donate Now
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div>
            {/* Donation Amount */}
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Donation Amount
              </label>
              <div className="flex space-x-4">
                <button type="button"
                  className={`px-4 py-2 text-white bg-primary rounded-md focus:outline-none ${donationAmount === 100 ? "bg-red-700" : ""
                    }`}
                  onClick={() => setDonationAmount(100)}
                >
                  $100
                </button>
                <button type="button"
                  className={`px-4 py-2 text-white bg-primary rounded-md focus:outline-none ${donationAmount === 200 ? "bg-red-700" : ""
                    }`}
                  onClick={() => setDonationAmount(200)}
                >
                  $200
                </button>
                <button type="button"
                  className={`px-4 py-2 text-white bg-primary rounded-md focus:outline-none ${donationAmount === 1500 ? "bg-red-700" : ""
                    }`}
                  onClick={() => setDonationAmount(1500)}
                >
                  $1500
                </button>
              </div>
            </div>

            {/* Other Amount */}
            <div className="mb-4">
              <label
                htmlFor="other amount"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Other Amount
              </label>
              <input
                type="number"
                onChange={handleCustomAmountChange}
                {...register("customAmount")}
                className="block px-4 py-2 text-primary bg-white border rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 text-xl font-semibold tracking-wider"
              />
            </div>

            {/* category */}
            {/* ... (existing category buttons) */}

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Category
              </label>
              <div className="flex space-x-4">
                <button type="button"
                  className={`px-4 py-2 text-white bg-primary rounded-md focus:outline-none ${selectedCategory === "Poor Pregnancy" ? "bg-red-700" : ""
                    }`}
                  onClick={() => setSelectedCategory("Poor Pregnancy")}
                >
                  Poor Pregnancy
                </button>
                <button type="button"
                  className={`px-4 py-2 text-white bg-primary rounded-md focus:outline-none ${selectedCategory === "Elder Homes" ? "bg-red-700" : ""
                    }`}
                  onClick={() => setSelectedCategory("Elder Homes")}
                >
                  Elder Homes
                </button>
                <button type="button"
                  className={`px-4 py-2 text-white bg-primary rounded-md focus:outline-none ${selectedCategory === "Homeless Children" ? "bg-red-700" : ""
                    }`}
                  onClick={() => setSelectedCategory("Homeless Children")}
                >
                  Homeless Children
                </button>
                <button type="button"
                  className={`px-4 py-2 text-white bg-primary rounded-md focus:outline-none ${selectedCategory === "Natural Disasters" ? "bg-red-700" : ""
                    }`}
                  onClick={() => setSelectedCategory("Natural Disasters")}
                >
                  Natural Disasters
                </button>
                <button
                  className={`px-4 py-2 text-white bg-primary rounded-md focus:outline-none ${selectedCategory === "Self Donate" ? "bg-red-700" : ""
                    }`}
                  onClick={() => setSelectedCategory("Self Donate")}
                >
                  Self Donate
                </button>
              </div>
            </div>
            {/* Checkbox */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Show Email and Name Fields
              </label>
              <input
                type="checkbox"
                onChange={toggleFields}
                className="mr-2"
              />
              <span>Click to show Email and Name fields</span>
            </div>

            {/* Email and Name Fields */}
            {showFields && (
              <div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    defaultValue={user?.email || "Not Available"}
                    className="block px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 text-xl font-semibold tracking-wider"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    defaultValue={user?.displayName || generateRandomName()}
                    className="block px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 text-xl font-semibold tracking-wider"
                  />
                </div>
              </div>
            )}

            {/* Message */}
            <div className="mb-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-800"
              >
                Message
              </label>
              <textarea
                {...register("message")}
                className="block w-full px-4 py-2 mt-2 text-primary bg-white border rounded-md focus:border-primary focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40 text-xl font-semibold tracking-wider"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="Submit"
              className="px-24 py-2 tracking-wide text-white bg-secondary rounded-md focus:outline-none focus:bg-secondary hover:bg-blue-700 hover:text-white hover:border-0 transition duration-500 ease-in-out transform hover:scale-95"
            >
              Donate
            </button>
          </div>

          {/* Add these hidden inputs */}
          <input
            type="hidden"
            {...register("selectedAmount", { value: donationAmount })}
          />
          <input
            type="hidden"
            {...register("selectedCategory", { value: selectedCategory })}
          />
        </form>
      </div>)}

      {showPaymentForm && (
        <div>
          <h2 className="text-2xl text-center mb-4 font-bold">Input Your Card Details</h2>
          <div className="w-[40%] mx-auto bg-slate-800 p-10">
            <h2>Input Your Card Details</h2>
            <form onSubmit={onSubmit}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />

              <div className="flex justify-center items-cente"><button
                type="submit"
                onClick={(e) => handleDonateButtonClick(e, data)}
                disabled={!stripe}
                className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirm Payment
              </button></div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateNow;
