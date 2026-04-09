import { Copy, Lock, Share2, Users } from 'lucide-react'

type TeacherFamilyConsentCardProps = {
  dark: boolean
  familyConsent: boolean
  onToggleConsent: () => void
  onCopy: () => void
  onShare: () => void
  inviteCode: string
}

export const TeacherFamilyConsentCard = ({
  dark,
  familyConsent,
  onToggleConsent,
  onCopy,
  onShare,
  inviteCode,
}: TeacherFamilyConsentCardProps) => (
  <section
    className={`p-8 rounded-[3rem] border ${
      dark ? 'bg-[#2A2A40] border-[#B9A7F8]/15' : 'bg-white border-[#B9A7F8]/15'
    }`}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 bg-[#B9A7F8]/10 rounded-xl flex items-center justify-center">
        <Users className="w-4 h-4 text-[#B9A7F8]" />
      </div>
      <h3
        className={`font-bold text-lg ${dark ? 'text-white' : 'text-[#22223B]'}`}
      >
        Share Progress
      </h3>
    </div>
    <p
      className={`text-sm font-medium mb-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`}
    >
      Invite parents to track student progress and celebrate milestones
      together.
    </p>

    <button
      onClick={onToggleConsent}
      className={`w-full flex items-start gap-3 p-4 rounded-2xl border mb-4 text-left ${
        dark ? 'bg-[#1A1A2E] border-[#3A3A55]' : 'bg-gray-50 border-gray-100'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 ${
          familyConsent
            ? 'border-[#B9A7F8] bg-[#B9A7F8]'
            : dark
              ? 'border-[#3A3A55]'
              : 'border-gray-200'
        }`}
      >
        {familyConsent && (
          <span className="text-[9px] font-bold text-white">✓</span>
        )}
      </div>
      <div className="flex-1">
        <p
          className={`font-bold text-xs ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          I consent to share my data
        </p>
        <p className="text-[10px] text-gray-400 leading-tight">
          By checking this, you allow invited family members to see daily
          activity, XP, and lesson completion status.
        </p>
      </div>
    </button>

    {familyConsent && (
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Family Invite Code
        </p>
        <div className="flex gap-2">
          <div
            className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border ${
              dark
                ? 'bg-[#B9A7F8]/5 border-[#B9A7F8]/15'
                : 'bg-[#B9A7F8]/5 border-[#B9A7F8]/15'
            }`}
          >
            <Lock className="w-4 h-4 text-[#B9A7F8]" />
            <span className="font-bold text-sm text-[#B9A7F8] tracking-wider">
              {inviteCode}
            </span>
          </div>
          <button
            onClick={onCopy}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
              dark ? 'border-[#3A3A55]' : 'border-gray-200'
            }`}
          >
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <button
          onClick={onShare}
          className="w-full flex items-center justify-center gap-2 bg-[#B9A7F8] text-white font-bold py-3 rounded-xl"
        >
          <Share2 className="w-4 h-4" /> Send Invite Link
        </button>
        <p className="text-center text-[10px] text-gray-400">
          This link expires in 24 hours. Limit 1 use.
        </p>
      </div>
    )}
  </section>
)
