import { Home as HomeIcon, Search, Calendar, User } from 'lucide-react'

export const DashboardScreen = () => (
  <div className="w-[280px] h-[600px] bg-white rounded-[3rem] p-5 flex flex-col gap-5 shadow-2xl">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-400 text-xs">Good morning</p>
        <h2 className="text-lg font-bold">Sarah Hessy</h2>
      </div>
    </div>

    <div className="bg-gray-50 rounded-2xl p-4">
      <h3 className="text-sm font-bold">Math class in 30 minutes</h3>
      <button className="bg-edulite-navy text-white text-xs px-3 py-1 rounded-full mt-2">
        Join now
      </button>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div className="bg-edulite-pink rounded-2xl p-3">
        <p className="text-xs font-bold">Drawing practice</p>
      </div>
      <div className="bg-edulite-purple rounded-2xl p-3">
        <p className="text-xs font-bold text-white">Learning to count</p>
      </div>
    </div>

    <div className="mt-auto flex justify-between text-gray-400">
      <HomeIcon />
      <Search />
      <Calendar />
      <User />
    </div>
  </div>
)
