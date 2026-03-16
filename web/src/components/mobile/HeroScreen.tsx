import { PuzzleCharacter } from './PuzzleCharacter'

export const HeroScreen = () => (
  <div className="w-[280px] h-[600px] bg-edulite-purple rounded-[3rem] p-6 flex flex-col items-center justify-between shadow-2xl">
    <div className="text-center space-y-2 mt-20">
      <h1 className="text-white text-2xl font-bold">
        Let's learn with lots of fun!
      </h1>
      <p className="text-white/80 text-xs">
        Learning with us will be fun and make you happy.
      </p>
    </div>

    <PuzzleCharacter />

    <button className="w-full bg-edulite-navy text-white font-bold py-3 rounded-2xl">
      Get Started
    </button>
  </div>
)
