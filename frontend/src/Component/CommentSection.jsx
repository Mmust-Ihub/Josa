/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Send } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";




const CommentSection= ({ comments, onAddComment,category, image_id }) => {
  
  const [content, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      const contentWithoutSpaces = content.replace(/\s/g, "");
    if (contentWithoutSpaces.length > 6) {
      const url = ` https://mmust-jowa.onrender.com/api/v1/user/comment/${category}/${image_id}`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, is_anonymous: isAnonymous }),
        });

        if (response.ok) {
          const responseData = await response.json();
          if(responseData){
            setIsAnonymous(true);
            setNewComment("");
            toast.success("Comment Successfull Posted 🚀🚀");
          }
          setIsAnonymous(true);
          setNewComment("");
          toast.success("Comment Successfull Posted 🚀🚀");
        } else {
          console.error("Error submitting comment:", response.statusText);
        }
      } catch (error) {
        toast.error("Error: Check intenet connection");
        
      }
    } else {
      toast.error("Please enter at least 6 characters without spaces.");
     
    }
      onAddComment(content);
      setNewComment('');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Comments</h3>
      <Toaster />
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded-lg resize-none"
          rows={3}
        ></textarea>
        <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Send size={18} className="mr-2" />
          Post Comment
        </button>
      </form>
      <div className="space-y-4">
        {comments.length > 0?(
          <>
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  {/* <img src={comment.author.image} alt={comment.author.name} className="w-8 h-8 rounded-full mr-2" />
                  <span className="font-semibold">{comment.author.name}</span> */}
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(comment.commented_on).toLocaleString()}
                  </span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
            </>
        ):(
          <p>No comments available</p>

        )}
      
      </div>
    </div>
  );
};

export default CommentSection;