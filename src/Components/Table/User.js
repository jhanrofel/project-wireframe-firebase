import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import BsButton from "react-bootstrap/Button";

import ConfirmModal from "../Modal/ConfirmModal";
import TableHeader from "../TableHeader";
import EmptyRow from "../EmptyRow";

import { db } from "../../Database/config";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";

function User({ data }) {
  const navigate = useNavigate();
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteUser, setDeleteUser] = useState({});
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

  const usersCollectionRef = collection(db, "users");

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers(); // eslint-disable-next-line
  }, [userDeleted]);

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
    const userDoc = doc(db, "users", id);
    setDeleteUserId(id);
    setDeleteUser(userDoc);
    setShow(true);
  };

  const onDeleteHandler = async (e) => {
    e.preventDefault();

    await deleteDoc(deleteUser).then(() => {
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
