import { HelpCircle } from 'lucide-react'

export const LockedLesson = () => {
  return (
    <div className="text-center py-10 space-y-4">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
        <HelpCircle className="w-8 h-8 text-gray-300" />
      </div>
      <h2 className="text-2xl font-black text-gray-400">Locked</h2>
      <p className="text-gray-400">
        Complete the previous lesson to unlock this one.
      </p>
    </div>
  )
}
