import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grow flex flex-col p-4">
      <h1>Willkommen!</h1>

      <div className="grow flex justify-center items-center">
        <div className="card bg-base-300 w-96 shadow-xl">
          <figure className="p-4">
            <Image
              src="/login_illustration.svg"
              alt=""
              width={5000}
              height={5000}
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <p>Jetzt anmelden!</p>
            <div className="card-actions justify-end">
              <Link className="btn btn-primary" role="button" href={"login"}>
                Zum Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
