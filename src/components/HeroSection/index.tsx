import React, { CSSProperties } from 'react'
import CurvedText from '../common/CurvedText';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <>
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
        strokeWidth={10}
        className="w-full max-w-5xl h-[96px] sm:h-[120px] md:h-[140px] lg:h-[160px]"
      />
      <h2
        className="font-luckiest-guy font-normal not-italic text-[clamp(64px,20vw,250px)] text-center inline-block align-bottom text-stroke-custom bg-clip-text text-transparent leading-none tracking-[-0.01em] -mt-4 md:mt-4"
        style={
          {
            "--font-overlay-bg":
              "linear-gradient(180deg, #FFE44A 0%, #FFCA0B 39.6%)",
            filter: "drop-shadow(0 0.1em 0 #000223) drop-shadow(0 0 0 #000223)",
            "--text-stroke-width": "clamp(2px, 1vw,8px)",
            "--text-stroke-color": "#000223",
            lineHeight: 1,
          } as unknown as CSSProperties
        }
      >
        {["W", "O", "R", "D"].map((letter, index) => (
          <span key={index} className="font-overlay-custom">
            {letter}
          </span>
        ))}
      </h2>
      <p className="text-center text-white text-lg md:text-2xl font-anak-paud font-normal not-italic max-w-2xl tracking-[0.05em]">
        Accumsan in accumsan tempor pulvinar facilisis proin massa ultrices
        vestibulum dipiscing mattis
      </p>
      <Button>
        <span className="font-anak-paud">
          <span className="font-luckiest-guy">W</span>
          <span className="font-luckiest-guy">O</span>
          <span className="font-luckiest-guy">R</span>
          <span className="font-luckiest-guy">D</span>
        </span>
      </Button>
    </>
  );
}

export default HeroSection