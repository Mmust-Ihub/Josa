import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";


const CreateBlogPage = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // const navigate = useNavigate();

  // const { formData, updateFormData } = useFormData();

  const [title, setTitle] = useState("");
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("news");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {

    window.scrollTo(0, 0);

  }, []);




  const handleSubmit = async (event) => {

    toast.loading("posting your blog...");
    const notification = toast.loading("posting your blog...");
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("headline", headline);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", image);


    try {


      const response = await fetch(
        // `${apiBaseUrl}/api/v1/admin/createblog`,
        `${apiBaseUrl}/api/v1/admin/createpost`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: formData,
        }
      );

      console.log(response)
      if (response?.ok) {
        // toast.remove()
        toast.success("Blog post created successfully");
        setTitle("");
        setHeadline("");
        setContent("");
        setCategory("news");
        setImage(null);
        setPreviewImage(null);

      } else {
        toast.remove()

        toast.error("Failed to create blog post");
        console.error("Failed to create blog post");
      }
    } catch (error) {
      // if () {

      // }
      toast.remove()

      toast.error("An error occurred", {
        id: notification,
      });
      console.error("An error occurred:", error);
    }
  };

  const handleChange = (e) => {

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }

  };




  return (
    <>
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-2">
              Headline
            </label>
            <ReactQuill
              value={headline} onChange={setHeadline} id='headline'
              name='headline'
              className="h-20 mb-4"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <ReactQuill
              value={content} onChange={setContent}
              id='content'
              name='content'
              className="h-64 mb-4"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="news">News</option>
              <option value="sports">Sports</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              name='image'
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {previewImage && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Image Preview</h3>
              <img src={previewImage} alt="Preview" className="max-w-full h-auto rounded-md" />
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button
              // onClick={() => {
              //   const noti = toast.loading(
              //     "Naviating to preview, your fields will be saved as draft..."
              //   );
              //   setTimeout(() => {
              //     navigate("/Admin/PreviewBlog", {
              //       state: {
              //         formData,
              //       },
              //     });
              //     toast.success("previewed successfully...", {
              //       id: noti,
              //     });
              //   }, 2000);
              // }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Preview Blog
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>


    </>

  );
};

export default CreateBlogPage;