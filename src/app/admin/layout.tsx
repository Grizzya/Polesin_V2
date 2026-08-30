import '../globals.css';
import { Inter } from 'next/font/google';
import AdminSidebar from './AdminSidebar';
import AdminMainContainer from './AdminMainContainer';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} bg-gray-50 text-gray-900`} suppressHydrationWarning>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <AdminMainContainer>
            {children}
          </AdminMainContainer>
        </div>
      </body>
    </html>
  );
}
