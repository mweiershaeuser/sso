"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" data-theme="mw_auth">
      <body className={`min-h-screen flex flex-col font-sans`}>
        <div className="grow flex flex-col p-4">
          <div className="grow flex justify-center items-center">
            <div className="card bg-base-200 w-96 shadow-xl">
              <div className="p-4">
                <img
                  src="/error_illustration.svg"
                  alt=""
                  width={5000}
                  height={5000}
                />
              </div>

              <div className="card-body">
                <h1 className="card-title">Error!</h1>
                <p>An unexpected error occured.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => reset}>
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
