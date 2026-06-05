import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import { Home } from "./pages/User/Home";
import CategoryPage from "./pages/Admin/Category";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* User */}
                <Route path="/" element={<UserLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/trang-chu" element={<Home />} />
                </Route>

                {/* Admin */}
                <Route path="/quan-tri" element={<AdminLayout />}>
                    <Route index element={
                        <div className="p-8 text-sm text-neutral-400 font-['Geist',sans-serif]">
                            Chọn mục quản lý từ sidebar.
                        </div>
                    } />
                    <Route path="danh-muc" element={<CategoryPage />} />
                    {/* Thêm các route khác tại đây: config, suppliers, agents, users, products */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}