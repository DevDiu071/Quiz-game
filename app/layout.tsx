import "./globals.css";

import { QuizeProvider } from "./_components/QuizContext";
import Header from "./_components/Header";
import ThemeProvider from "./_theme/Theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="md:bg-[url('/assets/images/pattern-background-desktop-light.svg')] dark:md:bg-[url('/assets/images/pattern-background-desktop-dark.svg')] bg-[url('/assets/images/pattern-background-mobile-dark.svg')] bg-fixed bg-center bg-cover bg-no-repeat dark:bg-bgColor bg-bg-light">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QuizeProvider>
            <Header />
            {children}
          </QuizeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
