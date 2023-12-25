import React from "react";
import { DataType } from "../data";
import ChartTwo from "./Charts/ChartTwo";

export interface Product {
  name: string;
  data: number[];
}

interface DialogToShowCharProps {
  modalRef: React.MutableRefObject<null>;
  dates: Date[];
  products: Product;
}

const DialogToShowChar = ({
  modalRef,
  dates,
  products,
}: DialogToShowCharProps) => {
  return (
    <>
      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <ChartTwo dates={dates} products={products} />
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default DialogToShowChar;
