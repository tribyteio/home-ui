
import { DM_Mono, Poppins } from "next/font/google";
import classNames from "classnames";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", '600'],
  variable: "--font-poppins",
});


const dmmono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dmmono",
});

const fonts = [poppins, dmmono];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>
        Tribyte Labs
      </title>
      <link rel="icon" href="/logo.svg" />
      <link rel="icon" href="/logo.svg" type="image/x-icon" sizes="any" />
      <meta name="title" content="Tribyte Labs" />
      <meta name="description" content="Every Byte Builds Immutable Trust" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Tribyte Labs" />
      <body
        className={classNames(
          fonts.map((item) => item.variable).join(" "),
          "font-poppins"
        )}
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
