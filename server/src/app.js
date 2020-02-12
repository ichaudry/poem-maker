const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')



const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Post = require("../models/post");
var poemGenerator=require('../src/poemGenerator')


app.get('/posts', (req, res) => {
  Post.find({}, 'poem timeStamp', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})


/**
 * Routes for create, read, update and delete operations
 */
app.post('/add_post', (req, res) => {
	var db = req.db;

	var noun_1 = handleEmptyString(req.body.noun_1,'eyes');
	var noun_2 = handleEmptyString(req.body.noun_2,'hair');
	var noun_3 = handleEmptyString(req.body.noun_3,'desert');
  	var adjective_1 = handleEmptyString(req.body.adjective_1,'bright');
  	var adjective_2 = handleEmptyString(req.body.adjective_2,'glowing');
  	var adjective_3 = handleEmptyString(req.body.adjective_3,'shining');
  	var adverb_1 = handleEmptyString(req.body.adverb_1,'passionately');
  	var adverb_2 = handleEmptyString(req.body.adverb_2,'happily');
  	var adverb_3 = handleEmptyString(req.body.adverb_3,'gladly');
  	var preposition_1 = handleEmptyString(req.body.preposition_1,'as');
  	var preposition_2 = handleEmptyString(req.body.preposition_2,'till');
  	var preposition_3 = handleEmptyString(req.body.preposition_3,'with');
  	var verb_1 = handleEmptyString(req.body.verb_1,'loves');
  	var verb_2 = handleEmptyString(req.body.verb_2,'jumps');
  	var verb_3 = handleEmptyString(req.body.verb_3,'stands');
	var timeStamp=req.body.timeStamp;
	
	var inputMap=new Object({
		n1: noun_1,
		n2: noun_2,
		n3: noun_3,
		adj1: adjective_1,
		adj2: adjective_2,
		adj3: adjective_3,
		adv1: adverb_1,
		adv2: adverb_2,
		adv3: adverb_3,
		p1: preposition_1,
		p2: preposition_2,
		p3: preposition_3,
		v1: verb_1,
		v2: verb_2,
		v3: verb_3
	})

	var poem=poemGenerator.createPoem(inputMap)

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

	  post.noun = handleEmptyString(req.body.noun)
	  post.noun_2 = handleEmptyString(req.body.noun_2)
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

function handleEmptyString(str,rep){
	if (str===''){
		return rep
	}
	else{
		return str
	}
}

app.listen(process.env.PORT || 8081)
