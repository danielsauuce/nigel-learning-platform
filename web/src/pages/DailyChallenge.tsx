import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Zap, Clock, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLearning } from "../context/LearningContext";

interface ChallengeStep {
  type: "info" | "quiz" | "input";
  title: string;
  content: string;
  options?: { key: string; text: string }[];
  correctKey?: string;
  correctAnswer?: string;
  placeholder?: string;
  explanation?: string;
}

/** Exact copy from mobile DailyChallengeScreen */
const CHALLENGE_STEPS: ChallengeStep[] = [
  { type: "info", title: "The Scenario", content: "You invest £100 in a savings account that earns 10% compound interest per year. The bank adds interest to your balance, and next year you earn interest on the NEW total. Let's see how this works!" },
  { type: "quiz", title: "Year 1", content: "You start with £100 and earn 10% interest. How much do you have after Year 1?",
    options: [{ key: "a", text: "£100" }, { key: "b", text: "£110" }, { key: "c", text: "£120" }, { key: "d", text: "£105" }],
    correctKey: "b", explanation: "10% of £100 = £10. So £100 + £10 = £110." },
  { type: "quiz", title: "Year 2", content: "Now you have £110. You earn 10% interest again, but this time on £110, not £100. How much after Year 2?",
    options: [{ key: "a", text: "£120" }, { key: "b", text: "£121" }, { key: "c", text: "£115" }, { key: "d", text: "£125" }],
    correctKey: "b", explanation: "10% of £110 = £11. So £110 + £11 = £121. That's £1 more than simple interest!" },
  { type: "input", title: "Year 5 — You Solve It!", content: "After 5 years of 10% compound interest on £100, how much will you have? Round to the nearest whole pound.",
    correctAnswer: "161", placeholder: "Type your answer...",
    explanation: "£100 → £110 → £121 → £133 → £146 → £161. That's £11 more than simple interest would give!" },
];

export const DailyChallenge = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const learning = useLearning();
  const dark = theme === "dark";

  const [step, setStep] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputChecked, setInputChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(300);

  const current = CHALLENGE_STEPS[step];
  const totalQuestions = CHALLENGE_STEPS.filter((s) => s.type !== "info").length;

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => setTimer((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [finished]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const handleSelectOption = useCallback((key: string) => {
    if (answered) return;
    setSelectedKey(key);
    setAnswered(true);
    if (key === current.correctKey) setScore((p) => p + 1);
  }, [answered, current]);

  const handleCheckInput = useCallback(() => {
    setInputChecked(true);
    const clean = inputValue.replace(/[£,\s]/g, "");
    if (clean === current.correctAnswer) setScore((p) => p + 1);
  }, [inputValue, current]);

  const handleNext = useCallback(() => {
    if (step < CHALLENGE_STEPS.length - 1) {
      setStep((p) => p + 1); setSelectedKey(null); setAnswered(false); setInputValue(""); setInputChecked(false);
    } else { setFinished(true); }
  }, [step]);

  const xpEarned = score * 20 + (timer > 0 ? 10 : 0);

  if (finished) {
    return (
      <div className={`min-h-screen p-6 md:p-10 flex items-center justify-center ${dark ? "bg-[#1A1A2E]" : "bg-[#F8F9FE]"}`}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className={`p-12 rounded-[4rem] shadow-2xl border max-w-md w-full text-center space-y-8 ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
          <div className="w-24 h-24 bg-amber-100 rounded-[2.5rem] flex items-center justify-center text-amber-500 mx-auto"><Trophy className="w-12 h-12" /></div>
          <h2 className={`text-3xl font-black ${dark ? "text-white" : "text-[#22223B]"}`}>{score === totalQuestions ? "Perfect Score!" : "Challenge Complete!"}</h2>
          <p className={`font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>You scored {score}/{totalQuestions} on today's challenge.</p>
          <div className={`p-5 rounded-3xl space-y-3 ${dark ? "bg-[#1A1A2E]" : "bg-gray-50"}`}>
            {[{ label: "Correct answers", value: `+${score * 20} XP`, emoji: "✅" },
              { label: "Time bonus", value: timer > 0 ? "+10 XP" : "+0 XP", emoji: "⏱️" },
              { label: "Total earned", value: `+${xpEarned} XP`, emoji: "⚡" }
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span>{item.emoji}</span><span className={`font-medium text-sm ${dark ? "text-gray-300" : "text-[#22223B]"}`}>{item.label}</span></div>
                <span className="font-bold text-sm text-[#B9A7F8]">{item.value}</span>
              </div>
            ))}
          </div>
          <div className={`flex items-center gap-3 p-4 rounded-2xl border ${dark ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-50 border-amber-100"}`}>
            <span className="text-lg">🔥</span>
            <div className="text-left flex-1">
              <p className={`font-bold text-sm ${dark ? "text-white" : "text-[#22223B]"}`}>{learning.streak + 1}-day streak!</p>
              <p className="text-xs text-gray-400">Come back tomorrow to keep it going</p>
            </div>
          </div>
          <button onClick={() => navigate("/student-dashboard")} className="w-full bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg">Back to Dashboard</button>
        </motion.div>
      </div>
    );
  }

  const canProceed = current.type === "info" || (current.type === "quiz" && answered) || (current.type === "input" && inputChecked);
  const quizCorrect = current.type === "quiz" && selectedKey === current.correctKey;
  const inputCorrect = current.type === "input" && inputValue.replace(/[£,\s]/g, "") === current.correctAnswer;

  return (
    <div className={`min-h-screen p-6 md:p-10 ${dark ? "bg-[#1A1A2E]" : "bg-[#F8F9FE]"}`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/student-dashboard")} className={`w-10 h-10 rounded-xl flex items-center justify-center ${dark ? "bg-[#2A2A40] text-gray-400" : "bg-white text-gray-400"}`}><ArrowLeft className="w-5 h-5" /></button>
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#B9A7F8]" /><span className={`font-bold text-sm ${dark ? "text-white" : "text-[#22223B]"}`}>Daily Challenge</span></div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${timer < 60 ? "border-rose-300 text-rose-500" : dark ? "border-[#3A3A55] text-gray-400" : "border-gray-200 text-gray-400"}`}>
            <Clock className="w-3 h-3" /><span className="font-bold text-xs">{formatTime(timer)}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {CHALLENGE_STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i < step ? "bg-emerald-400" : i === step ? "bg-[#B9A7F8]" : dark ? "bg-[#3A3A55]" : "bg-gray-200"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }}>
            {/* Step label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#B9A7F8]/10 text-[#B9A7F8] text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider">Step {step + 1}/{CHALLENGE_STEPS.length}</span>
              <span className={`font-bold text-sm ${dark ? "text-white" : "text-[#22223B]"}`}>{current.title}</span>
            </div>

            {/* Content */}
            <div className={`p-6 rounded-3xl border mb-6 ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
              <p className={`text-sm leading-relaxed font-medium ${dark ? "text-gray-300" : "text-[#22223B]"}`}>{current.content}</p>
            </div>

            {/* Quiz options */}
            {current.type === "quiz" && current.options && (
              <div className="space-y-3">
                {current.options.map((opt) => {
                  const isSelected = selectedKey === opt.key;
                  const isCorrect = opt.key === current.correctKey;
                  let cls = dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100";
                  if (answered && isCorrect) cls = "bg-emerald-50 border-emerald-500 dark:bg-emerald-500/10";
                  else if (answered && isSelected && !isCorrect) cls = "bg-rose-50 border-rose-500 dark:bg-rose-500/10";
                  return (
                    <button key={opt.key} disabled={answered} onClick={() => handleSelectOption(opt.key)}
                      className={`w-full p-5 rounded-2xl border-2 text-left font-bold flex items-center gap-4 transition-all ${cls}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                        answered && isCorrect ? "bg-emerald-500 text-white" : answered && isSelected ? "bg-rose-500 text-white"
                        : isSelected ? "bg-[#B9A7F8] text-white" : dark ? "bg-[#1A1A2E] text-gray-400" : "bg-gray-100 text-gray-400"
                      }`}>
                        {answered && isCorrect ? <CheckCircle2 className="w-4 h-4" /> : answered && isSelected ? <XCircle className="w-4 h-4" /> : opt.key.toUpperCase()}
                      </div>
                      <span className={dark ? "text-gray-200" : "text-[#22223B]"}>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Input */}
            {current.type === "input" && (
              <div className="space-y-3">
                <div className={`flex items-center gap-3 p-4 rounded-2xl border ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
                  <span className={`font-bold text-lg ${dark ? "text-gray-400" : "text-gray-300"}`}>£</span>
                  <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                    placeholder={current.placeholder} disabled={inputChecked}
                    className={`flex-1 font-bold text-lg outline-none bg-transparent ${dark ? "text-white placeholder-gray-600" : "text-[#22223B] placeholder-gray-300"}`} />
                </div>
                {!inputChecked && (
                  <button disabled={inputValue.trim().length === 0} onClick={handleCheckInput}
                    className={`w-full py-3 rounded-2xl font-bold transition-all ${inputValue.trim().length > 0 ? "bg-[#B9A7F8] text-white" : dark ? "bg-[#2A2A40] text-gray-500" : "bg-gray-100 text-gray-400"}`}>
                    Check Answer
                  </button>
                )}
              </div>
            )}

            {/* Explanation */}
            {((current.type === "quiz" && answered) || (current.type === "input" && inputChecked)) && current.explanation && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-5 rounded-2xl border ${(quizCorrect || inputCorrect) ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30" : "bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/30"}`}>
                <p className={`text-sm font-bold ${(quizCorrect || inputCorrect) ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
                  {(quizCorrect || inputCorrect) ? "✅ " : "💡 "}{current.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        {canProceed && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <button onClick={handleNext} className="w-full bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg hover:scale-[1.02] transition-all">
              {step < CHALLENGE_STEPS.length - 1 ? "Next →" : "See Results"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
