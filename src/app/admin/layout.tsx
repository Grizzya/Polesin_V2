import '../globals.css';
import { Inter } from 'next/font/google';
import AdminLayoutWrapper from './AdminLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Polesin Admin',
  description: 'Admin Portal Management',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-white text-gray-900`} suppressHydrationWarning>
        <AdminLayoutWrapper>
          {children}
        </AdminLayoutWrapper>
      </body>
    </html>
  );
}
