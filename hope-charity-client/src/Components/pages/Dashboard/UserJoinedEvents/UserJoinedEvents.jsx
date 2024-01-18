import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Providers/AuthProvider';

const UserJoinedEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [userJoinedEvents, setUserJoinedEvents] = useState([]);
  const userEmail = user.email;
  useEffect(() => {
    axios.get(`http://localhost:5000/events-user/${userEmail}`)
      .then(response => {
        setEvents(response.data.allEvents);
        setUserJoinedEvents(response.data.joinedEvents);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, [userEmail]);
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Your Joined All Events</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Event Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Volunteers</th>
            </tr>
          </thead>
          <tbody>
            {userJoinedEvents.map(({ _id, name, description, category, status, volunteers }) => (
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

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserJoinedEvents;


