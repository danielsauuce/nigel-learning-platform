import React from 'react'

interface ConversationStarterProps {
  icon: React.ReactNode
  prompt: string
  detail: string
  dark: boolean
}

export const ConversationStarter: React.FC<ConversationStarterProps> = ({
  icon,
  prompt,
  detail,
  dark,
}) => {
  return (
    <div
      className={`p-4 rounded-2xl ${dark ? 'bg-[#B9A7F8]/5 border border-[#B9A7F8]/10' : 'bg-[#B9A7F8]/5 border border-[#B9A7F8]/10'}`}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="font-bold text-xs text-[#B9A7F8]">{prompt}</span>
      </div>
      <p
        className={`ml-6 text-xs italic ${dark ? 'text-gray-300' : 'text-[#22223B]'}`}
      >
        {detail}
      </p>
    </div>
  )
}
