import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhotoBooth AI",
  description: "Snap a selfie, describe your vibe, and let AI transform you.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PhotoBooth AI",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-mesh antialiased">{children}</body>
    </html>
  );
}
