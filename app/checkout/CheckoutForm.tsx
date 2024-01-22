"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatePrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/products/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

export default function CheckoutForm({
  clientSecret,
  handleSetPaymentSuccess,
}: CheckoutFormProps) {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formatedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");
          // if the payment success we will clear cart and make the payment intent = null as it becomes succes
          handleSetPaymentSuccess(true);
          handleClearCart();
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>
      <h2 className="font-semibold mb-2 ">Address Information</h2>
      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["US", "KE"] }}
      />
      <h2 className="font-semibold mt-4 mb-2 ">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 text-2xl font-bold">
        Total:{formatedPrice}
      </div>
      <Button
        label={isLoading ? "Processing" : "Pay now "}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
}
