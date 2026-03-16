import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Eye, EyeOff, Shield, Clock, CheckSquare, Copy, Check, Share2, Link2, Award, TrendingUp, Target, Heart, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLearning } from "../context/LearningContext";

/** Mirrors mobile ConsentScreen data */
const SHARED_ITEMS = [
  { key: "progress", emoji: "📊", label: "Learning progress & completion %" },
  { key: "badges", emoji: "🏆", label: "Badges and achievements earned" },
  { key: "streak", emoji: "🔥", label: "Current streak & activity" },
  { key: "score", emoji: "⭐", label: "Quiz scores & simulation grades" },
];
const NOT_SHARED_ITEMS = [
  { key: "answers", emoji: "🔒", label: "Your individual quiz answers" },
  { key: "chat", emoji: "💬", label: "Messages with teachers or classmates" },
  { key: "personal", emoji: "🛡️", label: "Personal settings or preferences" },
];

const MOCK_LINK = "nigel.app/family/a7x9k2m";

const CONVERSATION_STARTERS = [
  { emoji: "💬", prompt: "Ask about saving", detail: '"What did you learn about where to keep money safely?"' },
  { emoji: "🛒", prompt: "Discuss budgeting", detail: '"Can you show me how you built a budget in the simulator?"' },
  { emoji: "🎯", prompt: "Celebrate progress", detail: '"I saw you completed 12 missions — which one was your favourite?"' },
];

export const FamilyShare = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const learning = useLearning();
  const dark = theme === "dark";

  const [step, setStep] = useState<"consent" | "link" | "preview">("consent");
  const [agreed, setAgreed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleCopy = useCallback(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }, []);
  const handleSendFeedback = useCallback(() => { if (feedback.trim()) { setFeedbackSent(true); setFeedback(""); } }, [feedback]);

  const totalLessons = 33;
  const overallProgress = totalLessons > 0 ? Math.round((learning.completedLessons.size / totalLessons) * 100) : 0;

  const cardCls = `rounded-[3rem] border ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`;

  return (
    <div className={`min-h-screen p-6 md:p-10 transition-colors ${dark ? "bg-[#1A1A2E]" : "bg-[#F8F9FE]"}`}>
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => step === "consent" ? navigate("/student-dashboard") : setStep("consent")}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${dark ? "bg-[#2A2A40] text-gray-400" : "bg-white text-gray-400"}`}><ArrowLeft className="w-6 h-6" /></button>
          <h1 className={`text-2xl font-black ${dark ? "text-white" : "text-[#22223B]"}`}>Share with Family</h1>
        </header>

        <AnimatePresence mode="wait">
          {/* ── STEP 1: CONSENT ── */}
          {step === "consent" && (
            <motion.div key="consent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="text-center space-y-3">
                <div className="text-5xl">🛡️</div>
                <h2 className={`text-2xl font-black ${dark ? "text-white" : "text-[#22223B]"}`}>Your Data, Your Choice</h2>
                <p className={`text-sm font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>You can share a summary of your progress with a parent or guardian. They'll get a read-only link that expires in 7 days.</p>
              </div>

              {/* What's shared */}
              <div>
                <div className="flex items-center gap-2 mb-3"><Eye className="w-4 h-4 text-[#B9A7F8]" /><span className={`font-bold text-sm ${dark ? "text-white" : "text-[#22223B]"}`}>What they'll see</span></div>
                <div className={`p-5 rounded-2xl border space-y-3 ${dark ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-100"}`}>
                  {SHARED_ITEMS.map((item) => (
                    <div key={item.key} className="flex items-center gap-3">
                      <span>{item.emoji}</span>
                      <span className={`flex-1 text-sm font-medium ${dark ? "text-gray-300" : "text-[#22223B]"}`}>{item.label}</span>
                      <span className="text-emerald-500 text-xs">✓</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's NOT shared */}
              <div>
                <div className="flex items-center gap-2 mb-3"><EyeOff className="w-4 h-4 text-gray-400" /><span className={`font-bold text-sm ${dark ? "text-white" : "text-[#22223B]"}`}>What stays private</span></div>
                <div className={`p-5 rounded-2xl border space-y-3 ${cardCls}`}>
                  {NOT_SHARED_ITEMS.map((item) => (
                    <div key={item.key} className="flex items-center gap-3">
                      <span>{item.emoji}</span>
                      <span className="flex-1 text-sm font-medium text-gray-400">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expiry notice */}
              <div className={`flex items-center gap-3 p-4 rounded-2xl border ${dark ? "bg-amber-500/5 border-amber-500/20" : "bg-amber-50 border-amber-100"}`}>
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-gray-400">The link will expire after 7 days. You can revoke access at any time from Settings.</span>
              </div>

              {/* Consent checkbox */}
              <button onClick={() => setAgreed(!agreed)} className="flex items-start gap-3 text-left w-full">
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 ${agreed ? "border-[#B9A7F8] bg-[#B9A7F8]" : dark ? "border-[#3A3A55]" : "border-gray-200"}`}>
                  {agreed && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className={`flex-1 text-sm font-medium ${dark ? "text-gray-300" : "text-[#22223B]"}`}>I understand what will be shared and I want to generate a link for my parent or guardian.</span>
              </button>

              <button disabled={!agreed} onClick={() => setStep("link")}
                className={`w-full py-5 rounded-3xl font-black transition-all ${agreed ? "bg-[#B9A7F8] text-white shadow-lg" : dark ? "bg-[#2A2A40] text-gray-500" : "bg-gray-100 text-gray-400"}`}>
                Generate Link →
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: LINK GENERATED ── */}
          {step === "link" && (
            <motion.div key="link" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="text-center space-y-3">
                <div className="text-5xl">🎉</div>
                <h2 className={`text-2xl font-black ${dark ? "text-white" : "text-[#22223B]"}`}>Link Created!</h2>
                <p className={`text-sm font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Share this link with your parent or guardian so they can see your progress.</p>
              </div>

              {/* Link card */}
              <div className={`p-5 ${cardCls}`}>
                <div className={`flex items-center justify-between p-4 rounded-2xl mb-3 ${dark ? "bg-[#1A1A2E]" : "bg-gray-50"}`}>
                  <div className="flex items-center gap-2 flex-1">
                    <Link2 className="w-4 h-4 text-[#B9A7F8]" />
                    <span className="text-[#B9A7F8] font-bold text-sm truncate">{MOCK_LINK}</span>
                  </div>
                  <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${copied ? "bg-emerald-100 text-emerald-600" : "bg-[#B9A7F8]/10 text-[#B9A7F8]"}`}>
                    {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Clock className="w-3 h-3" /> Expires in 7 days · Single-use · Read-only
                </div>
              </div>

              {/* Share */}
              <button className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl border ${dark ? "border-[#B9A7F8]/20 bg-[#B9A7F8]/5" : "border-[#B9A7F8]/15 bg-[#B9A7F8]/5"}`}>
                <Share2 className="w-5 h-5 text-[#B9A7F8]" />
                <span className="font-bold text-sm text-[#B9A7F8]">Share via Message or Email</span>
              </button>

              {/* Preview summary */}
              <div>
                <h3 className={`font-bold text-sm mb-3 ${dark ? "text-white" : "text-[#22223B]"}`}>What your family will see</h3>
                <div className={`p-5 rounded-2xl border space-y-3 ${cardCls}`}>
                  {[{ emoji: "📊", text: `${overallProgress}% overall progress` },
                    { emoji: "🏆", text: `${learning.earnedBadges.size} badges earned` },
                    { emoji: "🔥", text: `${learning.streak}-day learning streak` },
                    { emoji: "⭐", text: "Budget simulation: B grade" }
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <span>{item.emoji}</span>
                      <span className={`text-sm font-medium ${dark ? "text-gray-300" : "text-[#22223B]"}`}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setStep("preview")} className="w-full flex items-center justify-center gap-2 py-3 text-[#B9A7F8] font-bold">
                <Eye className="w-4 h-4" /> Preview what they'll see
              </button>

              <button onClick={() => navigate("/student-settings")} className="w-full bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg">Done</button>
            </motion.div>
          )}

          {/* ── STEP 3: PARENT SUMMARY PREVIEW ── */}
          {step === "preview" && (
            <motion.div key="preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              {/* Brand header */}
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2"><Shield className="w-5 h-5 text-[#B9A7F8]" /><span className="font-black text-[#B9A7F8]">Nigel</span></div>
                <p className="text-xs text-gray-400">Family Progress Summary</p>
              </div>

              {/* Expiry */}
              <div className={`flex items-center gap-2 p-3 rounded-xl border ${dark ? "bg-amber-500/5 border-amber-500/15" : "bg-amber-50 border-amber-100"}`}>
                <Clock className="w-3 h-3 text-amber-500" /><span className="text-[11px] text-gray-400">This link expires in 6 days · Read-only</span>
              </div>

              {/* Student profile card */}
              <div className={`overflow-hidden ${cardCls}`}>
                <div className={`p-6 text-center ${dark ? "bg-[#B9A7F8]/5" : "bg-[#B9A7F8]/5"}`}>
                  <div className="w-16 h-16 bg-[#B9A7F8]/15 rounded-full flex items-center justify-center text-[#B9A7F8] font-black text-2xl mx-auto mb-2">S</div>
                  <h3 className={`text-xl font-black ${dark ? "text-white" : "text-[#22223B]"}`}>Sarah's Progress</h3>
                  <p className="text-xs text-gray-400">Level {learning.level} · 🔥 {learning.streak}-day streak</p>
                </div>
                <div className="p-6 flex items-center gap-6">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke={dark ? "#3A3A55" : "#E5E7EB"} strokeWidth="8" opacity="0.25" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#B9A7F8" strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 42}`} strokeDashoffset={`${2 * Math.PI * 42 * (1 - overallProgress / 100)}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-lg font-black ${dark ? "text-white" : "text-[#22223B]"}`}>{overallProgress}%</span>
                      <span className="text-[8px] text-gray-400">complete</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[{ icon: <Target className="w-3.5 h-3.5 text-[#B9A7F8]" />, label: "Missions", value: `${learning.completedLessons.size}/33` },
                      { icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />, label: "Sim Grade", value: "B" },
                      { icon: <Award className="w-3.5 h-3.5 text-amber-500" />, label: "Quiz Avg", value: "82%" }
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${dark ? "bg-[#1A1A2E]" : "bg-gray-50"}`}>{s.icon}</div>
                        <div><p className="text-[10px] text-gray-400">{s.label}</p><p className={`text-sm font-bold ${dark ? "text-white" : "text-[#22223B]"}`}>{s.value}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conversation starters */}
              <div>
                <div className="flex items-center gap-2 mb-3"><Heart className="w-4 h-4 text-[#B9A7F8]" /><span className={`font-bold text-sm ${dark ? "text-white" : "text-[#22223B]"}`}>Talk About It Together</span></div>
                <div className="space-y-2">
                  {CONVERSATION_STARTERS.map((s, i) => (
                    <div key={i} className={`p-4 rounded-2xl ${dark ? "bg-[#B9A7F8]/5 border border-[#B9A7F8]/10" : "bg-[#B9A7F8]/5 border border-[#B9A7F8]/10"}`}>
                      <div className="flex items-center gap-2 mb-1"><span className="text-sm">{s.emoji}</span><span className="font-bold text-xs text-[#B9A7F8]">{s.prompt}</span></div>
                      <p className={`ml-6 text-xs italic ${dark ? "text-gray-300" : "text-[#22223B]"}`}>{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback to teacher */}
              <div>
                <div className="flex items-center gap-2 mb-3"><Send className="w-4 h-4 text-gray-400" /><span className={`font-bold text-sm ${dark ? "text-white" : "text-[#22223B]"}`}>Feedback for the Teacher</span></div>
                {feedbackSent ? (
                  <div className={`p-6 rounded-2xl border text-center ${dark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-100"}`}>
                    <span className="text-2xl block mb-2">✅</span>
                    <p className="font-bold text-emerald-600 text-sm">Thank you!</p>
                    <p className="text-xs text-gray-400">Your feedback has been sent anonymously.</p>
                  </div>
                ) : (
                  <div className={`p-5 rounded-2xl border ${cardCls}`}>
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={3}
                      placeholder="e.g. Alex really enjoyed the budget simulator, but found the quiz hard..."
                      className={`w-full resize-none outline-none text-sm font-medium mb-3 bg-transparent ${dark ? "text-white placeholder-gray-600" : "text-[#22223B] placeholder-gray-300"}`} />
                    <button disabled={!feedback.trim()} onClick={handleSendFeedback}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm ${feedback.trim() ? "bg-[#B9A7F8] text-white" : dark ? "bg-[#1A1A2E] text-gray-500" : "bg-gray-100 text-gray-400"}`}>
                      <Send className="w-3.5 h-3.5" /> Send Anonymously
                    </button>
                  </div>
                )}
              </div>

              <button onClick={() => setStep("link")} className="w-full bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg">← Back to Link</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
