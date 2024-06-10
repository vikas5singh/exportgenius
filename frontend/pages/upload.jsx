import React, { useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useDropzone } from 'react-dropzone';
import 'tailwindcss/tailwind.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Upload() {
  const token = Cookies.get('token');
  const [images, setImages] = useState([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Redirect to login if no token
  React.useEffect(() => {
    if (!token) {
      Router.push('/login');
    }
  }, [token]);

  // Handle dropzone file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const newImage = {
        id: images.length + 1,
        src: URL.createObjectURL(file),
        scheduledDate,
        scheduledTime,
      };
      setImages([...images, newImage]);
    }
  }, [images, scheduledDate, scheduledTime]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Handle file upload through input
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const newImage = {
        id: images.length + 1,
        src: URL.createObjectURL(file),
        scheduledDate,
        scheduledTime,
      };
      setImages([...images, newImage]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !scheduledDate || !scheduledTime) {
      alert('Please fill all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('scheduledDate', scheduledDate);
    formData.append('scheduledTime', scheduledTime);

    try {
      const response = await fetch('http://localhost:4000/api/v1/media/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const res = await response.json();
      console.log("success",res)
      if (res.success) {
        toast.success('Image uploaded successfully');
         Router.push('/home');
        // Handle success, maybe clear the form or update the state
      } else {
        toast.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('An error occurred while uploading the image');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Router.push('/login');
  };

  return (
    <>
    <div className="w-full h-screen flex flex-col items-center justify-start text-black tracking-widest uppercase p-4">
      <div className="w-full max-w-md mb-8">
        <form onSubmit={handleSubmit}>
          {/* Drag and Drop Zone */}
          <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-6 mb-4 text-center">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>

          {/* Publish Date Input */}
          <div className="mb-4">
            <label htmlFor="scheduledDate" className="block mb-2">Publish Date</label>
            <input
              type="date"
              id="scheduledDate"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Publish Time Input */}
          <div className="mb-4">
            <label htmlFor="scheduledTime" className="block mb-2">Publish Time</label>
            <input
              type="time"
              id="scheduledTime"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 w-full">Upload Image</button>
        </form>
      </div>
    </div>
    <ToastContainer/> 
    </>   
  );
}
