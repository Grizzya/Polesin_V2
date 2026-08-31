import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { logoutAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen p-4 md:p-8 text-gray-900">
      <div className="w-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 mb-6 md:mb-10 bg-white p-4 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1 text-sm font-light">Kelola artikel dan konten Anda</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link 
              href="/admin/articles/new" 
              className="bg-indigo-600/90 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] border border-indigo-500/30 flex items-center justify-center w-full sm:w-auto"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Tambah Artikel
            </Link>
            
            <form action={logoutAction} className="w-full sm:w-auto">
              <button 
                type="submit" 
                className="w-full justify-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-5 py-2.5 rounded-xl font-medium transition-all flex items-center shadow-sm"
              >
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Logout
              </button>
            </form>
          </div>
        </header>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Daftar Artikel</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-5 font-medium">Judul (ID/EN)</th>
                  <th className="p-5 font-medium">Status</th>
                  <th className="p-5 font-medium">Tanggal Dibuat</th>
                  <th className="p-5 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-500 italic font-light">
                      Belum ada artikel. Silakan buat artikel pertama Anda.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-5">
                        <div className="font-medium text-gray-900">{article.title_id}</div>
                        <div className="text-xs text-gray-500 mt-1">{article.title_en}</div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          article.status === 'published' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}>
                          {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-5 text-gray-500 text-sm">
                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="p-5 text-right">
                         <Link href={`/admin/articles/${article.id}/edit`} className="text-blue-600 hover:text-blue-700 text-sm font-medium mr-5 transition-colors">Edit</Link>
                         <button className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors">Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
