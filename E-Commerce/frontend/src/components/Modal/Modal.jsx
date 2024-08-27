import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";

import React, { useEffect, useRef } from "react";

export default function Modal({ children }) {
  const open = useSelector((state) => state.edit.toggle);

  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md"></div>
      )}
      <dialog ref={dialog} className="rounded-xl">
        {children}
      </dialog>
    </>,
    document.getElementById("modal")
  );
}
