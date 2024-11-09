import React, { useRef, useEffect } from 'react';
import '../styles/SlidingImages.css';

const SlidingImages = () => {
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);

  const handleScroll = () => {
    const ScrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Handle left image
    if (leftImageRef.current) {
      const leftImageTop = leftImageRef.current.getBoundingClientRect().top + ScrollTop;
      const offset = (ScrollTop - leftImageTop + windowHeight) / windowHeight;
      leftImageRef.current.style.transform = `translateX(${Math.max(-100, -100 + offset * 0)}%)`;
    }

    // Handle right image
    if (rightImageRef.current) {
      const rightImageTop = rightImageRef.current.getBoundingClientRect().top + ScrollTop;
      const offset = (ScrollTop - rightImageTop + windowHeight) / windowHeight;
      rightImageRef.current.style.transform = `translateX(${Math.min(100, 100 - offset * 0)}%)`;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sliding-images">
      <img
        src="https://testmaxprep.s3.us-west-2.amazonaws.com/images/web/blog/blog_image/blog_full_types-of-lawyers.jpg" // Replace with your image URL
        alt="Slide from Left"
        ref={leftImageRef}
        className="slide-image left"
      />
      <img
        src="https://gvilaw.com/wp-content/uploads/2020/02/Glasheen-Valles-Inderman-Injury-Lawyers.jpg" // Replace with your image URL
        alt="Slide from Right"
        ref={rightImageRef}
        className="slide-image right"
      />
    </div>
  );
};

export default SlidingImages;
