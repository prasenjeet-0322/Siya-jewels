import { db, isFirebaseConfigured } from "./firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp 
} from "firebase/firestore";
import { Product, ProductReview } from "@/types/product";
import { Order, OrderStatus } from "@/types/order";
import { SAMPLE_PRODUCTS, CATEGORIES_DATA, VALID_COUPONS } from "./sampleProducts";
import { CouponDiscount } from "@/types/cart";

const STORAGE_KEYS = {
  PRODUCTS: "siya_products",
  ORDERS: "siya_orders",
  REVIEWS: "siya_reviews",
  CONTACT: "siya_contact_messages",
  WISHLIST: "siya_wishlist",
  CATEGORIES: "siya_categories",
  COUPONS: "siya_coupons",
};

// Initialize local storage defaults if empty
function ensureInitialized() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SAMPLE_PRODUCTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(CATEGORIES_DATA));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COUPONS)) {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(VALID_COUPONS));
  }
}

// --- PRODUCTS ---
export async function getProducts(): Promise<Product[]> {
  ensureInitialized();
  if (isFirebaseConfigured()) {
    try {
      const q = query(collection(db, "products"));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
      }
    } catch (e) {
      console.warn("Firestore fetch error, falling back to local catalog:", e);
    }
  }

  // Fallback to local
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
  }
  return SAMPLE_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id || p.slug === id) || null;
}

export async function saveProduct(product: Product): Promise<{ success: boolean; id: string }> {
  ensureInitialized();
  if (isFirebaseConfigured()) {
    try {
      const productRef = doc(collection(db, "products"), product.id);
      await setDoc(productRef, {
        ...product,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Firestore save product error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const existingStr = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const existing: Product[] = existingStr ? JSON.parse(existingStr) : SAMPLE_PRODUCTS;
    const index = existing.findIndex((p) => p.id === product.id);
    let updated: Product[];
    if (index > -1) {
      updated = [...existing];
      updated[index] = product;
    } else {
      updated = [product, ...existing];
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  }

  return { success: true, id: product.id };
}

export async function deleteProduct(productId: string): Promise<boolean> {
  ensureInitialized();
  if (isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, "products", productId));
    } catch (e) {
      console.warn("Firestore delete product error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const existingStr = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const existing: Product[] = existingStr ? JSON.parse(existingStr) : SAMPLE_PRODUCTS;
    const filtered = existing.filter((p) => p.id !== productId);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
  }

  return true;
}

export async function updateProductStockOrStatus(
  productId: string, 
  inStock: boolean, 
  stock?: number
): Promise<boolean> {
  const product = await getProductById(productId);
  if (!product) return false;
  const updated: Product = {
    ...product,
    inStock,
    stock: stock !== undefined ? stock : product.stock,
  };
  await saveProduct(updated);
  return true;
}

// --- ORDERS ---
export async function saveOrder(order: Order): Promise<{ success: boolean; orderId: string }> {
  ensureInitialized();
  if (isFirebaseConfigured()) {
    try {
      const orderRef = doc(collection(db, "orders"), order.id);
      await setDoc(orderRef, {
        ...order,
        createdAtServer: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Firestore save order error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const existingStr = localStorage.getItem(STORAGE_KEYS.ORDERS);
    const existing: Order[] = existingStr ? JSON.parse(existingStr) : [];
    const updated = [order, ...existing.filter((o) => o.id !== order.id)];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  }

  return { success: true, orderId: order.id };
}

export async function getAllOrdersAdmin(): Promise<Order[]> {
  ensureInitialized();
  if (isFirebaseConfigured()) {
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => d.data() as Order);
      }
    } catch (e) {
      console.warn("Firestore getAllOrdersAdmin error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const existingStr = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (existingStr) {
      try {
        return JSON.parse(existingStr);
      } catch {}
    }
  }

  return [
    {
      id: "SJ-1789046833438-4415",
      userEmail: "aanya.patel@example.com",
      items: [
        {
          id: "siya-001-12",
          product: SAMPLE_PRODUCTS[0],
          quantity: 1,
          selectedSize: "12",
          selectedPurity: "18K (75.0%)",
        },
      ],
      shippingAddress: {
        fullName: "Aanya Patel",
        phone: "+91 98765 43210",
        email: "aanya.patel@example.com",
        addressLine1: "Flat 402, Golden Heights, 12th Main",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
        country: "India",
        addressType: "Home",
      },
      subtotal: 68500,
      discount: 9500,
      couponDiscount: 0,
      tax: 2055,
      shipping: 0,
      totalAmount: 70555,
      paymentMethod: "Razorpay_UPI",
      paymentStatus: "Paid",
      razorpayPaymentId: "pay_mock_948271",
      orderStatus: "Confirmed",
      estimatedDeliveryDate: "In 3 Business Days",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "SJ-1789046123490-8821",
      userEmail: "priya.royal@siyajewels.com",
      items: [
        {
          id: "siya-002-default",
          product: SAMPLE_PRODUCTS[1],
          quantity: 1,
          selectedPurity: "22K (91.6%)",
        },
      ],
      shippingAddress: {
        fullName: "Priya Royal",
        phone: "+91 98765 99999",
        email: "priya.royal@siyajewels.com",
        addressLine1: "Villa 18, Royal Palms Estate",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400050",
        country: "India",
        addressType: "Home",
      },
      subtotal: 185000,
      discount: 30000,
      couponDiscount: 5000,
      couponCode: "GOLDEN2026",
      tax: 5400,
      shipping: 0,
      totalAmount: 185400,
      paymentMethod: "Razorpay_Card",
      paymentStatus: "Paid",
      razorpayPaymentId: "pay_mock_817263",
      orderStatus: "Processing",
      estimatedDeliveryDate: "In 2 Business Days",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export async function getUserOrders(userEmailOrId: string): Promise<Order[]> {
  const allOrders = await getAllOrdersAdmin();
  if (userEmailOrId === "guest" || userEmailOrId === "admin@siyajewels.com") {
    return allOrders;
  }
  return allOrders.filter(
    (o) =>
      o.userEmail?.toLowerCase() === userEmailOrId.toLowerCase() ||
      o.userId === userEmailOrId
  );
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const allOrders = await getAllOrdersAdmin();
  return allOrders.find((o) => o.id === orderId) || null;
}

export async function updateOrderStatus(
  orderId: string, 
  status: OrderStatus, 
  trackingNumber?: string
): Promise<boolean> {
  ensureInitialized();
  if (isFirebaseConfigured()) {
    try {
      const docRef = doc(db, "orders", orderId);
      await updateDoc(docRef, {
        orderStatus: status,
        ...(trackingNumber ? { trackingNumber } : {}),
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Firestore updateOrderStatus error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const existingStr = localStorage.getItem(STORAGE_KEYS.ORDERS);
    const existing: Order[] = existingStr ? JSON.parse(existingStr) : [];
    const updated = existing.map((o) =>
      o.id === orderId
        ? {
            ...o,
            orderStatus: status,
            ...(trackingNumber ? { trackingNumber } : {}),
            updatedAt: new Date().toISOString(),
          }
        : o
    );
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  }

  return true;
}

// --- CATEGORIES ---
export interface CategoryItem {
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export async function getCategoriesAdmin(): Promise<CategoryItem[]> {
  ensureInitialized();
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
  }
  return CATEGORIES_DATA;
}

export async function saveCategory(category: CategoryItem): Promise<boolean> {
  ensureInitialized();
  if (typeof window !== "undefined") {
    const existing = await getCategoriesAdmin();
    const index = existing.findIndex((c) => c.slug === category.slug);
    let updated: CategoryItem[];
    if (index > -1) {
      updated = [...existing];
      updated[index] = category;
    } else {
      updated = [...existing, category];
    }
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
  }
  return true;
}

export async function deleteCategory(slug: string): Promise<boolean> {
  ensureInitialized();
  if (typeof window !== "undefined") {
    const existing = await getCategoriesAdmin();
    const filtered = existing.filter((c) => c.slug !== slug);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered));
  }
  return true;
}

// --- COUPONS ---
export async function getCouponsAdmin(): Promise<CouponDiscount[]> {
  ensureInitialized();
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
  }
  return VALID_COUPONS;
}

export async function saveCoupon(coupon: CouponDiscount): Promise<boolean> {
  ensureInitialized();
  if (typeof window !== "undefined") {
    const existing = await getCouponsAdmin();
    const index = existing.findIndex((c) => c.code === coupon.code);
    let updated: CouponDiscount[];
    if (index > -1) {
      updated = [...existing];
      updated[index] = coupon;
    } else {
      updated = [coupon, ...existing];
    }
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(updated));
  }
  return true;
}

export async function deleteCoupon(code: string): Promise<boolean> {
  ensureInitialized();
  if (typeof window !== "undefined") {
    const existing = await getCouponsAdmin();
    const filtered = existing.filter((c) => c.code !== code);
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(filtered));
  }
  return true;
}

// --- CONTACT FORM ---
export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export async function submitContactForm(msg: ContactMessage): Promise<boolean> {
  if (isFirebaseConfigured()) {
    try {
      await addDoc(collection(db, "contacts"), {
        ...msg,
        createdAtServer: serverTimestamp(),
      });
      return true;
    } catch (e) {
      console.warn("Firestore contact error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const existingStr = localStorage.getItem(STORAGE_KEYS.CONTACT);
    const list: ContactMessage[] = existingStr ? JSON.parse(existingStr) : [];
    list.unshift(msg);
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(list));
  }
  return true;
}

// --- REVIEWS ---
export async function addProductReview(productId: string, review: ProductReview): Promise<boolean> {
  if (isFirebaseConfigured()) {
    try {
      await addDoc(collection(db, "reviews"), {
        productId,
        ...review,
        createdAtServer: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Firestore review error:", e);
    }
  }

  if (typeof window !== "undefined") {
    const existingStr = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    const reviewsMap: Record<string, ProductReview[]> = existingStr ? JSON.parse(existingStr) : {};
    if (!reviewsMap[productId]) reviewsMap[productId] = [];
    reviewsMap[productId].unshift(review);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviewsMap));
  }
  return true;
}
