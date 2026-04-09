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
import { TeacherAnalyticsHeader } from '../components/ui/TeacherAnalyticsHeader'
import { AnalyticsMetricCard } from '../components/ui/AnalyticsMetricCard'
import { AnalyticsChartCard } from '../components/ui/AnalyticsChartCard'
import { InsightSummaryCard } from '../components/ui/InsightSummaryCard'
import { TrendingUp, Clock, Award } from 'lucide-react'

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
          <TeacherAnalyticsHeader
            onBack={() => navigate('/teacher-dashboard')}
            title="Analytics & Insights"
            subtitle="Track student progress and class performance."
            timeRangeLabel="Last 7 Days"
            onExport={() => {
              /* export action */
            }}
          />

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                label: 'Average Score',
                value: '86.4%',
                trend: '+2.5%',
                icon: <Award className="w-6 h-6" />,
                positive: true,
              },
              {
                label: 'Engagement Rate',
                value: '92%',
                trend: '+5.1%',
                icon: <TrendingUp className="w-6 h-6" />,
                positive: true,
              },
              {
                label: 'Study Hours',
                value: '1,240h',
                trend: '-1.2%',
                icon: <Clock className="w-6 h-6" />,
                positive: false,
              },
            ].map((stat, i) => (
              <AnalyticsMetricCard
                key={i}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                trend={stat.trend}
                positive={stat.positive}
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Performance Chart */}
            <AnalyticsChartCard
              title="Weekly Performance"
              legend={
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#B9A7F8] rounded-full" />
                    <span className="text-xs font-bold text-gray-400">
                      Score
                    </span>
                  </div>
                </div>
              }
            >
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
            </AnalyticsChartCard>

            {/* Subject Distribution */}
            <AnalyticsChartCard title="Subject Proficiency" delay={0.2}>
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
            </AnalyticsChartCard>
          </div>

          <InsightSummaryCard
            title="AI Learning Insights"
            description="Our AI has analyzed your students' performance across all modules. Students are showing exceptional growth in Visual Arts but may need more support in Scientific Reasoning."
            actionLabel="View Detailed Analysis"
            onAction={() => {
              /* detailed page action */
            }}
            items={[
              { label: 'Completion', value: '94%' },
              { label: 'Retention', value: '82%' },
              { label: 'Satisfaction', value: '4.8/5' },
              { label: 'Growth', value: '+12%' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
