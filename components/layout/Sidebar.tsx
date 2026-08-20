"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/navigation";
import { useState } from "react";
import { signOut } from "@/actions/auth";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 p-4
        transition-all duration-300 ease-in-out z-30
        ${isOpen ? "translate-x-0" : "-translate-x-64"}
        lg:translate-x-0
        ${isMinimized ? "lg:w-20" : "lg:w-64"}
        flex flex-col
      `}
    >
      {/* Logo Section - Desktop only */}
      <div className="hidden lg:flex justify-center items-center mb-8">
        <Image
          src="/icons/logo-large.svg"
          alt="Finance App Logo"
          width={isMinimized ? 40 : 120}
          height={isMinimized ? 40 : 120}
          className="transition-all duration-300"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isMinimized ? "lg:justify-center lg:px-2" : ""}
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
                className={isActive ? "opacity-100" : "opacity-70"}
              />
              <span className={`${isMinimized ? "lg:hidden" : ""}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out Button */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <form action={signOut}>
          <button
            type="submit"
            className={`
              flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer
              ${isMinimized ? "lg:justify-center" : ""}
            `}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className={`${isMinimized ? "lg:hidden" : ""}`}>
              Sign Out
            </span>
          </button>
        </form>
      </div>

      {/* Minimize/Maximize Button - Desktop only */}
      <button
        onClick={toggleMinimize}
        className="hidden lg:flex items-center justify-center gap-2 mt-4 p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
        aria-label={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
      >
        <Image
          src="/icons/icon-minimize-menu.svg"
          alt={isMinimized ? "Expand" : "Minimize"}
          width={24}
          height={24}
          className={`transition-transform duration-300 ${
            isMinimized ? "rotate-180" : ""
          }`}
        />
        <span className={`${isMinimized ? "lg:hidden" : ""}`}>
          {isMinimized ? "Expand" : "Minimize"}
        </span>
      </button>
    </aside>
  );
}
