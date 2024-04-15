import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { Card, Rating } from "flowbite-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

export default function SwiperComp() {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <h1 className='heading underline hidden md:block'>Books' lobby</h1>
      <h1 className='text-center text-2xl font-bold underline md:hidden'>
        Books' lobby
      </h1>
      <br />
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={screen.width > 768 ? 4 : 2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className='pb-10 md:pl-14 md:pb-8 '
      >
        {userPosts.map((post) => (
          <SwiperSlide key={post._id}>
            <Card
              className='h-28 w-20  md:w-48 md:h-80'
              renderImage={() => (
                <img
                  className='md:h-52 md:w-48 object-cover md:rounded-t-lg'
                  src={post.image}
                  alt='image 1'
                />
              )}
            >
              <Link to={`/post/${post._id}`}>
                <h5 className='hidden md:block md:text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 hover:underline'>
                  {post.title}
                </h5>
              </Link>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
