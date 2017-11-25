'use strict';

const Alexa = require('alexa-sdk');
const APP_ID =  "amzn1.ask.skill.909d4dd8-7824-4fec-b711-6d11121bb1e1"; 
const namesArray = require('./namesArray.js');

const handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', "Hello mother, how can I be of help?");
    },
    'RandomNameIntent': function () {
        //search names
    },
    'SpecificNameIntent': function() {

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
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = namesArray;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
