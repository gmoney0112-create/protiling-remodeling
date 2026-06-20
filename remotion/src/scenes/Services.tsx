import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

const SERVICES = [
  { icon: "🪟", title: "Tile Installation", subtitle: "Custom tile for kitchens, baths, floors & walls. All materials.", accent: "#d4a843", glow: "rgba(212,168,67,0.3)" },
  { icon: "🛁", title: "Bathroom Remodel", subtitle: "Full gut to finish. Licensed & insured. 5-year workmanship warranty.", accent: "#8b9eb7", glow: "rgba(139,158,183,0.3)" },
  { icon: "🍳", title: "Kitchen Backsplash", subtitle: "Transform your kitchen in 1-2 days. Hundreds of tile options.", accent: "#c47a3a", glow: "rgba(196,122,58,0.3)" },
  { icon: "🏠", title: "Flooring", subtitle: "Tile, stone & LVP installation. Free on-site estimates.", accent: "#7a9e6a", glow: "rgba(122,158,106,0.3)" },
];

interface ServiceCardProps { service: typeof SERVICES[0]; index: number; activeIndex: number; }

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, activeIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;
  let opacity = 1, scale = 1, translateX = 0;
  if (isActive) {
    const slideIn = spring({ fps, frame, config: { damping: 14, stiffness: 100 } });
    scale = interpolate(slideIn, [0, 1], [0.9, 1]);
    opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
    translateX = interpolate(slideIn, [0, 1], [80, 0]);
  } else if (isPast) {
    opacity = 0.15; scale = 0.9; translateX = -60;
  } else { opacity = 0.15; translateX = 60; }
  return (
    <div style={{ background: `linear-gradient(135deg, rgba(20,15,5,0.95), rgba(${isActive ? "30,20,5" : "10,8,2"},0.9))`, border: `2px solid ${isActive ? service.accent : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: "30px 40px", marginBottom: 20, display: "flex", alignItems: "center", gap: 30, transform: `scale(${scale}) translateX(${translateX}px)`, opacity, boxShadow: isActive ? `0 0 40px ${service.glow}` : "0 4px 16px rgba(0,0,0,0.3)", minWidth: 700 }}>
      <div style={{ fontSize: 52, filter: isActive ? `drop-shadow(0 0 20px ${service.accent})` : "none" }}>{service.icon}</div>
      <div>
        <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Arial Black', sans-serif", color: isActive ? "#ffffff" : "#5a4a30", marginBottom: 6 }}>{service.title}</div>
        <div style={{ fontSize: 18, fontFamily: "Arial, sans-serif", color: isActive ? service.accent : "#3a2a10" }}>{service.subtitle}</div>
      </div>
      {isActive && <div style={{ marginLeft: "auto", width: 50, height: 50, borderRadius: "50%", background: service.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✓</div>}
    </div>
  );
};

export const Services: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { width, height } = useVideoConfig();
  const activeIndex = Math.min(3, Math.floor(localFrame / 50));
  const bgOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ width, height, background: "radial-gradient(ellipse at 20% 50%, #150f03 0%, #0a0703 70%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: bgOpacity, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(212,168,67,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.03) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <AnimatedText text="OUR SERVICES" delay={5} animationType="slide-up" style={{ fontSize: 16, fontFamily: "Arial, sans-serif", color: "#d4a843", letterSpacing: 8, textTransform: "uppercase", marginBottom: 8 }} />
        <AnimatedText text="What We Do Best" delay={15} animationType="slide-up" style={{ fontSize: 52, fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: "#ffffff" }} />
      </div>
      <div>{SERVICES.map((service, i) => <ServiceCard key={i} service={service} index={i} activeIndex={activeIndex} />)}</div>
      <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
        {SERVICES.map((s, i) => <div key={i} style={{ width: i === activeIndex ? 32 : 10, height: 10, borderRadius: 5, background: i <= activeIndex ? s.accent : "rgba(255,255,255,0.15)" }} />)}
      </div>
    </div>
  );
};
