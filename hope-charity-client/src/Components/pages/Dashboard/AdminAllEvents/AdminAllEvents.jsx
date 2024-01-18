// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

// const AdminAllEvents = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Fetch all events from the backend
//     axios.get('http://localhost:5000/events')
//       .then(response => {
//         setEvents(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching events:', error);
//       });
//   }, []);

//   const handleStatusToggle = async (id, newStatus) => {
//     try {
//       // Update event status via backend API
//       await axios.put(`http://localhost:5000/events/toggle-status/${id}`, { status: newStatus });

//       // Update the state to reflect the new status
//       setEvents(prevEvents =>
//         prevEvents.map(event =>
//           event._id === id ? { ...event, status: newStatus } : event
//         )
//       );

//       // Show SweetAlert notification for status change
//       Swal.fire({
//         icon: 'success',
//         title: 'Status Updated',
//         text: `Event status changed to ${newStatus}`,
//       });
//     } catch (error) {
//       console.error('Error updating event status:', error);
//     }
//   };

//   const handleDeleteEvent = async (id) => {
//     try {
//       // Delete event via backend API
//       await axios.delete(`http://localhost:5000/admin-events/${id}`);

//       // Remove the event from the state
//       setEvents(prevEvents =>
//         prevEvents.filter(event => event._id !== id)
//       );

//       // Show SweetAlert notification for event deletion
//       Swal.fire({
//         icon: 'success',
//         title: 'Event Deleted',
//         text: 'Event has been deleted successfully',
//       });
//     } catch (error) {
//       console.error('Error deleting event:', error);
//     }
//   };

//   const navigate = useNavigate();

//   const handleUpdateEvent = (eventId) => {
//     // Navigate to the AdminUpdateEvent page with the eventId in the URL
//     navigate(`/dashboard/adminupdateenemt/${eventId}`);
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-2xl font-bold mb-4">Admin - Show All Events</h1>
//       <table className="min-w-full border-collapse border border-gray-300">
//         {/* Table header */}
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 px-4 py-2">Event Name</th>
//             <th className="border border-gray-300 px-4 py-2">Description</th>
//             <th className="border border-gray-300 px-4 py-2">Category</th>
//             <th className="border border-gray-300 px-4 py-2">Status</th>
//             <th className="border border-gray-300 px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Render events */}
//           {events.map(event => (
//             <tr key={event._id} className="bg-white">
//               <td className="border border-gray-300 px-4 py-2">{event.name}</td>
//               <td className="border border-gray-300 px-4 py-2">{event.description}</td>
//               <td className="border border-gray-300 px-4 py-2">{event.category}</td>
//               <td className="border border-gray-300 px-4 py-2">{event.status}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {/* Toggle between 'Current' and 'Upcoming' */}
//                 <button
//                   onClick={() =>
//                     handleStatusToggle(
//                       event._id,
//                       event.status === 'Current' ? 'Upcoming' : 'Current'
//                     )
//                   }
//                   className="px-2 py-1 bg-blue-500 text-white rounded-md"
//                 >
//                   {event.status === 'Current' ? 'Make Upcoming' : 'Make Current'}
//                 </button>
//                 {/* Delete event */}
//                 <button
//                   onClick={() => handleDeleteEvent(event._id)}
//                   className="px-2 py-1 bg-red-500 text-white rounded-md ml-2"
//                 >
//                   Delete
//                 </button>
//                 {/* Update event */}
//                 <button
//                   onClick={() => handleUpdateEvent(event._id)}
//                   className="px-2 py-1 bg-yellow-500 text-white rounded-md ml-2"
//                 >
//                   Update
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminAllEvents;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminAllEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleStatusToggle = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/events/toggle-status/${id}`, { status: newStatus });

      setEvents(prevEvents =>
        prevEvents.map(event =>
          event._id === id ? { ...event, status: newStatus } : event
        )
      );

      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Event status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating event status:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin-events/${id}`);

      setEvents(prevEvents =>
        prevEvents.filter(event => event._id !== id)
      );

      Swal.fire({
        icon: 'success',
        title: 'Event Deleted',
        text: 'Event has been deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const navigate = useNavigate();

  const handleUpdateEvent = (eventId) => {
    navigate(`/dashboard/adminupdateevent/${eventId}`);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Show All Events</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Event Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Volunteers</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(({ _id, name, description, category, status, volunteers }) => (
              <tr key={_id} className="bg-white">
                <td className="border border-gray-300 px-4 py-2">{name}</td>
                <td className="border border-gray-300 px-4 py-2">{description}</td>
                <td className="border border-gray-300 px-4 py-2">{category}</td>
                <td className="border border-gray-300 px-4 py-2">{status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul className="list-inside">
                    {volunteers && volunteers.length > 0 ? (
                      volunteers.map((volunteer, index) => (
                        <li key={index}>
                          {index + 1}. Name: {volunteer.name}, Email: {volunteer.email}
                        </li>
                      ))
                    ) : (
                      <li>No volunteers</li>
                    )}
                  </ul>
                </td>
                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                  <button
                    onClick={() =>
                      handleStatusToggle(
                        _id,
                        status === 'Current' ? 'Upcoming' : 'Current'
                      )
                    }
                    className="px-2 py-1 bg-blue-500 text-white rounded-md"
                  >
                    {status === 'Current' ? 'Make Upcoming' : 'Make Current'}
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(_id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdateEvent(_id)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded-md"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllEvents;


