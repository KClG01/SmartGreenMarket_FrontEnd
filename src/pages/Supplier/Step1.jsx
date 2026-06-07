import React, { useState } from "react";

export default function Step1({ onNext }) {
  const [form, setForm] = useState({
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    password: "",
    repassword: "",
  });

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = () => {
    // TODO: POST /auth/register
    // payload: { username, email, password, repassword, first_name, last_name, phone, role: "supplier" } 
    console.log("Step 1 payload:", {
      username: form.email.split("@")[0],
      email: form.email,
      password: form.password,
      repassword: form.repassword,
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      role: "supplier",
    });
    onNext();
  };

  return (
    <div className="animate-[fadeSlide_0.28s_ease]">
      <h2 className="text-[28px] font-extrabold text-[#141b2b] tracking-tight mb-1">Tạo tài khoản</h2>
      <p className="text-[13.5px] text-[#5a6a5e] leading-relaxed mb-8">
        Đăng ký nhà cung cấp trên Smart Green Market.
      </p>

      {/* Name row */}
      <div className="flex gap-3 mb-4">
        <Field label="👤 Họ">
          <input
            value={form.last_name}
            onChange={set("last_name")}
            placeholder="VD: Nguyễn"
          />
        </Field>
        <Field label="👤 Tên">
          <input
            value={form.first_name}
            onChange={set("first_name")}
            placeholder="VD: Văn A"
          />
        </Field>
      </div>

      <Field label="✉️ Email công việc">
        <input type="email" value={form.email} onChange={set("email")} placeholder="name@company.com" />
      </Field>
      <Field label="📱 Số điện thoại">
        <input type="tel" value={form.phone} onChange={set("phone")} placeholder="090 123 4567" />
      </Field>
      <Field label="🔒 Mật khẩu">
        <input type="password" value={form.password} onChange={set("password")} placeholder="••••••••" />
      </Field>
      <Field label="🔒 Xác nhận mật khẩu">
        <input type="password" value={form.repassword} onChange={set("repassword")} placeholder="••••••••" />
      </Field>

      <button onClick={handleSubmit} className="w-full mt-2 py-4 bg-[#006c49] hover:bg-[#005038] text-white rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5">
        Tiếp tục <span>→</span>
      </button>

      <br/>
      <p className="text-[13px] text-[#5a6a5e] text-center">
        Đã có tài khoản?{" "}
        <a href="#" className="text-[#006c49] font-bold no-underline">
          Đăng nhập ngay
        </a>
      </p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-4 flex-1">
      <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#3c4a42] mb-1.5">
        {label}
      </label>
      {React.cloneElement(children, {
        className:
          "w-full px-4 py-3 bg-[#f1f5f2] border border-[#d1e5d9] rounded-xl text-[14px] text-[#141b2b] outline-none transition-all focus:border-[#006c49] focus:shadow-[0_0_0_3px_rgba(0,108,73,0.12)] focus:bg-white placeholder:text-[#a3b5a8]",
      })}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-[#d1e5d9]" />
      <span className="text-[10px] font-bold text-[#7a8f7e] tracking-widest whitespace-nowrap">
        HOẶC TIẾP TỤC VỚI
      </span>
      <div className="flex-1 h-px bg-[#d1e5d9]" />
    </div>
  );
}

function SocialBtn({ icon, label }) {
  return (
    <button className="flex-1 py-3 border border-[#d1e5d9] rounded-xl bg-white text-[14px] text-[#141b2b] font-medium flex items-center justify-center gap-2 hover:border-[#006c49] hover:bg-[#f0faf4] transition-all">
      {icon} {label}
    </button>
  );
}
