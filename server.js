const express = require('express');
const app = express();
const fetch = require('node-fetch');

//define questions
let questions = ["Where do you live?", 
  "What city would you like to visit?"
];

//array to store answers
let answers = [];

//ask question
const ask = (i) => {
  process.stdout.write(`\n ${questions[i]} \n`)
}

//capture input & cleanse answer
process.stdin.on('data', (data) => {
  //answers.push(data.toString().trim());
  answers = data.toString().trim();
  theTime(answers)
});

ask(0);

//fetch time of city
const theTime = () => {
  fetch(`http://worldtimeapi.org/api/timezone/America/${answers}`)
   .then(response => response.json())
    .then(json => {
      if (json.error == "unknown location") {
        console.log(`This API doesn't know what time it is in ${answers}. When I ask again, say Denver or Bogota this time. \n`)
        ask(0);
      } else {
        console.log(`The time is ${json.datetime}. `);
      }
    }).catch(error => {
      console.log(error.response.body);
      callback(error);
    })
};
 