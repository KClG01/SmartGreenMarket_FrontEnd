import { NavLink } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function AdminLogo() {
    return (
        <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                <ShieldCheck className="h-5 w-5 text-white" />
            </div>

            <div className="flex flex-col">
                <span className="flex items-center gap-2 font-['Noto_Serif',serif] text-lg font-extrabold leading-tight tracking-tight text-emerald-950">
                    <NavLink to="/quan-tri" className="no-underline text-inherit">
                        GreenMarket
                    </NavLink>
                    <span className="rounded-full border border-slate-300 bg-slate-800 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider text-white">
                        Admin
                    </span>
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                    Trang quản lý hệ thống
                </span>
            </div>
        </div>
    );
}
