import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR", receipt, notes } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // If live credentials are provided, use Razorpay Node SDK
    if (key_id && key_secret && key_id !== "rzp_test_dummyKey") {
      const razorpay = new Razorpay({
        key_id,
        key_secret,
      });

      const options = {
        amount: Math.round(amount * 100), // convert to paise
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
        notes: notes || {},
      };

      const order = await razorpay.orders.create(options);
      return NextResponse.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: key_id,
        isMock: false,
      });
    }

    // Otherwise, generate a seamless mock order ID for testing and instant preview
    const mockOrderId = `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return NextResponse.json({
      id: mockOrderId,
      amount: Math.round(amount * 100),
      currency: "INR",
      key: key_id || "rzp_test_dummyPreviewKey",
      isMock: true,
    });
  } catch (error: unknown) {
    console.error("Razorpay order creation error:", error);
    const message = error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
