import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authProvider";

export default function DealerProtectedRoute() {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-neutral-500">
                Đang tải...
            </div>
        );
    }
    if (!user || user.role !== "dealer") {
        return (
            <Navigate
                to="/dai-ly/dang-nhap"
                replace
            />
        );
    }
    return <Outlet />;
}