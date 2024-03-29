import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import classes from "./PostPage.module.css";
import axios from "axios";
import baseURL from "../../backend.js";
import AddComment from "../../Components/AddComment/AddComment";
import Comments from "../../Components/Comments/Comments.jsx";
import { UserContext } from "../../Contexts/UserContext";

const PostPage = () => {
    const [post, setPost] = useState({});
    const [postAuthor, setPostAuthor] = useState({});
    const [addCommentSuccess, setAddCommentSuccess] = useState();
    const [postTags, setPostTags] = useState([]);
    const [error, setError] = useState("");

    const { postId } = useParams();
    const { user } = useContext(UserContext);

    const handleAddCommentSuccess = (commentAdded) => {
        setAddCommentSuccess(commentAdded);
    };

    useEffect(() => {
        const getUniquePost = async () => {
            try {
                const { data } = await axios.get(`${baseURL}posts/${postId}`);
                setPost(data);
                setPostTags(data.tags);
                setPostAuthor(data.author);
            } catch (err) {
                if (err.response.status) setError(err.response.data.error);
            }
        };
        getUniquePost();
    }, []);

    return (
        <div>
            {error.length === 0 ? (
                <div className={classes.postPage}>
                    <div className={classes.post}>
                        <h4 className={classes.date}>{new Date(post.updatedAt).toDateString()}</h4>
                        <h1 className={classes.postTitle}>{post.title}</h1>
                        <img src={post.image} className={classes.postImage} alt="Post" />
                        <div className={classes.postDesc} dangerouslySetInnerHTML={{ __html: post.description }}></div>
                        <br />
                        <br />
                    </div>
                    <div>
                        {postAuthor && (
                            <div className={classes.extras}>
                                <h4 style={{ fontWeight: "500", color: "#2c3531" }}>
                                    KNOW ABOUT THE AUTHOR
                                </h4>
                                <h2 style={{ fontWeight: "600", color: "#126466" }}>
                                    {postAuthor.authorName}
                                </h2>
                                <p style={{ fontWeight: "400" }}>{postAuthor.bio}</p>
                            </div>
                        )}
                        <div className={classes.tagsDiv}>
                            <h3>Tags:</h3>
                            {postTags && (
                                <ul>
                                    {postTags.map((postTag) => {
                                        return (
                                            <Link
                                                to={`/category/${postTag.tag.slice(1)}`}
                                                style={{ textDecoration: "none", color: "#2c3135" }}
                                                key={postTag.id}
                                            >
                                                <li className={classes.tagItem}>{postTag.tag}</li>
                                            </Link>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div>
                        {user ? (
                            <AddComment
                                postId={postId}
                                success={handleAddCommentSuccess}
                                clearInputs={addCommentSuccess}
                            />
                        ) : (
                            <p style={{ textAlign: "center" }}>
                                Please <strong style={{ color: "#126466" }}>login</strong> to comment.
                            </p>
                        )}
                        <Comments postId={postId} commentAdded={addCommentSuccess} />
                    </div>
                </div>
            ) : (
                <p>An error occurred</p>
            )}
        </div>
    );
};

export default PostPage;
