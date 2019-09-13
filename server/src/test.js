console.log('testing')

var n1='lion'
var n2= 'baby'
var n3='tiger'

var adj1='dark'
var adj2='blue'
var adj3='happy'

var adv1='quickly'
var adv2='boldly'
var adv3= 'happily'

var p1= 'to'
var p2='between'
var p3='in'

var v1='runs'
var v2='walks'
var v3='swings'

const datamuse = require('datamuse');
let test=rhymingWord(n1) 
var data=''
test.then(function(test) {
    data=console.log(test) // "Some User token"
 })

 console.log(data)

function rhymingWord(word){
    return datamuse.request('words?rel_rhy='+word)
.then((json) => {
    var rhyme=''
    return (json[1].word)
  //do it!
});
}

console.log(data)

data+='honey'
console.log(data)
// console.log(rhyme)

// returnData.rhyming[]
// obj=JSON.parse(returnData);
// returnData[ Math.floor(Math.random() * returnData.length) ].word

