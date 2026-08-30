import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { deleteArticleAction } from './actions';
import Image from 'next/image';

export default async function ArticlesListPage(props: { searchParams: Promise<{ q?: string }> }) {
  const searchParams = await props.searchParams;
  const q = searchParams.q || '';

  const articles = await prisma.article.findMany({
    where: {
      title_en: { contains: q, mode: 'insensitive' }
    },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { username: true } } }
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-500 mt-1 text-sm">Kelola semua artikel blog Anda</p>
        </div>
        
        <Link 
          href="/admin/articles/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center"
        >
          <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          New Article
        </Link>
      </header>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex justify-between items-center">
        <form className="flex w-full max-w-md relative">
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            name="q"
            defaultValue={q}
            placeholder="Cari judul artikel..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium w-16 text-center">Gambar</th>
                <th className="p-4 font-medium">Judul (EN)</th>
                <th className="p-4 font-medium">Penulis</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Tanggal</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      <p className="text-gray-600 mb-4">Belum ada artikel ditemukan.</p>
                      <Link href="/admin/articles/new" className="text-blue-600 font-medium hover:underline">
                        Buat artikel pertama &rarr;
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center">
                        {article.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={article.image} alt={article.title_en} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900 line-clamp-1">{article.title_en}</div>
                      <div className="text-xs text-gray-500 mt-1">{article.slug}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {article.author.username}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                        article.status === 'published' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                       <div className="flex justify-end gap-2">
                         <Link 
                            href={`/admin/articles/${article.id}/edit`} 
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                         </Link>
                         <form action={deleteArticleAction} className="inline-block">
                           <input type="hidden" name="id" value={article.id} />
                           <button 
                             type="submit"
                             className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                             title="Delete"
                             onClick={(e) => {
                               if(!confirm('Yakin hapus artikel ini secara permanen?')) {
                                 e.preventDefault();
                               }
                             }}
                           >
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                             </svg>
                           </button>
                         </form>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
