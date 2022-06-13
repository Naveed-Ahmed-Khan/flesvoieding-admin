import { Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Login from "./Pages/Login";
import AddBlog from "./Pages/AddBlog";
import Blogs from "./Pages/Blogs";
import EditBlog from "./Components/DisplayItems/EditBlog";
import AddBlogLink from "./Pages/AddBlogLink";
import AllBlogs from "./Pages/AllBlogs";
import EditBlogLink from "./Components/DisplayItems/EditBlogLink";
import TermsAndConditions from "./Pages/TermsAndConditions";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {true && (
          <Route path="/dashboard" element={<MainPage />}>
            <Route index element={<Blogs />} />
            <Route path="/dashboard/blogs" element={<Blogs />} />
            <Route
              path="/dashboard/termsandconditions"
              element={<TermsAndConditions />}
            />
            <Route path="/dashboard/blogLinks" element={<AllBlogs />} />
            <Route path="/dashboard/add-blog" element={<AddBlog />} />
            <Route path="/dashboard/add-blogLink" element={<AddBlogLink />} />
            <Route path="/dashboard/edit-blog/:blogId" element={<EditBlog />} />
            <Route
              path="/dashboard/edit-blogLink/:blogId"
              element={<EditBlogLink />}
            />
          </Route>
        )}
        <Route exact path="/*" element={<> Error 404 | Page Not found </>} />
      </Routes>
    </>
  );
}

export default App;
