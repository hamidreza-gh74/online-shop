import { checkCopoun } from "@/Action/cart";
import SubmitButton from "../SubmitButton";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function Copoun({ setcoupon }) {
  const [state, formAction] = useFormState(checkCopoun, {});
  useEffect(() => {
    toast(state?.message, { type: `${state?.status}` });
    if (state?.status == "success") {
      setcoupon({
        code: state.code,
        percent: state.percent,
      });
    }
  }, [state]);
  return (
    <form action={formAction} className="col-12 col-md-6">
      <div className="input-group mb-3">
        <input
          name="code"
          type="text"
          className="form-control"
          placeholder="کد تخفیف"
        />

        <SubmitButton title={" اعمال کد تخفیف"} style={"input-group-text"} />
      </div>
    </form>
  );
}
