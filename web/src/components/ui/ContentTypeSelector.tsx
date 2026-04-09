import React from 'react'
import { motion } from 'motion/react'
import { BookOpen, Video, Gamepad2 } from 'lucide-react'

type ContentType = 'lesson' | 'quiz' | 'video'

interface ContentTypeOption {
  id: ContentType
  title: string
  icon: React.ReactNode
  color: string
  desc: string
}

type ContentTypeSelectorProps = {
  onSelect: (type: ContentType) => void
  dark?: boolean
}

export const ContentTypeSelector = ({
  onSelect,
  dark = false,
}: ContentTypeSelectorProps) => {
  const contentTypes: ContentTypeOption[] = [
    {
      id: 'lesson',
      title: 'Interactive Lesson',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-[#B9A7F8]',
      desc: 'Create lesson slides that students see in their Learning Paths',
    },
    {
      id: 'video',
      title: 'Video Content',
      icon: <Video className="w-6 h-6" />,
      color: 'bg-[#F7B6B6]',
      desc: 'Upload or link an educational video with timestamped notes',
    },
    {
      id: 'quiz',
      title: 'Fun Quiz',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'bg-[#FFD93D]',
      desc: 'Build a quiz that appears in student missions — matching the mobile quiz flow',
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {contentTypes.map((type) => (
        <motion.button
          key={type.id}
          whileHover={{ y: -5 }}
          onClick={() => onSelect(type.id)}
          className={`p-10 rounded-[3rem] border text-left ${
            dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
          } hover:shadow-xl transition-all`}
        >
          <div
            className={`${type.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
          >
            {type.icon}
          </div>
          <h3
            className={`text-xl font-black mb-2 ${
              dark ? 'text-white' : 'text-[#22223B]'
            }`}
          >
            {type.title}
          </h3>
          <p
            className={`text-sm font-medium ${
              dark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {type.desc}
          </p>
        </motion.button>
      ))}
    </div>
  )
}
