import { VscDashboard, VscAdd, VscAccount, VscListOrdered } from "react-icons/vsc";

export const sidebarLinks = [
  // {
  //   id: 1,
  //   name: "My Profile",
  //   path: "/admin/my-profile",
  //   icon: "VscAccount",
  // },
  {
    id: 2,
    name: "Dashboard",
    path: "/vendor/dashboard",
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Room",
    path: "/vendor/myroom",
    icon: "VscAdd",
    type: "room",
  },
  {
    id: 6,
    name: "My Kitchen",
    path: "/vendor/my-kitchen",
    icon: "VscAccount",
    type: "tifin",
  },
  {
    id: 7,
    name: "Leading",
    path: "/vendor/leads",
    icon: "VscListOrdered",
    
  },
];
