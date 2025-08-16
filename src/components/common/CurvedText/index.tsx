"use client";
import React, {
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface CurvedTextProps {
  text: string;
  width?: number;
  height?: number;
  /** Left x-coordinate for arc start */
  startX?: number;
  /** Right x-coordinate for arc end */
  endX?: number;
  /** Y position of arc endpoints */
  y?: number;
  /** Arc radius. Larger = gentler curve */
  radius?: number;
  fontSize?: number;
  letterSpacing?: number;
  strokeWidth?: number;
  fill?: string;
  stroke?: string;
  className?: string;
  style?: React.CSSProperties;
  dropShadow?: boolean;
}

type CharPos = {
  x: number;
  y: number;
  angle: number;
  char: string;
};

const CurvedText: React.FC<CurvedTextProps> = ({
  text,
  width = 1200,
  height = 240,
  startX = 80,
  endX = 1120,
  y = 200,
  radius = 1400,
  fontSize = 88,
  letterSpacing = 2,
  strokeWidth = 14,
  fill = "#ffd23f",
  stroke = "#0a0a0a",
  className,
  style,
  dropShadow = true,
}) => {
  const pathId = useId();
  const filterId = useId();
  const gradientId = useId();

  const arcPath = useMemo(
    () => `M ${startX} ${y} A ${radius} ${radius} 0 0 1 ${endX} ${y}`,
    [startX, endX, y, radius]
  );

  const measureRef = useRef<SVGTextElement | null>(null);
  const [chars, setChars] = useState<CharPos[]>([]);
  const [offsetY, setOffsetY] = useState<number>(0);

  useLayoutEffect(() => {
    const el = measureRef.current as SVGTextElement | null;
    if (!el) return;

    // Defer until layout is ready
    const raf = requestAnimationFrame(() => {
      try {
        const n =
          (el as unknown as SVGTextContentElement).getNumberOfChars?.() ?? 0;
        const next: CharPos[] = [];
        for (let i = 0; i < n; i++) {
          const content = el as unknown as SVGTextContentElement;
          const p = content.getStartPositionOfChar(i);
          const angle = content.getRotationOfChar(i);
          const ch = text[i] ?? "";
          // Skip rendering overlay for spaces; spacing is preserved by positions.
          if (ch === " ") continue;
          next.push({ x: p.x, y: p.y, angle, char: ch });
        }
        setChars(next);

        // Compute vertical offset to avoid clipping when curvature tightens
        try {
          const bbox = el.getBBox();
          const padding = Math.max(strokeWidth, 4) + (dropShadow ? 14 : 6);
          // Shift down if top overflows beyond y=0
          const topOverflow = padding - bbox.y;
          const newOffsetY = topOverflow > 0 ? topOverflow : 0;
          setOffsetY(newOffsetY);
        } catch {}
      } catch {
        // In case measuring fails, fall back to no overlay.
        setChars([]);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [
    text,
    width,
    height,
    startX,
    endX,
    y,
    radius,
    fontSize,
    letterSpacing,
    dropShadow,
    strokeWidth,
  ]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={style}
      aria-hidden="true"
      overflow="visible"
    >
      <defs>
        <path id={pathId} d={arcPath} />
        <linearGradient
          id={gradientId}
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#FFE44A" />
          <stop offset="39.6%" stopColor="#FFCA0B" />
          <stop offset="80%" stopColor="#D49B00" />
          <stop offset="100%" stopColor="#8B5E00" />
        </linearGradient>
        {dropShadow && (
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="2"
              floodColor="#000000"
              floodOpacity="0.25"
            />
            <feDropShadow
              dx="0"
              dy="9.41"
              stdDeviation="0.1"
              floodColor="#000223"
              floodOpacity="1"
            />
          </filter>
        )}
      </defs>

      {/* Hidden measuring text along the path to get per-char positions */}
      <text
        ref={measureRef}
        style={{
          fontFamily: "var(--font-luckiest-guy)",
          fontSize,
          letterSpacing,
        }}
        fill={fill}
        opacity={0}
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>

      {/* Per-character rendering with individual vertical gradient */}
      <g
        filter={dropShadow ? `url(#${filterId})` : undefined}
        transform={`translate(0, ${offsetY})`}
      >
        {chars.map((c, i) => (
          <text
            key={`${i}-${c.char}`}
            x={c.x}
            y={c.y}
            transform={`rotate(${c.angle}, ${c.x}, ${c.y})`}
            textAnchor="start"
            dominantBaseline="alphabetic"
            style={{
              fontFamily: "var(--font-luckiest-guy)",
              fontSize,
              letterSpacing,
              paintOrder: "stroke",
              pointerEvents: "none",
            }}
            fill={`url(#${gradientId})`}
            stroke={stroke}
            strokeWidth={strokeWidth}
          >
            {c.char}
          </text>
        ))}
      </g>
    </svg>
  );
};

export default CurvedText;
