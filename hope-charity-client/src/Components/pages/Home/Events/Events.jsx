import React, { useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Swal from 'sweetalert2'; // Check if this import statement is correct
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import { AuthContext } from '../../../../Providers/AuthProvider';


const Events = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [currentEvents, setcurrentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    // Fetch event data from an API endpoint
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events'); // Replace '/events' with your API endpoint
        setEvents(response.data); // Assuming the response contains an array of event objects
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle errors, e.g., set an empty array or show an error message
        setEvents([]);
      }
    };

    fetchEvents(); // Call the fetchEvents function when the component mounts
  }, []);

  useEffect(() => {
    // Filter events based on categories
    const currentEvents = events.filter(event => event.status === 'Current');
    const upcomingEvents = events.filter(event => event.status === 'Upcoming');

    setcurrentEvents(currentEvents);
    setUpcomingEvents(upcomingEvents);
  }, [events]);
const handleJoinEvent = async (id) => {
  
  const eventid=id;
  console.log(eventid)
  if (!user || !user.displayName || !user.email) {
    Swal.fire('You need to login to join the event.', {
                      icon: 'error',
                    }).then(() => {
                      navigate('/login', { state: { from: location.pathname } });
                    });
  } else {
    try {
      const eventToUpdate = events.find(event => event._id === id);

      if (eventToUpdate) {
        const volunteerData = { eventId:id, name: user.displayName, email: user.email };

        await axios.put(`http://localhost:5000/join-events/${eventid}`, volunteerData);

        Swal.fire('You have successfully joined the event!', {
          icon: 'success',
        });
      } else {
        console.error('Event not found');
      }
    } catch (error) {
      console.error('Error joining event:', error);
      Swal.fire('Error joining event. Please try again later.', {
        icon: 'error',
      });
    }
  }
};


  return (
    <div className="my-container">
      {/* ... (other content) ... */}
      <section>
        <Tabs>
          <TabList className="flex flex-col md:flex-row justify-center font-semibold border-none items-center mt-5 cursor-pointer no-underline gap-7 text-xl uppercase">
            <Tab className="px-4 tracking-wide border-[1px] text-secondary font-bold rounded-t-md focus:outline-none">
              Current Events
            </Tab>
            <Tab className="px-4 tracking-wide border-[1px] text-secondary font-bold rounded-t-md focus:outline-none">
              Upcoming Events
            </Tab>
          </TabList>

          <TabPanel>
            <div className="flex mt-10">
              {currentEvents.map((event) => (
                <div key={event.id} className="mx-auto">
                  <img className="w-[300px] h-[200px]" src={event.image} alt={event.name} />
                  <div className="mt-2 flex justify-center text-center">
                    <div>
                      <p className="text-xl font-bold tracking-wider mb-6">
                        {event.name}
                      </p>
                      <button onClick={() => handleJoinEvent(event._id)} className="py-1 px-4 text-sm bg-primary rounded-sm tracking-wider text-secondary font-extrabold hover:bg-primary hover:text-white hover:border-0 border-gray-500 transition duration-500 ease-in-out transform ">
                        Join Event
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="flex mt-10">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="mx-auto">
                  <img className="w-[300px] h-[200px]"  src={event.image} alt={event.name} />
                  <div className="mt-2 flex justify-center text-center">
                    <div>
                      <p className="text-xl font-bold tracking-wider mb-6">
                        {event.name}
                      </p>
                      <button onClick={() => handleJoinEvent(event._id)} className="py-1 px-4 text-sm bg-primary rounded-sm tracking-wider text-secondary font-extrabold hover:bg-primary hover:text-white hover:border-0 border-gray-500 transition duration-500 ease-in-out transform ">
                        Join Event
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </section>
    </div>
  );
};

export default Events;




