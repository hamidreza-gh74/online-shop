"use client";
import { create } from "@/Action/ContactAction";
import SubmitButton from "@/componenets/SubmitButton";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function Form() {
  const [state, formAction] = useFormState(create, {});
  useEffect(() => {
    // two ways are ok
    // first
    toast(state?.message, `${state?.status}`);
    // second
    // if (state?.status === "error") {
    //   toast.error(state.message);
    // } else {
    //   toast.success(state.message);
    // }
  }, [state]);
  return (
    <div className="form_container">
      <form action={formAction}>
        <div>
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="نام و نام خانوادگی"
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="ایمیل"
          />
        </div>
        <div>
          <input
            name="subject"
            type="text"
            className="form-control"
            placeholder="موضوع پیام"
          />
        </div>
        <div>
          <textarea
            name="text"
            rows="10"
            style={{ height: "100px" }}
            className="form-control"
            placeholder="متن پیام"
          ></textarea>
        </div>
        <div className="btn_box">
          <SubmitButton title={"ارسال پیام"} />
        </div>
      </form>
    </div>
  );
}
