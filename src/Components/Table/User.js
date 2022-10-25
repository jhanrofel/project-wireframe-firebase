import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../Utilitites/Slice/UserSlice";

import Table from "react-bootstrap/Table";
import BsButton from "react-bootstrap/Button";
import ConfirmModal from "../Modal/ConfirmModal";
import TableHeader from "../TableHeader";
import EmptyRow from "../EmptyRow";

function User({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.user.data);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [userDeleted, setUserDeleted] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const modalData = {
    header: "Confirm User Deletion",
    body: "Are you sure ?",
    image: "",
    confirmValue: "ok",
    cancelValue: "Cancel",
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(lists);
  }, [lists, userDeleted]);

  const editAction = (id) => {
    return (
      <BsButton
        className="btn-action"
        variant="link"
        onClick={() => navigate("/edit-user", { state: id })}
      >
        Edit
      </BsButton>
    );
  };

  const deleteAction = (id) => {
    return (
      <BsButton
        className="btn-action"
        variant="link"
        onClick={() => onDeleteActionHandler(id)}
      >
        Delete
      </BsButton>
    );
  };

  const onDeleteActionHandler = (id) => {
    setDeleteUserId(id);
    setShow(true);
  };

  const onDeleteHandler = async (e) => {
    e.preventDefault();

    dispatch(deleteUser(deleteUserId)).then(() => {
      setUserDeleted(deleteUserId);
      setShow(false);
    });
  };

  return (
    <div className="table-container">
      <Table striped name={data.name}>
        <TableHeader headers={data.headers} />
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td className="td-left">{user.fullname}</td>
              <td className="td-border">{user.email}</td>
              <td>
                {editAction(user.id)}|{deleteAction(user.id)}
              </td>
            </tr>
          ))}
          <EmptyRow
            count={data.minRows - users.length}
            colCount={data.numCols}
          />
        </tbody>
      </Table>
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        modalData={modalData}
        onConfirmHandler={onDeleteHandler}
      />
    </div>
  );
}
export default User;
