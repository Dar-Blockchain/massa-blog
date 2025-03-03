import { SetStateAction, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ButtonPrimary from "../components/Button/ButtonPrimary";
import Input from "../components/Input/Input";
import Label from "../components/Label/Label";
import Select from "../components/Select/Select";
import Textarea from "../components/Textarea/Textarea";

const DashboardSubmitPost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (editorState: SetStateAction<EditorState>) => {
    setEditorState(editorState);
  };

  // If you need to save the content, you can convert it to raw JSON
  const saveContent = () => {
    const content = convertToRaw(editorState.getCurrentContent());

    console.log(content);
  };
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block md:col-span-2">
          <Label>Post Title *</Label>

          <Input type="text" className="mt-1" />
        </label>
        <label className="block md:col-span-2">
          <Label>Post Excerpt</Label>

          <Textarea className="mt-1" rows={4} />
          <p className="mt-1 text-sm text-neutral-500">
            Brief description for your article. URLs are hyperlinked.
          </p>
        </label>
        <label className="block">
          <Label>Category</Label>

          <Select className="mt-1">
            <option value="-1">– select –</option>
            <option value="ha'apai">Category 1</option>
            <option value="tongatapu">Category 2</option>
            <option value="vava'u">Category 3</option>
          </Select>
        </label>
        <label className="block">
          <Label>Tags</Label>

          <Input type="text" className="mt-1" />
        </label>

        <div className="block md:col-span-2">
          <Label>Featured Image</Label>

          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="ps-1">or drag and drop</p>
              </div>
              <p className="text-xs text-neutral-500">
                PNG, JPG, GIF up to 2MB
              </p>
            </div>
          </div>
        </div>
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
