import { useState } from "react";
import {
  LucideUser,
  LucideClipboardList,
  LucideBox,
  LucideCalendar,
  LucideBell,
  LucideMenu,
  LucideX,
  Home,
  Settings,
  LucideCookingPot,
  LucideChevronDown,
  LucideChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Home", icon: Home, link: "/" },
  { name: "User", icon: LucideUser, link: "/user" },
  {
    name: "Ingredient",
    icon: LucideClipboardList,
    hasSubmenu: true,
    submenu: [
      { name: "All Ingredients", link: "/ingredient" },
      { name: "Category Ingredient", link: "/ingredient-categories" },
    ],
  },
  {
    name: "Recipe",
    icon: LucideCookingPot,
    hasSubmenu: true,
    submenu: [
      { name: "All Recipes", link: "/recipe" },
      { name: "Category Recipe", link: "/recipe-categories" },
    ],
  },

  { name: "Weekly Plan", icon: LucideCalendar, link: "/weekly-plan" },
  { name: "Notification", icon: LucideBell, link: "/notification" },
  {
    name: "Order",
    icon: LucideBox,
    hasSubmenu: true,
    submenu: [
      { name: "All Orders", link: "/order" },
      { name: "Order Group", link: "/order-group" },
    ],
  },
  { name: "Settings", icon: Settings, link: "/setting" },
];

const SiderBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <div
      className={`flex flex-col py-5 bg-secondary ${
        isOpen ? "w-64" : "w-16"
      } transition-width duration-300`}
    >
      <button onClick={toggleSidebar} className="mb-6">
        {isOpen ? (
          <LucideX className="ml-4" size={24} />
        ) : (
          <LucideMenu size={24} className="ml-4" />
        )}
      </button>
      <div className="flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link
              to={item.link || "#"}
              onClick={() => item.hasSubmenu && handleMenuClick(item.name)}
              className={`flex items-center gap-4 py-2 rounded-lg ${
                currentPath === item.link ? "bg-gray-500 text-white" : ""
              } hover:bg-gray-400 hover:text-white transition-colors duration-300`}
            >
              <item.icon
                size={24}
                className="ml-4"
                onClick={() => setIsOpen(true)}
              />
              {isOpen && <span>{item.name}</span>}
              {!isOpen ||
                (item.hasSubmenu && (
                  <span className="ml-auto mr-4">
                    {openSubmenu === item.name ? (
                      <LucideChevronDown size={20} />
                    ) : (
                      <LucideChevronRight size={20} />
                    )}
                  </span>
                ))}
            </Link>
            {item.hasSubmenu && openSubmenu === item.name && isOpen && (
              <div className="flex flex-col gap-2 mt-2">
                {item.submenu?.map((subitem, subindex) => (
                  <Link
                    key={subindex}
                    to={subitem.link}
                    className={`py-2 rounded-lg ${
                      currentPath === subitem.link
                        ? "bg-gray-500 text-white"
                        : ""
                    } hover:bg-gray-400 hover:text-white transition-colors duration-300`}
                  >
                    <span className="ml-8">{subitem.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiderBar;
