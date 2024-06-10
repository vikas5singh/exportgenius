import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Link from 'next/link';
import { media_list } from '@/services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const token = Cookies.get('token');
  const [images, setImages] = useState([]);
  const handleViewClick = (id) => {
    Router.push(`/view?id=${id}`);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  console.log("images",images)
 useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        Router.push('/login');
      } else {
        try {
          const res = await media_list(token);
          console.log("success1", res);
          if (res.success) {
            console.log("success", res);
            setImages(res?.media);
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          toast.error('An error occurred while fetching media.');
          console.error('Error fetching media:', error);
        }
      }
    };

    fetchData();
  }, [token]);

  const logout = () => {
    Cookies.remove('token');
    Router.push('/login');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = {
        id: images.length + 1,
        src: URL.createObjectURL(file),
        status: 'Pending'
      };
      setImages([...images, newImage]);
    }
  };

  return (
    <>
    <div className="w-full h-screen flex flex-col items-center justify-start text-black tracking-widest uppercase p-4">
      <div className="w-full max-w-md mb-8">
        <button className="bg-white border-2 border-white hover:bg-transparent transition-all hover:text-grey font-semibold text-lg px-4 py-2 rounded duration-700">
           <Link href="/upload" className="font-medium text-indigo-600 hover:underline dark:text-primary-500">Upload</Link>
        </button>
        <button onClick={logout} className="bg-white border-2 border-white hover:bg-transparent transition-all text-indigo-700 hover:text-grey font-semibold text-lg px-4 py-2 rounded duration-700">
          Logout
        </button>
      </div>
      <div className="w-full max-w-md">
  <h2 className="text-2xl font-bold mb-4">Image List</h2>
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b-2 border-gray-200">Picture</th>
        <th className="py-2 px-4 border-b-2 border-gray-200">Status</th>
        <th className="py-2 px-4 border-b-2 border-gray-200"></th>
      </tr>
    </thead>
    <tbody>
      {images?.map((image) => (
        <tr key={image?.id} className="hover:bg-gray-100">
          <td className="py-2 px-4 border-b border-gray-200">
            <img src={`http://localhost:4000/uploads/${image?.processedPath}`} alt={`Image ${image?.id}`} className="w-16 h-16 object-cover rounded" />
          </td>
          <td className="py-2 px-4 border-b border-gray-200">
           {image?.status?"Published":"In Queue"}
          </td>
        <td className="py-2 px-4 border-b border-gray-200">
                <button onClick={() => handleViewClick(image?.id)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                  View
                </button>
              </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md">
            <img src={selectedImage} alt="Selected" className="w-full h-auto" />
            <button onClick={() => setSelectedImage(null)} className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    <ToastContainer />
    </>
  );
}
