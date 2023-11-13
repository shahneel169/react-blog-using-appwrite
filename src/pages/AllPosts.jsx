import { useEffect, useState } from "react";
import postService from "../appwrite/post";
import { Container, PostCard } from "../components";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    postService.getPosts().then((post) => {
      if (post?.documents?.length > 0) {
        setPosts(post.documents);
      }
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
