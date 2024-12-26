import React from "react";
import { useNavigate } from "react-router";
import imgSlider from "../../assets-src/image-1002.png";
import { Post } from "../pages";

export interface CardNewPagesProps {
  post: Post;
  index: number;
}

const CardNewPage: React.FC<CardNewPagesProps> = ({ post }) => {

  const navigate = useNavigate()

  return (
    <div className="card-new flex-col h-[430px]">
      <img src={(post as any).photo ? (post as any).photo : imgSlider} alt="img-slider" />
      <div className="title-card-new  flex-grow  flex justify-between w-full p-[12px]">
        <div className="title-new">
          <h3 className="text-base font-bold line-clamp-3">{post.name}</h3>
          <p className="text-base font-normal line-clamp-3 mt-2">{post.description}</p>
        </div>
      </div>
      <div className="button-card-new p-[12px]">
        <button
          onClick={() => {
            navigate(`/new-detail/${post.id}`)
          }}
        >Xem thêm</button>
      </div>
    </div>
  );
};

export default CardNewPage;
