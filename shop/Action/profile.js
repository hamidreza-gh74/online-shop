"use server";

import { postfetch } from "@/utils/fetch";
import { handleError } from "@/utils/helper";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function editinfo(state, formData) {
  const name = formData.get("name");
  const email = formData.get("email");

  if (name === "" || email === "") {
    return {
      status: "error",
      message: "لطفا تمامی موارد را پر کنید",
    };
  }

  const token = cookies().get("token");

  const data = await postfetch(
    "/profile/info/edit",
    {
      name,
      email,
    },
    {
      Authorization: `Bearer ${token.value}`,
    }
  );

  if (data.status === "success") {
    return {
      status: data.status,
      message: "ویرایش اطلاعات با موفقیت انجام شد",
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}

export async function createAddress(state, formData) {
  const title = formData.get("title");
  const cellphone = formData.get("cellphone");
  const postal_code = formData.get("postal_code");
  const province_id = formData.get("province_id");
  const city_id = formData.get("city_id");
  const address = formData.get("address");

  if (title === "") {
    return {
      status: "error",
      message: "فیلد عنوان الزامی است.",
    };
  }

  const cellphonePattern = /^(\+98|0)?9\d{9}$/i;
  if (cellphone === "" || !cellphonePattern.test(cellphone)) {
    return {
      status: "error",
      message: "فیلد شماره تماس نامعتبر است.",
    };
  }

  const postalCodePattern = /^\d{5}[ -]?\d{5}$/i;
  if (postal_code === "" || !postalCodePattern.test(postal_code)) {
    return {
      status: "error",
      message: "فیلد کد پستی نامعتبر است.",
    };
  }

  if (address === "") {
    return {
      status: "error",
      message: "فیلد آدرس الزامی است.",
    };
  }

  const token = cookies().get("token");
  const data = await postfetch(
    "/profile/addresses/create",
    { title, cellphone, postal_code, province_id, city_id, address },
    { Authorization: `Bearer ${token.value}` }
  );

  if (data.status === "success") {
    revalidatePath("/profile/addresses")

    return {
      status: data.status,
      message: "ثبت آدرس با موفقیت انجام شد",
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}

export async function EditAddress(state, formData) {
  const title = formData.get("title");
  const cellphone = formData.get("cellphone");
  const postal_code = formData.get("postal_code");
  const province_id = formData.get("province_id");
  const city_id = formData.get("city_id");
  const address = formData.get("address");
  const address_id = formData.get("address_id");

  if (address_id === "" || address_id === null) {
    return {
      status: "error",
      message: "شناسه آدرس الزامی است.",
    };
  }

  if (title === "") {
    return {
      status: "error",
      message: "فیلد عنوان الزامی است.",
    };
  }

  const cellphonePattern = /^(\+98|0)?9\d{9}$/i;
  if (cellphone === "" || !cellphonePattern.test(cellphone)) {
    return {
      status: "error",
      message: "فیلد شماره تماس نامعتبر است.",
    };
  }

  const postalCodePattern = /^\d{5}[ -]?\d{5}$/i;
  if (postal_code === "" || !postalCodePattern.test(postal_code)) {
    return {
      status: "error",
      message: "فیلد کد پستی نامعتبر است.",
    };
  }

  if (address === "") {
    return {
      status: "error",
      message: "فیلد آدرس الزامی است.",
    };
  }

  const token = cookies().get("token");
  const data = await postfetch(
    "/profile/addresses/edit",
    {
      title,
      cellphone,
      postal_code,
      province_id,
      city_id,
      address,
      address_id,
    },
    { Authorization: `Bearer ${token.value}` }
  );

  if (data.status === "success") {
    return {
      status: data.status,
      message: "ویرایش آدرس با موفقیت انجام شد",
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}

export async function DeleteAddress(state, formData) {
  const address_id = formData.get("address_id");

  if (address_id === "" || address_id === null) {
    return {
      status: "error",
      message: "شناسه آدرس الزامی است.",
    };
  }

  const token = cookies().get("token");
  const data = await postfetch(
    "/profile/addresses/delete",
    {
      address_id,
    },
    { Authorization: `Bearer ${token.value}` }
  );

  if (data.status === "success") {
    revalidatePath("/profile/addresses")
    return {
      status: data.status,
      message: "حذف آدرس با موفقیت انجام شد",
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}
