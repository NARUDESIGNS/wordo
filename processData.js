 //import creation functions from app.js
 import {createWordContainer} from "/app.js"
 import {createDefinitions} from "/app.js"
 import {createExamples} from "/app.js"
 import {createSyllables} from "/app.js"
 import {createSynonymAntonym} from "/app.js"

function renderData(data) {
    //function to extract data for individual part of speech
    function extractPosData(results, pos) {
        let posData = {
            pos: null,
            definitions: [],
            examples: []
        } 
        posData.pos = pos;
        for(let result of results) {
            if(result.partOfSpeech === pos) {
                console.log(result.definition);
                posData.definitions.push(result.definition);
                posData.examples = result.examples ? posData.examples.concat(result.examples) : posData.definitions = [];
                //posData.definitions.push(result.definition) : posData.definitions = [];
            }
        }
        console.log(posData);
        return posData;
    }

    //general data template just to show how the data object looks
    //(used to extract data in a suitable way for rendering data)
    let generalData = {
        word: null,
        pronunciation: null,
        syllables: null,
        syllablesCount: null,
        synonyms: [],
        antonyms: [] 
    }
    generalData.word = data.word;
    generalData.pronunciation = data.pronunciation.all;
    //if the list of syllables is more than 1, join using "-" (to get something like com-pu-ter), else convert to string
    generalData.syllables = data.syllables.list.length > 1 ? data.syllables.list.join("-") : data.syllables.list[0];
    generalData.syllablesCount = data.syllables.count;
    //get all synonyms & antonyms
    for(let result of data.results){
        //console.log(result.synonyms)
        generalData.synonyms = result.synonyms ? generalData.synonyms.concat(result.synonyms) : [];
        generalData.antonyms = result.antonyms ? generalData.antonyms.concat(result.antonyms) : [];
    }

    //the code below gets all parts of speeches of the word and makes them unique so we can extect data for
    //each part of speech using the extractPosData
    let uniquePos = [];
    for(let result of data.results){
        uniquePos.push(result.partOfSpeech);
    }
    uniquePos = [... new Set(uniquePos)];
    //sample data to be in uniquePos --> ["noun", "verb"]
    //render view for each part of speech
    for(let pos of uniquePos) {
        let posData = extractPosData(data.results, pos);
        createWordContainer(generalData.word, pos,  generalData.pronunciation, posData.definitions[0]);
        createDefinitions(generalData.word, pos, posData.definitions);
        createExamples(generalData.word, pos, posData.examples);
    }
    //console.log(uniquePos, generalData);
    //render view for general data
    // uniquePos.length[uniquePos.length - 1] makes syllables container take up the last word container color since
    createSyllables(generalData.word, uniquePos[uniquePos.length - 1], generalData.syllables, generalData.syllablesCount);
    createSynonymAntonym(generalData.synonyms, generalData.antonyms);

}

fetch(`https://wordsapiv1.p.rapidapi.com/words/hope`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "181bdbd4d8msh2fc3880ee0d5a4bp1f9d15jsna810d4b9bacf"
	}
})
.then(response => response.json())
.then(data => {
	renderData(data);
})
.catch(err => {
	console.log(err);
}); 


//createWordContainer("Narufy", "verb", "na-ru-fai", "to show extreme excellence in all you do and attain mind blowing succes");
// createDefinitions("narufy", "verb", ["Making something super succesful such that there are no possibililties of future errors.", "Planning something in a way that it doesn't fail even when external factors tend to interfere."]);
// createExamples("narufy", "verb", ["The ability to narufy things is what people seek for these days", "If you narufy the exam then you'd become the best student in the entire department", "be patient when you have to narufy things, else you'd inadvertently make errors!"]);
//createSyllables("narufy", "verb", "na-ru-fy", "3");
// createSynonymAntonym(["plan", "success", "exceed", "prevail", "overcome", "progress", "pass", "win"], ["fail", "loose", "regress", "defeat", "fall"]);


let jsonData = {
    "word": "love",
    "results": [
        {
            "definition": "sexual activities (often including sexual intercourse) between two people",
            "partOfSpeech": "noun",
            "synonyms": [
                "love life",
                "lovemaking",
                "sexual love"
            ],
            "examples": [
                "his lovemaing disgusted her",
                "he hadn't had any love in months",
                "he has a very complicated love life such that no one will want to stay with him"
            ]
        },
 
        {
            "definition": "any objet of warm affection of devotion",
            "partOfSpeech": "noun",
            "synonyms": [
                "passion"
            ],
            "antonyms": [
                "dislike"
            ],
            "examples": [
                "the theatre was her first love",
            ]
        },
 
        {
            "definition": "get pleasure from",
            "partOfSpeech": "verb",
            "synonyms": [
                "enjoy"
            ],
            "antonyms": [
                "hate"
            ],
            "examples": [
                "I love cooking",
                "dancing is what they love to do"
            ]
        }
    ],

    "syllables": {
        "count": 1,
        "list": [
            "love"
        ]
    },

    "pronunciation": {
        "all": "lov"
    }
}

//renderData(jsonData);