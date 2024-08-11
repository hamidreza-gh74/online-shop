"use client";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlices";
import { getblurdataurl, numberFormat } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const handdleAddToCart = (product) => {
    // qty is amount of product
    dispatch(removeFromCart(product.id));
    dispatch(addToCart({ product, qty: 1 }));
    toast.success("با موفقیت به سبد خرید اضافه شد");
  };
  return (
    <div className="box">
      <div>
        <div className="img-box">
          <Image
            className="img-fluid"
            src={product.primary_image}
            width="100"
            height="65"
            sizes="100vw"
            alt=""
            style={{
              width: "100%",
              height: "auto",
            }}
            placeholder="blur"
            blurDataURL={getblurdataurl()}
          />
        </div>
        <div className="detail-box">
          <h5>
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h5>
          <p>{product.description} </p>
          <div className="options">
            <h6>
              {product.is_sale ? (
                <>
                  <span>{numberFormat(product.sale_price)}</span>
                  <del className="me-1">{numberFormat(product.price)}</del>
                </>
              ) : (
                <span>{numberFormat(product.price)}</span>
              )}

              <span>تومان</span>
            </h6>
            <button onClick={() => handdleAddToCart(product)}>
              <i className="bi bi-cart-fill text-white fs-5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
