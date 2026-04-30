"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PortalBrand from "../portal-brand";
import {
  dashboardAnnouncements,
  getPayoutStatus,
  programCards,
  payoutBulletin,
  targetSchedules
} from "../portal-data";
import { clearSession, findUserByEmail, getSession } from "../portal-storage";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = getSession();

    if (!session?.email) {
      router.replace("/login");
      return;
    }

    const account = findUserByEmail(session.email);
    if (!account) {
      clearSession();
      router.replace("/login");
      return;
    }

    setUser(account);
  }, [router]);

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  if (!user) {
    return (
      <main className="page-shell narrow-shell">
        <section className="form-card auth-card">
          <p className="section-kicker">Loading</p>
          <h2>Preparing Dashboard...</h2>
        </section>
      </main>
    );
  }

  const { profile } = user;
  const payoutStatus = getPayoutStatus(profile.barangay);

  return (
    <main className="page-shell">
      <section className="dashboard-hero branded-surface compact-surface">
        <div>
          <PortalBrand compact />
          <div className="service-ribbon">
            <span>Applicant Dashboard</span>
            <span>LGU Tracking View</span>
          </div>
          <p className="eyebrow">Applicant Dashboard</p>
          <h1>Welcome, {profile.firstName}</h1>
          <p className="hero-copy">
            This dashboard shows your current registration status, announcements, and
            payout reminders from the LGU Alegria MSWDO portal.
          </p>
        </div>

        <div className="dashboard-hero-actions">
          <Link href="/" className="button-link secondary">
            View Portal Home
          </Link>
          <button type="button" className="button-link primary as-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      <section className="status-overview-grid">
        <article className="status-overview-card">
          <span className="status-chip pending">Pending Review</span>
          <h2>Online Registration Received</h2>
          <p>Your applicant record is already in the portal and is waiting for MSWDO validation.</p>
        </article>
        <article className="status-overview-card">
          <span className="status-chip neutral">Next Step</span>
          <h2>Prepare Your Documents</h2>
          <p>Keep your valid ID and supporting details ready in case follow-up confirmation is required.</p>
        </article>
        <article className="status-overview-card">
          <span className="status-chip success">Portal Ready</span>
          <h2>Check Notices Anytime</h2>
          <p>Return here for payout advisories, processing reminders, and applicant updates.</p>
        </article>
      </section>

      <section className={`payout-focus-card ${payoutStatus.included ? "included" : "waiting"}`}>
        <div className="section-heading compact">
          <div>
            <p className="section-kicker">Payout Announcement</p>
            <h2>{payoutStatus.title}</h2>
            <p className="section-copy">{payoutStatus.detail}</p>
          </div>
          <div className={`status-chip ${payoutStatus.included ? "success" : "pending"}`}>
            {payoutStatus.label}
          </div>
        </div>

        <div className="payout-focus-grid">
          <article className="payout-mini-card">
            <strong>Release Date</strong>
            <p>{payoutBulletin.releaseDate}</p>
          </article>
          <article className="payout-mini-card">
            <strong>Venue</strong>
            <p>{payoutBulletin.venue}</p>
          </article>
          <article className="payout-mini-card">
            <strong>Claim Window</strong>
            <p>{payoutBulletin.claimWindow}</p>
          </article>
        </div>

        <p className="payout-helper">{payoutStatus.helper}</p>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card profile-card">
          <p className="section-kicker">Registration Summary</p>
          <h2>{profile.fullName}</h2>
          <div className="profile-lines">
            <div><strong>Reference ID:</strong> {profile.referenceId || "Pending generation"}</div>
            <div><strong>Status:</strong> Pending Review</div>
            <div><strong>Barangay:</strong> {profile.barangay}</div>
            <div><strong>Payout Bulletin:</strong> {payoutStatus.label}</div>
            <div><strong>Age:</strong> {profile.age}</div>
            <div><strong>Contact:</strong> {profile.phone}</div>
            <div><strong>Email:</strong> {user.email}</div>
          </div>
        </article>

        <article className="dashboard-card">
          <p className="section-kicker">Announcements</p>
          <h2>Latest Notices</h2>
          <div className="dashboard-list">
            {dashboardAnnouncements.map((item) => (
              <div className="dashboard-list-item" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="info-grid">
        <div className="info-card">
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">Programs</p>
              <h2>Available MSWDO Services</h2>
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
              <p className="section-kicker">Target Schedules</p>
              <h2>Payout and Processing Board</h2>
            </div>
          </div>

          <div className="announcement-list">
            {targetSchedules.map((item) => (
              <div className="announcement-item" key={item.program}>
                <strong>{item.program}</strong>
                <p>{item.targetDate}</p>
                <p>{item.coverage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
