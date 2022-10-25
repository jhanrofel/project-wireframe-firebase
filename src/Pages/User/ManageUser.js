import React,{useEffect} from "react";

import TableUser from "../../Components/Table/User";
import TableTitle from "../../Components/TableTitle";
import Button from "../../Components/Button";

import { useDispatch,useSelector } from "react-redux";
import { fetchUsers } from "../../Utilitites/Slice/UserSlice";

function ManageUser() {
  const dispatch = useDispatch();

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

  useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
