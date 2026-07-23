import React from 'react';
import { Truck, Landmark, Send, CheckCircle2, PackageSearch } from 'lucide-react';

const SERVICES = [
  { icon: Truck, label: 'حمل و نقل و ترانزیت' },
  { icon: Landmark, label: 'عملیات بانکی و ارزی' },
  { icon: Send, label: 'صادرات کالا' },
  { icon: CheckCircle2, label: 'ترخیص کالا' },
  { icon: PackageSearch, label: 'واردات کالا' },
];

const Reccomend = () => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-amber-500">خدمات ما</h3>

      <ul className="flex flex-col gap-4">
        {SERVICES.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-amber-300">
              <Icon size={16} />
            </span>
            <span className="text-sm font-medium text-slate-700 sm:text-base">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reccomend;