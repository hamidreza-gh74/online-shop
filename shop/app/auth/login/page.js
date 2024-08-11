"use client";
import CheckOtpForm from "@/componenets/auth/login/CheckOtpForm";
import LoginForm from "@/componenets/auth/login/LoginForm";
import { useState } from "react";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  return (
    <section className="auth_section book_section">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <div className="card">
              {step == 1 && <LoginForm setStep={setStep} />}
              {step == 2 && <CheckOtpForm />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
