import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";
import AppToaster from "../components/common/AppToaster";
import SideBar from "../components/Admin/UI/SideBar";
import AdminLogo from "../components/Admin/UI/AdminLogo";
import NotificationBell from "../components/common/NotificationBell";

export default function AdminLayout() {
    const { user } = useAuth();
    const adminName =
        user?.full_name ||
        user?.username ||
        user?.account?.username ||
        "Admin";

    return (
        <div className="min-h-screen bg-neutral-50">
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-emerald-900/10 bg-[#eef2ef]">
                <div className="flex h-16 items-center justify-between px-6">
                    <div className="w-72">
                        <AdminLogo />
                    </div>

                    <div className="flex items-center gap-3">
                        <NotificationBell role="admin" />

                        <div className="flex items-center gap-2 border-l border-emerald-900/10 pl-4">
                            <button
                                type="button"
                                className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-slate-800 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-900"
                            >A
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <SideBar />

            <main className="min-h-screen bg-neutral-50 pl-64 pt-16">
                <Outlet />
            </main>

            <AppToaster />
        </div>
    );
}
