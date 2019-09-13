const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var inputMap=new Object({
	noun_1:'n1',
	noun_2: 'n2',
	noun_3:'n3',
	adjective_1: 'adje1',
	adjective_2: 'adje2' ,
	adjective_3: 'adje3',
	adverb_1: 'adv1',
	adverb_2: 'adv2',
	adverb_3: 'adv3',
	preposition_1: 'prep1',
	preposition_2: 'prep2',
	preposition_3: 'prep3',
	verb_1: 'v1',
	verb_2: 'v2',
	verb_3: 'v3'
})



const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Post = require("../models/post");
var poemGenerator=require('../src/poemGenerator')
poemGenerator.createPoem(inputMap)


app.get('/posts', (req, res) => {
  Post.find({}, 'poem timeStamp', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

app.post('/add_post', (req, res) => {
	var db = req.db;
	
	var noun_1 = req.body.noun_1;
	var noun_2 = req.body.noun_2;
	var noun_3 = req.body.noun_3;
  	var adjective_1 = req.body.adjective_1;
  	var adjective_2 = req.body.adjective_2;
  	var adjective_3 = req.body.adjective_3;
  	var adverb_1 = req.body.adverb_1;
  	var adverb_2 = req.body.adverb_2;
  	var adverb_3 = req.body.adverb_3;
  	var preposition_1 = req.body.preposition_1;
  	var preposition_2 = req.body.preposition_2;
  	var preposition_3 = req.body.preposition_3;
  	var verb_1 = req.body.verb_1;
  	var verb_2 = req.body.verb_2;
  	var verb_3 = req.body.verb_3;
	var timeStamp=req.body.timeStamp;
	var poem= req.body.poem;
	  
	var inputMap=new Object({
		noun_1: noun_1,
		noun_2: noun_2,
		noun_3: noun_3,
    	adjective_1: adjective_1,
    	adjective_2: adjective_2,
    	adjective_3: adjective_3,
    	adverb_1: adverb_1,
    	adverb_2: adverb_2,
    	adverb_3: adverb_3,
		preposition_1: preposition_1,
		preposition_2: preposition_2,
		preposition_3: preposition_3,
		verb_1: verb_1,
		verb_2: verb_2,
		verb_3: verb_3
	})

	poem=poemGenerator.createPoem(inputMap)
	
	var new_post = new Post({
		noun_1: noun_1,
		noun_2: noun_2,
		noun_3: noun_3,
    	adjective_1: adjective_1,
    	adjective_2: adjective_2,
    	adjective_3: adjective_3,
    	adverb_1: adverb_1,
    	adverb_2: adverb_2,
    	adverb_3: adverb_3,
		preposition_1: preposition_1,
		preposition_2: preposition_2,
		preposition_3: preposition_3,
		verb_1: verb_1,
		verb_2: verb_2,
		verb_3: verb_3,
		timeStamp: timeStamp,
		poem:{
			line1: poem.get(0),
			line2: poem.get(1),
			line3: poem.get(2),
			line4: poem.get(3),
			line5: poem.get(4)
	}
})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
	
})

app.put('/posts/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'noun noun_2', function (error, post) {
	  if (error) { console.error(error); }

	  post.noun = req.body.noun
	  post.noun_2 = req.body.noun_2
	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

app.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'noun noun_2', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})

app.listen(process.env.PORT || 8081)
