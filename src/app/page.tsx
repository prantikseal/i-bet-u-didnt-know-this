import CurvedText from "@/components/CurvedText";
import type { CSSProperties } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      {/* Curved top heading (gentler curve via large radius) */}
      <CurvedText
        text="I BET YOU DIDN&#39;T KNOW THIS"
        width={1200}
        height={220}
        startX={80}
        endX={1120}
        y={180}
        radius={1200}
        fontSize={79.24}
        letterSpacing={4.4}
        strokeWidth={6}
        className="w-full max-w-5xl h-[160px]"
      />
      <h2
        className="font-luckiest-guy font-normal not-italic text-[332.29px] text-center inline-block align-bottom text-stroke-custom bg-clip-text text-transparent"
        style={
          {
            "--font-overlay-bg":
              "linear-gradient(180deg, #FFE44A 0%, #FFCA0B 39.6%)",
            WebkitTextStroke: "10.75px #000223",
            filter:
              "drop-shadow(0 23.34px 0 #000223) drop-shadow(0 0 0 #000223)",
            "--text-stroke-width": "10.75px",
            "--text-stroke-color": "#000223",
          } as unknown as CSSProperties
        }
      >
        {
          ["W", "O", "R", "D"].map((letter, index) => (
            <span key={index} className="font-overlay-custom">
              {letter}
            </span>
          ))
        }
      </h2>
    </main>
  );
}
