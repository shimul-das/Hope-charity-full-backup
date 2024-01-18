import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonateNow from './DonateNow';

const stripePromise = loadStripe('pk_test_51NFKkyCpN9cKlS27sbJvD1MIyZpW0lAR8Yu84qWdtRIBLJEsdXonxiBSz38GcD2NMlAe89VhRaAzgGPi2MiCQGxO00BJFLoBlZ');

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <DonateNow />
      </div>
    </Elements>
  );
};

export default Payment;