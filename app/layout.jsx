import "./globals.css";

export const metadata = {
  title: "Senior Citizen Registration",
  description: "Online registration form for senior citizen applicants"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
