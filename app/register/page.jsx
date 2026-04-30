"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { barangays } from "../portal-data";
import { saveUser, setSession } from "../portal-storage";

const initialForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  sex: "",
  civilStatus: "",
  houseNo: "",
  street: "",
  barangay: "",
  city: "Alegria",
  province: "Surigao del Norte",
  phone: "",
  email: "",
  password: "",
  confirmPassword: ""
};

function calculateAge(birthDate) {
  if (!birthDate) return "";

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return Number.isNaN(age) ? "" : age;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const age = useMemo(() => calculateAge(formData.birthDate), [formData.birthDate]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.password.length < 6) {
      setStatus("error");
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatus("error");
      setMessage("Password confirmation does not match.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...formData, age })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      const email = formData.email.trim().toLowerCase();
      const user = {
        email,
        password: formData.password,
        profile: {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          fullName: [formData.firstName, formData.middleName, formData.lastName]
            .filter(Boolean)
            .join(" "),
          birthDate: formData.birthDate,
          age,
          sex: formData.sex,
          civilStatus: formData.civilStatus,
          houseNo: formData.houseNo,
          street: formData.street,
          barangay: formData.barangay,
          city: formData.city,
          province: formData.province,
          phone: formData.phone,
          referenceId: data.referenceId || ""
        },
        applicationStatus: "pending",
        createdAt: new Date().toISOString()
      };

      saveUser(user);
      setSession({
        email,
        loggedInAt: new Date().toISOString()
      });

      setStatus("success");
      setMessage(data.message || "Registration completed.");
      router.push("/dashboard");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong.");
    }
  }

  return (
    <main className="page-shell">
      <section className="subpage-hero">
        <p className="eyebrow">Online Registration</p>
        <h1>Create Applicant Account</h1>
        <p className="hero-copy">
          Fill out the pre-registration form and create your portal login so you can
          check announcements and follow-up notices.
        </p>
        <div className="hero-actions">
          <Link href="/" className="button-link secondary">
            Back to Portal
          </Link>
          <Link href="/login" className="button-link primary">
            Go to Login
          </Link>
        </div>
      </section>

      <section className="form-card">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Applicant Form</p>
            <h2>Senior Citizen Registration</h2>
          </div>
          <div className="age-pill">
            <span>Computed Age</span>
            <strong>{age || "--"}</strong>
          </div>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <label>
            First Name
            <input required name="firstName" value={formData.firstName} onChange={handleChange} />
          </label>

          <label>
            Middle Name
            <input name="middleName" value={formData.middleName} onChange={handleChange} />
          </label>

          <label>
            Last Name
            <input required name="lastName" value={formData.lastName} onChange={handleChange} />
          </label>

          <label>
            Birth Date
            <input required type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
          </label>

          <label>
            Sex
            <select required name="sex" value={formData.sex} onChange={handleChange}>
              <option value="">Select sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <label>
            Civil Status
            <select required name="civilStatus" value={formData.civilStatus} onChange={handleChange}>
              <option value="">Select status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
            </select>
          </label>

          <label>
            House No.
            <input name="houseNo" value={formData.houseNo} onChange={handleChange} />
          </label>

          <label>
            Street / Sitio
            <input name="street" value={formData.street} onChange={handleChange} />
          </label>

          <label>
            Barangay
            <select required name="barangay" value={formData.barangay} onChange={handleChange}>
              <option value="">Select barangay</option>
              {barangays.map((barangay) => (
                <option key={barangay} value={barangay}>
                  {barangay}
                </option>
              ))}
            </select>
          </label>

          <label>
            City / Municipality
            <input required name="city" value={formData.city} onChange={handleChange} />
          </label>

          <label>
            Province
            <input required name="province" value={formData.province} onChange={handleChange} />
          </label>

          <label>
            Contact Number
            <input required name="phone" value={formData.phone} onChange={handleChange} />
          </label>

          <label className="full-width">
            Email Address
            <input required type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label>
            Password
            <input required type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>

          <label>
            Confirm Password
            <input
              required
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </label>

          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting..." : "Register and Continue"}
          </button>
        </form>

        {message ? (
          <div className={`notice ${status === "success" ? "success" : "error"}`}>
            <p>{message}</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
