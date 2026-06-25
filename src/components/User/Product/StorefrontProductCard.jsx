import { Link, useNavigate } from "react-router-dom";
import AddToCartButton from "../Cart/AddToCartButton";
import { useAuth } from "../../../contexts/authProvider";
import { useStorefrontPaths } from "../../../hooks/useStorefrontPaths";
import { isBuyerUser } from "../../../utils/buyerAuthUtils";
import { buildCartItemFromProduct } from "../../../utils/cartUtils";
import { showAddToCartFeedback } from "../../../utils/cartAddFeedback";
import ProductImage from "./ProductImage";
import { formatAvailableQuantityLabel } from "../../../utils/userProductUtils";

export default function StorefrontProductCard({
    id,
    name = "Sản phẩm",
    price = "0đ",
    unit = "",
    unitKey = "kg",
    priceValue = 0,
    image,
    availableQuantity = 0,
    inStock = true,
    badge,
    showAddToCart = true,
    layout = "grid",
    className = "",
}) {
    const navigate = useNavigate();
    const paths = useStorefrontPaths();
    const { user } = useAuth();
    const productPath = id ? paths.product(id) : null;

    const stockLabel = formatAvailableQuantityLabel(
        availableQuantity,
        unit,
        inStock,
    );

    const unitSuffix = unit
        ? unit.startsWith("/")
            ? unit
            : `/${unit}`
        : "";

    const cartProduct = {
        id,
        name,
        priceValue,
        unitKey,
        unit: unitKey,
        image,
        availableQuantity,
        available_quantity: availableQuantity,
    };

    const handleBuyNow = () => {
        if (!inStock) return;

        const buyNowItem = buildCartItemFromProduct(cartProduct, 1);

        if (!isBuyerUser(user)) {
            showAddToCartFeedback({
                added: false,
                reason: "auth_required",
                showToast: true,
            });
            navigate(paths.login, {
                state: { from: paths.checkout, buyNow: buyNowItem },
            });
            return;
        }

        navigate(paths.checkout, { state: { buyNow: buyNowItem } });
    };

    return (
        <article
            className={`group/card relative flex flex-col overflow-hidden rounded-2xl border border-stone-100/90 bg-white shadow-[0_1px_3px_rgba(6,78,59,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-[0_12px_40px_rgba(6,78,59,0.1)] ${
                layout === "carousel" ? "w-[260px] shrink-0" : "h-full w-full"
            } ${className}`}
        >
            {productPath ? (
                <Link
                    to={productPath}
                    className="block no-underline"
                    draggable={false}
                >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-stone-50 p-4">
                        <ProductImage
                            src={image}
                            alt={name}
                            className="h-full w-full transition-transform duration-500 group-hover/card:scale-[1.04]"
                        />

                        {badge ? (
                            <span className="absolute right-3 top-3 rounded-full bg-amber-500/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                                {badge}
                            </span>
                        ) : null}

                        {!inStock ? (
                            <span className="absolute left-3 top-3 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600 shadow-sm">
                                Hết hàng
                            </span>
                        ) : (
                            <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm">
                                {stockLabel}
                            </span>
                        )}
                    </div>

                    <h3 className="line-clamp-2 px-4 pt-3 text-[15px] font-semibold leading-snug text-emerald-950">
                        {name}
                    </h3>
                </Link>
            ) : (
                <>
                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-stone-50 p-4">
                        <ProductImage src={image} alt={name} className="h-full w-full" />
                        {!inStock ? (
                            <span className="absolute left-3 top-3 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600 shadow-sm">
                                Hết hàng
                            </span>
                        ) : (
                            <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm">
                                {stockLabel}
                            </span>
                        )}
                    </div>
                    <h3 className="line-clamp-2 px-4 pt-3 text-[15px] font-semibold leading-snug text-emerald-950">
                        {name}
                    </h3>
                </>
            )}

            <div className="mt-2 flex flex-1 flex-col px-4 pb-4">
                <div className="flex items-center justify-between gap-2">
                    <p className="min-w-0 text-lg font-bold tracking-tight text-emerald-700">
                        {price}
                        {unitSuffix ? (
                            <span className="ml-0.5 text-sm font-medium text-stone-400">
                                {unitSuffix}
                            </span>
                        ) : null}
                    </p>

                    {showAddToCart ? (
                        <AddToCartButton
                            product={cartProduct}
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 transition-all hover:border-emerald-300 hover:bg-emerald-100 active:scale-95 ${
                                inStock ? "" : "pointer-events-none opacity-40"
                            }`}
                            iconClassName="h-4 w-4"
                        />
                    ) : null}
                </div>

                <div className="my-3 border-t border-stone-100" />

                <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={!inStock}
                    className="cursor-pointer w-full rounded-xl border-2 border-emerald-700 py-2.5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 disabled:pointer-events-none disabled:opacity-40"
                >
                    Mua ngay
                </button>
            </div>
        </article>
    );
}
