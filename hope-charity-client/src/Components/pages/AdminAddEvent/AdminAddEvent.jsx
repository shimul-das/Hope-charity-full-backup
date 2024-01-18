import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminAddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventCategory, setEventCategory] = useState('');
  const [eventSubcategory, setEventSubcategory] = useState('');
  const [eventStatus, setEventStatus] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result; // imageData is the base64 representation of the image
      setEventImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/addevent', {
        name: eventName,
        description: eventDescription,
        category: eventCategory,
        status: eventStatus,
        image: eventImage, // Send the image data to the server
      });
  
      console.log('Event added:', response.data);
  
      // Reset form fields and state after successful submission
      // ... (code to reset form fields)
  
      Swal.fire({
        icon: 'success',
        title: 'Event Added!',
        text: 'Your event has been successfully added.',
      });
    } catch (error) {
      console.error('Error adding event:', error);
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding the event.',
      });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Add Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="eventName" className="block mb-1">
            Event Name:
          </label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="eventDescription" className="block mb-1">
            Event Description:
          </label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          ></textarea>
        </div>
        <div>
          <label htmlFor="eventCategory" className="block mb-1">
            Select Category:
          </label>
          <select
            id="eventCategory"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            {/* Category options */}
            <option value="">Select a category</option>
            <option value="Category1">Category 1</option>
            <option value="Category2">Category 2</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div>
          <label className="block mb-1">Event Status:</label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                value="Current"
                checked={eventStatus === 'Current'}
                onChange={() => setEventStatus('Current')}
                className="mr-1"
              />
              Current
            </label>
            <label>
              <input
                type="radio"
                value="Upcoming"
                checked={eventStatus === 'Upcoming'}
                onChange={() => setEventStatus('Upcoming')}
                className="mr-1"
              />
              Upcoming
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="eventImage" className="block mb-1">
            Upload Image:
          </label>
          <input
            type="file"
            id="eventImage"
            name="eventImage"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AdminAddEvent;
