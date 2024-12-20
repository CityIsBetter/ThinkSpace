import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BoardScape - Real-Time Collaborative Whiteboard",
  description:
    "BoardScape is your go-to digital collaboration whiteboard. Create teams, boards, invite friends, and collaborate in real-time like never before.",
  keywords: [
    "BoardScape",
    "collaboration",
    "digital whiteboard",
    "teamwork",
    "real-time collaboration",
    "online boards",
  ],
  authors: [{ name: "BoardScape Team", url: "https://boardscape.vercel.app" }],
  creator: "BoardScape Team",
  openGraph: {
    title: "BoardScape - Real-Time Collaborative Whiteboard",
    description:
      "Create teams and boards, invite your friends, and collaborate in real-time with BoardScape.",
    url: "https://boardscape.vercel.app",
    type: "website",
    siteName: "BoardScape",
    images: [
      {
        url: "/ss.png",
        width: 1200,
        height: 630,
        alt: "BoardScape - Real-Time Collaboration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BoardScape - Real-Time Collaborative Whiteboard",
    description:
      "Create teams and boards, invite your friends, and collaborate in real-time with BoardScape.",
    site: "https://boardscape.vercel.app",
    creator: "@CityIsBetter_",
    images: ["/ss.png"],
  },
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
