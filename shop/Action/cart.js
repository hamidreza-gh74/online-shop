"use server";

import { getfetch, postfetch } from "@/utils/fetch";
import { handleError } from "@/utils/helper";
import { cookies } from "next/headers";

export async function checkCopoun(state, formData) {
  const code = formData.get("code");

  if (code === "") {
    return {
      status: "error",
      message: "وارد کردن کد الزامی است",
    };
  }

  const token = cookies().get("token");

  const data = await postfetch(
    "/check-coupon",
    {
      code,
    },
    {
      Authorization: `Bearer ${token.value}`,
    }
  );

  if (data.status === "success") {
    return {
      status: data.status,
      message: " کد تخفیف با موفقیت اعمال شد",
      percent: data.data.percentage,
      code: code,
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}

export async function getAddresses() {
  const token = cookies().get("token");
  const data = await getfetch("/user/addresses", {
    Authorization: `Bearer ${token.value}`,
  });
  return data;
}
