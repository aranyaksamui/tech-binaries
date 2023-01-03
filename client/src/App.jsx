// Third party imports
import React from "react";
import { Route, Routes } from "react-router-dom";

// Local imports
import classes from "./App.module.css";
import Footer from "./Layout/Footer/Footer.jsx";
import Navbar from "./Layout/Navbar/Navbar.jsx";
import Main from "./Layout/Main/Main.jsx";
import Feed from "./Pages/Feed/Feed.jsx";
import PostPage from "./Pages/PostPage/PostPage.jsx";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import NewPost from "./Pages/NewPostPage/NewPost";
import UserProfile from "./Pages/Profile/UserProfile.jsx";
import AuthorProfile from "./Pages/Author/AuthorProfile";

// App function (renders the entire layout - starting point)
function App() {
    return (
        <section className={classes.app}>
            {/* Navbar (row 1 column 1) */}
            <nav>
                <Navbar />
            </nav>
            {/* Main (row 1 column 2) */}
            <Main>
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="posts/:postId" element={<PostPage />} />;
                    <Route path="admin/" element={<AdminPanel />} />
                    <Route path="users/profile" element={<UserProfile />} />
                    <Route path="users/authors/author-dashboard" element={<AuthorProfile />} />
                    <Route path="users/authors/create-post" element={<NewPost />} />
                </Routes>
            </Main>
            {/* Footer (row 2 column 1-2) */}
            <Footer />
        </section>
    );
}

export default App;
