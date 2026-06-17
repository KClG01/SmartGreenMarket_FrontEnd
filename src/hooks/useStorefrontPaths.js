import { useParams } from "react-router-dom";
import { getStoredDealerSlug } from "../utils/buyerAuthUtils";

export function useDealerSlug() {
    const { dealerSlug } = useParams();
    return dealerSlug || getStoredDealerSlug() || "";
}

export function useStorefrontPaths() {
    const slug = useDealerSlug();
    const prefix = slug ? `/cua-hang/${encodeURIComponent(slug)}` : "";

    return {
        slug,
        home: prefix ? `${prefix}/trang-chu` : "/trang-chu",
        product: (id) => (prefix ? `${prefix}/san-pham/${id}` : `/san-pham/${id}`),
        search: (query = "", extraParams = {}) => {
            const path = prefix ? `${prefix}/tim-kiem` : "/tim-kiem";
            const params = new URLSearchParams();
            const trimmed = String(query).trim();
            if (trimmed) params.set("q", trimmed);
            Object.entries(extraParams).forEach(([key, value]) => {
                if (value != null && value !== "") params.set(key, value);
            });
            const qs = params.toString();
            return qs ? `${path}?${qs}` : path;
        },
        cart: prefix ? `${prefix}/gio-hang` : "/gio-hang",
        login: prefix ? `${prefix}/dang-nhap` : "/dang-nhap",
        register: prefix ? `${prefix}/dang-ky` : "/dang-ky",
        account: prefix ? `${prefix}/tai-khoan` : "/tai-khoan",
        orderStatus: prefix ? `${prefix}/theo-doi-don-hang` : "/theo-doi-don-hang",
    };
}
