import React from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "Home", link: "/" },
  { name: "User", link: "/user" },
  { name: "Receipt", link: "/receipt" },
  { name: "Ingredient", link: "/ingredient" },
  { name: "Order", link: "/order" },
  { name: "Weekly Plan", link: "/weekly-plan" },
  { name: "Notification", link: "/notification" },
  { name: "Setting", link: "/setting" },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-1">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">Copyright © WeMealKit</h3>
            <p className="mt-2">Web for staff and admin to manager</p>
          </div>
          <div className="flex gap-2 ">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.link}>
                <li className="flex items-center gap-4">
                  <span>{item.name}</span>
                </li>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
