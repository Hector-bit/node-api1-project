console.log('its alive');

const express = require('express');

const db = require('./data/db');

const server = express(); //creates a server

server.use(express.json());

//this posts a new person
server.post('/users', (req, res) => {
    const { name, bio } = req.body;
  
    if (!name || !bio) {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    } else {
      db.insert(req.body)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(() => {
          res.status(500).json({
            errorMessage:
              'There was an error while saving the user to the database',
          });
        });
    }
  });
//edits the persons info
  server.put('/users/:id', (req, res) => {
    const { name, bio } = req.body;
  
    if (!name || !bio) {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    } else {
      db.update(req.params.id, req.body)
        .then(user => {
          if (user) {
            res.status(200).json(user);
          } else {
            res
              .status(404)
              .json({
                message: 'The user with the specified ID does not exist.',
              });
          }
        })
        .catch(() => {
          res.status(500).json({
            errorMessage: 'The user information could not be modified.',
          });
        });
    }
  });

server.get('/', (req, res) => {
    res.send('hello new node 23');
})
//get the persons from the data base
server.get('/users', (req, res) => {

    db.find()
    .then(user => {
        if(user === []) {
            res.status(404).json({ message: "did not find users"})
        } else {
            res.json(user)
        }
    })
})
//this gets one person from the data base
server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log('find by id error', err);
        res.status(500).json({ error: "information for this user is non-existant"})
    })   
})

server.delete('/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then(user => {
        res.status(200).json({ message: `user with id ${id} deleted` })
    })
    .catch(err => {
        res.status(500).json({ error: 'failed to delete user'});
    })
})

const port = 5000;
server.listen(port, () => console.log('\n--- api is on ===\n'))