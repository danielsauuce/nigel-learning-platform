import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Wallet, CheckCircle2, AlertTriangle, Info, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JOBS, TAKE_HOME, createBudgetCategories, LIFE_EVENTS } from "../data/simulator";
import { useLearning } from "../context/LearningContext";
import type { BudgetCategory } from "../types";

export const BudgetSimulator = () => {
  const navigate = useNavigate();
  const learning = useLearning();
  const [step, setStep] = useState<"select" | "payslip" | "budget" | "event" | "results">("select");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [budget, setBudget] = useState<BudgetCategory[]>(createBudgetCategories());
  const [event, setEvent] = useState<{ title: string; cost: number; desc: string } | null>(null);

  const job = JOBS.find((j) => j.key === selectedJob);
  const totalSpent = budget.reduce((acc, c) => acc + c.value, 0);
  const moneyLeft = TAKE_HOME - totalSpent;

  const updateBudget = (key: string, value: number) => {
    setBudget((prev) => prev.map((c) => (c.key === key ? { ...c, value: Math.max(0, value) } : c)));
  };

  const triggerEvent = () => {
    const ev = LIFE_EVENTS[Math.floor(Math.random() * LIFE_EVENTS.length)];
    setEvent(ev);
    setStep("event");
  };

  const handleFinish = () => {
    // Award budget_pro badge if balanced within 5% of take-home
    if (Math.abs(moneyLeft) < TAKE_HOME * 0.05) learning.earnBadge("budget_pro");
    setStep("results");
  };

  const savingsAmount = budget.find((c) => c.key === "savings")?.value ?? 0;
  const emergencyAmount = budget.find((c) => c.key === "emergency")?.value ?? 0;
  const finalBalance = moneyLeft - (event?.cost ?? 0);

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-10">
          <button onClick={() => step === "select" ? navigate("/student-dashboard") : setStep("select")} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 hover:text-[#22223B] transition-colors"><ArrowLeft className="w-6 h-6" /></button>
          <div><h1 className="text-2xl font-black text-[#22223B]">Budget Simulator</h1><p className="text-gray-500 font-medium text-sm">Experience your first month of earning!</p></div>
        </header>

        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <h2 className="text-3xl font-black text-[#22223B] text-center">Choose Your Career</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {JOBS.map((j) => (
                  <button key={j.key} onClick={() => { setSelectedJob(j.key); setStep("payslip"); }}
                    className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 hover:border-[#B9A7F8] hover:shadow-xl transition-all text-left group">
                    <div className="text-4xl mb-4">{j.emoji}</div>
                    <h3 className="text-xl font-black text-[#22223B] mb-2">{j.title}</h3>
                    <p className="text-gray-400 text-sm font-medium mb-4">{j.description}</p>
                    <div className="pt-4 border-t border-gray-50">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Annual Salary</p>
                      <p className="text-2xl font-black text-[#22223B]">{j.salary}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "payslip" && (
            <motion.div key="payslip" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-gray-100 max-w-2xl mx-auto relative overflow-hidden">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-[#B9A7F8] rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 shadow-lg"><CheckCircle2 className="w-10 h-10" /></div>
                <h2 className="text-3xl font-black text-[#22223B]">You Got Paid! 🎉</h2>
                <p className="text-gray-400 font-medium">Your monthly take-home pay as a {job?.title}</p>
              </div>
              <div className="flex justify-between items-center p-8 bg-[#22223B] rounded-[2.5rem] text-white shadow-xl">
                <div>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Take-Home Pay</p>
                  <p className="text-3xl font-black">£{TAKE_HOME}</p>
                </div>
                <Info className="w-6 h-6 text-white/20" />
              </div>
              <button onClick={() => setStep("budget")} className="w-full mt-12 bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg hover:scale-[1.02] transition-all">Start Budgeting</button>
            </motion.div>
          )}

          {step === "budget" && (
            <motion.div key="budget" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3 space-y-6">
                <h2 className="text-2xl font-black text-[#22223B]">Allocate Your Budget</h2>
                <div className="space-y-4">
                  {budget.map((cat) => (
                    <div key={cat.key} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl">{cat.emoji}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#22223B]">{cat.label}</span>
                          <span className="font-black text-[#B9A7F8]">£{cat.value}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">Recommended: £{cat.recommended}</p>
                        <input type="range" min="0" max={cat.max} step={cat.step} value={cat.value}
                          onChange={(e) => updateBudget(cat.key, parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#B9A7F8]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="sticky top-10 space-y-6">
                  <div className="bg-[#22223B] p-8 rounded-[3rem] text-white shadow-2xl">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Money Remaining</p>
                        <h3 className={`text-4xl font-black ${moneyLeft < 0 ? "text-rose-400" : "text-white"}`}>£{moneyLeft}</h3>
                      </div>
                      <div className={`p-3 rounded-2xl ${moneyLeft < 0 ? "bg-rose-500/20 text-rose-400" : "bg-white/10 text-white/50"}`}><Wallet className="w-6 h-6" /></div>
                    </div>
                    {moneyLeft < 0 && (
                      <div className="flex items-center gap-3 p-4 bg-rose-500/20 rounded-2xl border border-rose-500/30 mb-6">
                        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                        <p className="text-xs font-bold text-rose-100">You're overspending! Reduce some categories.</p>
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className="flex justify-between text-xs font-bold text-white/40 uppercase"><span>Total Spent</span><span>£{totalSpent}</span></div>
                      <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${moneyLeft < 0 ? "bg-rose-500" : "bg-[#B9A7F8]"}`} style={{ width: `${Math.min(100, (totalSpent / TAKE_HOME) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                  <button disabled={moneyLeft < 0 || totalSpent === 0} onClick={triggerEvent}
                    className="w-full bg-[#B9A7F8] text-white font-black py-6 rounded-[2.5rem] shadow-lg disabled:opacity-50 disabled:hover:scale-100 hover:scale-[1.02] transition-all">Finish Month</button>
                </div>
              </div>
            </motion.div>
          )}

          {step === "event" && event && (
            <motion.div key="event" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[4rem] shadow-2xl border-4 border-rose-100 max-w-xl mx-auto text-center space-y-8">
              <div className="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center text-rose-500 mx-auto animate-bounce"><AlertTriangle className="w-12 h-12" /></div>
              <div className="space-y-2"><h2 className="text-3xl font-black text-[#22223B]">{event.title}</h2><p className="text-gray-500 font-medium">{event.desc}</p></div>
              <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100"><p className="text-rose-500 font-black text-2xl">-£{event.cost}</p><p className="text-rose-400 text-xs font-bold uppercase">Unexpected Cost</p></div>
              <button onClick={handleFinish} className="w-full bg-[#22223B] text-white font-black py-5 rounded-3xl shadow-xl">See Results</button>
            </motion.div>
          )}

          {step === "results" && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white p-12 rounded-[4rem] shadow-2xl border border-gray-100 max-w-2xl mx-auto space-y-10">
              <div className="text-center"><div className="w-20 h-20 bg-amber-100 rounded-[2rem] flex items-center justify-center text-amber-500 mx-auto mb-6"><Sparkles className="w-10 h-10" /></div><h2 className="text-3xl font-black text-[#22223B]">Month Complete!</h2></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-emerald-50 p-8 rounded-[3rem] border border-emerald-100 text-center">
                  <p className="text-emerald-600 font-black text-3xl">£{savingsAmount + emergencyAmount}</p>
                  <p className="text-emerald-500/60 text-[10px] font-bold uppercase tracking-widest">Total Saved</p>
                </div>
                <div className={`p-8 rounded-[3rem] border text-center ${finalBalance >= 0 ? "bg-blue-50 border-blue-100" : "bg-rose-50 border-rose-100"}`}>
                  <p className={`font-black text-3xl ${finalBalance >= 0 ? "text-blue-600" : "text-rose-600"}`}>£{finalBalance}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${finalBalance >= 0 ? "text-blue-500/60" : "text-rose-500/60"}`}>Final Balance</p>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-[3rem] space-y-4">
                <h3 className="font-black text-[#22223B] flex items-center gap-2"><Info className="w-5 h-5 text-[#B9A7F8]" /> Nigel's Advice</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  {finalBalance < 0 ? "Tough month! Those unexpected costs can really hurt. Try building a larger emergency fund next time."
                    : savingsAmount < TAKE_HOME * 0.1 ? "Good job staying in the black! Try saving at least 10% of your income."
                    : "Excellent budgeting! You handled the surprise and still saved well. You're a natural! 🌟"}
                </p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => { setBudget(createBudgetCategories()); setStep("select"); setEvent(null); }}
                  className="flex-1 bg-gray-100 text-[#22223B] font-black py-5 rounded-3xl hover:bg-gray-200 transition-all">Try Again</button>
                <button onClick={() => navigate("/student-dashboard")}
                  className="flex-1 bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg hover:scale-[1.02] transition-all">Back to Dashboard</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
