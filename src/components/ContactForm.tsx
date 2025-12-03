import Turnstile from "./Turnstile";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ContactForm = () => {

  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const formAnimation = useScrollAnimation<HTMLFormElement>("fade-up", {
    delay: 100,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      alert(t("contact.captchaRequired"));
      return;
    }

    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", company: "", message: "" });
    setTurnstileToken(null);
  };

  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
  };

  const handleTurnstileError = () => {
    setTurnstileToken(null);
  };

  const handleTurnstileExpire = () => {
    setTurnstileToken(null);
  };

  return (
    <form
      ref={formAnimation.ref}
      onSubmit={handleSubmit}
      className={`mx-auto mt-16 max-w-xl sm:mt-20 ${formAnimation.className}`}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            {t("contact.name")}
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            {t("contact.email")}
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="company"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Company
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              autoComplete="organization"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            {t("contact.message")}
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 transition-all duration-200 focus:scale-105 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="sm:col-span-2">
        <Turnstile
          onVerify={handleTurnstileVerify}
          onError={handleTurnstileError}
          onExpire={handleTurnstileExpire}
        />
      </div>
      <div className="mt-10">
        <button
          type="submit"
          disabled={!turnstileToken}
          className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {t("contact.send")}
        </button>
      </div>
    </form>
  );
};
