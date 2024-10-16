export default function Footer() {
  return (
    <footer className="footer w-full rounded-lg p-4 flex justify-center bg-base-200 text-base-content">
      <span className="inline" lang="en">
        Copyright © {new Date().getFullYear()} - made with{" "}
        <i className="bi bi-heart-fill" aria-label="love" role="img"></i> by{" "}
        <a
          href="https://github.com/mweiershaeuser"
          target="_blank"
          className="hover:underline"
        >
          Melvin Weiershäuser
        </a>
      </span>
    </footer>
  );
}
