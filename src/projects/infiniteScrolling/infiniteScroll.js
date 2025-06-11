import React, { useEffect, useState } from "react";
import "./infiniteScroll.css";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=6`)
      .then((res) => res.json())
      .then((arr) => setData((prev) => [...prev, ...arr]));
  }, [pageNumber]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPageNumber((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    const lastImage = document.querySelector(".imageWrapper img:last-child");

    if (lastImage) {
      observer.observe(lastImage);
    }

    return () => observer.disconnect();
  }, [data]);

  return (
    <div className="imageWrapper">
      {data.map((image) => (
        <img
          key={image.id}
          src={image.download_url}
          alt={`By ${image.author}`}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default InfiniteScroll;
