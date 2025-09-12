import "./globals.css";
import { FolderProvider } from "./context/folderContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FolderProvider>{children}</FolderProvider>
      </body>
    </html>
  );
}
