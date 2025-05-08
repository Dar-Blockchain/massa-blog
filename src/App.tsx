import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./components/RouteLayout";
import "@massalabs/react-ui-kit/src/global.css";
import DashboardLayout from "./components/DashboardLayout";
import DashboardMain from "./pages/DashboardMain";
import DashboardEditProfile from "./pages/DashboardEditProfile";
import DashboardPosts from "./pages/DashboardPosts";
import CategoryPage from "./pages/CategoryPage";
import PostPage from "./pages/PostPage";
import RequireProfile from "./components/RequireProfile";
import useAccountSync from "./hooks/useAccountSync";
import AuthorProfile from "./pages/AuthorProfile";

function App() {
  useAccountSync();

  return (
    <>
      <RootLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          {/* <Route path="/posts/:postId" element={<PostPage />} /> */}
          <Route path="/author/:authorId" element={<AuthorProfile />}/>
          <Route path="/author/:authorId/post/:postId" element={<PostPage />}/>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route
              index
              element={
                <RequireProfile>
                  <DashboardMain />
                </RequireProfile>
              }
            />
            <Route
              path="posts"
              element={
                <RequireProfile>
                  <DashboardPosts />
                </RequireProfile>
              }
            />
            <Route path="edit-profile" element={<DashboardEditProfile />} />
            <Route
              path="submit-post"
              element={
                <RequireProfile>
                  <DashboardMain />
                </RequireProfile>
              }
            />
          </Route>
        </Routes>
      </RootLayout>
    </>
  );
}

export default App;
