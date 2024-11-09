const PostDisplay = ({ post }) => {
    const { title, content, format } = post;
  
    return (
      <div className={`post ${format}`}>
        <h3>{title}</h3>
        {format === "standard" && <img src={post.imageUrl} alt={title} />}
        <p>{content}</p>
        {/* Render additional formats as needed */}
      </div>
    );
  };
  