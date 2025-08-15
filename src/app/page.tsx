import CurvedText from "@/components/CurvedText";

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
      <h2 className="font-luckiest-guy ">WORD</h2>
    </main>
  );
}
