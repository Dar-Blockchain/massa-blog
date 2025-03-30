import { SetStateAction, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import Input from "../components/Input/Input";
import Label from "../components/Label/Label";
import Select from "../components/Select/Select";
import Textarea from "../components/Textarea/Textarea";
import { DEMO_CATEGORIES } from "../data/taxonomies";
import { useAccountStore } from "@massalabs/react-ui-kit";
import { PostService } from "../services/postService";
import { Post } from "../struct/Post";

const DashboardSubmitPost = () => {
  const { connectedAccount } = useAccountStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [readingTime, setReadingTime] = useState(5);
  const [tags, setTags] = useState("");

  const handleEditorChange = (editorState: SetStateAction<EditorState>) => {
    setEditorState(editorState);
  };

  // If you need to save the content, you can convert it to raw JSON
  // const saveContent = () => {
  //   const content = convertToRaw(editorState.getCurrentContent());

  //   console.log(content);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectedAccount) {
      console.error("No connected account");
      return;
    }

    setIsSubmitting(true);
    try {
      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );

      const postData = {
        title,
        excerpt,
        content,
        featuredImage,
        categoryId,
        readingTime,
        tags,
      };
      await PostService.createPost(connectedAccount, postData);

      // Reset form
      setEditorState(EditorState.createEmpty());
      setTitle("");
      setExcerpt("");
      setCategoryId("");
      setFeaturedImage("");
      setReadingTime(5);
      setTags("");
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* Title */}
        <label className="block md:col-span-2">
          <Label>Post Title *</Label>
          <Input
            type="text"
            className="mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        {/* Excerpt */}
        <label className="block md:col-span-2">
          <Label>Post Excerpt</Label>
          <Textarea
            className="mt-1"
            rows={4}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
          <p className="mt-1 text-sm text-neutral-500">
            Brief description for your article. URLs are hyperlinked.
          </p>
        </label>
        {/* Category */}
        <label className="block">
          <Label>Category *</Label>
          <Select
            className="mt-1"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">– select –</option>
            {DEMO_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </label>
        {/* Tags */}
        <label className="block">
          <Label>Tags</Label>
          <Input
            type="text"
            className="mt-1"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Separate tags with commas"
          />
        </label>

        {/* Featured Image */}
        <label className="block md:col-span-2">
          <Label>Featured Image URL *</Label>
          <Input
            type="url"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="mt-1"
            required
          />
          {featuredImage && (
            <div className="mt-4">
              <Label>Preview</Label>
              <img
                src={featuredImage}
                alt="Featured Preview"
                className="mt-1 h-32 w-full rounded-lg object-cover"
              />
            </div>
          )}
        </label>

        {/* Reading Time */}
        <label className="block">
          <Label>Reading Time (minutes)</Label>
          <Input
            type="number"
            min="1"
            value={readingTime}
            onChange={(e) => setReadingTime(Number(e.target.value))}
            className="mt-1"
          />
        </label>
        <label className="block md:col-span-2">
          <Label> Post Content</Label>

          <div className="mt-1 border border-neutral-200 dark:border-neutral-700 rounded-md">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              toolbarClassName="border-b border-neutral-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800"
              wrapperClassName="rounded-t-md"
              editorClassName="px-4 py-3 min-h-[300px] dark:bg-neutral-900 dark:text-neutral-100"
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "link",
                  "embedded",
                  "image",
                  "history",
                ],
                inline: {
                  options: ["bold", "italic", "underline", "strikethrough"],
                },

                fontSize: {
                  options: [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48],
                  // options: ["Small", "Normal", "Large", "Huge"],
                },
                list: { options: ["unordered", "ordered"] },
                link: { options: ["link", "unlink"] },
                // image: {
                //   uploadCallback: (file:any) =>
                //     new Promise((resolve, reject) => {
                //       // Implement your image upload logic here
                //       // const formData = new FormData();
                //       // formData.append('image', file);
                //       // axios.post('/upload', formData).then(({ data }) => resolve({ data: { link: data.url } }));
                //       setTimeout(
                //         () =>
                //           resolve({
                //             data: { link: URL.createObjectURL(file) },
                //           }),
                //         1000
                //       );
                //     }),
                //   alt: { present: true, mandatory: false },
                // },
              }}
            />
          </div>
        </label>

        <ButtonPrimary className="md:col-span-2" type="submit">
          Submit post
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardSubmitPost;
