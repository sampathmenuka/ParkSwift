import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../pages/Payment";


const PUBLIC_KEY = "pk_test_51RUVAGRoamrofanbzte2rTVthvEyirLV7pSKQTt6t2VBXPlEbP3vsbmG32fnfHYb6QZE1Q4k73CBkdWwXSuaMsbk00L4tfY7Vu";

const stripePromise = loadStripe(PUBLIC_KEY);


const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  )
}

export default StripeContainer