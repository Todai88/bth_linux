#!/usr/bin/env node

/**
 * @preserve 27afc4002b23ff032748e176aa59683a
 *
 * 27afc4002b23ff032748e176aa59683a
 * linux
 * node1
 * jobk16
 * 2017-02-08 15:04:13
 * v2.2.28* (2017-02-01)
 *
 * Generated 2017-02-08 16:04:13 by dbwebb lab-utility v2.2.28* (2017-02-01).
 * https://github.com/mosbth/lab
 */"use strict";


import dbwebb from "./.dbwebb.js";

var ANSWER = null;
console.log(dbwebb.prompt + "Ready to begin.");



/** ======================================================================
 * node1 - JavaScript med Nodejs
 *
 * JavaScript using nodejs.
 *
 */



/** ----------------------------------------------------------------------
 * Section 1 . nodejs built-ins
 *
 * In this section we try out some of the new nodejs and ES6 features.
 *
 */



/**
 * Exercise 1.1
 *
 * Create a variable called `numbersArray` holding the numbers 4,51,33,11,94.
 *
 * Use find to get the first occurence of a number bigger than or equal to 42.
 *
 * Answer with the number.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */




var numbersArray = [4, 51, 33, 11, 94];

ANSWER = numbersArray.find(x => x > 42);

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.1", ANSWER, false);

/**
 * Exercise 1.2
 *
 * Find the smallest number in `numbersArray` by using the spread operator
 * `...` and the function `Math.min()`.
 *
 * Answer with the smallest number.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = Math.min(... numbersArray);

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.2", ANSWER, false);

/**
 * Exercise 1.3
 *
 * Create a function called `meaningOfLife()` with one default parameter with
 * the value of 42.
 *
 * The function should return the sentence 'The meaning of life is '
 * concatenated with the parameter.
 *
 * Answer with a call to the `meaningOfLife()` function without any
 * parameters.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

function meaningOfLife (x = 42) {

	return 'The meaning of life is ' + x;
}




ANSWER = meaningOfLife();

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.3", ANSWER, false);

/**
 * Exercise 1.4
 *
 * Check if the word Elephant contains the letters 'oo'. Return true or false
 * depending on the answer.
 *
 * Tip: Use nodejs function `includes`.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "Elephant".includes("oo");

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.4", ANSWER, false);

/**
 * Exercise 1.5
 *
 * Check if the word Elephant starts with the letters 'El'. Return true or
 * false depending on the answer.
 *
 * Tip: Use nodejs function `startsWith`.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = "Elephant".startsWith("El");

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.5", ANSWER, false);

/** ----------------------------------------------------------------------
 * Section 2 . Filtering arrays
 *
 * In this section we filter arrays in different ways.
 *
 */



/**
 * Exercise 2.1
 *
 * Use `numbersArray` from above holding the numbers 4,51,33,11,94.
 *
 * Use a for-loop to save all numbers smaller than 42 in a new array.
 *
 * Answer with the resulting array.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */






ANSWER = numbersArray.filter(function(val) { return val <= 42});

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.1", ANSWER, false);

/**
 * Exercise 2.2
 *
 * Create a variable called `moreNumbersArray` holding the numbers
 * 4,51,33,11,94,67,34.
 *
 * Use the built-in higher-order function `filter` and a callback function to
 * filter out all numbers bigger than or equal to 42.
 *
 * Use arrow-notation to keep the code short and concise.
 *
 * Answer with the resulting array.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

var moreNumbersArray = [4, 51, 33, 11, 94, 67, 34];



ANSWER = moreNumbersArray.filter((val) => val <= 42);

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.2", ANSWER, false);

/** ----------------------------------------------------------------------
 * Section 3 . Transforming arrays
 *
 * In this section we change arrays using the higher-order functions map and
 * reduce.
 *
 */



/**
 * Exercise 3.1
 *
 * Create a variable called `stringArray` holding the strings 'Jim
 * Lovell','Jack Swigert','Fred Haise'.
 *
 * Use a for-loop to concatenate the string ' was on the apollo 13' too each
 * name in the array.
 *
 * Store the result in a new array and answer with that array.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */


var stringArray = ['Jim Lovell', 'Jack Swigert', 'Fred Haise'];



stringArray.forEach(function(element, index, array){

	array[index] = element + ' was on the apollo 13';	

});

ANSWER = stringArray;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.1", ANSWER, true);

/**
 * Exercise 3.2
 *
 * Use the `stringArray` from above and the built-in higher-order function
 * `map` to concatenate the string ' was not on the apollo 12' and each name.
 *
 * Use arrow notation to keep the code simple and concise.
 *
 * Answer with the resulting array.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */



stringArray = ['Jim Lovell', 'Jack Swigert', 'Fred Haise'];


ANSWER = stringArray.map((val) => val + ' was not on the apollo 12');

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.2", ANSWER, false);

/**
 * Exercise 3.3
 *
 * Create a variable called `maybePrimeNumber` holding the numbers
 * 73,78,83,88,97,102,103,106,109.
 *
 * In a for-loop sum all prime numbers from `maybePrimeNumber`, you need to
 * find out whether or not the number is a prime number.
 *
 * Answer with the resulting sum.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

var maybePrimeNumber = [73,78,83,88,97,102,103,106,109], out = 0;


maybePrimeNumber.forEach(function(element){

	for(var i = 2; i < (element / 2); i++){

		if (element % i == 0) {

			return 0;
		
		}
	}
	out+= element;	
	return element;
});

console.log(out);

ANSWER = out;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.3", ANSWER, true);

/**
 * Exercise 3.4
 *
 * Create a function `isNotPrime()` that takes one parameter (an integer) and
 * tests if that number is a prime number. If the number is not prime, the
 * number is returned otherwise return 0.
 *
 * Use the built-in higher-order functions `reduce` to sum all numbers that
 * are NOT prime numbers.
 *
 * Answer with the resulting sum.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */


function isNotPrime(val){
	for(var i = 2; i < (val / 2); i++){
	
		if (val % i == 0){
	
			return val;
	
		}

	}
	
	return 0;
}



ANSWER = maybePrimeNumber.reduce((prev, element) => prev + isNotPrime(element), 0);
// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.4", ANSWER, false);


process.exit(dbwebb.exitWithSummary());
