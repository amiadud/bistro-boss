import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import useCarts from '../../../hooks/useCarts';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom/dist';
import Swal from 'sweetalert2';

const CheckoutForm = () => {

    const [Error, setError] = useState('')
    const [ClientSecret, setClientSecret] = useState('')
    const [TransactionId, setTransactionId] = useState('')
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxios();
    const { user } = useAuth();
    const [ cart, refetch ]= useCarts();
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

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(ClientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError) {
            console.log('confirm error', confirmError);
        }
        else{
            console.log('Payment Intent',paymentIntent);
            if(paymentIntent.status === 'succeeded') {
                console.log('transaction id:', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // now save the transaction info to database
                const payment = {
                    email: user?.email,
                    price: TotalPrice,
                    TransactionId: paymentIntent.id,
                    date: new Date(), // use utc timestamp
                    cartId: cart.map( item => item._id ),
                    menuId: cart.map( item => item.menuId),
                    status: 'pending'

                }
                const res = await axiosSecure.post('/payments', payment)
                console.log("Payment saved", res.data);
                refetch();
                if(res.data?.paymentResult.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/paymenthistory')
                }

            }
               
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
                {TransactionId && <p>Your Transaction Id: {TransactionId}</p>}
            </form>
            
        </div>
    );
};

export default CheckoutForm;