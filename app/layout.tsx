import type { ReactNode } from "react";

export const metadata = {
  title: "Ido Kihon Generator",
  description: "Generate totally random Ido Kihon sequences, for fun and practice.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
