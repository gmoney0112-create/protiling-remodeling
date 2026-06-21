import React from "react";
import { interpolate, OffthreadVideo, spring, staticFile, useVideoConfig } from "remotion";

const STATS = [
  { value: 10, suffix: "+", label: "Years Experience", icon: "🏆" },
  { value: 800, suffix: "+", label: "Projects Completed", icon: "🏠" },
  { value: 5, suffix: "yr", label: "Workmanship Warranty", icon: "🛡️" },
  { value: 100, suffix: "%", label: "Free Estimates", icon: "✅" },
];

const CountUp: React.FC<{ target: number; localFrame: number; suffix: string }> = ({ target, localFrame, suffix }) => {
  const eased = interpolate(localFrame, [0, 90], [0, 1], { extrapolateRight: "clamp", easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t });
  const current = Math.floor(interpolate(eased, [0, 1], [0, target]));
  return <span>{current.toLocaleString()}{suffix}</span>;
};

export const Stats: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { width, height } = useVideoConfig();
  const fps = 30;
  const bgOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleSlide = spring({ fps, frame: localFrame, config: { damping: 12, stiffness: 80 } });
  const titleY = interpolate(titleSlide, [0, 1], [-40, 0]);
  return (
    <div style={{ width, height, background: "linear-gradient(135deg, #0a0703 0%, #150f03 50%, #0a0703 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: bgOpacity, position: "relative", overflow: "hidden" }}>
      <OffthreadVideo src={staticFile("footage/scene3.mp4")} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} muted />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,7,3,0.84) 0%, rgba(21,15,3,0.8) 50%, rgba(10,7,3,0.84) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(45deg, transparent 40%, rgba(212,168,67,0.04) 50%, transparent 60%)" }} />
      <div style={{ opacity: interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" }), transform: `translateY(${titleY}px)`, marginBottom: 60, textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 16, color: "#d4a843", letterSpacing: 8, textTransform: "uppercase", fontFamily: "Arial, sans-serif", marginBottom: 8 }}>BY THE NUMBERS</div>
        <div style={{ fontSize: 56, fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: "#ffffff" }}>San Antonio's Tile Experts</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 280px)", gap: 30, position: "relative", zIndex: 2 }}>
        {STATS.map((stat, i) => {
          const cardFrame = Math.max(0, localFrame - i * 20);
          const cardSpring = spring({ fps, frame: cardFrame, config: { damping: 12, stiffness: 100 } });
          return (
            <div key={i} style={{ background: "linear-gradient(135deg, rgba(30,20,5,0.9), rgba(15,10,2,0.95))", border: "1px solid rgba(212,168,67,0.25)", borderRadius: 20, padding: "40px 30px", textAlign: "center", transform: `scale(${interpolate(cardSpring, [0, 1], [0.7, 1])})`, opacity: interpolate(cardFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" }), boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
              <div style={{ fontSize: 42, marginBottom: 12 }}>{stat.icon}</div>
              <div style={{ fontSize: 52, fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: "#d4a843", lineHeight: 1, textShadow: "0 0 20px rgba(212,168,67,0.5)" }}>
                <CountUp target={stat.value} localFrame={cardFrame} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: 16, color: "#9a7a3a", marginTop: 10, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: 2 }}>{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
