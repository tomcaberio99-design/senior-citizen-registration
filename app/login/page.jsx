"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PortalBrand from "../portal-brand";
import { findUserByEmail, setSession } from "../portal-storage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const user = findUserByEmail(normalizedEmail);

    if (!user || user.password !== password) {
      setMessage("Invalid email or password.");
      return;
    }

    setSession({
      email: normalizedEmail,
      loggedInAt: new Date().toISOString()
    });

    router.push("/dashboard");
  }

  return (
    <main className="page-shell narrow-shell">
      <section className="subpage-hero branded-surface compact-surface">
        <PortalBrand compact />
        <div className="service-ribbon">
          <span>Secure Applicant Access</span>
          <span>Dashboard Login</span>
        </div>
        <p className="eyebrow">Portal Access</p>
        <h1>Login to Your Dashboard</h1>
        <p className="hero-copy">
          View announcements, payout reminders, and your submitted registration details.
        </p>
        <div className="hero-badges">
          <span>Check Application Status</span>
          <span>Review Advisories</span>
          <span>Follow-Up Reminders</span>
        </div>
      </section>

      <section className="form-card auth-card">
        <div className="section-heading compact">
          <div>
            <p className="section-kicker">Account Login</p>
            <h2>Welcome Back</h2>
            <p className="section-copy">
              Sign in using the same email address and password created during online registration.
            </p>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email Address
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>

          <label>
            Password
            <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>

          <button type="submit">Login</button>
        </form>

        {message ? (
          <div className="notice error">
            <p>{message}</p>
          </div>
        ) : null}

        <div className="auth-help-grid">
          <article className="info-callout">
            <strong>Login Reminder</strong>
            <p>Use the account created after a successful online registration.</p>
          </article>
          <article className="info-callout">
            <strong>Need an Account First?</strong>
            <p>Create a new applicant account before checking your status, notices, and dashboard details.</p>
          </article>
        </div>

        <p className="auth-switch">
          Do not have an account yet? <Link href="/register">Register here</Link>
        </p>
      </section>
    </main>
  );
}
