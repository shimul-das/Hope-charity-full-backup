/////////////
const express = require('express');
const multer = require('multer');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const stripe=require('stripe')(process.env.PAYMENT_SECRET_KEY)
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' });
  }
  // bearer token
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })
}


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6g3butq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    const usersCollection = client.db("Hope-Charity-DB").collection("users");
    const classCollection = client.db("Hope-Charity-DB").collection("classes");
    const selectclassCollection = client.db("Hope-Charity-DB").collection("selectclasses");
    const paymentsCollection = client.db("Hope-Charity-DB").collection("payments");
    const eventsCollection = client.db("Hope-Charity-DB").collection("events");
    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

      res.send({ token })
    })

    // Warning: use verifyJWT before using verifyAdmin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email }
      const user = await usersCollection.findOne(query);
      if (user?.role !== 'admin') {
        return res.status(403).send({ error: true, message: 'forbidden message' });
      }
      next();
    }

    ///
    const verifyInstructor = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      
      if (user?.role !== 'instructor') {
        return res.status(403).send({ error: true, message: 'Forbidden: Only instructors can access this resource.' });
      }
      
      next();
    };
    

        ///
        const verifyStudent = async (req, res, next) => {
          const email = req.decoded.email;
          const query = { email: email }
          const user = await usersCollection.findOne(query);
          if (user?.role !== 'student') {
            return res.status(403).send({ error: true, message: 'Forbidden: Access denied' });
          }
          next();
        }


    // users related apis
    app.get('/users', verifyJWT, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });
    //get all instructor
    app.get('/instructorusers', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });
    //get all classes
    app.get('/approvedclass', async (req, res) => {
      const result = await classCollection.find().toArray();
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email }
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: 'user already exists' })
      }

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

// Admin route
app.get('/users/admin/:email', verifyJWT, async (req, res) => {
  const email = req.params.email;

  if (req.decoded.email !== email) {
    res.send({ admin: false });
  }

  const query = { email: email };
  const user = await usersCollection.findOne(query);
  const result = { admin: user?.role === 'admin' };
  res.send(result);
});

app.patch('/users/role/:id', async (req, res) => {
  const id = req.params.id;
  const { role } = req.body;

  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      role: role,
    },
  };

  try {
    const result = await usersCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating user role');
  }
});


// Student route
app.get('/users/student/:email', verifyJWT, async (req, res) => {
  const email = req.params.email;

  if (req.decoded.email !== email) {
    res.send({ student: false });
  }

  const query = { email: email };
  const user = await usersCollection.findOne(query);
  const result = { student: user?.role === 'student' };
  res.send(result);
});

// Instructor route
app.get('/users/instructor/:email', verifyJWT, async (req, res) => {
  const email = req.params.email;

  if (req.decoded.email !== email) {
    res.send({ instructor: false });
  }

  const query = { email: email };
  const user = await usersCollection.findOne(query);
  const result = { instructor: user?.role === 'instructor' };
  res.send(result);
});

//class add
app.post('/class', verifyJWT, verifyInstructor, async (req, res) => {
  const newItem = req.body;
  const result = await classCollection.insertOne(newItem)
  res.send(result);
})
//get classes
app.get('/classes',verifyJWT, verifyInstructor, async (req, res) => {
  const instructorEmail = req.decoded.email;

  const query = { instructorEmail };
  const classes = await classCollection.find(query).toArray();

  res.send(classes);
});
//get specific class for payment
app.get('/selectclass/:id',verifyJWT,verifyStudent, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };

  try {
    const selecttItem = await selectclassCollection.findOne(query);
    if (!selecttItem) {
      res.status(404).send('Cart item not found.');
      return;
    }
    res.send(selecttItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to retrieve cart item.');
  }
});
/////For delete
app.delete('/selectclass/:id', verifyJWT, verifyStudent, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };

  try {
    const deleteResult = await selectclassCollection.deleteOne(query);
    if (deleteResult.deletedCount === 0) {
      res.status(404).send('Cart item not found.');
      return;
    }
    res.send('Cart item deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to delete cart item.');
  }
});


//
// Update class status
app.get('/adminclasses', verifyJWT, verifyAdmin, (req, res) => {
  classCollection.find({}).toArray()
    .then(classes => {
      res.send(classes);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});


// Update class status
app.patch("/adminclasses/:id/status", verifyJWT,verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: { status } };

    const result = await classCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
///Delete user
app.delete('/users/:id',verifyJWT,verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await usersCollection.deleteOne(query);
  res.send(result);
})

//Send feedback to instructor
app.post("/adminclasses/:id/feedback", verifyJWT,verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const { feedback } = req.body;

    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: { feedback } };

    const result = await classCollection.updateOne(filter, updateDoc);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//stydent path
//class add
app.post('/selectclass', verifyJWT, verifyStudent, async (req, res) => {
  const newItem = req.body;
  const result = await selectclassCollection.insertOne(newItem)
  res.send(result);
})
//my select class
app.get('/selectclass', verifyJWT, verifyStudent, async (req, res) => {
  const studentEmail = req.decoded.email;

  const query = { userEmail: studentEmail };
  const classes = await selectclassCollection.find(query).toArray();

  res.send(classes);
});
//my select class delete
app.delete('/selectclass/:classId', verifyJWT, verifyStudent, async (req, res) => {
  const { classId } = req.params;
  const studentEmail = req.decoded.email;

  try {
    // Delete the selected class for the student
    await selectclassCollection.deleteOne({ _id: new ObjectId(classId), userEmail: studentEmail });

    res.sendStatus(200); // Send a success response back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete selected class");
  }
});




///////////////
// Inside your server route handler
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


/////////////
// Endpoint for saving donation details
app.post('/save-donation', async (req, res) => {
  console.log('Received donation data:', req.body); // Log received data
  // Rest of your code
  const donationData = req.body;

  try {
    // Save donation/payment information in the paymentsCollection
    const paymentResult = await paymentsCollection.insertOne(donationData);

    // Sending a success response with the payment result
    res.send(paymentResult);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while saving the donation data' });
  }
});


///////// Payment History/////
// Express route to get payment history
app.get('/payment-history', async (req, res) => {
  try {
    const paymentHistory = await paymentsCollection.find().toArray();
    res.json(paymentHistory);
  } catch (err) {
    console.error('Error fetching payment history:', err);
    res.status(500).json({ error: 'Unable to fetch payment history' });
  }
});

app.get('/admin-users', async (req, res) => {
  try {
    const users = await usersCollection.find().toArray()
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

// Route to update user role by ID
app.put('/admin-users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const objectId = new ObjectId(id); // Correct way to create ObjectId

    const filter = { _id: objectId }; // Use the objectId in the filter
    const updateRole = { $set: { role } };

    const result = await usersCollection.updateOne(filter, updateRole);

    if (result.modifiedCount > 0) {
      res.json({ message: 'User role updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found or role unchanged' });
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Unable to update user role' });
  }
});
/////////////////

/// Start Add Event ///
// Multer setup for handling file uploads
app.post('/addevent', async (req, res) => {
  try {
    const { name, description, category, subcategory, status, image } = req.body;

    // The 'image' variable contains the image data in base64 format


    //Example: Save the image buffer to MongoDB or perform other operations
    //For instance:
    const result = await eventsCollection.insertOne({ name, description, category, status, image});

    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'An error occurred while adding the event' });
  }
});

/// End Add Event ///

/// Get Event Data ///
app.get('/events', async (req, res) => {
  try {
    // Fetch event data from your database (MongoDB or any other data source)
    const events = await eventsCollection.find().toArray()
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'An error occurred while fetching events' });
  }
});

app.get('/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const objectId = new ObjectId(eventId);
    // Fetch a single event based on the provided ID from your database
    const event = await eventsCollection.findOne({ _id:objectId });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'An error occurred while fetching the event' });
  }
});


// DELETE Event
app.delete('/admin-events/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const eventId = req.params.id;
    const objectId = new ObjectId(eventId);

    const result = await eventsCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'An error occurred while deleting the event' });
  }
});


// UPDATE Event
app.put('/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const objectId = new ObjectId(eventId);
    const { name, description, category, subcategory, status, image } = req.body;

    const result = await eventsCollection.updateOne(
      { _id: objectId },
      {
        $set: {
          name,
          description,
          category,
          subcategory,
          status,
          image,
        },
      }
    );

    if (result.matchedCount === 1) {
      res.status(200).json({ message: 'Event updated successfully' });
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'An error occurred while updating the event' });
  }
});

///Join Update  Event
app.put('/join-events/:id', async (req, res) => {
  try {
    const {eventId, name, email } = req.body; // Assuming request body contains volunteer's name and email
    const objectId = new ObjectId(eventId);
    // Find the event by its ID and update the volunteers array
    const result = await eventsCollection.updateOne(
      { _id: objectId },
      {
        $push: { // Use $push operator to add to the volunteers array
          volunteers: { name, email } // Add new volunteer object to the array
        }
      }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: 'Volunteer added successfully' });
    } else {
      return res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error adding volunteer to event:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});





////////////


// TOGGLE Event Status (Current/Upcoming)
app.put('/events/toggle-status/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const objectId = new ObjectId(eventId);
    const event = await eventsCollection.findOne({ _id: objectId });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const newStatus = event.status === 'Current' ? 'Upcoming' : 'Current';
    const result = await eventsCollection.updateOne(
      { _id: objectId },
      { $set: { status: newStatus } }
    );

    if (result.matchedCount === 1) {
      res.status(200).json({ message: `Event status toggled to ${newStatus}` });
    } else {
      res.status(500).json({ error: 'Failed to toggle event status' });
    }
  } catch (error) {
    console.error('Error toggling event status:', error);
    res.status(500).json({ error: 'An error occurred while toggling event status' });
  }
});
/// End Event Data ///

/// User Joined Events ///
app.get('/events-user/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    
    // Assuming eventsCollection is your database collection
    const allEvents = await eventsCollection.find().toArray();

    // Filter events based on the user's email
    const joinedEvents = allEvents.filter(event =>
      event.volunteers && event.volunteers.some(volunteer => volunteer.email === userEmail)
    );

    res.status(200).json({ allEvents, joinedEvents });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'An error occurred while fetching events' });
  }
});

///End User Joined 

///Start Payment History For User///
// Backend route handling (simplified)
app.get('/user-payment-history/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const paymentHistory = await paymentsCollection.find({ email: userEmail }).toArray();
    res.json(paymentHistory);
  } catch (err) {
    console.error('Error fetching payment history:', err);
    res.status(500).json({ error: 'Unable to fetch payment history' });
  }
});


///End Payment History For User///
      
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hope Charity is sitting')
})

app.listen(port, () => {
  console.log(`Hope Charity is sitting on port ${port}`);
})