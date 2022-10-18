import React from "react";

function EmptyRow({ count, colCount }) {
  const addRow = count > 0 ? count : 0;

  const lastColumn = colCount === 3 ? <td></td> : "";
  const className = colCount === 3 ? "td-border" : "td-border-left";

  return (
    <>
      {[...Array(addRow)].map((data, i) => (
        <tr key={i}>
          <td></td>
          <td className={className}>{data}</td>
          {lastColumn}
        </tr>
      ))}
    </>
  );
}

export default EmptyRow;
