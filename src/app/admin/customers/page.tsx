"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Users, 
  Search, 
  ShoppingBag, 
  Phone, 
  Mail, 
  Eye, 
  X, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { getAllOrdersAdmin } from "@/lib/firestoreService";
import { Order } from "@/types/order";
import { formatCurrency } from "@/lib/utils";

interface CustomerAggregate {
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  orders: Order[];
}

export default function AdminCustomersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAggregate | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const allOrders = await getAllOrdersAdmin();
      setOrders(allOrders);
      setLoading(false);
    }
    load();
  }, []);

  const customersList: CustomerAggregate[] = useMemo(() => {
    const map = new Map<string, CustomerAggregate>();

    // Seed default patrons if orders are few
    map.set("aanya.patel@example.com", {
      name: "Aanya Patel",
      email: "aanya.patel@example.com",
      phone: "+91 98765 43210",
      city: "Bengaluru, Karnataka",
      ordersCount: 0,
      totalSpent: 0,
      orders: [],
    });

    map.set("priya.royal@siyajewels.com", {
      name: "Priya Royal (VIP)",
      email: "priya.royal@siyajewels.com",
      phone: "+91 98765 99999",
      city: "Mumbai, Maharashtra",
      ordersCount: 0,
      totalSpent: 0,
      orders: [],
    });

    orders.forEach((o) => {
      const email = o.userEmail?.toLowerCase() || o.shippingAddress?.email?.toLowerCase() || "guest@example.com";
      const existing = map.get(email) || {
        name: o.shippingAddress?.fullName || "Valued Patron",
        email,
        phone: o.shippingAddress?.phone || "+91 98765 00000",
        city: `${o.shippingAddress?.city || "India"}, ${o.shippingAddress?.state || ""}`,
        ordersCount: 0,
        totalSpent: 0,
        orders: [],
      };

      existing.ordersCount += 1;
      existing.totalSpent += o.totalAmount || 0;
      existing.orders.push(o);
      map.set(email, existing);
    });

    return Array.from(map.values());
  }, [orders]);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customersList;
    const q = searchQuery.toLowerCase();
    return customersList.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q)
    );
  }, [customersList, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B58E22]">
            Patron Relationships
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Customer Directory ({customersList.length})
          </h1>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by patron name, email or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FCF9F4] rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs font-medium text-neutral-500">
          Showing <strong>{filteredCustomers.length}</strong> clients
        </span>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FCF9F4] text-neutral-600 font-semibold border-b border-neutral-200">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Email & Phone</th>
                <th className="p-4">City / Region</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4 text-right">Order History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-400">
                    Loading customer directory...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/30 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-neutral-900 to-amber-950 text-[#D4AF37] font-serif font-bold text-xs flex items-center justify-center border border-[#D4AF37]/40 shrink-0">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-neutral-900 block">
                            {customer.name}
                          </span>
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-semibold inline-block mt-0.5">
                            Royal Client
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-neutral-700">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-500 text-[11px] mt-0.5">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{customer.phone}</span>
                      </div>
                    </td>
                    <td className="p-4 text-neutral-600">
                      {customer.city}
                    </td>
                    <td className="p-4 font-bold text-neutral-800">
                      {customer.ordersCount} {customer.ordersCount === 1 ? "order" : "orders"}
                    </td>
                    <td className="p-4 font-bold text-[#B58E22]">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-[#D4AF37] hover:text-black text-white text-[11px] font-semibold transition"
                      >
                        View History
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Order History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-amber-200 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">
                  {selectedCustomer.name}&rsquo;s History
                </h3>
                <p className="text-xs text-neutral-500">{selectedCustomer.email}</p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FCF9F4] p-4 rounded-2xl border border-amber-100">
              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-bold block">Total Orders</span>
                <span className="font-serif text-xl font-bold text-neutral-900">{selectedCustomer.ordersCount}</span>
              </div>
              <div>
                <span className="text-neutral-400 text-[10px] uppercase font-bold block">Lifetime Spend</span>
                <span className="font-serif text-xl font-bold text-[#B58E22]">{formatCurrency(selectedCustomer.totalSpent)}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-serif text-sm font-bold text-neutral-900">Orders Placed</h4>
              {selectedCustomer.orders.length === 0 ? (
                <p className="text-neutral-400 italic">No completed orders yet.</p>
              ) : (
                selectedCustomer.orders.map((ord) => (
                  <div key={ord.id} className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center">
                    <div>
                      <span className="font-mono font-bold text-neutral-900 block">{ord.id}</span>
                      <span className="text-[11px] text-neutral-500">{ord.items.length} pieces &bull; {ord.orderStatus}</span>
                    </div>
                    <span className="font-bold text-neutral-900">{formatCurrency(ord.totalAmount)}</span>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="w-full py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
