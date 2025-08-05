import type { ReactNode } from "react";

export const metadata = {
  title: "Ido Kihon Generator",
  description:
    "Generate totally random Ido Kihon sequences, for fun and practice.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body
        style={{
          margin: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: "1 0 auto",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
        <code
          style={{
            flexShrink: 0,
          }}
        >
          <a
            href={`https://github.com/klarstrup/ido-kihon-generator`}
            target="_blank"
          >
            source code
          </a>
        </code>
      </body>
    </html>
  );
}
