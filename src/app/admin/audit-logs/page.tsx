import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    include: { admin: { select: { username: true } } },
    take: 100 // limit to last 100 logs for now
  });

  return (
    <div className="p-4 md:p-6 w-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 bg-white p-4 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Audit Logs</h1>
          <p className="text-gray-500 mt-1 text-sm font-light">Catatan riwayat aktivitas para admin</p>
        </div>
      </header>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Waktu</th>
                <th className="p-4 font-medium">Admin</th>
                <th className="p-4 font-medium">Aksi</th>
                <th className="p-4 font-medium">Target</th>
                <th className="p-4 font-medium">Deskripsi</th>
                <th className="p-4 font-medium">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500 italic font-light">
                    Belum ada log aktivitas.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-500 text-sm whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{log.admin.username}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        log.action === 'CREATE' ? 'bg-green-50 text-green-700 border-green-200' :
                        log.action === 'UPDATE' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        log.action === 'DELETE' ? 'bg-red-50 text-red-700 border-red-200' :
                        log.action === 'LOGIN' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700 text-sm">
                      {log.target} {log.targetId && <span className="text-xs text-gray-400">({log.targetId.substring(0,8)}...)</span>}
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {log.description || '-'}
                    </td>
                    <td className="p-4 text-gray-400 text-xs font-mono">
                      {log.ipAddress || '-'}
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
