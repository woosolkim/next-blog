import { useRef, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";

export default function Write() {
  const [showLink, setShowLink] = useState(false);
  const idRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (id && title && content) {
      fetch("/api/post/write", {
        method: "POST",
        body: JSON.stringify({ id, title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            setShowLink(true);
            res.json();
          }

          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          alert(data.message);
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <Layout>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <textarea
          type="content"
          name="content"
          placeholder="content"
          required
          ref={contentRef}
        />
        <br />
        <input type="submit" value="Create" />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>
          <a>Go to post</a>
        </Link>
      )}
    </Layout>
  );
}
