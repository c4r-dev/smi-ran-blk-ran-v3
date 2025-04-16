import './globals.css'; // Import global styles

export const metadata = {
  title: 'Block Randomization App',
  description: 'Visualization of block randomization',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}