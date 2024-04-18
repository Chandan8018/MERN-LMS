import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

export default function Books() {
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className='flex flex-col justify-center  items-center pl-5 mb-5 overflow-x-auto'>
      <h1 className='text-2xl md:text-3xl font-bold mt-5'>Books' Library</h1>
      <div className='flex flex-wrap justify-center gap-5 md:gap-16 my-5 '>
        {recentPosts &&
          recentPosts.map((post) => <BookCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
