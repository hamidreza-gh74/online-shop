"use client";
import { CheckOtp } from "@/Action/authAction";
import SubmitButton from "@/componenets/SubmitButton";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import ResendOtpBtn from "./ResendOtpBtn";
import { useRouter } from "next/navigation";

export default function CheckOtpForm() {
  const [stateOtp, formActionOtp] = useFormState(CheckOtp, {});
  const { LoginContext } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    toast(stateOtp?.message, `${stateOtp?.status}`);
    if (stateOtp?.status === "success") {
      LoginContext(stateOtp.data);
      router.push('/')
    }
  }, [stateOtp]);
  return (
    <div className="card-body">
      <div className="form_container">
        <form action={formActionOtp}>
          <div className="mb-3">
            <label className="form-label"> کد ورود</label>
            <input name="otp" type="text" className="form-control" />
          </div>

          <SubmitButton title={"تایید"} style="btn btn-primary btn-auth" />
        </form>
        <ResendOtpBtn />
      </div>
    </div>
  );
}
