import { useState } from "react";

const Blog = ({ blog }) => {
  console.log(blog);
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ border: "1px solid black", margin: "5px", padding: 2 }}>
      <b>{blog.title}</b> by {blog.author}
      {visible && (
        <>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            Likes : {blog.likes}
            <button>+1</button>
          </div>
          <div>{blog.user.name}</div>
        </>
      )}
      {visible ? (
        <button onClick={() => setVisible(false)}>Hide</button>
      ) : (
        <button onClick={() => setVisible(true)}>View</button>
      )}
    </div>
  );
};

export default Blog;
