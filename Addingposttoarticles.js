const AddPostToArticle = ({ articleId }) => {
    const { addPostToArticle } = useArticles();

    const handleAddPost = () => {
        const newPost = {
            title: 'New Post',
            content: 'Content of the new post',
            // Add any other fields as necessary
        };
        addPostToArticle(articleId, newPost);
    };

    return (
        <div>
            <h2>Add Post to Article {articleId}</h2>
            <button onClick={handleAddPost}>Add Post</button>
        </div>
    );
};

export default AddPostToArticle;
