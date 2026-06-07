import React, { useState } from "react";

export default function Step2({ onNext, onBack }) {
  const [form, setForm] = useState({
    company_name: "",
    tax_code: "",
    phone: "",
    address: "",
    description: "",
  });

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = () => {
    // TODO: PATCH /supplier/profile
    // payload: { company_name, tax_code, phone, address, description }
    console.log("Step 2 payload:", form);
    onNext();
  };

  return (
    <div className="animate-[fadeSlide_0.28s_ease]">
      <h2 className="text-[28px] font-extrabold text-[#141b2b] tracking-tight mb-1">
        Thông tin doanh nghiệp
      </h2>
      <p className="text-[13.5px] text-[#5a6a5e] leading-relaxed mb-8">
        Điền thông tin để xác minh tư cách nhà cung cấp của bạn.
      </p>

      <Field label="🏢 Tên công ty / hộ kinh doanh">
        <input
          value={form.company_name}
          onChange={set("company_name")}
          placeholder="VD: Công ty Nông Sản ABC"
        />
      </Field>

      <Field label="🔢 Mã số thuế">
        <input
          value={form.tax_code}
          onChange={set("tax_code")}
          placeholder="0123456789"
        />
      </Field>

      <Field label="📱 Số điện thoại liên hệ">
        <input
          type="tel"
          value={form.phone}
          onChange={set("phone")}
          placeholder="090 123 4567"
        />
      </Field>

      <Field label="📍 Địa chỉ">
        <input
          value={form.address}
          onChange={set("address")}
          placeholder="123 Đường X, Quận Y, Hà Nội"
        />
      </Field>

      <Field label="📝 Mô tả hoạt động kinh doanh">
        <textarea
          value={form.description}
          onChange={set("description")}
          placeholder="Chuyên cung cấp rau củ hữu cơ, trái cây sạch..."
          rows={3}
          className="w-full px-4 py-3 bg-[#f1f5f2] border border-[#d1e5d9] rounded-xl text-[14px] text-[#141b2b] outline-none transition-all focus:border-[#006c49] focus:shadow-[0_0_0_3px_rgba(0,108,73,0.12)] focus:bg-white placeholder:text-[#a3b5a8] resize-y min-h-[84px] font-[inherit]"
        />
      </Field>

      <div className="flex gap-3 mt-2">
        <button
          onClick={onBack}
          className="px-5 py-3 bg-white text-[#006c49] border border-[#d1e5d9] rounded-xl text-[14px] font-semibold hover:border-[#006c49] hover:bg-[#f0faf4] transition-all"
        >
          ← Quay lại
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-3 bg-[#006c49] hover:bg-[#005038] text-white rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
        >
          Tiếp tục →
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#3c4a42] mb-1.5">
        {label}
      </label>
      {children.type === "textarea"
        ? children
        : React.cloneElement(children, {
            className:
              "w-full px-4 py-3 bg-[#f1f5f2] border border-[#d1e5d9] rounded-xl text-[14px] text-[#141b2b] outline-none transition-all focus:border-[#006c49] focus:shadow-[0_0_0_3px_rgba(0,108,73,0.12)] focus:bg-white placeholder:text-[#a3b5a8]",
          })}
    </div>
  );
}
