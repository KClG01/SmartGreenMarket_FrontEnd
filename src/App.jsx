import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import { Home } from "./pages/User/Home";
import SupplierLayout from "./layouts/SupplierLayout";
import ProductSupplierPage from "./pages/Supplier/Product";
import RegisterPage from "./pages/Supplier/RegisterPage";

export default function App() {
    return (
        <BrowserRouter>
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
                    <Route path="danh-muc" element={<CategoryPage />} />
                    <Route path="san-pham" element={<ProductSupplierPage/>} />
                </Route>
                <Route path="dang-ky-nha-cung-cap" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}