const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Tutorial = require('./models/tutorial ');


app.use(express.json());
app.use(logger);
require('dotenv/config');

function logger (req, res, next) {
    console.log('The request:   ' + req.url + ' ' + req.method);
    next();
}

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log(' connected'));

app.get('/info', (req, res) => {
    Tutorial.find({}).then(tutorial => {
        res.send(`The site has info for ${tutorial.length} tutorials <br><br>${new Date()}`);
    })
})

//1 Get + 8 ! 
app.get('/api/tutorials', async (req, res) => {
  try {
    if(req.query.title)
    {
      const tutorialsbyTitle = await Tutorial.find({ title: {$regex: `.*${req.query.title}*`}});
      res.send(tutorialsbyTitle);
    }
    else{
      const tutorials = await Tutorial.find({});
      res.send(tutorials);
    } 
  } catch (err) {
      res.status(400).send(err.message);
  }
});
//2 Get
app.get('/api/tutorials/:id', async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);
        res.send(tutorial);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//7  get publishd tutorial
app.get('/api/tutorials/published', async (req,res) => {
  try{
      const publishedTutorials = await Tutorial.find(published)
      res.send(publishedTutorials);
  }catch(err){
      res.status(400).send(err.message);
  }
})

//post 3
app.post('/api/tutorials', (req, res) => {
  const tutorial = new Tutorial({
      title: req.body.title,
      published: req.body.published || false, 
      content: req.body.content,
  });
  tutorial.save().then(doc => {
      res.send(doc);
  }).catch(err => {
      res.status(400).send(err.message);
  });
});

//4 put
app.put('/api/tutorials/:id', async (req, res) => {
  try {
      const result = await Tutorial.update({_id: req.params.id}, {$set: req.body})
      res.send(result);
  } catch (err) {
      res.status(400).send(err.message);
  }
})

//deltet 5
app.delete('/api/tutorials/:id', async (req, res) => {
  try {
      const result = await Tutorial.findByIdAndDelete({_id: req.params.id})
      res.send(result);
  }   catch (err) {
      res.status(400).send(err.message);
  }
})

//deltet 6
app.delete('/api/tutorials', async (req, res) => {
    try {
      const result = await Tutorial.deleteMany({});
      res.send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
});


app.listen(3002);