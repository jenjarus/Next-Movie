"use client";

// @ts-ignore
import LoadingSvg from "../public/images/loading.svg";
import "../styles/loading.scss";

const Loading = () => {
  return (
    <div className="loading-page">
      <LoadingSvg />
    </div>
  );
};

export default Loading;
