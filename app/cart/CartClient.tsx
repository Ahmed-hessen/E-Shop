"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/products/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatePrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

export default function CartClient({ currentUser }: CartClientProps) {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your Cart Is Empty</div>
        <div>
          <Link
            href="/"
            className=" flex items-center justify-center gap-1 mt-5 text-slate-500 "
          >
            <MdOutlineArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-sm font-medium gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCTS</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="flex justify-between gap-4 border-t-[1.5px] border-slate-200 py-4">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            onClick={() => {
              handleClearCart();
            }}
            small
            outline
          />
        </div>
        <div className="text-sm flex flex-col gap-2 items-start">
          <div className="flex justify-between w-full  text-base font-semibold gap-5">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and Shiping calculated at checkout
          </p>
          <Button
            label={currentUser ? "Checkout" : "Login To Checkout "}
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
          />
          <Link
            href="/"
            className=" flex items-center justify-center gap-1 mt-5 text-slate-500 "
          >
            <MdOutlineArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
