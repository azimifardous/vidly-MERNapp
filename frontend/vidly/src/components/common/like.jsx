import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as liked } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unliked } from "@fortawesome/free-regular-svg-icons";

const Like = ({ liked: isLiked, onClick }) => {
  return (
    <FontAwesomeIcon
      icon={isLiked ? liked : unliked}
      cursor={"pointer"}
      onClick={onClick}
    />
  );
};

export default Like;
