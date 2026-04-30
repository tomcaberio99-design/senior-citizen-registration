export const barangays = [
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

export const programCards = [
  {
    title: "Senior Citizen Registration",
    description:
      "Online pre-registration for new senior citizen applicants before MSWDO validation and approval.",
    badge: "Open"
  },
  {
    title: "Social Pension Monitoring",
    description:
      "Payout advisories, beneficiary reminders, and pending validation notices.",
    badge: "Advisory"
  },
  {
    title: "Centenarian Benefit Program",
    description:
      "Program updates for milestone beneficiaries aged 80, 85, 90, 95, and 100 years old.",
    badge: "Milestone"
  }
];

export const targetSchedules = [
  {
    program: "Social Pension Payout",
    targetDate: "May 20, 2026",
    coverage: "Cluster A Barangays",
    note: "Sample schedule for the portal demo. Update this section with the official LGU payout bulletin."
  },
  {
    program: "Senior ID Validation",
    targetDate: "Every Monday to Wednesday",
    coverage: "MSWDO Office, Alegria",
    note: "Use this card for walk-in validation windows and documentary reminders."
  },
  {
    program: "Centenarian Benefit Processing",
    targetDate: "Monthly target release",
    coverage: "Qualified milestone beneficiaries",
    note: "Update this section with release windows and payout claim instructions."
  }
];

export const announcementItems = [
  "Bring a valid ID and supporting documents during final validation.",
  "Online submissions remain pending until reviewed by MSWDO staff.",
  "Payout schedules may change based on fund release and Barangay clustering."
];

export const dashboardAnnouncements = [
  {
    title: "Pending Application Review",
    body: "Online applications are reviewed by MSWDO staff before they are marked approved in the LGU registry."
  },
  {
    title: "Payout Advisory",
    body: "Please wait for the official Barangay cluster schedule before visiting the payout site."
  },
  {
    title: "Document Reminder",
    body: "Prepare your valid ID, OSCA details, and contact information for validation follow-up."
  }
];

export const payoutBulletin = {
  title: "Social Pension Payout Bulletin",
  releaseDate: "May 20, 2026",
  venue: "Alegria Municipal Gym",
  claimWindow: "8:00 AM to 3:00 PM",
  includedBarangays: [
    "Poblacion (Alegria)",
    "San Juan",
    "San Pedro",
    "Don Julio Ouano"
  ],
  note: "Bring a valid ID and wait for your Barangay cluster schedule before visiting the payout site."
};

export function getPayoutStatus(barangay) {
  const normalizedBarangay = String(barangay ?? "").trim();
  const isIncluded = payoutBulletin.includedBarangays.includes(normalizedBarangay);

  if (isIncluded) {
    return {
      included: true,
      label: "Included in Payout",
      title: `${normalizedBarangay} is included in the current payout release.`,
      detail: `Proceed to ${payoutBulletin.venue} on ${payoutBulletin.releaseDate}, ${payoutBulletin.claimWindow}.`,
      helper: "Please bring a valid ID and wait for the official Barangay call sequence."
    };
  }

  return {
    included: false,
    label: "Waiting for Next Schedule",
    title: `${normalizedBarangay || "Your Barangay"} is not yet listed in the current payout batch.`,
    detail: "Please wait for the next LGU advisory for the updated clustered payout schedule.",
    helper: "Dashboard announcements will be updated once your Barangay is included."
  };
}
