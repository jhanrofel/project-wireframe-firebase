import React from "react";

import TableUser from "../../Components/Table/User";
import TableTitle from "../../Components/TableTitle";
import Button from "../../Components/Button";

function ManageUser() {
  const users = {
    name: "users",
    headers: [
      { label: "Name", width: "40%" },
      { label: "User Email ID", width: "35%" },
      { label: "", width: "35%" },
    ],
    minRows: 10,
    numCols: 3,
  };
  return (
    <>
      <TableTitle text="Users" />
      <TableUser data={users} />
      <Button
        name="add-user"
        text="Add User"
        variant="light"
        link="/add-user"
        className={"btn-cyan"}
      />
    </>
  );
}

export default ManageUser;
