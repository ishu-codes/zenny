import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { inter, roboto } from "./fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Zenny | Manage your Finances Efficiently",
  description: "Your personal Finance Manager",
};

export const viewport: Viewport = {
  themeColor: "#193be6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
