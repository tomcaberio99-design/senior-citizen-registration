"use client";

import { useMemo, useState } from "react";

const initialForm = {
  fullName: "",
  birthDate: "",
  gender: "",
  civilStatus: "",
  address: "",
  barangay: "",
  phone: "",
  emergencyContact: "",
  emergencyPhone: ""
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

export default function HomePage() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");

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
    setStatus("submitting");
    setMessage("");
    setReferenceId("");

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

      setStatus("success");
      setMessage(data.message);
      setReferenceId(data.referenceId);
      setFormData(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong.");
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">LGU Digital Service</p>
        <h1>Senior Citizen Registration Portal</h1>
        <p className="hero-copy">
          Pwede ni gamiton para sa online pre-registration sa mga senior citizen applicants
          antes sa validation sa city o municipal office.
        </p>
        <div className="hero-badges">
          <span>Vercel Ready</span>
          <span>Mobile Friendly</span>
          <span>Age Validation</span>
        </div>
      </section>

      <section className="form-card">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Application Form</p>
            <h2>Personal Information</h2>
          </div>
          <div className="age-pill">
            <span>Computed Age</span>
            <strong>{age || "--"}</strong>
          </div>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Juan Dela Cruz"
            />
          </label>

          <label>
            Birth Date
            <input
              required
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Gender
            <select required name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <label>
            Civil Status
            <select
              required
              name="civilStatus"
              value={formData.civilStatus}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
            </select>
          </label>

          <label className="full-width">
            Complete Address
            <input
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Purok, Street, Sitio"
            />
          </label>

          <label>
            Barangay
            <input
              required
              name="barangay"
              value={formData.barangay}
              onChange={handleChange}
              placeholder="Barangay Name"
            />
          </label>

          <label>
            Phone Number
            <input
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="09XXXXXXXXX"
            />
          </label>

          <label>
            Emergency Contact
            <input
              required
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Contact Person"
            />
          </label>

          <label>
            Emergency Phone
            <input
              required
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              placeholder="09XXXXXXXXX"
            />
          </label>

          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting..." : "Submit Registration"}
          </button>
        </form>

        {message ? (
          <div className={`notice ${status}`}>
            <p>{message}</p>
            {referenceId ? <strong>Reference ID: {referenceId}</strong> : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}
