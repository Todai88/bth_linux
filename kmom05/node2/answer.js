#!/usr/bin/env node

/**
 * @preserve type
 *
 * type
 * linux
 * node2
 * jobk16
 * 2017-02-17 10:04:43
 * v2.2.30 (2017-02-14)
 *
 * Generated 2017-02-17 11:04:43 by dbwebb lab-utility v2.2.30 (2017-02-14).
 * https://github.com/mosbth/lab
 */"use strict";


//import dbwebb from "./.dbwebb.js";
const dbwebb = require("./.dbwebb.js");

var ANSWER = null;
console.log(dbwebb.prompt + "Ready to begin.");

//global constants
const fs = require('fs');
const path = require('path');
const ircLog = path.join(__dirname, 'ircLog.txt');
const qs = require('querystring');
var highlights = path.join(__dirname, 'highlights.txt');
var input;

/** ======================================================================
 * Lab 4 - JavaScript with Nodejs
 *
 * JavaScript using nodejs. During these exercises we train on the built-in
 * nodejs modules filesystem, querystring and crypto.
 * Documentation can be found at [nodejs api](https://nodejs.org/api/).
 *
 */



/** ----------------------------------------------------------------------
 * Section 1 . Filesystem
 *
 * This section is about the built-in module filesystem and how to read and
 * write files synchronously.
 *
 */



/**
 * Exercise 1.1
 *
 * Start by importing the filesystem module `fs`.
 *
 * Use the `fs` module and the function `readFileSync` to read the entire
 * `ircLog.txt` in UTF-8 encoding into a variable. Answer with the number of
 * characters in the file.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

input = fs.readFileSync(ircLog, 'utf-8');


ANSWER = input.length;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.1", ANSWER, false);

/**
 * Exercise 1.2
 *
 * Use your variable from the exercise above and answer with the contents on
 * line 4.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

var split = input.split("\n", 4)[3];


ANSWER = split;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.2", ANSWER, false);

/**
 * Exercise 1.3
 *
 * Write line number 4 of `ircLog.txt` to a new file that you create called
 * `highlights.txt`. Replace `highlights.txt` if it already exists.
 * Answer with characters 7 through 10 from `highlights.txt`.
 *
 * Tip: Use the function `writeFileSync()` when writing to files.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

fs.writeFileSync(highlights, split, 'utf-8');


ANSWER = fs.readFileSync(highlights, 'utf-8').slice(6,9);

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.3", ANSWER, false);

/** ----------------------------------------------------------------------
 * Section 2 . querystring
 *
 * This section is about the built-in module querystring and how to parse and
 * encode query strings.
 *
 */



/**
 * Exercise 2.1
 *
 * Start by importing the querystring module `querystring`.
 *
 * Use the `querystring` module to parse a query string
 * 'first_name=Jim&last_name=Lovell&mission=Apollo13'. Answer with the value
 * of mission.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = qs.parse('first_name=Jim&last_name=Lovell&mission=Apollo13').mission;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.1", ANSWER, false);

/**
 * Exercise 2.2
 *
 * Use the parsed query string from above to concatenate the astronaut's full
 * name with the string ' was on the ' and the mission that the astronaut was
 * on.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER =qs.parse('first_name=Jim&last_name=Lovell&mission=Apollo13').first_name +
            " " +
            qs.parse('first_name=Jim&last_name=Lovell&mission=Apollo13').last_name +
            " was on the " +
            qs.parse('first_name=Jim&last_name=Lovell&mission=Apollo13').mission;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.2", ANSWER, false);

/**
 * Exercise 2.3
 *
 * Create a javascript object with the following attributes and values:
 *
 * ```json
 * url = https://dbwebb.se/
 * id = 415
 * payload = aHR0cHM6Ly9kYndlYmIuc2Uv
 * type = xml
 *
 * ```
 *
 * Encode the javascript object as a querystring and answer with the encoded
 * query string.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "Replace this text with the variable holding the answer.";

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.3", ANSWER, false);

/** ----------------------------------------------------------------------
 * Section 3 . crypto
 *
 * This section is about the built-in module crypto and how to encrypt data
 * with nodejs.
 *
 */



/**
 * Exercise 3.1
 *
 * Start by importing the `crypto` module.
 *
 * Use the `crypto` module to create a hash of 'Forever trusting who we are'
 * using the `sha256` algorithm.
 *
 * Answer with a digest of the hash in `hex` format.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "Replace this text with the variable holding the answer.";

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.1", ANSWER, false);

/**
 * Exercise 3.2
 *
 * Create an array called `cryptoStrings` holding the strings 'Forever
 * trusting who we are', 'And nothing else matters', 'Never opened myself this
 * way', 'Life is ours, we live it our way'.
 *
 * Use filter to create an array only containing elements that has the string
 * 'nothing else matters' in them.
 *
 * Answer with the array.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "Replace this text with the variable holding the answer.";

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.2", ANSWER, false);

/**
 * Exercise 3.3
 *
 * Use the array from above only containing elements with 'nothing else
 * matters'.
 *
 * For the elements in the array create a hex digest of a hash created with
 * with the `sha256` algorithm of each element.
 *
 * Answer with the array of hashes.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "Replace this text with the variable holding the answer.";

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.3", ANSWER, false);

/**
 * Exercise 3.4
 *
 * Use `filter` to keep all elements in `cryptoStrings` that contains both an
 * 'i', an 'e', and a 'm', check both capital and non-capital letters.
 *
 * For the remaining elements create a hex digest of a hash created with with
 * the `sha256` algorithm of each remaining element.
 *
 * Answer with the array of hashes.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "Replace this text with the variable holding the answer.";

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.4", ANSWER, false);

/**
 * Exercise 3.5
 *
 * Using the same `cryptoStrings` array from above, create a hash of the
 * elements containing 'matters', check both capital and non-capital letters.
 *
 * For the remaining elements create a HMAC using the `sha256` algorithm and
 * the secret 'metallica' for each element. Create a `base64` digest of the
 * HMAC for each element.
 *
 * Answer with the array of HMACs.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "Replace this text with the variable holding the answer.";

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.5", ANSWER, false);


process.exit(dbwebb.exitWithSummary());
