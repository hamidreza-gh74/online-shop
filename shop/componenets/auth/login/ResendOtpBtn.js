"use client";
import { resendOtp } from "@/Action/authAction";
import SubmitButton from "@/componenets/SubmitButton";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function ResendOtpBtn() {
  const [stateresendOtp, formActionresendOtp] = useFormState(resendOtp, {});
  const [minutes, setminutes] = useState(0);
  const [seconds, setseconds] = useState(15);

  useEffect(() => {
    toast(stateresendOtp?.message, `${stateresendOtp?.status}`);
    if (stateresendOtp?.status === "success") {
        setminutes(0)
        setseconds(15)

    }
  }, [stateresendOtp]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setseconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setseconds(59);
          setminutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <form action={formActionresendOtp}>
      <div className="resend-opt-btn">
        {seconds > 0 || minutes > 0 ? (
          <div className="mb-1 me-3">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
        ) : (
          <SubmitButton title="ارسال دوباره" style={"btn btn-dark"} />
        )}
      </div>
    </form>
  );
}
