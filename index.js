'use strict';

const httpRequest = require('request');
const xmlParser = require('xml-parser');
const Alexa = require('alexa-sdk');
const APP_ID =  "amzn1.ask.skill.909d4dd8-7824-4fec-b711-6d11121bb1e1"; 
const NAMES_API_KEY = "ch244216";
let namesArray = require('./namesArray.js');
let gender;
let name;

const handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', "Hello mother, how can I be of help?");
    },
    'RandomBoyNameIntent': function () {        
        name = "";      
        //get random name from API
        httpRequest.get({
            url: `https://www.behindthename.com/api/random.php?usage=ita&gender=m&key=${NAMES_API_KEY}`,
            json: true
        }, (error, response, body) => {
            if (response.statusCode == 200) {
                var jsonBody = xmlParser(body);
                name = jsonBody.root.children[0].children[0].content;
                this.emit(':tell', `How about the name ${name}?`);
                this.emit('SpecificNameIntent');
            } else {
                this.emit(':tell', "I'm sorry I couldn't find a name");
            }
        });
    },
    'RandomGirlNameIntent': function () {  
        name = "";      
        //get random name from API
        httpRequest.get({
            url: `https://www.behindthename.com/api/random.php?usage=ita&gender=f&key=${NAMES_API_KEY}`,
            json: true
        }, (error, response, body) => {
            if (response.statusCode == 200) {
                var jsonBody = xmlParser(body);
                name = jsonBody.root.children[0].children[0].content;
                this.emit(':tell', `How about the name ${name}?`);
                this.emit('SpecificNameIntent');
            } else {
                this.emit(':tell', "I'm sorry I couldn't find a name");
            }
        });
    },
    'SpecificNameIntent': function() {
        if (name !== "") {
            //return information about a specific name
            var description = getNameDescription(name.toString());
            this.emit(':tell', `${name} comes from ${description}`);
        }
    },
    'ProductHelpIntent': function() {
        this.emit(':tell', "Which product do you want help with?");
    },
    'SoundIntent': function() {
        //play a random sound
    },    
    'StoryIntent': function(){
        this.emit(':tell', "I will tell you a story...");
    },

    // 'GetFact': function () {
    //     const factArr = this.t('FACTS');
    //     const factIndex = Math.floor(Math.random() * factArr.length);
    //     const randomFact = factArr[factIndex];

    //     // Create speech output
    //     const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
    //     this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    // },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function() {
        this.emit(':tell', "I'm sorry, did you say anything?");
    }
};

function getNameDescription(_name) {
    return namesArray._name.toString();
}

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = namesArray;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
