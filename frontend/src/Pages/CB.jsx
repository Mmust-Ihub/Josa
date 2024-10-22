import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from "react-hot-toast";

const CreateBlogPage = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState("");
  const [featureCategory, setFeatureCategory] = useState("");
  const [category, setCategory] = useState("news");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // State to track invalid fields
  const [invalidFields, setInvalidFields] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Field validation
  const validateForm = () => {
    let isValid = true;
    const invalidFields = [];

    if (!title) {
      invalidFields.push("title");
      toast.error("Please fill in the title field.");

      isValid = false;
    }
    if (!author) {
      invalidFields.push("author");
      toast.error("Please fill in the story by field.");

      isValid = false;
    }
    if (!content) {
      invalidFields.push("content");
      toast.error("Please fill in the content field.");

      isValid = false;
    }
    if (!category) {
      invalidFields.push("category");
      isValid = false;
    }
    if (category === "news" && !featureCategory) {
      invalidFields.push("featureCategory");
      toast.error("Please fill in the featured Category field.");

      isValid = false;
    }
    setInvalidFields(invalidFields);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);


    const isValidForm = validateForm();
 

  if (!isValidForm) {
    setDisabled(false);  
    return;  
  }


    

    

    const notification =toast.loading("Posting your blog...");

     toast.loading("Posting your blog...");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("author", author);
    formData.append("video", video);
    if (category === "news") {
      formData.append("subcategory", featureCategory);
    }





    try {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/admin/createpost`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: formData,
        }
      );




      if (response.ok) {
        toast.dismiss()

        toast.success("Blog post created successfully", { id: notification });
        setTitle("");
        setContent("");
        setCategory("news");
        setImage(null);
        setPreviewImage(null);
      } else {
        toast.dismiss()

        toast.error("Failed to create blog post", { id: notification });
      }
    } catch (error) {

      toast.error("Something went wrong", { id: notification });
      console.error("An error occurred:", error);
    } finally {
      setDisabled(false);
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
        <form className="bg-white shadow-md rounded-lg p-6 gap-4 flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border ${invalidFields.includes("title") ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter blog title"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-2">
                Video Link (optional)
              </label>
              <input
                type="text"
                name="video"
                id="video"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter video link (optional)"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Story By
              </label>
              <input
                type="text"
                name="author"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={`w-full px-3 py-2 border ${invalidFields.includes("author") ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Name of content owner"
              />
            </div>
          </div>

          
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <ReactQuill value={content} onChange={setContent} id="content" name="content" className={`h-64 mb-4 ${invalidFields.includes("content") ? "border-red-500" : ""}`} />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3 py-2 border ${invalidFields.includes("category") ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select a category</option>
              <option value="news">News</option>
              <option value="sports">Sports</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          {category === "news" && (
            <div className="mb-4">
              <label htmlFor="featureCategory" className="block text-sm font-medium text-gray-700 mb-2">
                Feature Category
              </label>
              <select
                id="featureCategory"
                name="featureCategory"
                value={featureCategory}
                onChange={(e) => setFeatureCategory(e.target.value)}
                className={`w-full px-3 py-2 border ${invalidFields.includes("featureCategory") ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select a feature category</option>
                <option value="featured">Featured</option>
                <option value="mmust-news">MMUST</option>
                <option value="county-news">County</option>
                <option value="national-news">National</option>
                <option value="international-news">International</option>
              </select>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
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
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={disabled}
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