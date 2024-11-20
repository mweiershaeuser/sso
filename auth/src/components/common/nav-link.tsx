"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  path,
  label,
  linkCallback,
}: {
  path: string;
  label: string;
  linkCallback?: () => void;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`link ${pathname === path ? "link-primary" : "link-hover"} w-full`}
      aria-current={pathname === path ? "page" : "false"}
      onClick={linkCallback}
    >
      {label}
    </Link>
  );
}
