
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { User, Mail, Lock } from 'lucide-react';


const ProfilePage = () => {
  const [img, setImg] = useState();

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: '',
  });
  
  const [profileData, setProfileData] = useState({
    contact: '',
    image: '',
    first_name: '',
    last_name: '',
  });
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      const base64Image = selectedImage.split(',')[1];
      setProfileData(prevData => ({ ...prevData, image_id: base64Image }));
    }
  }, [selectedImage]);
  


    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/v1/admin/get/profile`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profileData data');
        }
         // Assuming the server returns the URL of the uploaded image
         const responseData = await response.json();
         
         
         // Assuming the server returns the URL of the uploaded image
         const imageUrl = responseData.image_path;
         
         setImg(imageUrl);
     
         // Set initial profileData data
         setProfileData(responseData);
     
         return responseData;
       
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
    fetchData().then((data) => {
      setProfileData(data); // Set initial profileData data
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfile((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement save logic here
    setIsEditing(false);
  };


  const handleEditClick = () => {
    setIsEditing(true);
  };
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  
  //   if (file) {
  //     const reader = new FileReader();
  
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //       setImagePreview(reader.result);
  //     };
  
  //     reader.readAsDataURL(file);
  //   }
  // };
  

  

  const handleSaveClick = async () => {
    try {
     
  
      const requestBody = {
        contact: profileData.contact,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        image: selectedImage, // You might need to adjust this depending on how the server expects the image data
      };
  
      const response = await fetch('https://mmust-jowa.onrender.com/api/v1/admin/update/profileData', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profileData data');
      }
  
      const updatedData = await fetchData();
      
      localStorage.setItem("User",profileData.first_name);
      setProfileData(updatedData);
      setIsEditing(false);
      setImagePreview(null);
    
    } catch (error) {
      console.error(error);
    }
  };
  
  


  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={profile.image || profileData.image }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold">
              {profileData.first_name} {profileData.last_name}
            </h2>
            <p className="text-gray-600">{profileData.email}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={profileData.first_name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={profileData.last_name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={profileData.password}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          {isEditing && (
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div className="flex justify-end">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
