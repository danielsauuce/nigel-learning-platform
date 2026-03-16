import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle2, ChevronRight, Lightbulb, Trophy, Gamepad2, HelpCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { LEARNING_PATHS } from "../data/learning-paths";
import { useLearning } from "../context/LearningContext";

/**
 * Lesson content per path — each lesson has a slide + quiz question.
 * This mirrors the mobile LessonScreen / QuizScreen flow.
 */
const LESSON_CONTENT: Record<string, { slide: { title: string; content: string }; quiz: { text: string; options: string[]; correct: number; explanation: string } }> = {
  sb1: { slide: { title: "What's Money?", content: "Money is a tool we use to exchange value. It can be coins, notes, or digital. Understanding what money is and how it works is the first step to financial literacy." }, quiz: { text: "What is money primarily used for?", options: ["Decoration", "Exchanging value", "Starting fires", "Art projects"], correct: 1, explanation: "Money is a medium of exchange — it lets us trade goods and services!" } },
  sb2: { slide: { title: "Why Do We Save?", content: "Saving means keeping some money aside instead of spending it all. We save for emergencies, future goals, and to have peace of mind." }, quiz: { text: "Why is saving important?", options: ["It's not important", "For emergencies and goals", "To impress friends", "Banks require it"], correct: 1, explanation: "Saving gives you a safety net and helps you reach your goals!" } },
  sb3: { slide: { title: "Piggy Banks & Savings Accounts", content: "A piggy bank is great for small savings. A bank savings account is safer for larger amounts and can even earn you interest over time." }, quiz: { text: "What's an advantage of a savings account over a piggy bank?", options: ["It's pink", "It earns interest", "It's smaller", "It's free"], correct: 1, explanation: "Savings accounts earn interest — your money grows while sitting there!" } },
  sb4: { slide: { title: "Setting a Savings Goal", content: "A savings goal gives you something to work towards. Start with a target amount and a deadline, then figure out how much to save each week." }, quiz: { text: "What should a savings goal include?", options: ["Just a wish", "A target amount and deadline", "Only a date", "Nothing specific"], correct: 1, explanation: "Good goals have a specific amount and a timeframe to keep you on track." } },
  sb5: { slide: { title: "Needs vs Wants", content: "Needs are things you must have to survive — food, shelter, water. Wants are things that are nice to have but you can live without — games, sweets, toys." }, quiz: { text: "Which is a NEED?", options: ["A new PlayStation", "Clean drinking water", "Designer trainers", "Netflix"], correct: 1, explanation: "Water is essential for survival — it's a primary need!" } },
  sb6: { slide: { title: "Emergency Funds", content: "An emergency fund is money set aside for unexpected events — like a broken phone or a surprise bill. Experts recommend saving 3-6 months of expenses." }, quiz: { text: "What is an emergency fund for?", options: ["Holiday spending", "Unexpected events", "Daily shopping", "Gifts"], correct: 1, explanation: "Emergency funds protect you when life throws surprises!" } },
  sb7: { slide: { title: "Interest — Free Money?", content: "When you save money in a bank, they pay you interest — a small percentage of your balance. It's like getting paid for saving! Compound interest means you earn interest on your interest." }, quiz: { text: "What is compound interest?", options: ["A type of tax", "Interest earned on interest", "A bank fee", "A loan type"], correct: 1, explanation: "Compound interest is earning interest on your interest — your money grows faster over time!" } },
  sb8: { slide: { title: "Saving Basics — Final Review", content: "You've learned about money, saving, needs vs wants, emergency funds, and interest. These are the building blocks of financial literacy!" }, quiz: { text: "What's the golden rule of budgeting?", options: ["Spend everything", "Never spend more than you earn", "Only use cash", "Save 100%"], correct: 1, explanation: "The golden rule: never spend more than you earn!" } },
};

export const MissionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const learning = useLearning();

  // Find the learning path by key
  const path = LEARNING_PATHS.find((p) => p.key === id);
  if (!path) return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-500">Path not found</div>;

  // Get lessons for this path that are unlocked
  const lessons = path.lessons;

  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [completedInSession, setCompletedInSession] = useState(0);

  const currentLesson = lessons[currentLessonIdx];
  const content = LESSON_CONTENT[currentLesson?.id];
  const isLessonLocked = currentLesson ? !learning.isLessonUnlocked(currentLesson.id) && !learning.completedLessons.has(currentLesson.id) : false;

  const handleNextSlide = () => {
    if (content?.quiz) { setShowQuiz(true); }
    else { handleLessonComplete(); }
  };

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const correct = content && index === content.quiz.correct;
    setIsCorrect(!!correct);
    if (correct) setScore((s) => s + 1);
  };

  const handleLessonComplete = () => {
    if (currentLesson) {
      learning.completeLesson(currentLesson.id);
      setCompletedInSession((c) => c + 1);
    }
    if (currentLessonIdx < lessons.length - 1) {
      setCurrentLessonIdx((i) => i + 1);
      setShowQuiz(false);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <button onClick={() => navigate("/student-dashboard")} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 hover:text-[#22223B] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Learning Path</p>
            <h1 className="text-xl font-black text-[#22223B]">{path.emoji} {path.title}</h1>
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#B9A7F8]"><Gamepad2 className="w-6 h-6" /></div>
        </header>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {lessons.map((l, i) => (
            <div key={l.id} className={`h-2 flex-1 rounded-full transition-all ${learning.completedLessons.has(l.id) ? "bg-[#B9A7F8]" : i === currentLessonIdx ? "bg-[#B9A7F8]/40" : "bg-gray-200"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {showResults ? (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-16 rounded-[4rem] shadow-sm border border-gray-100 text-center space-y-8">
              <div className="w-24 h-24 bg-amber-100 rounded-[2.5rem] flex items-center justify-center text-amber-500 mx-auto"><Trophy className="w-12 h-12" /></div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-[#22223B]">Path Complete!</h2>
                <p className="text-gray-500 font-medium text-lg">You scored {score} / {completedInSession} and earned +{completedInSession * 25} XP</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 inline-block">
                <p className="text-emerald-600 font-black text-xl">+{completedInSession * 25} XP</p>
                <p className="text-emerald-500/60 text-[10px] font-bold uppercase tracking-widest">Experience Earned</p>
              </div>
              <div className="pt-6">
                <button onClick={() => navigate("/student-dashboard")} className="bg-[#22223B] text-white font-black px-12 py-5 rounded-3xl shadow-xl hover:scale-105 transition-transform">Back to Dashboard</button>
              </div>
            </motion.div>
          ) : !showQuiz ? (
            <motion.div key="slide" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white p-10 md:p-16 rounded-[4rem] shadow-sm border border-gray-100 space-y-8">
              {isLessonLocked ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto"><HelpCircle className="w-8 h-8 text-gray-300" /></div>
                  <h2 className="text-2xl font-black text-gray-400">Locked</h2>
                  <p className="text-gray-400">Complete the previous lesson to unlock this one.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-[#B9A7F8]/10 rounded-2xl flex items-center justify-center text-[#B9A7F8]"><Lightbulb className="w-6 h-6" /></div>
                    <h2 className="text-3xl font-black text-[#22223B]">{currentLesson?.emoji} {content?.slide.title ?? currentLesson?.title}</h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">{content?.slide.content ?? "Lesson content coming soon..."}</p>
                  </div>
                  <div className="pt-10 flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-400">Lesson {currentLessonIdx + 1} of {lessons.length}</p>
                    <button onClick={handleNextSlide} className="bg-[#22223B] text-white font-black px-8 py-4 rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform">
                      {content?.quiz ? "Take Quiz" : "Complete"} <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ) : content?.quiz ? (
            <motion.div key="quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 md:p-16 rounded-[4rem] shadow-sm border border-gray-100 space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#B9A7F8] uppercase tracking-widest">Quiz</p>
                <h2 className="text-2xl font-black text-[#22223B]">{content.quiz.text}</h2>
              </div>
              <div className="space-y-4">
                {content.quiz.options.map((option, i) => (
                  <button key={i} disabled={selectedOption !== null} onClick={() => handleAnswer(i)}
                    className={`w-full p-6 rounded-3xl border-2 text-left font-bold transition-all flex items-center justify-between ${
                      selectedOption === i ? (isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-rose-50 border-rose-500 text-rose-700")
                      : selectedOption !== null && i === content.quiz.correct ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                      : "bg-gray-50 border-transparent hover:border-gray-200 text-[#22223B]"
                    }`}>
                    {option}
                    {selectedOption === i && (isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />)}
                  </button>
                ))}
              </div>
              {selectedOption !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-3xl ${isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                  <p className="text-sm font-bold">{content.quiz.explanation}</p>
                  <button onClick={handleLessonComplete} className="mt-4 w-full bg-white font-black py-4 rounded-2xl shadow-sm">
                    {currentLessonIdx === lessons.length - 1 ? "Finish Path" : "Next Lesson"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};
