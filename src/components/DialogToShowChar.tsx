import React, { useState, useRef } from "react";
import LineChart from "./LineChart/LineChart";
import { convertToOneProductDataInRange } from "../util/convertToOneProductDataInRange";
import { DataType } from "../data";

type Props = {
  data: DataType[];
  startDate: Date;
  endDate: Date;
  productNames: string[];
  modalRef: React.MutableRefObject<null>;
};

const DialogToShowChar = ({
  data,
  startDate,
  endDate,
  productNames,
  modalRef,
}: Props) => {
  return (
    <>
      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <p className="py-4">
            <LineChart
              products={
                convertToOneProductDataInRange(
                  data,
                  startDate,
                  endDate,
                  productNames
                ).product
              }
            />
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DialogToShowChar;
