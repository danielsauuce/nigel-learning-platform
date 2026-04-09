import { ArrowLeft, Eye, Save } from 'lucide-react'

type ContentHeaderProps = {
  onBack: () => void
  onPreview?: () => void
  onSaveDraft?: () => void
  dark?: boolean
}

export const ContentHeader = ({
  onBack,
  onPreview,
  onSaveDraft,
  dark = false,
}: ContentHeaderProps) => (
  <header className="flex justify-between items-center mb-12">
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
          dark ? 'bg-[#2A2A40] text-gray-400' : 'bg-white text-gray-400'
        }`}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div>
        <h1
          className={`text-3xl font-bold ${
            dark ? 'text-white' : 'text-[#22223B]'
          }`}
        >
          Create Content
        </h1>
        <p className={dark ? 'text-gray-400' : 'text-gray-500'}>
          Build content that students see on mobile & web
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={onPreview}
        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold ${
          dark
            ? 'text-gray-400 hover:bg-[#2A2A40]'
            : 'text-gray-500 hover:bg-gray-100'
        }`}
      >
        <Eye className="w-5 h-5" /> Preview
      </button>
      <button
        onClick={onSaveDraft}
        className="flex items-center gap-2 bg-[#22223B] text-white font-bold px-8 py-3 rounded-2xl shadow-lg"
      >
        <Save className="w-5 h-5" /> Save Draft
      </button>
    </div>
  </header>
)
