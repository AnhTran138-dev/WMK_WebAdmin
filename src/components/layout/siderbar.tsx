import { useState } from "react";
import {
  LucideUser,
  LucideReceipt,
  LucideClipboardList,
  LucideBox,
  LucideCalendar,
  LucideBell,
  LucideMenu,
  LucideX,
  Home,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "Home", icon: Home, link: "/" },
  { name: "User", icon: LucideUser, link: "/user" },
  { name: "Recipe", icon: LucideReceipt, link: "/recipe" },
  { name: "Ingredient", icon: LucideClipboardList, link: "/ingredient" },
  { name: "Order", icon: LucideBox, link: "/order" },
  { name: "Weekly Plan", icon: LucideCalendar, link: "/weekly-plan" },
  { name: "Notification", icon: LucideBell, link: "/notification" },
  { name: "Settings", icon: Settings, link: "/setting" },
];

const SiderBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col px-5 py-5 bg-secondary ${
        isOpen ? "w-64" : "w-16"
      } transition-width duration-300`}
    >
      <button onClick={toggleSidebar} className="mb-6">
        {isOpen ? <LucideX size={24} /> : <LucideMenu size={24} />}
      </button>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center gap-4 mb-4">
            <Link to={item.link} className="flex items-center gap-4">
              <item.icon size={24} />
              {isOpen && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiderBar;
