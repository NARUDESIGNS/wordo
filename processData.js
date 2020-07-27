 //import creation functions from app.js
 import {createWordContainer} from "/app.js";
 import {createDefinitions} from "/app.js";
 import {createExamples} from "/app.js";
 import {createSyllables} from "/app.js";
 import {createSynonymAntonym} from "/app.js";
 import {enableSave} from "/app.js";

export function renderData(data) {
    //function to extract data for individual part of speech
    function extractPosData(results, pos) {
        let posData = {
            pos: null,
            pronunciation: null,
            definitions: [],
            examples: []
        } 
        posData.pos = pos;
        posData.pronunciation = data.pronunciation.all || data.pronunciation[pos] || data.pronunciation;//words API sometimes has a general pronunciation or pronunciation for each pos
        for(let result of results) {
            if(result.partOfSpeech === pos) {
                posData.definitions.push(result.definition);
                posData.examples = result.examples !== undefined ? posData.examples.concat(result.examples) : posData.examples.concat([]);
            }
        }
        //console.log(posData);
        return posData;
    }

    //general data template just to show how the data object looks
    //(used to extract data in a suitable way for rendering data)
    let generalData = {
        word: null,
        syllables: null,
        syllablesCount: null,
        synonyms: [],
        antonyms: [] 
    }
    generalData.word = data.word;
    //if the list of syllables is more than 1, join using "-" (to get something like com-pu-ter), else convert to string
    if(data.syllables) {
        generalData.syllables = (data.syllables.list.length > 1) ? data.syllables.list.join("-") : data.syllables.list[0];
        generalData.syllablesCount = data.syllables.count;
    }
    //get all synonyms & antonyms
    for(let result of data.results){
        generalData.synonyms = result.synonyms !== undefined ? generalData.synonyms.concat(result.synonyms) : generalData.synonyms.concat([]);
        generalData.antonyms = result.antonyms !== undefined ? generalData.antonyms.concat(result.antonyms) : generalData.antonyms.concat([]);
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
        createWordContainer(generalData.word, pos,  posData.pronunciation, posData.definitions[0]);
        createDefinitions(generalData.word, pos, posData.definitions);
        createExamples(generalData.word, pos, posData.examples);
    }
    //console.log(generalData);
    //render view for general data
    // NB: uniquePos.length[uniquePos.length - 1] makes syllables container take up the last word container color since
    createSyllables(generalData.word, uniquePos[uniquePos.length - 1], generalData.syllables, generalData.syllablesCount);
    createSynonymAntonym(generalData.synonyms, generalData.antonyms);
    enableSave();
}