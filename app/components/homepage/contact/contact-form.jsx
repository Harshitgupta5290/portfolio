"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [userInput, setUserInput] = useState({ name: "", email: "", message: "" });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }
    try {
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/contact`, userInput);
      toast.success("Message sent successfully!");
      setUserInput({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fieldClass = (field) =>
    `w-full bg-[var(--surface-2)] border rounded-lg px-4 py-3 text-[var(--ink)] text-sm outline-none transition-all duration-300 placeholder:text-[var(--ink-3)] font-mono ${
      focused === field
        ? "border-[#16f2b3]/60 shadow-[0_0_16px_rgba(22,242,179,0.08)]"
        : "border-[var(--line)] hover:border-[var(--ink-3)]"
    }`;

  return (
    <div className="flex flex-col h-full">
      <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono mb-5">
        {/* send a message */}
      </p>

      <div className="relative rounded-xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden flex-1">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#16f2b3]/50 to-transparent" />

        <form onSubmit={handleSendMail} className="p-6 flex flex-col gap-5">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-[var(--ink-3)] uppercase tracking-widest font-mono">
                Name
              </label>
              <input
                className={fieldClass("name")}
                type="text"
                placeholder="John Doe"
                maxLength="100"
                required
                value={userInput.name}
                onFocus={() => setFocused("name")}
                onBlur={() => { setFocused(""); checkRequired(); }}
                onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-[var(--ink-3)] uppercase tracking-widest font-mono">
                Email
              </label>
              <input
                className={fieldClass("email")}
                type="email"
                placeholder="john@example.com"
                maxLength="100"
                required
                value={userInput.email}
                onFocus={() => setFocused("email")}
                onBlur={() => {
                  setFocused("");
                  checkRequired();
                  setError({ ...error, email: !isValidEmail(userInput.email) });
                }}
                onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              />
              {error.email && (
                <p className="text-[11px] text-red-400 font-mono">⚠ Invalid email address</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-[var(--ink-3)] uppercase tracking-widest font-mono">
                Message
              </label>
              <span className="text-[10px] text-[var(--ink-3)] font-mono">
                {userInput.message.length}/500
              </span>
            </div>
            <textarea
              className={`${fieldClass("message")} resize-none`}
              placeholder="Tell me about your project or opportunity..."
              maxLength="500"
              required
              rows="5"
              value={userInput.message}
              onFocus={() => setFocused("message")}
              onBlur={() => { setFocused(""); checkRequired(); }}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
            />
          </div>

          {/* Error */}
          {error.required && (
            <p className="text-[11px] text-red-400 font-mono bg-red-400/5 border border-red-400/20 rounded-lg px-3 py-2">
              ⚠ All fields are required
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex items-center justify-center gap-2.5 w-full rounded-lg p-[1px] bg-gradient-to-r from-violet-600 to-[#16f2b3] transition-all duration-300 hover:shadow-[0_0_28px_rgba(22,242,179,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2.5 w-full bg-[var(--card)] group-hover:bg-[var(--surface-2)] rounded-[7px] px-6 py-3 transition-all duration-300">
              {isLoading ? (
                <span className="text-sm font-mono text-[var(--ink-2)]">Sending...</span>
              ) : (
                <>
                  <span className="text-sm font-semibold text-[var(--ink)] uppercase tracking-wider">
                    Send Message
                  </span>
                  <TbMailForward
                    size={17}
                    className="text-[#16f2b3] group-hover:translate-x-1 transition-transform duration-300"
                  />
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
