"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
      <section className="subpage-hero">
        <p className="eyebrow">Portal Access</p>
        <h1>Login to Your Dashboard</h1>
        <p className="hero-copy">
          View announcements, payout reminders, and your submitted registration details.
        </p>
      </section>

      <section className="form-card auth-card">
        <div className="section-heading compact">
          <div>
            <p className="section-kicker">Account Login</p>
            <h2>Welcome Back</h2>
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

        <p className="auth-switch">
          No account yet? <Link href="/register">Register here</Link>
        </p>
      </section>
    </main>
  );
}
