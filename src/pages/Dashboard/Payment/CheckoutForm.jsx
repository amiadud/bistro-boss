import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import useCarts from '../../../hooks/useCarts';

const CheckoutForm = () => {

    const [Error, setError] = useState('')
    const [ClientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxios();
    const [ cart ]= useCarts();
    const TotalPrice = cart.reduce((total, item)=> total + item.price ,0)

    useEffect(() => {
        if (TotalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: TotalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
            })
        }

    }, [ axiosSecure, TotalPrice])

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log('[error]', error);
            setError(error)

          } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
          }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <CardElement>
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
                </CardElement>
                <button className='btn btn-sm btn-primary m-4' type='submit' disabled={!stripe || !ClientSecret }>Pay</button>
                <p className='text-red-500'>{Error.message}</p>
            </form>
            
        </div>
    );
};

export default CheckoutForm;