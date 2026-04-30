import Link from "next/link";
import {
  announcementItems,
  programCards,
  targetSchedules
} from "./portal-data";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">LGU Alegria · MSWDO</p>
            <h1>Senior Citizen Services Portal</h1>
            <p className="hero-copy">
              Official portal for senior citizen online registration, target payout
              advisories, and municipal announcements for LGU Alegria.
            </p>
            <div className="hero-badges">
              <span>Online Registration</span>
              <span>Announcements</span>
              <span>Payout Updates</span>
            </div>
            <div className="hero-actions">
              <Link href="/register" className="button-link primary">
                Register Now
              </Link>
              <Link href="/login" className="button-link secondary">
                Login to Dashboard
              </Link>
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
    </main>
  );
}
