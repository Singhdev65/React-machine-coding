import React, { useEffect, useState } from "react";
import "./infiniteScroll.css";

//https://picsum.photos/v2/list?page=1&limit=3

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=3`)
      .then((res) => res.json())
      .then((arr) => setData((prev) => [...prev, ...arr]));
  }, [pageNumber]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (params) => {
        if (params[0].isIntersecting) {
          observer.unobserve(lastImage);
          setPageNumber((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    const lastImage = document.querySelector("img:last-child");

    if (!lastImage) return;
    observer.observe(lastImage);

    return () => {
      if (lastImage) {
        observer.unobserve(lastImage);
      }
      observer.disconnect();
    };
  }, [data]);

  return (
    <div className="imageWrapper">
      {data.map((image) => (
        <img key={image.id} src={image.download_url} />
      ))}
    </div>
  );
};

export default InfiniteScroll;
