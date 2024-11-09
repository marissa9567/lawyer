import React from 'react';
import "../styles/Blogheader.css"; // Correct file name

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

function BlogHeader() {
  return (
    <div className="blog-container">
      <button className="icon-button">
        <FontAwesomeIcon icon={faShoppingBag} className="large-icon" />
      </button>
      <h1 className="header-title">Blog</h1>
      <p className="blog-paragraph">
        This political blog is a behind-the-scenes insight into our collective ALLRIOT mind: the street art that inspires us, the protests we are fired up about, the causes we support, the political graphics we can’t get enough of, the perfect gifts, the concepts and ideas that never made it into a graphic print but are instead vomited out into a random stream of our collective consciousness. We’re 100% independent, so we give it to you straight.

        It’s a quiet place to reflect, a micro dose of inspiration and a reprieve from the over-commercialised, over-opinionated barrage of mind-numbing media chatter. Make yourself a cuppa and start scrolling.
      </p>
    </div>
  );
}

export default BlogHeader;
