import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { TileDeco } from "../components/TileDeco";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const logoSpring = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, stiffness: 80 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [40, 80], [0, 340], { extrapolateRight: "clamp" });

  return (
    <div style={{ width, height, background: "radial-gradient(ellipse at 50% 50%, #1a1008 0%, #0d0a04 60%, #050300 100%)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: bgOpacity }}>
      {/* Tile grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(212,168,67,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.06) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <TileDeco frame={frame} width={width} height={height} />
      <div style={{ transform: `scale(${logoScale})`, opacity: logoOpacity, textAlign: "center", zIndex: 10 }}>
        <div style={{ fontSize: 80, marginBottom: 10, filter: "drop-shadow(0 0 30px rgba(212,168,67,0.8))" }}>🏛️</div>
        <div style={{ fontSize: 76, fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: "#ffffff", letterSpacing: -2, textShadow: "0 0 40px rgba(212,168,67,0.5)" }}>PRO <span style={{ color: "#d4a843" }}>TILING</span></div>
        <div style={{ fontSize: 22, fontFamily: "Arial, sans-serif", color: "#c49a3a", letterSpacing: 8, textTransform: "uppercase", marginTop: 6 }}>& REMODELING</div>
      </div>
      <div style={{ width: lineWidth, height: 3, background: "linear-gradient(90deg, transparent, #d4a843, #f0c860, transparent)", borderRadius: 2, marginTop: 30, boxShadow: "0 0 15px #d4a843", zIndex: 10 }} />
      <div style={{ marginTop: 20, zIndex: 10 }}>
        <AnimatedText text="Craftsmanship. Precision. Style." delay={70} animationType="fade-in" style={{ fontSize: 26, fontFamily: "Arial, sans-serif", color: "#9a7a3a", letterSpacing: 3, textTransform: "uppercase" }} />
      </div>
    </div>
  );
};
