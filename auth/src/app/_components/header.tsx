import Link from "next/link";

export default function Header() {
  return (
    <div className="navbar m-4 w-auto rounded-lg bg-base-300">
      <Link href="/" className="btn btn-ghost text-xl">
        auth
      </Link>
    </div>
  );
}
