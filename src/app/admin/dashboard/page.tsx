import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { logoutAction } from './actions';

export default async function DashboardPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] p-8 text-slate-200">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10 bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-400 mt-1 text-sm font-light">Kelola artikel dan konten Anda</p>
          </div>
          
          <div className="flex gap-4">
            <Link 
              href="/admin/articles/new" 
              className="bg-indigo-600/90 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] border border-indigo-500/30 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Tambah Artikel
            </Link>
            
            <form action={logoutAction}>
              <button 
                type="submit" 
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 px-5 py-2.5 rounded-xl font-medium transition-all flex items-center shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Logout
              </button>
            </form>
          </div>
        </header>

        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-xl font-semibold text-white">Daftar Artikel</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/30 border-b border-slate-700/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-5 font-medium">Judul (ID/EN)</th>
                  <th className="p-5 font-medium">Status</th>
                  <th className="p-5 font-medium">Tanggal Dibuat</th>
                  <th className="p-5 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-slate-500 italic font-light">
                      Belum ada artikel. Silakan buat artikel pertama Anda.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-5">
                        <div className="font-medium text-slate-200">{article.title_id}</div>
                        <div className="text-xs text-slate-500 mt-1">{article.title_en}</div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          article.status === 'published' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-5 text-slate-400 text-sm">
                        {new Date(article.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="p-5 text-right">
                         <Link href={`/admin/articles/${article.id}/edit`} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium mr-5 transition-colors">Edit</Link>
                         <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">Hapus</button>
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
