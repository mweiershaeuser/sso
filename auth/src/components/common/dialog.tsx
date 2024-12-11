import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef } from "react";

export default function Dialog({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const t = useTranslations("components.common.Dialog");

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    if (open) {
      openDialog();
    } else {
      closeDialog();
    }
    return () => closeDialog();
  }, [closeDialog, open, openDialog]);

  return (
    <dialog
      ref={dialogRef}
      className="min-w-[150px] p-5 rounded-lg border-2 border-primary focus-visible:outline outline-2 outline-offset-2 outline-primary open:flex flex-col prose prose-headings:font-display"
    >
      <div className="flex justify-between mb-3">
        <button
          className="btn btn-ghost btn-circle ml-auto"
          onClick={() => setOpen(false)}
          autoFocus
        >
          <i
            className="bi bi-x-lg"
            aria-label={t("closeIconLabel")}
            role="img"
          ></i>
        </button>
      </div>
      {children}
    </dialog>
  );
}
