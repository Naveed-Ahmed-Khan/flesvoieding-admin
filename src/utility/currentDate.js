import React from "react";

const currentDate = () => {
  const date = new Date();
  const currentDate = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;
  return currentDate;
};

export default currentDate;
