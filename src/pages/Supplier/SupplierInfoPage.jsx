import { useState } from "react";
import { supplierService } from "../../services/api/suppilerService";
// ---- Mock data ----
const mockSupplierData = {
  id: 9,
  account: {
    id: 18,
    username: "QuocKhanh",
    email: "abc123@gmail.com",
    first_name: "",
    last_name: "",
    full_name: "Nguyễn Văn A",
    phone: "0123586974",
    avatar_url: null,
    role: "supplier",
    status: "active",
    created_at: "2026-06-08T01:31:58.776439Z",
    updated_at: "2026-06-08T04:04:35.315469Z",
  },
  company_name: "Công ty TNHH Minh Nhựa",
  tax_code: "0254718693",
  phone: "0258974630",
  address: "65 Huỳnh Thúc Kháng, phường Sài Gòn",
  description: "Rau rất sạch",
  verification_status: "approved",
  verified_by: 2,
  verified_by_username: "admin",
  verified_at: "2026-06-08T04:04:35.312340Z",
  rejection_reason: "",
  created_at: "2026-06-08T01:32:46.178439Z",
  updated_at: "2026-06-08T16:43:51.304671Z",
};

// ---- Helpers ----
const verificationLabel = {
  approved: "Đã xác minh",
  pending: "Chờ xét duyệt",
  rejected: "Từ chối",
};
const statusLabel = { active: "Đang hoạt động", inactive: "Ngừng hoạt động" };

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}
function formatPhone(phone) {
  if (!phone) return "—";
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
}

// ---- Sub-components ----
function Avatar({ name, url }) {
  const initials = name
    ? name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase()
    : "?";
  if (url)
    return <img src={url} alt={name} className="w-32 h-32 rounded-xl object-cover" />;
  return (
    <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-[#2D6A4F] to-[#52B788] flex items-center justify-center text-white font-bold text-xl select-none">
      {initials}
    </div>
  );
}

// ---- Modal xác nhận đổi ảnh đại diện ----
function AvatarConfirmModal({ previewUrl, onConfirm, onCancel, isSaving }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={!isSaving ? onCancel : undefined} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 z-10">
        <h3 className="text-base font-semibold text-gray-900 mb-1">Xác nhận cập nhật ảnh</h3>
        <p className="text-xs text-gray-400 mb-5">Ảnh đại diện mới của bạn sẽ được lưu sau khi xác nhận.</p>

        {/* Preview */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#D8F3DC] shadow-md"
            />
            <span className="absolute -bottom-2 -right-2 bg-[#2D6A4F] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
              Mới
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={isSaving}
            className={`flex-1 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              isSaving ? "bg-[#52B788] cursor-not-allowed" : "bg-[#2D6A4F] hover:bg-[#1B4332]"
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang lưu...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Xác nhận
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Badge({ label, variant = "default" }) {
  const styles = {
    green: "bg-[#D8F3DC] text-[#1B4332] border border-[#B7E4C7]",
    yellow: "bg-yellow-50 text-yellow-800 border border-yellow-200",
    red: "bg-red-50 text-red-700 border border-red-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    gray: "bg-gray-100 text-gray-600 border border-gray-200",
    default: "bg-gray-100 text-gray-600 border border-gray-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[variant]}`}>
      {label}
    </span>
  );
}

function InfoField({ label, value, wide = false }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value || "—"}</p>
    </div>
  );
}

// ---- Section: Thông tin cá nhân ----
function PersonalSection({ supplier, onEdit, onPickAvatar }) {
  const { account } = supplier;
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="font-semibold text-gray-900">Thông tin cá nhân</h2>
          <p className="text-xs text-gray-400 mt-0.5">Thông tin tài khoản đăng nhập</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-4 py-2 border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#D8F3DC] text-sm font-medium rounded-lg transition-colors cursor-pointer">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Cập nhật ảnh
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={onPickAvatar}
            />
          </label>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Chỉnh sửa
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Avatar row */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="relative">
            <Avatar name={account.full_name} url={account.avatar_url} />
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${account.status === "active" ? "bg-[#52B788]" : "bg-gray-300"}`}
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{account.full_name}</p>
            <p className="text-sm text-gray-500 mb-2">@{account.username}</p>
            <div className="flex gap-2 flex-wrap">
              <Badge label="Nhà cung cấp" variant="blue" />
              <Badge
                label={statusLabel[account.status] || account.status}
                variant={account.status === "active" ? "green" : "gray"}
              />
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          <InfoField label="Họ và tên" value={account.full_name} />
          <InfoField label="Email" value={account.email} />
          <InfoField label="Số điện thoại" value={formatPhone(account.phone)} />
          <InfoField label="Tên đăng nhập" value={account.username} />
          <InfoField label="Ngày tạo tài khoản" value={formatDate(account.created_at)} />
          <InfoField label="Cập nhật lần cuối" value={formatDate(account.updated_at)} />
        </div>
      </div>
    </div>
  );
}

// ---- Section: Thông tin doanh nghiệp ----
function CompanySection({ supplier, onEdit }) {
  const vs = supplier.verification_status;
  const vsBanner = {
    approved: { bg: "bg-[#D8F3DC] border-[#B7E4C7]", text: "text-[#1B4332]", sub: "text-[#2D6A4F]", icon: "✅" },
    pending:  { bg: "bg-yellow-50 border-yellow-200", text: "text-yellow-800", sub: "text-yellow-600", icon: "⏳" },
    rejected: { bg: "bg-red-50 border-red-200", text: "text-red-800", sub: "text-red-600", icon: "❌" },
  }[vs] || { bg: "bg-gray-50 border-gray-200", text: "text-gray-700", sub: "text-gray-500", icon: "❓" };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="font-semibold text-gray-900">Thông tin doanh nghiệp</h2>
          <p className="text-xs text-gray-400 mt-0.5">Thông tin pháp lý và liên hệ công ty</p>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm font-medium rounded-lg transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Chỉnh sửa
        </button>
      </div>

      <div className="p-6">
        {/* Verification banner */}
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-6 border ${vsBanner.bg}`}>
          <span>{vsBanner.icon}</span>
          <div>
            <p className={`text-sm font-semibold ${vsBanner.text}`}>
              {verificationLabel[vs] || vs}
            </p>
            {vs === "approved" && (
              <p className={`text-xs ${vsBanner.sub}`}>
                Xác minh bởi <span className="font-semibold">@{supplier.verified_by_username}</span> lúc {formatDate(supplier.verified_at)}
              </p>
            )}
            {vs === "rejected" && supplier.rejection_reason && (
              <p className={`text-xs ${vsBanner.sub}`}>Lý do: {supplier.rejection_reason}</p>
            )}
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          <InfoField label="Mã nhà cung cấp" value={`#${supplier.id}`} />
          <InfoField label="Tên công ty" value={supplier.company_name} />
          <InfoField label="Mã số thuế" value={supplier.tax_code} />
          <InfoField label="Số điện thoại doanh nghiệp" value={formatPhone(supplier.phone)} />
          <InfoField label="Địa chỉ" value={supplier.address} wide />
          <InfoField label="Mô tả" value={supplier.description} wide />

          <div className="col-span-2 border-t border-dashed border-gray-200 pt-1">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Thông tin xác minh</p>
          </div>

          <InfoField
            label="Trạng thái xác minh"
            value={verificationLabel[supplier.verification_status] || supplier.verification_status}
          />
          <InfoField
            label="Xác minh bởi"
            value={supplier.verified_by_username}
          />
          <InfoField label="Thời điểm xác minh" value={formatDate(supplier.verified_at)} />
          {supplier.rejection_reason ? (
            <InfoField label="Lý do từ chối" value={supplier.rejection_reason} />
          ) : (
            <InfoField label="Lý do từ chối" value="Không có" />
          )}

          <div className="col-span-2 border-t border-dashed border-gray-200 pt-1">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Thời gian</p>
          </div>

          <InfoField label="Ngày đăng ký" value={formatDate(supplier.created_at)} />
          <InfoField label="Cập nhật lần cuối" value={formatDate(supplier.updated_at)} />
        </div>
      </div>
    </div>
  );
}

// ---- Modal chỉnh sửa thông tin cá nhân ----
function EditPersonalModal({ account, onClose, onSave }) {
  // Lưu giá trị gốc để so sánh dirty check
  const initial = {
    full_name: account.full_name,
    email: account.email,
    phone: account.phone,
  };

  const [form, setForm] = useState(initial);

  // Có thay đổi so với dữ liệu gốc không?
  const isDirty = Object.keys(initial).some((key) => form[key] !== initial[key]);

  const fields = [
    { label: "Họ và tên", key: "full_name", type: "text" },
    { label: "Email", key: "email", type: "email" },
    { label: "Số điện thoại", key: "phone", type: "tel" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 z-10">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Chỉnh sửa thông tin cá nhân</h3>
        <div className="flex flex-col gap-4">
          {fields.map(({ label, key, type }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D8F3DC] transition-all ${
                  form[key] !== initial[key]
                    ? "border-[#2D6A4F] focus:border-[#2D6A4F]"
                    : "border-gray-200 focus:border-[#52B788]"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
          >
            Hủy
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!isDirty}
            className={`flex-1 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-all ${
              isDirty
                ? "bg-[#2D6A4F] hover:bg-[#1B4332] cursor-pointer"
                : "bg-[#B7E4C7] cursor-not-allowed opacity-70"
            }`}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Modal chỉnh sửa thông tin doanh nghiệp ----
function EditCompanyModal({ supplier, onClose, onSave, isSaving }) {
  // Lưu giá trị gốc để so sánh dirty check
  const initial = {
    company_name: supplier.company_name,
    tax_code: supplier.tax_code,
    phone: supplier.phone,
    address: supplier.address,
    description: supplier.description,
  };

  const [form, setForm] = useState(initial);

  // Có thay đổi so với dữ liệu gốc không?
  const isDirty = Object.keys(initial).some((key) => form[key] !== initial[key]);

  const fields = [
    { label: "Tên công ty", key: "company_name", type: "text" },
    { label: "Mã số thuế", key: "tax_code", type: "text" },
    { label: "Số điện thoại doanh nghiệp", key: "phone", type: "tel" },
    { label: "Địa chỉ", key: "address", type: "text" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={!isSaving ? onClose : undefined} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 z-10 max-h-[90vh] overflow-y-auto">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Chỉnh sửa thông tin doanh nghiệp</h3>
        <div className="flex flex-col gap-4">
          {fields.map(({ label, key, type }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                disabled={isSaving}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D8F3DC] transition-all disabled:bg-gray-100 disabled:text-gray-500 ${
                  form[key] !== initial[key]
                    ? "border-[#2D6A4F] focus:border-[#2D6A4F]"
                    : "border-gray-200 focus:border-[#52B788]"
                }`}
              />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Mô tả</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              disabled={isSaving}
              className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#D8F3DC] transition-all resize-none disabled:bg-gray-100 disabled:text-gray-500 ${
                form.description !== initial.description
                  ? "border-[#2D6A4F] focus:border-[#2D6A4F]"
                  : "border-gray-200 focus:border-[#52B788]"
              }`}
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hủy
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={isSaving || !isDirty}
            className={`flex-1 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center ${
              isSaving
                ? "bg-[#52B788] cursor-not-allowed"
                : isDirty
                ? "bg-[#2D6A4F] hover:bg-[#1B4332] cursor-pointer"
                : "bg-[#B7E4C7] cursor-not-allowed opacity-70"
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang lưu...
              </>
            ) : (
              "Lưu thay đổi"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function SupplierProfileContent({ supplierData = mockSupplierData }) {
  const [supplier, setSupplier] = useState(supplierData);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(false);
  const [isUpdatingCompany, setIsUpdatingCompany] = useState(false);

  // Avatar confirm flow
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handlePickAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleConfirmAvatar = async () => {
    if (!avatarFile) return;
    try {
      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      // TODO: thay bằng API thực tế
      // const data = await accountService.updateAvatar(formData);
      await new Promise((r) => setTimeout(r, 1200));

      setSupplier((s) => ({ ...s, account: { ...s.account, avatar_url: avatarPreview } }));
      setAvatarPreview(null);
      setAvatarFile(null);
    } catch (err) {
      console.error("Lỗi upload avatar:", err);
      alert("Tải ảnh thất bại. Vui lòng thử lại!");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleCancelAvatar = () => {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const handleSavePersonal = (form) => {
    setSupplier((s) => ({ ...s, account: { ...s.account, ...form } }));
    setEditingPersonal(false);
  };

  const handleSaveCompany = async (form) => {
    try {
      setIsUpdatingCompany(true);
      await supplierService.update(supplier.id, form);
      setSupplier((s) => ({ ...s, ...form }));
      setEditingCompany(false);
      alert("Cập nhật thông tin doanh nghiệp thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại!");
    } finally {
      setIsUpdatingCompany(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Thông tin nhà cung cấp</h1>
        <p className="text-sm text-gray-500 mt-1">Quản lý thông tin tài khoản và doanh nghiệp của bạn</p>
      </div>

      <div className="flex flex-col gap-4">
        <PersonalSection
          supplier={supplier}
          onEdit={() => setEditingPersonal(true)}
          onPickAvatar={handlePickAvatar}
        />
        <CompanySection supplier={supplier} onEdit={() => setEditingCompany(true)} />
      </div>

      {editingPersonal && (
        <EditPersonalModal
          account={supplier.account}
          onClose={() => setEditingPersonal(false)}
          onSave={handleSavePersonal}
        />
      )}

      {editingCompany && (
        <EditCompanyModal
          supplier={supplier}
          onClose={() => setEditingCompany(false)}
          onSave={handleSaveCompany}
          isSaving={isUpdatingCompany}
        />
      )}

      {avatarPreview && (
        <AvatarConfirmModal
          previewUrl={avatarPreview}
          onConfirm={handleConfirmAvatar}
          onCancel={handleCancelAvatar}
          isSaving={uploadingAvatar}
        />
      )}
    </>
  );
}

// ================================================================
// Preview wrapper — mô phỏng Kamereo layout để dễ xem thử
// Xoá phần này khi tích hợp vào project thực
// ================================================================
const NAV_ITEMS = [
  { key: "home",     icon: "⊞", label: "Trang chủ" },
  { key: "config",   icon: "⚙", label: "Quản lý cấu hình" },
  { key: "products", icon: "📦", label: "Quản lý sản phẩm" },
  { key: "stock",    icon: "🗄", label: "Quản lý tồn kho" },
  { key: "certs",    icon: "✓",  label: "Quản lý chứng nhận" },
  { key: "orders",   icon: "🛒", label: "Quản lý đơn hàng" },
  { key: "profile",  icon: "👤", label: "Thông tin nhà cung cấp" },
];

export default function KamereoLayoutPreview() {
  const [activeNav, setActiveNav] = useState("profile");

  return (
    <div className="flex h-screen bg-[#F5F5F0] font-sans text-sm overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {activeNav === "profile" ? (
            <SupplierProfileContent />
          ) : activeNav === "certs" ? (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Quản lý Chứng nhận</h1>
              <p className="text-sm text-gray-500">Theo dõi và quản lý các chứng nhận kiểm định chất lượng sản phẩm</p>
              <div className="mt-8 bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400">
                Nội dung trang chứng nhận...
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400">
              Chọn "Thông tin nhà cung cấp" để xem demo
            </div>
          )}
        </main>
      </div>
    </div>
  );
}