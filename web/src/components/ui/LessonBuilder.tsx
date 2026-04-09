import { ActionBar } from './ActionBar'

type LearningPath = {
  key: string
  emoji: string
  title: string
}

type LessonBuilderProps = {
  title: string
  content: string
  emoji: string
  targetPath: string
  learningPaths: LearningPath[]
  onTitleChange: (title: string) => void
  onContentChange: (content: string) => void
  onEmojiChange: (emoji: string) => void
  onTargetPathChange: (path: string) => void
  onSaveDraft?: () => void
  onPublish?: () => void
  dark?: boolean
}

export const LessonBuilder = ({
  title,
  content,
  emoji,
  targetPath,
  learningPaths,
  onTitleChange,
  onContentChange,
  onEmojiChange,
  onTargetPathChange,
  onSaveDraft,
  onPublish,
  dark = false,
}: LessonBuilderProps) => (
  <div className="space-y-8">
    <div
      className={`p-8 rounded-[3rem] border ${
        dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
      }`}
    >
      <div className="mb-4">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
          Assign to Learning Path
        </label>
        <select
          value={targetPath}
          onChange={(e) => onTargetPathChange(e.target.value)}
          className={`w-full p-3 rounded-xl border font-bold text-sm ${
            dark
              ? 'bg-[#1A1A2E] border-[#3A3A55] text-white'
              : 'bg-gray-50 border-gray-200 text-[#22223B]'
          }`}
        >
          {learningPaths.map((path) => (
            <option key={path.key} value={path.key}>
              {path.emoji} {path.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={emoji}
          onChange={(e) => onEmojiChange(e.target.value)}
          className={`w-16 h-16 text-3xl text-center rounded-2xl border ${
            dark
              ? 'bg-[#1A1A2E] border-[#3A3A55]'
              : 'bg-gray-50 border-gray-200'
          }`}
        />
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Lesson Title"
          className={`flex-1 text-2xl font-black outline-none bg-transparent ${
            dark
              ? 'text-white placeholder-gray-600'
              : 'text-[#22223B] placeholder-gray-300'
          }`}
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Write the lesson content that students will see in their slide view..."
        rows={10}
        className={`w-full text-sm font-medium outline-none resize-none bg-transparent leading-relaxed ${
          dark
            ? 'text-gray-300 placeholder-gray-600'
            : 'text-gray-500 placeholder-gray-300'
        }`}
      />
    </div>
    <p
      className={`text-xs font-medium ${
        dark ? 'text-gray-500' : 'text-gray-400'
      }`}
    >
      💡 Tip: On mobile, this appears as a lesson slide. Students tap "Next" to
      advance. You can add a quiz question after the lesson to test
      understanding.
    </p>
    <ActionBar onSaveDraft={onSaveDraft} onPublish={onPublish} dark={dark} />
  </div>
)
