import "./globals.css";

import { QuizeProvider } from "./_components/QuizContext";
import Header from "./_components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`font-sans`}>
      <body className="sm:bg-[url('/assets/images/pattern-background-desktop-dark.svg')] bg-[url('/assets/images/pattern-background-mobile-dark.svg')] bg-fixed bg-center bg-cover bg-no-repeat bg-bgColor">
        <QuizeProvider>
          <Header />
          {children}
        </QuizeProvider>
      </body>
    </html>
  );
}
