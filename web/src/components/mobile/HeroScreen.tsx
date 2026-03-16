import { NigelMascot } from './NigelMascot'
import { NigelBrandIconWhite } from '../ui/Logo'

/** Matches the actual mobile SplashScreen.tsx layout exactly */
export const HeroScreen = () => (
  <div className="w-[280px] h-[600px] bg-edulite-purple rounded-[3rem] flex flex-col overflow-hidden shadow-2xl relative">
    {/* Status bar */}
    <div className="flex items-center justify-between px-8 pt-5 pb-2">
      <span className="text-white/80 text-[10px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="14" height="10" viewBox="0 0 16 12" fill="none"><path d="M1 8h2v4H1zM5 5h2v7H5zM9 2h2v10H9zM13 0h2v12h-2z" fill="white" opacity=".6"/></svg>
        <div className="w-4 h-2.5 border border-white/60 rounded-sm relative">
          <div className="absolute inset-[1px] bg-white/60 rounded-[1px]" />
        </div>
      </div>
    </div>

    {/* Logo row — top-left: Nigel brand icon + "nigel" */}
    <div className="flex items-center gap-2 px-7 pt-2">
      <NigelBrandIconWhite size={22} />
      <span className="text-white font-bold text-base lowercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
        nigel
      </span>
    </div>

    {/* Mascot — centered, floating animation via CSS */}
    <div className="flex-1 flex items-center justify-center -mt-2 relative">
      {/* Decorative dots grid */}
      <div className="absolute top-6 right-6 grid grid-cols-3 gap-1.5 opacity-20">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-white" />
        ))}
      </div>
      <NigelMascot size={130} />
    </div>

    {/* White bottom panel — rounded top corners */}
    <div className="bg-white rounded-t-[2.2rem] px-7 py-8 space-y-4">
      <h2 className="text-edulite-navy font-bold text-xl leading-tight text-center" style={{ fontFamily: 'Fredoka, sans-serif' }}>
        Let&apos;s learn with{'\n'}
        <br />lots of fun!
      </h2>
      <p className="text-edulite-gray text-[11px] leading-relaxed text-center px-2">
        Learning with us will be fun and make you happy.
      </p>
      <button className="w-full bg-edulite-navy text-white font-bold py-3.5 rounded-[22px] text-sm shadow-lg shadow-edulite-navy/25">
        Get Started
      </button>
    </div>
  </div>
)
