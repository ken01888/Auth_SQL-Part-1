import { Query } from "../index";

export const allBlogs = async () => Query("SELECT * FROM blogs");
export const oneBlog = async (id: string) =>
  Query(`SELECT * FROM blogs WHERE id = ${id}`);
export const deleteBlog = async (id: string) =>
  Query(`DELETE FROM blogs WHERE id = ${id}`);
export const updateBlog = async (title, content, id) =>
  Query(
    `UPDATE blogs SET title = '${title}' , content = '${content}' WHERE id = ${id}`
  );
export const insertBlog = async (
  userid: number,
  title: string,
  content: string
) =>
  Query(
    `INSERT INTO blogs (userid,title,content) values (${userid},'${title}','${content}')`
  );

export default {
  allBlogs,
  oneBlog,
  deleteBlog,
  updateBlog,
  insertBlog,
};
