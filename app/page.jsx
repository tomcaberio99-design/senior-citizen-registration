"use client";

import { useMemo, useState } from "react";

const barangays = [
  "Alipao",
  "Anahaw",
  "Budlingin",
  "Camp Eduard (Geotina)",
  "Ferlda",
  "Gamuton",
  "Don Julio Ouano",
  "Ombong",
  "Poblacion (Alegria)",
  "Pongtud",
  "San Juan",
  "San Pedro"
];

const programCards = [
  {
    title: "Senior Citizen Registration",
    description:
      "Online pre-registration para sa bagong senior citizen applicants before LGU validation and approval.",
    badge: "Open"
  },
  {
    title: "Social Pension Monitoring",
    description:
      "Information hub para sa target payout, beneficiary reminders, and pending validation notices.",
    badge: "Advisory"
  },
  {
    title: "Centenarian Benefit Program",
    description:
      "Support page para sa milestone beneficiaries aged 80, 85, 90, 95, and 100 years old.",
    badge: "Milestone"
  }
];

const targetSchedules = [
  {
    program: "Social Pension Payout",
    targetDate: "Editable by LGU",
    coverage: "Clustered barangays per advisory",
    note: "Replace this with your official payout schedule before deployment."
  },
  {
    program: "Senior ID Validation",
    targetDate: "Every Monday to Wednesday",
    coverage: "MSWDO Office, Alegria",
    note: "Walk-in and follow-up applicants can be instructed through this section."
  },
  {
    program: "Centenarian Benefit Processing",
    targetDate: "Monthly target release",
    coverage: "Qualified milestone beneficiaries",
    note: "Use this card for target release windows and document reminders."
  }
];

const announcementItems = [
  "Bring valid identification and supporting documents during final validation.",
  "Online submissions are marked pending until reviewed by the MSWDO staff.",
  "Target payout schedules may change based on fund release and barangay clustering."
];

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
  email: ""
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
      setReferenceId(data.referenceId || "");
      setFormData(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong.");
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">LGU Alegria · MSWDO</p>
            <h1>Senior Citizen Services Portal</h1>
            <p className="hero-copy">
              Official information page para sa online senior citizen pre-registration,
              benefit advisories, and target payout announcements sa LGU Alegria.
            </p>
            <div className="hero-badges">
              <span>Online Registration</span>
              <span>Target Payout Board</span>
              <span>Program Updates</span>
            </div>
          </div>

          <div className="hero-panel">
            <p className="hero-panel-label">Current Advisory</p>
            <h2>Pending online applications are reviewed by MSWDO staff.</h2>
            <p>
              Registrations from this portal are submitted as pending records until
              validated and approved in the main LGU system.
            </p>
          </div>
        </div>
      </section>

      <section className="info-grid">
        <div className="info-card">
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">Programs</p>
              <h2>MSWDO Services</h2>
            </div>
          </div>

          <div className="program-list">
            {programCards.map((program) => (
              <article className="program-card" key={program.title}>
                <div className="program-card-top">
                  <h3>{program.title}</h3>
                  <span>{program.badge}</span>
                </div>
                <p>{program.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="info-card">
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">Reminders</p>
              <h2>Applicant Notes</h2>
            </div>
          </div>

          <div className="announcement-list">
            {announcementItems.map((item) => (
              <div className="announcement-item" key={item}>
                <strong>Notice</strong>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="schedule-card">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Schedule Board</p>
            <h2>Target Payout and Processing Schedule</h2>
          </div>
          <div className="age-pill">
            <span>Portal Status</span>
            <strong>Active</strong>
          </div>
        </div>

        <div className="schedule-grid">
          {targetSchedules.map((item) => (
            <article className="schedule-item" key={item.program}>
              <p className="schedule-label">{item.program}</p>
              <h3>{item.targetDate}</h3>
              <p className="schedule-meta">{item.coverage}</p>
              <p className="schedule-note">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="form-card">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Online Registration</p>
            <h2>Senior Citizen Pre-Registration Form</h2>
          </div>
          <div className="age-pill">
            <span>Computed Age</span>
            <strong>{age || "--"}</strong>
          </div>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <label>
            First Name
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Juan"
            />
          </label>

          <label>
            Middle Name
            <input
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="Dela"
            />
          </label>

          <label>
            Last Name
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Cruz"
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
            Sex
            <select required name="sex" value={formData.sex} onChange={handleChange}>
              <option value="">Select sex</option>
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

          <label>
            House No.
            <input
              name="houseNo"
              value={formData.houseNo}
              onChange={handleChange}
              placeholder="Purok / House No."
            />
          </label>

          <label>
            Street / Sitio
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street or Sitio"
            />
          </label>

          <label>
            Barangay
            <select
              required
              name="barangay"
              value={formData.barangay}
              onChange={handleChange}
            >
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
            <input
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </label>

          <label>
            Province
            <input
              required
              name="province"
              value={formData.province}
              onChange={handleChange}
            />
          </label>

          <label>
            Contact Number
            <input
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="09XXXXXXXXX"
            />
          </label>

          <label className="full-width">
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
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
