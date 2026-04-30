import Image from "next/image";

export default function PortalBrand({ compact = false }) {
  return (
    <div className={`portal-brand ${compact ? "compact" : ""}`}>
      <div className="portal-brand-logo">
        <Image
          src="/mswdo-logo.jpg"
          alt="MSWDO Alegria logo"
          width={72}
          height={72}
          priority
        />
      </div>
      <div className="portal-brand-copy">
        <p>Municipality of Alegria, Surigao del Norte</p>
        <strong>MSWDO Senior Citizen Services Portal</strong>
      </div>
    </div>
  );
}
