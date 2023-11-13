import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/post";

const EditPost = () => {
  const [post, setPost] = useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  const getPost = async () => {
    postService.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
      }
    });
  };

  useEffect(() => {
    if (slug) {
      getPost();
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return (
    post && (
      <div className="py-8">
        <Container>
          <PostForm post={post} />
        </Container>
      </div>
    )
  );
};

export default EditPost;
