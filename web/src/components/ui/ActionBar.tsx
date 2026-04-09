import { Send } from 'lucide-react'

type ActionBarProps = {
  onSaveDraft?: () => void
  onPublish?: () => void
  dark?: boolean
}

export const ActionBar = ({
  onSaveDraft,
  onPublish,
  dark = false,
}: ActionBarProps) => (
  <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-[#3A3A55]">
    <button
      onClick={onSaveDraft}
      className={`flex-1 py-4 rounded-2xl border font-bold ${
        dark
          ? 'border-[#3A3A55] text-gray-300'
          : 'border-gray-200 text-[#22223B]'
      }`}
    >
      Save Draft
    </button>
    <button
      onClick={onPublish}
      className="flex-1 py-4 rounded-2xl bg-[#B9A7F8] text-white font-bold flex items-center justify-center gap-2 shadow-lg"
    >
      <Send className="w-4 h-4" /> Publish
    </button>
  </div>
)
