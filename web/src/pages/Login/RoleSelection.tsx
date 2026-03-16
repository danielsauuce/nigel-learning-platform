import { motion } from "motion/react";
import { UserCircle, GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "student" | "teacher") => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <div className="text-center space-y-4 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#22223B]"
          >
            Welcome back!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg font-medium"
          >
            Please select your role to continue to the login screen
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => handleRoleSelect("student")}
            className="group bg-white p-12 rounded-[3rem] border-2 border-transparent hover:border-[#B9A7F8] hover:shadow-2xl transition-all text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B9A7F8]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <div className="w-20 h-20 bg-[#B9A7F8]/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#B9A7F8] transition-colors">
              <UserCircle className="w-10 h-10 text-[#B9A7F8] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-3xl font-bold text-[#22223B] mb-4">I'm a Student</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              Access your courses, play educational games, and track your learning journey.
            </p>
            <div className="flex items-center gap-2 text-[#B9A7F8] font-bold">
              Continue as Student{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => handleRoleSelect("teacher")}
            className="group bg-[#22223B] p-12 rounded-[3rem] border-2 border-transparent hover:border-[#F7B6B6] hover:shadow-2xl transition-all text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#F7B6B6] transition-colors">
              <GraduationCap className="w-10 h-10 text-white group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">I'm a Teacher</h3>
            <p className="text-white/50 font-medium leading-relaxed mb-8">
              Manage your classes, create new content, and monitor student performance.
            </p>
            <div className="flex items-center gap-2 text-[#F7B6B6] font-bold">
              Continue as Teacher{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
