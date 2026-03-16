import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { NigelBrandIcon } from "./ui/Logo";

export const TeacherSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", path: "/teacher-dashboard" },
    { icon: <Users className="w-5 h-5" />, label: "My Classes", path: "/manage-classes" },
    { icon: <BookOpen className="w-5 h-5" />, label: "Content Library", path: "/create-content" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics", path: "/teacher-analytics" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/teacher-settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-[#22223B] text-white p-8 flex-col hidden lg:flex z-40">
      <div className="flex items-center gap-3 mb-12">
        <NigelBrandIcon size={36} />
        <span className="font-bold text-2xl tracking-tight lowercase">nigel</span>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                isActive
                  ? "bg-[#F7B6B6] text-[#22223B]"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-4 px-6 py-4 text-white/50 hover:text-white font-bold transition-all"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
};
