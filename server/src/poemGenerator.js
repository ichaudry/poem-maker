const fetch = require("node-fetch");

module.exports={
    createPoem(input){
        var poem=''
        // clone = JSON.parse(JSON.stringify(input));       
        var sentences = generateSentences( 5 , input);
        // console.log(sentences)
        for (var i = 0, length = sentences.size; i < length; i++) {
            poem+=sentences.get(i) +' <br> '
        }
        return sentences
	}
}

//Helper Fucntions
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.trim == String.prototype.trim || function() {
	return this.replace(/^\s+|\s+$/g, '');
}

function generateSentences (numSentences,input) {
	var pg=setVar(input)
	var sentences=new Map();
	var x=0
	while (numSentences--) {
		var sentence = '';
		var sentencePattern = pg.sentencePatterns[ randomInt(0, pg.numSentencePatterns - 1) ];
		
		// loop through sentence pattern array
		for (var i = 0, length = sentencePattern.length; i < length; i++) {
			var languagePartArray;
			var articleType;
			var nextWord = null;

			// if this word is an article, need to determine if next word starts with a vowel or consonant
			if (sentencePattern[i] === 'article') {
				// get next word
				var nextWordLanguagePartArray = pg.languageParts[ sentencePattern[i + 1] ];
				var nextWord = nextWordLanguagePartArray[ randomInt(0, nextWordLanguagePartArray.length - 1) ];

				// set article type based on whether next word starts with vowel or consonant
				if (pg.languageParts['vowel'].indexOf(nextWord[0]) !== -1) {
					articleType = 'beforeVowel';
				} else {
					articleType = 'beforeConsonant';
				}

				languagePartArray = pg.languageParts[ sentencePattern[i] ][ articleType ];
			} else {
				languagePartArray = pg.languageParts[ sentencePattern[i] ];
			}

			// add this word to sentence
			sentence += languagePartArray[ randomInt(0, languagePartArray.length - 1) ] + ' ';

			// if next word was gotten, also add next word to sentence and increment the i counter
			if (nextWord !== null) {
				sentence += nextWord + ' ';
				i++;
			}
		}

		if (x!=1){sentence+=','}		
		sentences.set(x,sentence.trim());
		x++
	} 
	return sentences;
} 

function setVar(input){
    var pg = {

        // -- BEGIN CONFIG ------------------------------------------------------------
        numSentences: 10,
        numSentencePatterns: null,
    
        // hard-coded sentence patterns is the simpler way
        // TODO: make more flexible / less artificial
        sentencePatterns: [
            ['article', 'adjective', 'inputNoun', 'inputVerb', 'inputAdverb', 'preposition', 'article', 'noun'],
            ['pronoun', 'inputAdverb', 'inputVerb', 'inputNoun', 'preposition', 'article', 'noun']
            ['article', 'inputAdjective', 'noun', 'verb', 'adverb', 'inputPreposition', 'article', 'noun'],
            ['pronoun', 'adverb', 'verb', 'noun', 'inputPreposition', 'article', 'noun']
        ],
    
        languageParts: {
            'vowel': 'aeiou'.split(''),
            'article': {
                'beforeVowel': 'the|an'.split('|'),
                'beforeConsonant': 'the|a'.split('|')
            },
            'preposition': 'to|through|under|over|between|on|in|above|below|betwixt'.split('|'),
            'adjective': 'beautiful|tall|flowing|hot|cold|fragrant|misty|bare|coarse|blind|dim|dreary|elaborate|enchanting|gleaming|glistening|green|organic|tender|cloudless'.split('|'),
            'adverb': 'quickly|slowly|boldly|always|angrily|cheerfully|elegantly|frantically|innocently|nervously|powerfully|rarely|silently|wildly|warmly|solemly'.split('|'),
            'noun': 'hair|finger|sun|field|arm|sphere|rock|sand|grass|tree|flower|orb|sea|water|ocean|tide|sky|cloud|moon|star|cosmos|ant|otter|elephant'.split('|'),
            'inputNoun':[input.n1,input.n2,input.n3],
            'inputAdjective':[input.adj1,input.adj2,input.adj3],
            'inputAdverb':[input.adv1,input.adv2,input.adv3],
            'inputPreposition':[input.p1,input.p2,input.p3],
            'inputVerb':[input.v1,input.v2,input.v3],
            'pronoun': 'he|she|it|someone'.split('|'),
            'verb': 'kicks|moves|swings|runs|walks|flies|sprays|stings|drops|breaks|explodes|diminishes|sweetens|falls|rises|hears|floats'.split('|'),
            'stop': '.|?|!'.split('|'),
            'pause': ',|;|...| - |'.split('|')
        } 
}
return pg
}

// var url='https://api.datamuse.com/words?rel_rhy=string'



// async function getData(url) {
//     const response = await fetch(url);

//     return response.json()
// }

// async function main() {
//     const data = await getData(url);

//     console.log(data[1].word)

//     return data[1].word
// }


