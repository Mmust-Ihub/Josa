/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import  { useEffect, useState,useCallback } from 'react';
import { Send } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import pic from '/images/profile.png'





const CommentSection= ({category, onAddComment, image_id }) => {


  const [content, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [comments,setComments]= useState([])
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchComments = useCallback(async ()=>{
   
      
        try {
           await  fetch(`${apiBaseUrl}/api/v1/user/${category}/${image_id}`)
           .then((response) => {
          
            if (response.status !== 200) {
              return null;
            }
  
           
            return response.json();
          })
           
           .then((data) => {
            setComments(data.comments)
   })
        } catch (error) {
          console.error('Error fetching single blog:', error);
        } 
   
     
     
    

  })

  useEffect(()=>{

    fetchComments()
  },[fetchComments])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (content.trim()) {
      const contentWithoutSpaces = content.replace(/\s/g, "");
    if (contentWithoutSpaces.length > 6) {
      const url = ` ${apiBaseUrl}/api/v1/user/comment/${image_id}`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, is_anonymous: isAnonymous }),
        });

        console.log(response)

        if (response.ok) {
          const responseData = await response.json();
          if(responseData){
            setIsAnonymous(true);
            setNewComment("");
            setLoading(false);

          }
          setIsAnonymous(true);
          setNewComment("");
          setLoading(false);

          toast.success("Comment Successfull Posted 🚀🚀");
          fetchComments()

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
          className="w-full p-2 border rounded-lg resize-none outline-blue-500"
          rows={3}
        ></textarea>
        <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Send size={18} className="mr-2" />
          {loading? 'Posting Comment...':'Post Comment'}
        </button>
      </form>
      <div className="space-y-4">
        {comments.length > 0?(
          <>
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                 <img src={comment.author_image || pic} alt='Commentor Image' className="w-8 h-8 rounded-full mr-2" />
                  {/* <span className="font-semibold">{comment.author.name}</span>  */}
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(comment.commented_on).toLocaleString()}
                  </span>
                </div>
                <p>{comment.comment}</p>
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