export const metadata = {
  title: "Yash Gupta | Backend Engineer",
  description: "CS Undergrad @ GEHU | Backend Engineer | IEEE Published",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#050505" }}>
        {children}
      </body>
    </html>
  );
}
