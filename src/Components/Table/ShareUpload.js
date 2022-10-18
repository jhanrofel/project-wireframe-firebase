import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import BsButton from "react-bootstrap/Button";

import TableHeader from "../TableHeader";
import EmptyRow from "../EmptyRow";

import { ApiDownloadFile } from "../../Utilitites/Api";
import { LoggedIn } from "../../Utilitites/LoggedIn";

import { useDispatch, useSelector } from "react-redux";
import { fetchShareToUser } from "../../Utilitites/Slice/ShareSlice";

function ShareUpload({ data }) {
  const dispatch = useDispatch();
  const loggedIn = LoggedIn();
  const shareFiles = useSelector((state) => state.share.data);

  useEffect(() => {
    dispatch(fetchShareToUser(loggedIn.userId));
  }, [dispatch, loggedIn.userId]);

  const downloadAction = (fileName, fileLocation) => {
    return (
      <BsButton
        className="btn-download"
        variant="link"
        onClick={() => onDownloadActionHandler(fileName, fileLocation)}
      >
        {fileName}
      </BsButton>
    );
  };

  const onDownloadActionHandler = (fileName, fileLocation) => {
    ApiDownloadFile({
      fileLocation: fileLocation,
      filename: fileName,
    })
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <div className="table-container">
      <Table striped name={data.name}>
        <TableHeader headers={data.headers} />
        <tbody>
          {shareFiles.map((list, i) => (
            <tr key={i}>
              <td className="td-left">{list.uploadFileId.label}</td>
              <td className="td-border">
                {downloadAction(
                  list.uploadFileId.filename,
                  list.uploadFileId.fileLocation
                )}
              </td>
              <td>{list.fromUserId.email}</td>
            </tr>
          ))}
          <EmptyRow
            count={data.minRows - shareFiles.length}
            colCount={data.numCols}
          />
        </tbody>
      </Table>
    </div>
  );
}
export default ShareUpload;
