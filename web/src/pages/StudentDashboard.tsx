import { motion } from "motion/react";
import { Target, Zap, Award, Play, CheckCircle2, Lock, TrendingUp, Wallet, ShieldCheck, Settings, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NigelBrandIcon } from "../components/ui/Logo";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { useLearning } from "../context/LearningContext";
import { useTheme } from "../context/ThemeContext";
import { LEARNING_PATHS, BADGES } from "../data/learning-paths";

const PATH_ICONS: Record<string, React.ReactNode> = {
  saving_basics: <Wallet className="w-6 h-6" />, smart_spending: <Zap className="w-6 h-6" />,
  earning_income: <Target className="w-6 h-6" />, borrowing_debt: <ShieldCheck className="w-6 h-6" />,
  investing_future: <TrendingUp className="w-6 h-6" />,
};
const PATH_COLORS: Record<string, string> = {
  saving_basics: "bg-purple-500", smart_spending: "bg-amber-500", earning_income: "bg-emerald-500",
  borrowing_debt: "bg-rose-500", investing_future: "bg-blue-500",
};

/** Daily challenge data — mirrors mobile DailyChallengeScreen CHALLENGE_STEPS */
const DAILY_CHALLENGE = {
  title: "The Power of Compound Interest",
  desc: "Allocate your monthly income using the 50/30/20 rule!",
  time: "5 Mins",
  xp: "50 XP",
};

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const learning = useLearning();
  const { theme } = useTheme();
  const dark = theme === "dark";

  const missions = LEARNING_PATHS.map((path) => {
    const { completed, total } = learning.getPathProgress(path.key);
    const status = learning.getPathStatus(path.key);
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { id: path.key, title: path.title, emoji: path.emoji, desc: `${total} lessons · ${path.category}`,
      icon: PATH_ICONS[path.key] ?? <Target className="w-6 h-6" />, color: PATH_COLORS[path.key] ?? "bg-gray-500", progress, status };
  });

  const displayBadges = BADGES.filter((b) => learning.earnedBadges.has(b.id)).slice(0, 3);
  const completedCount = missions.filter((m) => m.status === "mastered").length;

  return (
    <div className={`min-h-screen p-6 md:p-10 transition-colors ${dark ? "bg-[#1A1A2E]" : "bg-[#F8F9FE]"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <NigelBrandIcon size={32} />
              <span className={`font-bold text-xl tracking-tight lowercase ${dark ? "text-white" : "text-[#22223B]"}`}>nigel</span>
            </div>
            <p className="text-[10px] font-bold text-[#B9A7F8] uppercase tracking-widest ml-10 -mt-1">Powered by Beyond Encryption</p>
            <h1 className={`text-4xl font-black mt-4 ${dark ? "text-white" : "text-[#22223B]"}`}>Hey, Sarah! 👋</h1>
            <p className={`font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>
              Level {learning.level} · {learning.xp} XP · {learning.streak} day streak 🔥
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => navigate("/student-settings")} className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${dark ? "bg-[#2A2A40] text-gray-400 hover:text-white" : "bg-white text-gray-400 hover:text-[#22223B]"}`}>
              <Settings className="w-6 h-6" />
            </button>
            <div className={`flex items-center gap-4 p-4 rounded-[2rem] shadow-sm border ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Level</p>
                <p className={`text-lg font-black ${dark ? "text-white" : "text-[#22223B]"}`}>Level {learning.level}</p>
              </div>
              <div className="w-12 h-12 bg-[#B9A7F8] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#B9A7F8]/30">{learning.level}</div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* ── Daily Challenge Card (matches mobile) ── */}
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-[#22223B] p-8 rounded-[3rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#B9A7F8] rounded-full -mr-16 -mt-16 blur-[60px] opacity-15" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#F7E6B6]" />
                    <span className="text-[10px] font-bold text-[#F7E6B6] uppercase tracking-widest">Daily Challenge</span>
                  </div>
                  <h2 className="text-2xl font-black">{DAILY_CHALLENGE.title}</h2>
                  <p className="text-white/60 text-sm font-medium">{DAILY_CHALLENGE.desc}</p>
                  <div className="flex items-center gap-4 text-white/40 text-xs font-medium">
                    <span>⏱ {DAILY_CHALLENGE.time}</span>
                    <span>✨ {DAILY_CHALLENGE.xp}</span>
                  </div>
                </div>
                <button onClick={() => navigate("/daily-challenge")}
                  className="bg-[#B9A7F8] text-white font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg">
                  Start →
                </button>
              </div>
            </motion.section>

            {/* ── Category Chips (matches mobile) ── */}
            <div className="flex gap-3 flex-wrap">
              {[{ name: "Saving", emoji: "💰", bg: dark ? "bg-[#2A2A40]" : "bg-[#F3F0FF]" },
                { name: "Budgets", emoji: "📊", bg: dark ? "bg-[#2A2A40]" : "bg-[#FDE8E4]" },
                { name: "Earning", emoji: "💼", bg: dark ? "bg-[#2A2A40]" : "bg-[#FFF8E8]" }
              ].map((cat) => (
                <button key={cat.name} className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${cat.bg} ${dark ? "text-gray-300" : "text-gray-500"} text-sm font-medium`}>
                  <span>{cat.emoji}</span> {cat.name}
                </button>
              ))}
            </div>

            {/* ── Learning Paths Grid ── */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-black ${dark ? "text-white" : "text-[#22223B]"}`}>Learning Paths</h2>
                <span className="text-sm font-bold text-[#B9A7F8]">{completedCount}/{missions.length} Completed</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {missions.map((mission) => (
                  <motion.div key={mission.id} whileHover={{ y: -5 }}
                    className={`p-8 rounded-[3rem] shadow-sm border relative overflow-hidden group ${mission.status === "locked" ? "opacity-75" : ""} ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
                    {mission.status === "locked" && (
                      <div className={`absolute inset-0 z-10 flex items-center justify-center ${dark ? "bg-[#1A1A2E]/60" : "bg-gray-50/50"} backdrop-blur-[2px]`}>
                        <div className={`p-4 rounded-2xl shadow-xl ${dark ? "bg-[#2A2A40]" : "bg-white"}`}><Lock className="w-6 h-6 text-gray-400" /></div>
                      </div>
                    )}
                    <div className={`${mission.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>{mission.icon}</div>
                    <h3 className={`text-xl font-black mb-1 ${dark ? "text-white" : "text-[#22223B]"}`}>{mission.emoji} {mission.title}</h3>
                    <p className={`text-sm font-medium mb-6 leading-relaxed ${dark ? "text-gray-400" : "text-gray-500"}`}>{mission.desc}</p>
                    <div className="space-y-4">
                      <div className={`w-full h-2 rounded-full overflow-hidden ${dark ? "bg-[#3A3A55]" : "bg-gray-100"}`}>
                        <div className={`${mission.color} h-full transition-all duration-1000`} style={{ width: `${mission.progress}%` }} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400">{mission.progress}% Complete</span>
                        <button onClick={() => mission.status !== "locked" && navigate(`/mission/${mission.id}`)}
                          className={`flex items-center gap-2 font-black text-sm transition-all ${mission.status === "mastered" ? "text-emerald-500" : dark ? "text-white group-hover:gap-3" : "text-[#22223B] group-hover:gap-3"}`}>
                          {mission.status === "mastered" ? (<>Review <CheckCircle2 className="w-4 h-4" /></>) : (<>Start Mission <Play className="w-4 h-4 fill-current" /></>)}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Budget Simulator Teaser */}
            <section className="bg-[#22223B] p-10 rounded-[4rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9A7F8] rounded-full -mr-20 -mt-20 blur-[80px] opacity-20" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-4">
                  <div className="bg-amber-400 text-[#22223B] text-[10px] font-black px-3 py-1 rounded-full w-fit uppercase tracking-widest">Simulation</div>
                  <h2 className="text-3xl font-black">Budget Builder Challenge</h2>
                  <p className="text-gray-300 font-medium">Pick a career, receive your payslip, and allocate your monthly budget — then survive a surprise life event!</p>
                  <button onClick={() => navigate("/simulator")} className="bg-white text-[#22223B] font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform flex items-center gap-2">
                    Enter Simulator <TrendingUp className="w-5 h-5" />
                  </button>
                </div>
                <div className="w-48 h-48 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center"><Wallet className="w-20 h-20 text-[#B9A7F8]" /></div>
              </div>
            </section>

            {/* Pro Tip (matches mobile ProTipBanner) */}
            <div className={`p-6 rounded-[2rem] flex items-start gap-4 ${dark ? "bg-[#2A2A40]" : "bg-[#FDE8E4]"}`}>
              <span className="text-2xl">💡</span>
              <div>
                <h4 className={`font-black text-sm mb-1 ${dark ? "text-white" : "text-[#22223B]"}`}>Pro Tip: 50/30/20 Rule</h4>
                <p className={`text-xs font-medium leading-relaxed ${dark ? "text-gray-400" : "text-[#6C6C80]"}`}>
                  Divide your income into Needs (50%), Wants (30%), and Savings (20%).
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats (matches mobile QuickStats) */}
            <section className={`p-8 rounded-[3rem] shadow-sm border ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
              <h2 className={`text-xl font-black mb-6 ${dark ? "text-white" : "text-[#22223B]"}`}>Quick Stats</h2>
              <div className="space-y-4">
                {[
                  { label: "Streak", value: `${learning.streak}d`, emoji: "🔥", bg: dark ? "bg-[#1A1A2E]" : "bg-[#FDE8E4]" },
                  { label: "Coins", value: `${learning.xp}`, emoji: "💰", bg: dark ? "bg-[#1A1A2E]" : "bg-[#FFF8E8]" },
                  { label: "Lessons Done", value: `${learning.completedLessons.size}`, emoji: "📚", bg: dark ? "bg-[#1A1A2E]" : "bg-[#F3F0FF]" },
                ].map((stat) => (
                  <div key={stat.label} className={`flex items-center justify-between p-4 rounded-2xl ${stat.bg}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{stat.emoji}</span>
                      <span className={`font-bold text-sm ${dark ? "text-white" : "text-[#22223B]"}`}>{stat.label}</span>
                    </div>
                    <span className={`font-black text-sm ${dark ? "text-white" : "text-[#22223B]"}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Badges */}
            <section className={`p-8 rounded-[3rem] shadow-sm border ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
              <div className="flex items-center gap-3 mb-8"><Award className="w-6 h-6 text-amber-500" /><h2 className={`text-xl font-black ${dark ? "text-white" : "text-[#22223B]"}`}>Your Badges</h2></div>
              <div className="grid grid-cols-3 gap-4">
                {displayBadges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center gap-2 group">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform ${dark ? "bg-[#1A1A2E]" : "bg-amber-100"}`}>{badge.emoji}</div>
                    <span className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-tighter">{badge.title}</span>
                  </div>
                ))}
                {displayBadges.length < 3 && (
                  <div className={`w-16 h-16 rounded-3xl border-2 border-dashed flex items-center justify-center ${dark ? "border-[#3A3A55] text-gray-600" : "border-gray-100 text-gray-200"}`}><Lock className="w-5 h-5" /></div>
                )}
              </div>
              <button onClick={() => navigate("/progress-stats")} className="w-full mt-6 text-gray-400 font-bold text-sm flex items-center justify-center gap-1 hover:text-[#B9A7F8]">
                All Badges ({learning.earnedBadges.size}/{BADGES.length}) <ChevronRight className="w-4 h-4" />
              </button>
            </section>

            {/* Achievements (matches mobile RecentAchievements) */}
            <section className={`p-8 rounded-[3rem] shadow-sm border ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
              <h2 className={`text-xl font-black mb-6 ${dark ? "text-white" : "text-[#22223B]"}`}>Achievements</h2>
              <div className="grid grid-cols-4 gap-3">
                {[{ emoji: "🔥", label: "Early Bird" }, { emoji: "💰", label: "Saver" }, { emoji: "🏆", label: "Champion" }, { emoji: "⭐", label: "Goal Setter" }]
                  .map((a) => (
                    <div key={a.label} className="flex flex-col items-center gap-1.5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${dark ? "bg-[#1A1A2E]" : "bg-gray-50"}`}>{a.emoji}</div>
                      <span className="text-[9px] font-bold text-gray-400 text-center">{a.label}</span>
                    </div>
                  ))}
              </div>
            </section>

            {/* Family Sharing */}
            <section className={`p-8 rounded-[3rem] shadow-sm border ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
              <h2 className={`text-xl font-black mb-4 ${dark ? "text-white" : "text-[#22223B]"}`}>👨‍👩‍👧 Family Sharing</h2>
              <p className={`text-sm font-medium mb-6 ${dark ? "text-gray-400" : "text-gray-500"}`}>Share your progress with a parent or guardian.</p>
              <button onClick={() => navigate("/family-share")}
                className="w-full bg-[#B9A7F8] text-white font-black py-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all">
                Share Progress
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
