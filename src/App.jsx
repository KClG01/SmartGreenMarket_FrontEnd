import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import { Home } from "./pages/User/Home";
import SupplierLayout from "./layouts/SupplierLayout";
import InventorySupplierPage from "./pages/Supplier/Inventory";
import RegisterPage from "./pages/Supplier/RegisterPage";
import AdminLoginPage from "./pages/Admin/AdminLogin";
import { AuthProvider } from "./contexts/authProvider";
import AdminProtectedRoute from "./contexts/adminProtectedRoute";
import SettingPage from "./pages/Admin/Setting";
import SupplierPage from "./pages/Admin/Suppiler";
import CategoryPage from "./pages/Admin/Category";
import ProductPage from "./pages/Admin/Product";
import CertificationPage from "./pages/Admin/Certification";
import DocumentPage from "./pages/Admin/Document";
import ProductSupplierPage from "./pages/Supplier/Product";
import CertificationSupplierPage from "./pages/Supplier/Vertification";

export default function App() {
    return (
        <BrowserRouter>
            {/* <AuthProvider> */}
                <Routes>
                    <Route path="/" element={<UserLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                    {/* Supplier */}
                    <Route path="/nha-cung-cap" element={<SupplierLayout />}>
                        <Route index element={
                            <div className="p-8 text-sm text-neutral-400 font-['Geist',sans-serif]">
                                Chọn mục quản lý từ sidebar.
                            </div>
                        } />
                        <Route path="san-pham" element={<ProductSupplierPage />} />
                        <Route path="ton-kho" element={<InventorySupplierPage/>} />
                        <Route path="chung-nhan" element={<CertificationSupplierPage />} />
                    </Route>
                    <Route path="dang-ky-nha-cung-cap" element={<RegisterPage />} />

                    <Route path="/admin/login" element={<AdminLoginPage />} />

                    {/* User */}
                    <Route path="/" element={<UserLayout />}>
                        <Route index element={<Home />} />
                        <Route path="trang-chu" element={<Home />} />
                    </Route>

                    {/* Admin */}
                    {/* <Route element={<AdminProtectedRoute />}> */}
                    <Route path="/quan-tri" element={<AdminLayout />}>
                        <Route path="cau-hinh" element={<SettingPage />} />
                        <Route path="nha-cung-cap" element={<SupplierPage />} />
                        <Route path="danh-muc" element={<CategoryPage />} />
                        <Route path="san-pham" element={<ProductPage />} />
                        <Route path="chung-chi" element={<CertificationPage />} />
                        <Route path="giay-to" element={<DocumentPage />} />
                    </Route>
                    {/* </Route> */}
                </Routes>
            {/* </AuthProvider> */}
        </BrowserRouter>
    );
}