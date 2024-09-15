import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <h1>Single Sign-On</h1>

      <Link href={"login"}>Login</Link>
    </div>
  );
}
