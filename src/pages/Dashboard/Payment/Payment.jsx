import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {

    const stripePromies = loadStripe('pk_test_51OEqHBIgkYh3kN7GkgvM0awg4hrcNWnS94OsHnSfyIQCg4G9jsb1ChaXCSXvdKbdQQUoy3DXI1piBnBVefNuVo7100rasrSYdV')
    return (
        <div>
            <SectionTitle heading={'Payment'} subHeading={'Please pay to Eat'}/>
            <h2 className="text-3xl">Taka aso</h2>

            <div>
                <Elements stripe={stripePromies}>
                    <CheckoutForm/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;