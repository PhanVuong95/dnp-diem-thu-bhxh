import parse from "html-react-parser";
import imgSlider from "../../assets-src/image-1002.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostDetails } from "../models";
import React from "react";
import HeaderBase from "./header_base";
import { Page } from "zmp-ui";

const CardNewDetailPages = () => {
  const { id } = useParams();

  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(
          `https://baohiem.dion.vn/post/api/detailPost/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }
        const data: PostDetails = await response.json();
        setPost(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post || !post.data || post.data.length === 0) {
    return <div>No post details available.</div>;
  }

  // Extracting the first post data from the response
  const postData = post.data[0];

  return (
    <div>
      <HeaderBase isHome={false} title="Chi tiết tin tức" />
      <Page className="page mt-20">
        <img
          className="aspect-[100/2] object-cover h-[300px] rounded-lg"
          src={(postData as any).photo ? (postData as any).photo : imgSlider}
          alt="img-slider"
        />
        <h3 className="text-base py-4 text-justify sm:text-[32px] font-bold leading-10">
          {postData.name}
        </h3>
        <div className="flex flex-col text-justify items-center gap-2 html-text-fomat">
          {parse(postData.text)}
        </div>
      </Page>
    </div>

  );
};

export default CardNewDetailPages;
