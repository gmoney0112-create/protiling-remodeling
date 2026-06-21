import React from "react";
import { interpolate, OffthreadVideo, spring, staticFile, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const CallToAction: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { width, height } = useVideoConfig();
  const fps = 30;
  const bgOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const pulse = Math.sin(localFrame * 0.12) * 0.04 + 1;
  const btnScale = interpolate(spring({ fps, frame: Math.max(0, localFrame - 60), config: { damping: 10, stiffness: 80 } }), [0, 1], [0, 1]);
  const ring1 = interpolate(localFrame % 90, [0, 90], [0, 1]);
  const ring2 = interpolate((localFrame + 45) % 90, [0, 90], [0, 1]);
  return (
    <div style={{ width, height, background: "radial-gradient(ellipse at 50% 50%, #1a1005 0%, #080503 70%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: bgOpacity, position: "relative", overflow: "hidden" }}>
      <OffthreadVideo src={staticFile("footage/scene4.mp4")} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} muted />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(26,16,5,0.82) 0%, rgba(8,5,3,0.9) 70%)" }} />
      {[ring1, ring2].map((r, i) => <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: interpolate(r, [0, 1], [200, 1600]), height: interpolate(r, [0, 1], [200, 1600]), borderRadius: "50%", border: "2px solid rgba(212,168,67,0.1)", transform: "translate(-50%, -50%)", opacity: interpolate(r, [0, 0.5, 1], [0.8, 0.4, 0]) }} />)}
      <div style={{ background: "#d4a843", color: "#0a0703", fontSize: 14, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", padding: "8px 24px", borderRadius: 4, marginBottom: 30, opacity: interpolate(localFrame, [5, 20], [0, 1], { extrapolateRight: "clamp" }), boxShadow: "0 0 20px rgba(212,168,67,0.5)", fontFamily: "Arial, sans-serif", position: "relative", zIndex: 2 }}>● FREE ON-SITE ESTIMATES</div>
      <div style={{ textAlign: "center", marginBottom: 20, position: "relative", zIndex: 2 }}><AnimatedText text="Ready to transform your space?" delay={10} animationType="slide-up" style={{ fontSize: 40, fontFamily: "Arial, sans-serif", color: "#9a7a3a", fontWeight: 400 }} /></div>
      <div style={{ textAlign: "center", marginBottom: 50, position: "relative", zIndex: 2 }}><AnimatedText text="Let's Build It Right." delay={25} animationType="scale-in" style={{ fontSize: 82, fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: "#ffffff", lineHeight: 1, textShadow: "0 0 40px rgba(212,168,67,0.4)", display: "inline-block" }} /></div>
      <div style={{ transform: `scale(${pulse})`, marginBottom: 50, opacity: interpolate(localFrame, [40, 60], [0, 1], { extrapolateRight: "clamp" }), position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 72, fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: "#d4a843", textShadow: "0 0 40px rgba(212,168,67,0.7)", letterSpacing: 2 }}>📞 (210) 555-0200</div>
      </div>
      <div style={{ transform: `scale(${btnScale})`, background: "linear-gradient(135deg, #d4a843, #f0c860)", borderRadius: 50, padding: "22px 70px", fontSize: 26, fontWeight: 800, fontFamily: "Arial, sans-serif", color: "#0a0703", letterSpacing: 2, textTransform: "uppercase", boxShadow: "0 0 40px rgba(212,168,67,0.6)", position: "relative", zIndex: 2 }}>Get a Free Estimate →</div>
      <div style={{ display: "flex", gap: 40, marginTop: 50, opacity: interpolate(localFrame, [80, 100], [0, 1], { extrapolateRight: "clamp" }), position: "relative", zIndex: 2 }}>
        {["Licensed & Insured", "5-Year Warranty", "Same-Week Start"].map((b) => <div key={b} style={{ border: "1px solid rgba(212,168,67,0.3)", borderRadius: 8, padding: "10px 20px", fontSize: 16, fontFamily: "Arial, sans-serif", color: "#9a7a3a" }}>✓ {b}</div>)}
      </div>
    </div>
  );
};
