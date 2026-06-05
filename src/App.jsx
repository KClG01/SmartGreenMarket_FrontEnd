import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import { Home } from "./pages/User/Home";
import SettingPage from "./pages/Admin/Setting";
import SupplierPage from "./pages/Admin/Suppiler";
import CategoryPage from "./pages/Admin/Category";
import ProductPage from "./pages/Admin/Product";
import CertificationPage from "./pages/Admin/Certification";

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
                    <Route path="cau-hinh" element={<SettingPage />} />
                    <Route path="nha-cung-cap" element={<SupplierPage />} />
                    <Route path="danh-muc" element={<CategoryPage />} />
                    <Route path="san-pham" element={<ProductPage />} />
                    <Route path="chung-chi" element={<CertificationPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}