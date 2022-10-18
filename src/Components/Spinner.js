import React from "react";

function Spinner({hide}) {
  return (
    <>
      <div className="spinner-grow" role="status" hidden={hide}>
        <span className="sr-only"></span>
      </div>
    </>
  );
}

export default Spinner;
