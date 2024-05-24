import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userDrawings, setUserDrawings] = useState([]);
  const [galleryDrawings, setGalleryDrawings] = useState([]);

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const token = localStorage.getItem('token');
        const userResponse = await axios.get(`${process.env.REACT_APP_DRAWING_APP_BACKEND_URL}/api/drawings`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserDrawings(userResponse.data.data.filter(drawing => drawing.userId === userResponse.data.data.userId));
        setGalleryDrawings(userResponse.data.data.filter(drawing => drawing.userId !== userResponse.data.data.userId));
      } catch (error) {
        console.error('Error fetching drawings:', error);
      }
    };

    fetchDrawings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <div>
        <h2 className="text-2xl mb-2">My Drawings</h2>
        <div className="grid grid-cols-3 gap-4">
          {userDrawings.map(drawing => (
            <div key={drawing._id} className="border p-2">
              <h3 className="text-xl">{drawing.title}</h3>
              <img src={drawing.imageData} alt={drawing.title} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl mb-2">Gallery</h2>
        <div className="grid grid-cols-3 gap-4">
          {galleryDrawings.map(drawing => (
            <div key={drawing._id} className="border p-2">
              <h3 className="text-xl">{drawing.title}</h3>
              <img src={drawing.imageData} alt={drawing.title} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;