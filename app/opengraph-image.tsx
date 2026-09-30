import { ImageResponse } from "next/og";

export const alt = "PujaPath — online puja and Pandit booking";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "linear-gradient(135deg, #241b13 0%, #5b301b 58%, #a65627 100%)", color: "#fff8ec", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 30, letterSpacing: 8, color: "#f3c879" }}>PUJAPATH</div>
      <div style={{ marginTop: 34, fontSize: 68, lineHeight: 1.12, fontWeight: 700, maxWidth: 940 }}>Online Puja &amp; Pandit Booking</div>
      <div style={{ marginTop: 28, fontSize: 29, color: "#f6e7d0" }}>Explore rituals and send a booking enquiry</div>
    </div>,
    size,
  );
}
