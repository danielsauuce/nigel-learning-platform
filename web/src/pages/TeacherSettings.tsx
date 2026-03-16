import { useState } from "react";
import { ArrowLeft, User, Bell, Shield, Camera, Save, LogOut, Moon, Sun, Users, Copy, Share2, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TeacherSidebar } from "../components/TeacherSidebar";
import { useTheme } from "../context/ThemeContext";

export const TeacherSettings = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  const [activeTab, setActiveTab] = useState("profile");
  const [familyConsent, setFamilyConsent] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className={`min-h-screen flex ${dark ? "bg-[#1A1A2E]" : "bg-gray-50"}`}>
      <TeacherSidebar />
      <div className="flex-1 lg:ml-80 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/teacher-dashboard")} className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${dark ? "bg-[#2A2A40] text-gray-400" : "bg-white text-gray-400"}`}><ArrowLeft className="w-6 h-6" /></button>
              <div><h1 className={`text-3xl font-bold ${dark ? "text-white" : "text-[#22223B]"}`}>Settings</h1><p className={dark ? "text-gray-400" : "text-gray-500"}>Manage your account and preferences.</p></div>
            </div>
            <button className="bg-[#22223B] text-white font-bold px-8 py-3 rounded-2xl flex items-center gap-2 shadow-lg"><Save className="w-5 h-5" /> Save Changes</button>
          </header>

          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar Tabs */}
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id ? (dark ? "bg-[#2A2A40] text-white shadow-sm" : "bg-white text-[#22223B] shadow-sm") : (dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-[#22223B]")}`}>
                  {tab.icon} {tab.label}
                </button>
              ))}
              {/* Dark mode toggle in sidebar */}
              <button onClick={toggleTheme} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${dark ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-[#22223B]"}`}>
                {dark ? <Moon className="w-5 h-5 text-[#B9A7F8]" /> : <Sun className="w-5 h-5 text-amber-500" />}
                {dark ? "Dark Mode" : "Light Mode"}
              </button>
              <button onClick={() => navigate("/login")} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {activeTab === "profile" && (
                <>
                  <div className={`p-10 rounded-[3rem] border ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
                    <div className="flex items-center gap-8 mb-8">
                      <div className="relative">
                        <div className="w-24 h-24 bg-[#B9A7F8] rounded-[2rem] flex items-center justify-center text-white text-3xl font-black">YS</div>
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#22223B] rounded-full flex items-center justify-center text-white"><Camera className="w-4 h-4" /></button>
                      </div>
                      <div><h2 className={`text-xl font-bold ${dark ? "text-white" : "text-[#22223B]"}`}>Teacher Yukari Sato</h2><p className={dark ? "text-gray-400" : "text-gray-500"}>yukari.sato@school.edu</p></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[{ label: "Full Name", value: "Yukari Sato" }, { label: "Email", value: "yukari.sato@school.edu" },
                        { label: "School", value: "Nigel Academy" }, { label: "Subject", value: "Financial Literacy" }
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">{field.label}</label>
                          <input type="text" defaultValue={field.value} className={`w-full p-4 rounded-2xl border font-medium ${dark ? "bg-[#1A1A2E] border-[#3A3A55] text-white" : "bg-gray-50 border-gray-200 text-[#22223B]"}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Family & Sharing Card (mirrors mobile FamilySharingCard) */}
                  <div className={`p-8 rounded-[3rem] border ${dark ? "bg-[#2A2A40] border-[#B9A7F8]/15" : "bg-white border-[#B9A7F8]/15"}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-[#B9A7F8]/10 rounded-xl flex items-center justify-center"><Users className="w-4 h-4 text-[#B9A7F8]" /></div>
                      <h3 className={`font-bold text-lg ${dark ? "text-white" : "text-[#22223B]"}`}>Share Progress</h3>
                    </div>
                    <p className={`text-sm font-medium mb-4 ${dark ? "text-gray-400" : "text-gray-500"}`}>Invite parents to track student progress and celebrate milestones together.</p>

                    <button onClick={() => setFamilyConsent(!familyConsent)} className={`w-full flex items-start gap-3 p-4 rounded-2xl border mb-4 text-left ${dark ? "bg-[#1A1A2E] border-[#3A3A55]" : "bg-gray-50 border-gray-100"}`}>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 ${familyConsent ? "border-[#B9A7F8] bg-[#B9A7F8]" : dark ? "border-[#3A3A55]" : "border-gray-200"}`}>
                        {familyConsent && <span className="text-[9px] font-bold text-white">✓</span>}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-xs ${dark ? "text-white" : "text-[#22223B]"}`}>I consent to share my data</p>
                        <p className="text-[10px] text-gray-400 leading-tight">By checking this, you allow invited family members to see daily activity, XP, and lesson completion status.</p>
                      </div>
                    </button>

                    {familyConsent && (
                      <div className="space-y-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Family Invite Code</p>
                        <div className="flex gap-2">
                          <div className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border ${dark ? "bg-[#B9A7F8]/5 border-[#B9A7F8]/15" : "bg-[#B9A7F8]/5 border-[#B9A7F8]/15"}`}>
                            <Lock className="w-4 h-4 text-[#B9A7F8]" />
                            <span className="font-bold text-sm text-[#B9A7F8] tracking-wider">NGL-FAM-482X-MJ</span>
                          </div>
                          <button className={`w-10 h-10 rounded-xl border flex items-center justify-center ${dark ? "border-[#3A3A55]" : "border-gray-200"}`}><Copy className="w-4 h-4 text-gray-400" /></button>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 bg-[#B9A7F8] text-white font-bold py-3 rounded-xl"><Share2 className="w-4 h-4" /> Send Invite Link</button>
                        <p className="text-center text-[10px] text-gray-400">This link expires in 24 hours. Limit 1 use.</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === "notifications" && (
                <div className={`p-10 rounded-[3rem] border ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
                  <h2 className={`text-xl font-bold mb-6 ${dark ? "text-white" : "text-[#22223B]"}`}>Notification Preferences</h2>
                  {[{ label: "Student activity alerts", desc: "Get notified when students complete missions" },
                    { label: "Quiz submission alerts", desc: "Receive alerts when quizzes are submitted" },
                    { label: "Weekly summary email", desc: "Receive a weekly report of class progress" },
                    { label: "Streak reminders", desc: "Alert when students might lose their streak" }
                  ].map((n) => (
                    <div key={n.label} className={`flex items-center justify-between py-5 border-b last:border-b-0 ${dark ? "border-[#3A3A55]" : "border-gray-100"}`}>
                      <div><p className={`font-bold text-sm ${dark ? "text-white" : "text-[#22223B]"}`}>{n.label}</p><p className="text-xs text-gray-400">{n.desc}</p></div>
                      <div className="w-12 h-7 bg-[#B9A7F8] rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute right-1 top-1 shadow" /></div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "security" && (
                <div className={`p-10 rounded-[3rem] border ${dark ? "bg-[#2A2A40] border-[#3A3A55]" : "bg-white border-gray-100"}`}>
                  <h2 className={`text-xl font-bold mb-6 ${dark ? "text-white" : "text-[#22223B]"}`}>Security</h2>
                  <div className="space-y-6">
                    {[{ label: "Current Password", type: "password" }, { label: "New Password", type: "password" }, { label: "Confirm Password", type: "password" }]
                      .map((f) => (
                        <div key={f.label}>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">{f.label}</label>
                          <input type={f.type} placeholder="••••••••" className={`w-full p-4 rounded-2xl border font-medium ${dark ? "bg-[#1A1A2E] border-[#3A3A55] text-white" : "bg-gray-50 border-gray-200 text-[#22223B]"}`} />
                        </div>
                      ))}
                    <button className="bg-[#22223B] text-white font-bold px-8 py-4 rounded-2xl">Update Password</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-12">
            Nigel Education App v1.0.0 (Build 101) · Made with 💜 for Educators
          </p>
        </div>
      </div>
    </div>
  );
};
