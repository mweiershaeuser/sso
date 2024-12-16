"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  return (
    <div className="grow flex flex-col p-4">
      <div className="grow flex justify-center items-center">
        <div className="card bg-base-200 w-96 shadow-xl">
          <div className="p-4">
            <Image
              src="/error_illustration.svg"
              alt=""
              width={5000}
              height={5000}
            />
          </div>

          <div className="card-body">
            <h1 className="card-title">{t("card.title")}</h1>
            <p>{t("card.description")}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => reset}>
                {t("card.action")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
