import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
const AdminUpdateEvent = () => {
  const { id } = useParams();
  console.log(id)
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventCategory, setEventCategory] = useState('');
  const [eventSubcategory, setEventSubcategory] = useState('');
  const [eventStatus, setEventStatus] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${id}`);
        const eventData = response.data;

        setEventName(eventData.name);
        setEventDescription(eventData.description);
        setEventCategory(eventData.category);
        setEventSubcategory(eventData.subcategory);
        setEventStatus(eventData.status);
        // Set image if needed: setEventImage(eventData.image);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      setEventImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/events/${id}`, {
        name: eventName,
        description: eventDescription,
        category: eventCategory,
        subcategory: eventSubcategory,
        status: eventStatus,
        image: eventImage, // Send the image data to the server
      });

      console.log('Event updated:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Event Updated!',
        text: 'Your event has been successfully updated.',
      });
    } catch (error) {
      console.error('Error updating event:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the event.',
      });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Update Event</h2>
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
          <input
            type="text"
            id="eventCategory"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="eventSubcategory" className="block mb-1">
            Select Subcategory:
          </label>
          <input
            type="text"
            id="eventSubcategory"
            value={eventSubcategory}
            onChange={(e) => setEventSubcategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="eventStatus" className="block mb-1">
            Event Status:
          </label>
          <select
            id="eventStatus"
            value={eventStatus}
            onChange={(e) => setEventStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="Current">Current</option>
            <option value="Upcoming">Upcoming</option>
          </select>
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
          Update Event
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateEvent;

