import { DeleteAddress } from "@/Action/profile";
import SubmitButton from "@/componenets/SubmitButton";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function DeletForm({ adressId }) {
  const [stateDelete, formActionDelete] = useFormState(DeleteAddress, {});
  useEffect(() => {
    toast(stateDelete?.message, { type: `${stateDelete?.status}` });
  }, [stateDelete]);

  return (
    <div className="form-delete-address">
      <form action={formActionDelete}>
        <input type="hidden" value={adressId} name="address_id" />
        <SubmitButton title="حذف" style="btn btn-dark" />
      </form>
    </div>
  );
}
