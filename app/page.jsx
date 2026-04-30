import Link from "next/link";
import PortalBrand from "./portal-brand";
import {
  announcementItems,
  payoutBulletin,
  programCards,
  targetSchedules
} from "./portal-data";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card branded-surface">
        <div className="hero-grid">
          <div>
            <PortalBrand />
            <div className="service-ribbon">
              <span>Municipal Digital Service</span>
              <span>Senior-Friendly Portal</span>
            </div>
            <p className="eyebrow">LGU Alegria - MSWDO</p>
            <h1>Senior Citizen Services Portal</h1>
            <p className="hero-copy">
              Official portal for senior citizen online registration, payout advisories,
              and community announcements for LGU Alegria.
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

            <div className="hero-stats">
              <article>
                <strong>Portal Access</strong>
                <p>Available anytime for pre-registration and applicant follow-up notices.</p>
              </article>
              <article>
                <strong>Application Status</strong>
                <p>Online submissions are recorded as pending while waiting for LGU review.</p>
              </article>
              <article>
                <strong>Support Office</strong>
                <p>MSWDO Alegria handles validation, registry confirmation, and applicant assistance.</p>
              </article>
            </div>
          </div>

          <div className="hero-panel">
            <p className="hero-panel-label">Current Advisory</p>
            <h2>Pending online applications are reviewed by MSWDO staff.</h2>
            <p>
              Registrations submitted through this portal remain pending until they are
              validated and approved in the main LGU system.
            </p>
            <div className="hero-panel-stack">
              <div className="hero-panel-item">
                <strong>Step 1</strong>
                <p>Complete the online form with personal, address, and contact details.</p>
              </div>
              <div className="hero-panel-item">
                <strong>Step 2</strong>
                <p>The portal creates a reference ID and forwards the record to the LGU bridge.</p>
              </div>
              <div className="hero-panel-item">
                <strong>Step 3</strong>
                <p>Applicants can check the dashboard for reminders, schedules, and follow-up notices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-card">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Simple Flow</p>
            <h2>Designed for clear online-to-office processing</h2>
          </div>
          <div className="status-chip pending">Pending applications remain visible in the portal</div>
        </div>

        <div className="process-grid">
          <article className="process-item">
            <span>01</span>
            <h3>Create Account</h3>
            <p>Applicants or family members can begin with a guided account registration process.</p>
          </article>
          <article className="process-item">
            <span>02</span>
            <h3>Submit Details</h3>
            <p>Qualified applicant details are validated, assigned a reference ID, and sent to the backend.</p>
          </article>
          <article className="process-item">
            <span>03</span>
            <h3>Track Notices</h3>
            <p>Dashboard reminders help applicants prepare for validation, payout updates, and LGU follow-up.</p>
          </article>
        </div>
      </section>

      <section className="payout-board-card">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Current Payout Bulletin</p>
            <h2>{payoutBulletin.title}</h2>
            <p className="section-copy">
              {payoutBulletin.releaseDate} at {payoutBulletin.venue} - {payoutBulletin.claimWindow}
            </p>
          </div>
          <div className="status-chip success">Live Announcement</div>
        </div>

        <div className="payout-board-grid">
          <article className="payout-board-panel">
            <strong>Included Barangays</strong>
            <div className="chip-list">
              {payoutBulletin.includedBarangays.map((barangay) => (
                <span key={barangay}>{barangay}</span>
              ))}
            </div>
          </article>

          <article className="payout-board-panel">
            <strong>Claim Reminder</strong>
            <p>{payoutBulletin.note}</p>
            <Link href="/login" className="button-link primary compact-button">
              View My Dashboard
            </Link>
          </article>
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
              <h2>Applicant Reminders</h2>
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
            <h2>Payout and Processing Schedule</h2>
          </div>
          <div className="age-pill status-panel">
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
