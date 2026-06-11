import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import SupplierLayout from "./layouts/SupplierLayout";
import UserProfileLayout from "./layouts/UserProfileLayout";
import DealerLayout from "./layouts/DealerLayout";

import  {HomePage}  from "./pages/User/Home";
import CartPage from "./pages/User/Cart";
import OrderPage from "./pages/User/Order";
import PaymentPage from "./pages/User/Payment";
import OrderStatusPage from "./pages/user/OrderStatus";
import UserProfilePage from "./pages/user/Profile/Profile";

import OrderSupplierPage from "./pages/Supplier/Order";
import ProductSupplierPage from "./pages/Supplier/Product";
import CertificationSupplierPage from "./pages/Supplier/Vertification";
import RegisterPage from "./pages/Supplier/RegisterPage";
import SupplierLoginPage from "./pages/Supplier/SupplierLogin";
import SupplierInfoPage from "./pages/Supplier/SupplierInfoPage";
import CategorySupplierPage from "./pages/Supplier/Category";
import CultivationSupplierPage from "./pages/Supplier/Cultivation"
import {
  AdminLoginPage,
  SettingPage,
  SupplierPage,
  CategoryPage,
  ProductPage,
  CertificationPage,
  DocumentPage,
  NotificationPage,
  DealerPage,
} from "./pages/Admin";
import { RegisterDealerPage, DealerLoginPage } from "./pages/Dealer";
import { AuthProvider } from "./contexts/authProvider";
import AdminProtectedRoute from "./contexts/adminProtectedRoute";
import SupplierProtectedRoute from "./contexts/supplierProtectedRoute";
import DealerProtectedRoute from "./contexts/dealerProtectedRoute";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<UserLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="trang-chu" element={<HomePage />} />
                        <Route path="gio-hang" element={<CartPage />} />
                        <Route path="dat-hang" element={<OrderPage />} />
                        <Route path="thanh-toan" element={<PaymentPage />} />
                        <Route path="theo-doi-don-hang" element={<OrderStatusPage />} />
                        <Route path="tai-khoan" element={<UserProfileLayout />}>
                            <Route path="" element={<UserProfilePage />} />
                        </Route>
                    </Route>
                    {/* Supplier */}
                    <Route element={<SupplierProtectedRoute />}>
                        <Route path="/nha-cung-cap" element={<SupplierLayout />}>
                            <Route index element={
                                <div className="p-8 text-sm text-neutral-400 font-['Geist',sans-serif]">
                                    Chọn mục quản lý từ sidebar.
                                </div>
                            } />
                            <Route path="san-pham" element={<ProductSupplierPage />} />
                            <Route path="don-hang" element={<OrderSupplierPage/>} />
                            <Route path="chung-nhan" element={<CertificationSupplierPage />} />
                            <Route path="thong-tin-ca-nhan" element={<SupplierInfoPage />} />
                            <Route path="danh-muc" element={<CategorySupplierPage />} />
                            <Route path="tat-ca-thong-bao" element={<NotificationPage />} />
                            <Route path="canh-tac" element={<CultivationSupplierPage />} />
                        </Route>
                    </Route>
                    <Route path="/nha-cung-cap/dang-nhap" element={<SupplierLoginPage />} />
                    <Route path="dang-ky-nha-cung-cap" element={<RegisterPage />} />


                    {/* Admin */}
                    <Route path="/quan-tri/dang-nhap" element={<AdminLoginPage />} />
                    <Route element={<AdminProtectedRoute />}>
                        <Route path="/quan-tri" element={<AdminLayout />}>
                            <Route path="cau-hinh" element={<SettingPage />} />
                            <Route path="nha-cung-cap" element={<SupplierPage />} />
                            <Route path="danh-muc" element={<CategoryPage />} />
                            <Route path="san-pham" element={<ProductPage />} />
                            <Route path="chung-chi" element={<CertificationPage />} />
                            <Route path="giay-to" element={<DocumentPage />} />
                            <Route path="tat-ca-thong-bao" element={<NotificationPage />} />
                            <Route path="dai-ly" element={<DealerPage />} />
                        </Route>
                    </Route>

                    {/* Dealer */}
                    <Route element={<DealerProtectedRoute />}>
                        <Route path="/dai-ly" element={<DealerLayout />}>
                            <Route path="tat-ca-thong-bao" element={<NotificationPage />} />
                        </Route>
                    </Route>
                    <Route path="dai-ly/dang-nhap" element={<DealerLoginPage />} />
                    <Route path="dai-ly/dang-ky" element={<RegisterDealerPage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}