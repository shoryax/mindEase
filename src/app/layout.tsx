import InteractiveBackground from "@/components/ui/AnimatedBackground";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import { UserProvider } from "@/contexts/UserContext";
import { Metadata } from "next";
import './globals.css';


export const metadata: Metadata = {
  title: "MindEase",
  description: "Your AI-Powered Mental Health Companion",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <DarkModeProvider>
            <InteractiveBackground />
            <div className="relative z-10">
              {children}
            </div>
          </DarkModeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
