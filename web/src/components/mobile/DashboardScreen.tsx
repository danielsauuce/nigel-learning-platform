import {
  GraduationCap,
  Coins,
  BarChart2,
  Briefcase,
  Landmark,
  CreditCard,
  Flame,
  Award,
  Zap,
  Timer,
  Sparkles,
  Trophy,
  Star,
} from 'lucide-react'
import { NigelMascotWaving } from './NigelMascot'

const CATEGORY_CHIPS = [
  { name: 'Saving', icon: <Coins className="w-2 h-2" />, bg: 'bg-purple-50' },
  { name: 'Budgets', icon: <BarChart2 className="w-2 h-2" />, bg: 'bg-red-50' },
  {
    name: 'Earning',
    icon: <Briefcase className="w-2 h-2" />,
    bg: 'bg-yellow-50',
  },
]

const QUICK_STATS = [
  {
    icon: <Flame className="w-2.5 h-2.5 text-red-400" />,
    value: '12d',
    label: 'Streak',
    bg: 'bg-red-50',
  },
  {
    icon: <Coins className="w-2.5 h-2.5 text-yellow-500" />,
    value: '450',
    label: 'Coins',
    bg: 'bg-yellow-50',
  },
  {
    icon: <Award className="w-2.5 h-2.5 text-purple-400" />,
    value: '#4',
    label: 'Rank',
    bg: 'bg-purple-50',
  },
]

const ACHIEVEMENTS = [
  { icon: <Flame className="w-3 h-3 text-orange-400" />, label: 'Early Bird' },
  { icon: <Coins className="w-3 h-3 text-yellow-500" />, label: 'Saver' },
  { icon: <Trophy className="w-3 h-3 text-amber-400" />, label: 'Champion' },
  { icon: <Star className="w-3 h-3 text-purple-400" />, label: 'Goal Setter' },
]

/** Matches the actual mobile DashboardScreen.tsx layout exactly */
export const DashboardScreen = () => (
  <div className="w-[280px] h-[600px] bg-white rounded-[3rem] p-5 flex flex-col gap-3 shadow-2xl overflow-hidden">
    {/* Status bar */}
    <div className="flex items-center justify-between px-2 pt-1">
      <span className="text-gray-400 text-[10px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="12" height="10" viewBox="0 0 16 12" fill="none">
          <path
            d="M1 8h2v4H1zM5 5h2v7H5zM9 2h2v10H9zM13 0h2v12h-2z"
            fill="#22223B"
            opacity=".5"
          />
        </svg>
      </div>
    </div>

    {/* Greeting row */}
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-[10px]">Good morning,</p>
        <h2 className="text-sm font-bold text-edulite-navy">Sarah Hessy</h2>
      </div>
      <div className="flex items-center gap-2">
        {/* Theme toggle pill */}
        <div className="w-8 h-4 bg-edulite-purple/20 rounded-full relative">
          <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-edulite-purple rounded-full" />
        </div>
        {/* Avatar */}
        <div className="w-7 h-7 bg-edulite-navy rounded-[10px] flex items-center justify-center">
          <GraduationCap className="w-3.5 h-3.5 text-edulite-purple" />
        </div>
      </div>
    </div>

    {/* Featured lesson card with MascotWaving */}
    <div className="bg-edulite-bg rounded-2xl p-4 flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-xs font-bold text-edulite-navy leading-tight">
          Budget lesson
          <br />
          in 30 minutes
        </h3>
        <button className="mt-2 bg-edulite-navy text-white text-[9px] font-bold px-4 py-1.5 rounded-full">
          Join now
        </button>
      </div>
      <div className="flex-shrink-0">
        <NigelMascotWaving size={48} />
      </div>
    </div>

    {/* Category chips — Saving, Budgets, Earning */}
    <div className="flex gap-1.5">
      {CATEGORY_CHIPS.map((cat) => (
        <span
          key={cat.name}
          className={`${cat.bg} text-[8px] font-semibold px-2.5 py-1 rounded-full text-gray-500 flex items-center gap-1`}
        >
          {cat.icon}
          {cat.name}
        </span>
      ))}
    </div>

    {/* New course section */}
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <h4 className="text-[11px] font-bold text-edulite-navy">New course</h4>
        <span className="text-[8px] text-edulite-purple font-medium">
          See more
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-edulite-peach rounded-2xl p-3 h-[72px] flex flex-col justify-between">
          <span className="text-[8px] font-bold text-edulite-navy leading-tight">
            Saving
            <br />
            basics
          </span>
          <Landmark className="w-5 h-5 self-center text-edulite-purple" />
        </div>
        <div className="bg-purple-100 rounded-2xl p-3 h-[72px] flex flex-col justify-between">
          <span className="text-[8px] font-bold text-edulite-navy leading-tight">
            Budget
            <br />
            simulator
          </span>
          <CreditCard className="w-5 h-5 self-center text-edulite-purple" />
        </div>
      </div>
    </div>

    {/* Quick stats row */}
    <div className="flex gap-2">
      {QUICK_STATS.map((stat) => (
        <div
          key={stat.label}
          className={`flex-1 ${stat.bg} rounded-xl py-2 text-center flex flex-col items-center`}
        >
          <span className="block mb-0.5">{stat.icon}</span>
          <span className="text-[10px] font-bold text-edulite-navy block">
            {stat.value}
          </span>
          <span className="text-[7px] text-gray-400 block">{stat.label}</span>
        </div>
      ))}
    </div>

    {/* Daily Challenge dark card */}
    <div className="bg-edulite-navy rounded-2xl p-3">
      <div className="flex items-center gap-1 mb-1">
        <Zap className="w-2.5 h-2.5 text-edulite-yellow" />
        <span className="text-[7px] font-bold text-edulite-yellow tracking-wider uppercase">
          Daily Challenge
        </span>
      </div>
      <p className="text-[9px] font-bold text-white mb-0.5">
        Budget Builder Challenge
      </p>
      <p className="text-[7px] text-white/50 mb-2">
        Allocate income using the 50/30/20 rule!
      </p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="text-[7px] text-white/40 flex items-center gap-0.5">
            <Timer className="w-2 h-2" /> 5 Mins
          </span>
          <span className="text-[7px] text-white/40 flex items-center gap-0.5">
            <Sparkles className="w-2 h-2" /> 50 XP
          </span>
        </div>
        <button className="bg-edulite-purple text-white text-[8px] font-bold px-3 py-1 rounded-full">
          Start
        </button>
      </div>
    </div>

    {/* Achievements row */}
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[9px] font-bold text-edulite-navy">
          Achievements
        </span>
        <span className="text-[7px] text-edulite-purple font-medium">
          See more
        </span>
      </div>
      <div className="flex gap-1.5">
        {ACHIEVEMENTS.map((b) => (
          <div
            key={b.label}
            className="flex-1 bg-gray-50 rounded-xl py-1.5 flex flex-col items-center"
          >
            <span className="block mb-0.5">{b.icon}</span>
            <span className="text-[6px] text-gray-400 block mt-0.5">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
)
