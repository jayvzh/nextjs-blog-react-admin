import styles from "../styles/PostList.module.css";
import Link from "next/link";
import { useState } from "react";
import LoadMoreBtn from "./LoadMoreBtn";

export default function PostList({ posts, displayN }) {
  const postNumber = posts.length;
  const [isCompleted, setIsCompleted] = useState(postNumber <= displayN);
  const [index, setIndex] = useState(
    postNumber > displayN ? displayN : postNumber
  );
  const handleLoadMore = () => {
    const newIndex =
      postNumber > index + displayN ? index + displayN : postNumber;
    setTimeout(()=>setIndex(newIndex), 500);
    setTimeout(()=>setIsCompleted(postNumber <= index + displayN),500);
    //setIndex(newIndex);
    //setIsCompleted(postNumber <= index + displayN);
  };

  return (
    <>
      <ul className={styles["post-list-ul"]}>
        {posts.slice(0, index).map((post) => {
          const postDate = new Date(post.createdAt);
          const formatDate = `${postDate.getFullYear()}年${
            postDate.getMonth() + 1
          }月${postDate.getDate()}日`;
          return (
            <li key={post._id} className={styles["post-list-li"]}>
              <article className={styles["article"]}>
                <header>
                  <h2 className={styles["post-title"]}>
                    <Link href={`/posts/${post.title}`}>{post.title}</Link>
                  </h2>
                  <time className={styles["post-date"]}>{formatDate}</time>
                  {post.tags.length > 0 ? (
                    <div className={styles["tags-box"]}>
                      {post.tags.map((tag) => {
                        return (
                          <span className={styles["post-tag"]} key={tag}>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  ) : null}
                </header>
              </article>
            </li>
          );
        })}
      </ul>
      {isCompleted ? null : (
      <LoadMoreBtn 
      onClick={handleLoadMore} 
      text="加载更多" />
      )}
    </>
  );
}
