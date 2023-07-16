import { format } from "date-fns";
import { createPost } from "../../../lib/posts";

export default async function handler(req, res) {
  const { id, title, content } = req.body;

  try {
    await createPost({
      id,
      title,
      date: format(new Date(), "yyyy-MM-dd"),
      content,
    });
  } catch (error) {}
}
