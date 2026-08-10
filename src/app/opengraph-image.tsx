import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Zia Pizza - A Slice Above The Rest";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#ffffff",
          background:
            "radial-gradient(circle at 82% 18%, #8f1d24 0, #0e1824 42%, #090f17 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 8, textTransform: "uppercase", color: "#d5b577" }}>
          Zia Pizza
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
            Stone-baked Italian pizza
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 35, color: "#e7d8c1" }}>
            Salisbury & Westbury - Dine in - Takeaway - Delivery
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#d5b577" }}>A Slice Above The Rest</div>
      </div>
    ),
    size
  );
}
