
import React from 'react';
import { Search, Plus, MoreVertical, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Member } from '../types';

const mockMembers: Member[] = [
  { id: '1', name: 'محمد علي', joinDate: '2023-01-15', status: 'active', plan: 'سنوي', lastVisit: 'منذ ساعتين' },
  { id: '2', name: 'سارة أحمد', joinDate: '2023-05-10', status: 'expired', plan: 'شهري', lastVisit: 'منذ ٤ أيام' },
  { id: '3', name: 'خالد محمود', joinDate: '2023-08-20', status: 'active', plan: '٣ أشهر', lastVisit: 'الآن' },
  { id: '4', name: 'ليلى يوسف', joinDate: '2023-11-02', status: 'pending', plan: 'شهري', lastVisit: 'لم يحضر' },
];

const MemberManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="البحث عن مشترك باسمه أو رقم هاتفه..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shrink-0">
          <Plus size={20} />
          <span>إضافة مشترك جديد</span>
        </button>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-sm">
              <th className="p-4 font-medium">المشترك</th>
              <th className="p-4 font-medium">تاريخ الانضمام</th>
              <th className="p-4 font-medium">الخطة</th>
              <th className="p-4 font-medium">آخر تواجد</th>
              <th className="p-4 font-medium">الحالة</th>
              <th className="p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {mockMembers.map((member) => (
              <tr key={member.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${member.id}/100/100`} alt="" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{member.name}</p>
                      <p className="text-xs text-slate-500">ID: #{member.id}024</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-300">{member.joinDate}</td>
                <td className="p-4 text-slate-300">{member.plan}</td>
                <td className="p-4 text-slate-300">{member.lastVisit}</td>
                <td className="p-4">
                  <StatusBadge status={member.status} />
                </td>
                <td className="p-4">
                  <button className="text-slate-500 hover:text-white p-1">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: Member['status'] }> = ({ status }) => {
  const configs = {
    active: { color: 'text-green-500 bg-green-500/10', icon: CheckCircle, label: 'نشط' },
    expired: { color: 'text-red-500 bg-red-500/10', icon: XCircle, label: 'منتهي' },
    pending: { color: 'text-yellow-500 bg-yellow-500/10', icon: AlertCircle, label: 'قيد المراجعة' },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
};

export default MemberManager;
