import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { media_view } from '@/services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const token = Cookies.get('token');
  const router = useRouter();
  const { id } = router.query;
  const [images, setImages] = useState({
    id:1,
    processedPath:"",
    status:false,
    scheduledDate:"",
    scheduledTime:"",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  console.log("images",images)
 useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        Router.push('/login');
      } else {
        try {
          const res = await media_view(token, id);
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
  <div className="w-full max-w-md">
  <h2 className="text-2xl font-bold mb-4">Image List</h2>
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b-2 border-gray-200">Picture</th>
        <th className="py-2 px-4 border-b-2 border-gray-200">Status</th>
        <th className="py-2 px-4 border-b-2 border-gray-200">ScheduledDate</th>
        <th className="py-2 px-4 border-b-2 border-gray-200">ScheduledTime</th>
        <th className="py-2 px-4 border-b-2 border-gray-200"></th>
      </tr>
    </thead>
    <tbody>
        <tr className="hover:bg-gray-100">
          <td className="py-2 px-4 border-b border-gray-200">
            <img src={`http://localhost:4000/uploads/${images?.processedPath}`} alt={`Image ${images?.id}`} className="w-16 h-16 object-cover rounded" />
          </td>
          <td className="py-2 px-4 border-b border-gray-200">
           {images?.status?"Published":"In Queue"}
          </td>
            <td className="py-2 px-4 border-b border-gray-200">
           {images?.scheduledDate}
          </td>
                <td className="py-2 px-4 border-b border-gray-200">
           {images?.scheduledTime}
          </td>
          <td className="py-2 px-4 border-b border-gray-200">
            <button onClick={() => setSelectedImage(`http://localhost:4000/uploads/${images?.processedPath}`)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              View
            </button>
          </td>
        </tr>
    </tbody>
  </table>
</div>
</div>
  </>
  );
}
