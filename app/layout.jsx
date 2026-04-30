import "./globals.css";

export const metadata = {
  title: "Senior Citizen Services Portal",
  description: "Official online portal for senior citizen registration, announcements, and payout updates."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
