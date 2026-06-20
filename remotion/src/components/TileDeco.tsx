import React from "react";
import { interpolate, spring } from "remotion";

interface DecoProps { frame: number; width: number; height: number; }

const TileSquare: React.FC<{ x: number; y: number; delay: number; size: number; color: string; fps: number; frame: number; rotate?: number }> = ({ x, y, delay, size, color, fps, frame, rotate = 0 }) => {
  const localFrame = Math.max(0, frame - delay);
  const appear = spring({ fps, frame: localFrame, config: { damping: 10, stiffness: 70 } });
  const opacity = interpolate(localFrame, [0, 15, 60, 100], [0, 0.6, 0.6, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: x, top: y, width: size, height: size, border: `2px solid ${color}`, borderRadius: 4, transform: `scale(${interpolate(appear, [0, 1], [0, 1])}) rotate(${rotate + localFrame * 0.3}deg)`, opacity, boxShadow: `0 0 10px ${color}` }} />
  );
};

export const TileDeco: React.FC<DecoProps> = ({ frame, width, height }) => {
  const fps = 30;
  return (
    <>
      <TileSquare x={60} y={80} delay={5} size={60} color="rgba(212,168,67,0.5)" fps={fps} frame={frame} rotate={15} />
      <TileSquare x={width - 160} y={60} delay={12} size={45} color="rgba(212,168,67,0.4)" fps={fps} frame={frame} rotate={-20} />
      <TileSquare x={100} y={height - 200} delay={20} size={70} color="rgba(212,168,67,0.4)" fps={fps} frame={frame} rotate={10} />
      <TileSquare x={width - 200} y={height - 180} delay={8} size={55} color="rgba(196,122,58,0.5)" fps={fps} frame={frame} rotate={30} />
      <TileSquare x={width - 280} y={100} delay={18} size={40} color="rgba(196,122,58,0.4)" fps={fps} frame={frame} rotate={-10} />
      <TileSquare x={40} y={height - 120} delay={25} size={50} color="rgba(139,158,183,0.4)" fps={fps} frame={frame} rotate={45} />
    </>
  );
};
