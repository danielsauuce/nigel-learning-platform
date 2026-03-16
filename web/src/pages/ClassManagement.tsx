import { motion } from "motion/react";
import { ArrowLeft, Search, Filter, MoreHorizontal, Mail, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TeacherSidebar } from "../components/TeacherSidebar";
import { STUDENTS } from "../data/teachers";

export const ClassManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <TeacherSidebar />
      <div className="flex-1 lg:ml-80 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/teacher-dashboard")} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 hover:text-[#22223B] transition-colors"><ArrowLeft className="w-6 h-6" /></button>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-[#22223B]">Student Roster</h1>
                <p className="text-gray-500 font-medium">{STUDENTS.length} students enrolled</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search students..." className="w-full bg-white border-2 border-transparent focus:border-[#B9A7F8] rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-medium shadow-sm" />
              </div>
              <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400"><Filter className="w-5 h-5" /></button>
            </div>
          </header>

          <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Student</th>
                    <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Missions</th>
                    <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Score</th>
                    <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Sim Level</th>
                    <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Last Active</th>
                    <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {STUDENTS.map((student, i) => (
                    <motion.tr key={student.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#B9A7F8]/20 flex items-center justify-center text-[#B9A7F8] font-bold">{student.name.charAt(0)}</div>
                          <div>
                            <p className="font-bold text-[#22223B]">{student.name}</p>
                            <p className="text-xs text-gray-400 font-medium">{student.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-bold text-[#22223B]">{student.missions}</span>
                        <span className="text-xs text-gray-400 ml-1">completed</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${student.avg > 85 ? "bg-emerald-400" : student.avg > 70 ? "bg-amber-400" : "bg-rose-400"}`} style={{ width: `${student.avg}%` }} />
                          </div>
                          <span className="text-xs font-bold text-[#22223B]">{student.avg}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                          student.simLevel === "HIGH" ? "bg-emerald-50 text-emerald-600" :
                          student.simLevel === "STEADY" ? "bg-amber-50 text-amber-600" :
                          "bg-rose-50 text-rose-600"
                        }`}>{student.simLevel}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${student.active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${student.active ? "bg-green-600" : "bg-red-600"}`} />
                          {student.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium"><Clock className="w-3 h-3" />{student.lastActive}</div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-[#B9A7F8] hover:text-white transition-all"><Mail className="w-4 h-4" /></button>
                          <button className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-[#22223B] hover:text-white transition-all"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs text-gray-400 font-bold">Showing {STUDENTS.length} students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
