"use server";

import { postfetch } from "@/utils/fetch";
import { handleError } from "@/utils/helper";
import { cookies } from "next/headers";

export async function login(stateLogin, formData) {
  const cellphone = formData.get("cellphone");

  if (cellphone === "") {
    return {
      status: "error",
      message: "شماره تلفن الزامی است",
    };
  }

  const pattern = /^(\+98|0)?9\d{9}$/;
  if (!pattern.test(cellphone)) {
    return {
      status: "error",
      message: "شماره تلفن صحیح نیست",
    };
  }

  const data = await postfetch("/auth/login", { cellphone });
  if (data.status === "success") {
    cookies().set({
      name: "login_token",
      value: data.data.login_token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // one week
    });
    return {
      status: data.status,
      message: "کد تایید با موفقیت برای شما ارسال شد",
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}

export async function CheckOtp(stateOtp, formData) {
  const otp = formData.get("otp");

  if (otp === "") {
    return {
      status: "error",
      message: "کد ورود الزامی است",
    };
  }

  const pattern = /^[0-9]{6}$/;
  if (!pattern.test(otp)) {
    return {
      status: "error",
      message: "کد ورود معتبر نیست",
    };
  }

  const loginToken = cookies().get("login_token");

  if (!loginToken) {
    return {
      status: "error",
      message: "توکن ورودی معتبر نیست",
    };
  }

  const data = await postfetch("/auth/check-otp", {
    otp,
    login_token: loginToken.value,
  });

  if (data.status === "success") {
    cookies().delete("login_token");
    cookies().set({
      name: "token",
      value: data.data.token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // one week
    });
    return {
      status: data.status,
      message: "شما با موفقیت وارد شدید",
      data: data.data.user,
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}

export async function resendOtp(stateResendOtp, formData) {
  const loginToken = cookies().get("login_token");

  if (!loginToken) {
    return {
      status: "error",
      message: "توکن ورودی شما معتبر نیست. یکبار دیگر تلاش کنید",
    };
  }

  const data = await postfetch("/auth/resend-otp", {
    login_token: loginToken.value,
  });

  if (data.status === "success") {
    cookies().set({
      name: "login_token",
      value: data.data.login_token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return {
      status: data.status,
      message: "کد ورود دوباره برای شما ارسال شد",
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}

export async function Me(stateOtp, formData) {
  const token = cookies().get("token");

  if (!token) {
    return {
      error: "not authorize",
    };
  }

  const data = await postfetch(
    "/auth/me",
    {},
    { authorization: `Bearer ${token.value}` }
  );

  if (data.status === "success") {
    return {
      data: data.data,
    };
  } else {
    return {
      error: "user forbiden",
    };
  }
}

export async function Logout(stateOtp, formData) {
  const token = cookies().get("token");

  if (!token) {
    return {
      error: "not authorize",
    };
  }

  const data = await postfetch(
    "/auth/logout",
    {},
    { authorization: `Bearer ${token.value}` }
  );

  if (data.status === "success") {
    cookies().delete("token");
    return {
      data: data.data,
    };
  } else {
    return {
      error: "user forbiden",
    };
  }
}
