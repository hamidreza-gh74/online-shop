"use client";

import { addToCart, removeFromCart } from "@/redux/slices/cartSlices";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function ShoppingCart({ product }) {
  const [quantity, setquantity] = useState(1);
  const dispatch = useDispatch();
  const handdleAddToCart = () => {
    // qty is amount of product
    dispatch(removeFromCart(product.id));
    dispatch(addToCart({ product, qty: quantity }));
    toast.success("با موفقیت به سبد خرید اضافه شد");
  };
  return (
    <div className="mt-5 d-flex">
      <button className="btn-add" onClick={()=>handdleAddToCart()}>افزودن به سبد خرید</button>
      <div className="input-counter ms-4">
        <span
          className="plus-btn"
          onClick={() =>
            quantity < product.quantity && setquantity((prev) => prev + 1)
          }
        >
          +
        </span>
        <div className="input-number">{quantity}</div>
        <span
          className="minus-btn"
          onClick={() => quantity > 1 && setquantity((prev) => prev - 1)}
        >
          -
        </span>
      </div>
    </div>
  );
}
