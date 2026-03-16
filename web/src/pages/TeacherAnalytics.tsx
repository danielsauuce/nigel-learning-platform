import { motion } from 'motion/react'
import {
  ArrowLeft,
  TrendingUp,
  Clock,
  Award,
  Calendar,
  Download,
  ChevronDown,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TeacherSidebar } from '../components/TeacherSidebar'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts'

const performanceData = [
  { name: 'Mon', score: 82 },
  { name: 'Tue', score: 78 },
  { name: 'Wed', score: 90 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 88 },
  { name: 'Sat', score: 92 },
  { name: 'Sun', score: 85 },
]

const subjectData = [
  { name: 'Math', value: 85, color: '#B9A7F8' },
  { name: 'Science', value: 72, color: '#F7B6B6' },
  { name: 'Art', value: 95, color: '#FFD93D' },
  { name: 'Music', value: 88, color: '#22223B' },
]

export const TeacherAnalytics = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <TeacherSidebar />
      <div className="flex-1 lg:ml-80 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/teacher-dashboard')}
                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 hover:text-[#22223B] transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-[#22223B]">
                  Analytics & Insights
                </h1>
                <p className="text-gray-500 font-medium">
                  Track student progress and class performance.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-white text-[#22223B] font-bold px-6 py-3 rounded-2xl border border-gray-200 flex items-center gap-2 shadow-sm">
                <Calendar className="w-5 h-5 text-gray-400" />
                Last 7 Days
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              <button className="bg-[#22223B] text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </header>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                label: 'Average Score',
                value: '86.4%',
                trend: '+2.5%',
                icon: <Award className="w-6 h-6" />,
                color: 'text-[#B9A7F8]',
              },
              {
                label: 'Engagement Rate',
                value: '92%',
                trend: '+5.1%',
                icon: <TrendingUp className="w-6 h-6" />,
                color: 'text-[#F7B6B6]',
              },
              {
                label: 'Study Hours',
                value: '1,240h',
                trend: '-1.2%',
                icon: <Clock className="w-6 h-6" />,
                color: 'text-[#FFD93D]',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
                  >
                    {stat.trend}
                  </span>
                </div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
                  {stat.label}
                </p>
                <h3 className="text-4xl font-bold text-[#22223B]">
                  {stat.value}
                </h3>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-10 rounded-[4rem] shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-bold text-[#22223B]">
                  Weekly Performance
                </h3>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#B9A7F8] rounded-full" />
                    <span className="text-xs font-bold text-gray-400">
                      Score
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F3F4F6"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '1rem',
                        border: 'none',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#B9A7F8"
                      strokeWidth={4}
                      dot={{
                        r: 6,
                        fill: '#B9A7F8',
                        strokeWidth: 2,
                        stroke: '#fff',
                      }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Subject Distribution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-[4rem] shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-[#22223B] mb-10">
                Subject Proficiency
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F3F4F6"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip
                      cursor={{ fill: '#F9FAFB' }}
                      contentStyle={{
                        borderRadius: '1rem',
                        border: 'none',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                      {subjectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Detailed Insights */}
          <div className="bg-[#22223B] rounded-[4rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B9A7F8]/20 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">AI Learning Insights</h3>
                <p className="text-white/60 leading-relaxed font-medium">
                  Our AI has analyzed your students' performance across all
                  modules. Students are showing exceptional growth in{' '}
                  <span className="text-[#FFD93D]">Visual Arts</span> but may
                  need more support in{' '}
                  <span className="text-[#F7B6B6]">Scientific Reasoning</span>.
                </p>
                <button className="bg-[#B9A7F8] text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-[#B9A7F8]/30">
                  View Detailed Analysis
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Completion', value: '94%' },
                  { label: 'Retention', value: '82%' },
                  { label: 'Satisfaction', value: '4.8/5' },
                  { label: 'Growth', value: '+12%' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10"
                  >
                    <p className="text-white/40 text-xs font-bold uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
