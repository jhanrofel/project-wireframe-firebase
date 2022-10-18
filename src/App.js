import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageUser from "./Pages/User/ManageUser";
import AddUser from "./Pages/User/AddUser";
import EditUser from "./Pages/User/EditUser";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ManageUser />}></Route>
        <Route path="/edit-user" element={<EditUser />}></Route>
        <Route path="/add-user" element={<AddUser />}></Route>

        <Route path="/*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
