import React from 'react'
import { motion } from 'motion/react'
import { Shield, Eye, EyeOff, Clock, CheckSquare } from 'lucide-react'
import { FamilyDataItem } from './DataItem'

interface ConsentStepProps {
  sharedItems: Array<{
    key: string
    icon: React.ReactNode
    label: string
  }>
  notSharedItems: Array<{
    key: string
    icon: React.ReactNode
    label: string
  }>
  agreed: boolean
  onAgreeChange: (agreed: boolean) => void
  onContinue: () => void
  dark: boolean
}

export const ConsentStep: React.FC<ConsentStepProps> = ({
  sharedItems,
  notSharedItems,
  agreed,
  onAgreeChange,
  onContinue,
  dark,
}) => {
  return (
    <motion.div
      key="consent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <Shield className="w-12 h-12 text-[#B9A7F8]" />
        </div>
        <h2
          className={`text-2xl font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          Your Data, Your Choice
        </h2>
        <p
          className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}
        >
          You can share a summary of your progress with a parent or guardian.
          They'll get a read-only link that expires in 7 days.
        </p>
      </div>

      {/* What's shared */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-[#B9A7F8]" />
          <span
            className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
          >
            What they'll see
          </span>
        </div>
        <div
          className={`p-5 rounded-2xl border space-y-3 ${dark ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}
        >
          {sharedItems.map((item) => (
            <FamilyDataItem
              key={item.key}
              item={item}
              isShared={true}
              dark={dark}
            />
          ))}
        </div>
      </div>

      {/* What's NOT shared */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <EyeOff className="w-4 h-4 text-gray-400" />
          <span
            className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
          >
            What stays private
          </span>
        </div>
        <div
          className={`p-5 rounded-2xl border space-y-3 ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
        >
          {notSharedItems.map((item) => (
            <FamilyDataItem
              key={item.key}
              item={item}
              isShared={false}
              dark={dark}
            />
          ))}
        </div>
      </div>

      {/* Expiry notice */}
      <div
        className={`flex items-center gap-3 p-4 rounded-2xl border ${dark ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50 border-amber-100'}`}
      >
        <Clock className="w-4 h-4 text-amber-500" />
        <span className="text-xs text-gray-400">
          The link will expire after 7 days. You can revoke access at any time
          from Settings.
        </span>
      </div>

      {/* Consent checkbox */}
      <button
        onClick={() => onAgreeChange(!agreed)}
        className="flex items-start gap-3 text-left w-full"
      >
        <div
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 ${agreed ? 'border-[#B9A7F8] bg-[#B9A7F8]' : dark ? 'border-[#3A3A55]' : 'border-gray-200'}`}
        >
          {agreed && <CheckSquare className="w-3.5 h-3.5 text-white" />}
        </div>
        <span
          className={`flex-1 text-sm font-medium ${dark ? 'text-gray-300' : 'text-[#22223B]'}`}
        >
          I understand what will be shared and I want to generate a link for my
          parent or guardian.
        </span>
      </button>

      <button
        disabled={!agreed}
        onClick={onContinue}
        className={`w-full py-5 rounded-3xl font-black transition-all ${agreed ? 'bg-[#B9A7F8] text-white shadow-lg' : dark ? 'bg-[#2A2A40] text-gray-500' : 'bg-gray-100 text-gray-400'}`}
      >
        Generate Link →
      </button>
    </motion.div>
  )
}
