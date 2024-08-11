"use client";
import { getAddresses } from "@/Action/cart";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Address({ setaddressID }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      const data = await getAddresses();
      setAddresses(data);
      setLoading(false);
    };
    fetchAddress();
  },[]);

  if (loading) {
    return <div className="spinner-border spinner-border-sm ms-2"></div>;
  }

  if (addresses.length == 0) {
    return (
      <Link href="/profile/addresses" className="btn btn-primary">
        ایجاد آدرس
      </Link>
    );
  }
  return (
    <>
      <div>انتخاب آدرس</div>
      <select
        style={{ width: "200px" }}
        className="form-select ms-3"
        aria-label="Default select example"
        onChange={(e) => setaddressID(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          {" "}
          انتخاب آدرس{" "}
        </option>
        {addresses?.map((add) => {
          return (
            <option key={add.id} value={add.id} >
              {add.title}
            </option>
          );
        })}
      </select>
    </>
  );
}
