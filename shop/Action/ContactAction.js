"use server";

import { postfetch } from "@/utils/fetch";
import { handleError } from "@/utils/helper";

export async function create(state, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const text = formData.get("text");

  if (name === "" || email === "" || subject === "" || text === "") {
    return {
      status: "error",
      message: "لطفا تمامی موارد را پر کنید",
    };
  }

  const data = await postfetch("/contact-us", { name, email, subject, text });
  if (data.status === "success") {
    return {
      status: data.status,
      message: "پیغام شما با موفقیت ثبت شد",
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}
