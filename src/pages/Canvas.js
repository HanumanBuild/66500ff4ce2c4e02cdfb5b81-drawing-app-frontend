import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import axios from 'axios';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas('drawing-canvas');
    canvasRef.current = canvas;

    // Add event listeners for drawing
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = '#000000';

    return () => {
      canvas.dispose();
    };
  }, []);

  const saveDrawing = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_DRAWING_APP_BACKEND_URL}/api/drawings`, {
        title: 'My Drawing',
        imageData: dataURL
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        alert('Drawing saved successfully!');
      } else {
        alert('Failed to save drawing.');
      }
    } catch (error) {
      console.error('Error saving drawing:', error);
      alert('Error saving drawing.');
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl mb-4">Drawing Canvas</h1>
      <canvas id="drawing-canvas" width="800" height="600" className="border"></canvas>
      <button onClick={saveDrawing} className="mt-4 bg-blue-500 text-white p-2 rounded">Save Drawing</button>
    </div>
  );
};

export default Canvas;