import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // In mock mode or if secret isn't configured, allow verification
    if (!key_secret || razorpay_order_id.startsWith("order_mock_")) {
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully (Mock/Sandbox Mode)",
        paymentId: razorpay_payment_id || `pay_mock_${Date.now()}`,
      });
    }

    // Real signature verification
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    console.error("Razorpay verification error:", error);
    const message = error instanceof Error ? error.message : "Verification error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
