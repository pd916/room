"use client"
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarNavigationProps {
  name: string;
  icon: React.ElementType;
  link: string;
}

const SidebarNavigation = ({ name, icon: Icon, link }: SidebarNavigationProps) => {
  const pathname = usePathname();

  const isActive = pathname === link;

  return (
    <Link
      href={link}
      className={`relative flex p-4 gap-5 h-full items-center group cursor-pointer`}
    >
      <Icon
        className={`h-5 w-5 transition-colors duration-200 ${
          isActive ? "text-[#00F81D]" : "text-white group-hover:text-[#00F81D]"
        }`}
      />
      <h2
        className={`text-[18px] font-semibold transition-colors duration-200 ${
          isActive ? "text-[#00F81D]" : "text-white group-hover:text-[#00F81D]"
        }`}
      >
        {name}
      </h2>
    </Link>
  );
};

export default SidebarNavigation;
