import { ActionBar } from './ActionBar'

type LearningPath = {
  key: string
  emoji: string
  title: string
}

type VideoBuilderProps = {
  title: string
  url: string
  notes: string
  targetPath: string
  learningPaths: LearningPath[]
  onTitleChange: (title: string) => void
  onUrlChange: (url: string) => void
  onNotesChange: (notes: string) => void
  onTargetPathChange: (path: string) => void
  onSaveDraft?: () => void
  onPublish?: () => void
  dark?: boolean
}

export const VideoBuilder = ({
  title,
  url,
  notes,
  targetPath,
  learningPaths,
  onTitleChange,
  onUrlChange,
  onNotesChange,
  onTargetPathChange,
  onSaveDraft,
  onPublish,
  dark = false,
}: VideoBuilderProps) => (
  <div
    className={`p-8 rounded-[3rem] border space-y-6 ${
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
    <input
      type="text"
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
      placeholder="Video Title"
      className={`w-full text-2xl font-black outline-none bg-transparent ${
        dark
          ? 'text-white placeholder-gray-600'
          : 'text-[#22223B] placeholder-gray-300'
      }`}
    />
    <input
      type="url"
      value={url}
      onChange={(e) => onUrlChange(e.target.value)}
      placeholder="https://youtube.com/watch?v=..."
      className={`w-full p-4 rounded-2xl border font-medium text-sm ${
        dark
          ? 'bg-[#1A1A2E] border-[#3A3A55] text-gray-300 placeholder-gray-600'
          : 'bg-gray-50 border-gray-200 text-[#22223B] placeholder-gray-300'
      }`}
    />
    <textarea
      value={notes}
      onChange={(e) => onNotesChange(e.target.value)}
      placeholder="Timestamped notes (optional)..."
      rows={5}
      className={`w-full p-4 rounded-2xl border font-medium text-sm resize-none ${
        dark
          ? 'bg-[#1A1A2E] border-[#3A3A55] text-gray-300 placeholder-gray-600'
          : 'bg-gray-50 border-gray-200 text-gray-500 placeholder-gray-300'
      }`}
    />
    <ActionBar onSaveDraft={onSaveDraft} onPublish={onPublish} dark={dark} />
  </div>
)
