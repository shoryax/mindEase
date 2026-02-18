import InteractiveBackground from "@/components/ui/AnimatedBackground";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import { UserProvider } from "@/contexts/UserContext";
import './globals.css';

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
