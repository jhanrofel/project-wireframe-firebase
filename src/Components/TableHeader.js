import React from "react";

function ThData({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((data, i) => (
          <th key={i} width={data.width} className={i === 1 ? "td-border" : ""}>
            {data.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default ThData;
