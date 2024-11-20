export default function SkipLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="btn btn-primary absolute top-[-50%] left-1/2 -translate-x-1/2 focus:top-2 transition-[top] motion-reduce:transition-none duration-200"
    >
      {label}
    </a>
  );
}
