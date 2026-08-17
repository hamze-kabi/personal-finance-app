"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-20">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center gap-1 px-2 py-1
                ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
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
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
