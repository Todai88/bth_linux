#!/usr/bin/env bash

#
# 387c3d7b1d0ccf6012413b0f6d5cb990
# linux
# bash2
# jobk16
# 2017-01-17 21:56:16
# v2.2.25 (2017-01-16)
#
# Generated 2017-01-17 22:56:16 by dbwebb lab-utility v2.2.25 (2017-01-16).
# https://github.com/mosbth/lab
#

. .dbwebb.bash
echo "${PROMPT}Ready to begin."



# ==========================================================================
# Lab 2 - linux 
# 
# En lab där du använder Unix verktyg som finns tillgängliga via
# kommandoraden, tillsammans med lite Bash, för att finna och hantera
# information i en [IRC loggfil](ircLog.txt).
#

# --------------------------------------------------------------------------
# Section 1. Bash 
# 
# Öva Linux kommandon och använd dem tillsammans med Bash.
#
# I denna övningen kommer du främst använda kommandon som `grep`, `wc`,
# `head` och `tail` för att söka ut information i en loggfil från
# irc-chatten.
#
# Write HTML in text, wrap in backtick `<a href="moped">mask</a>`
#
# Pure link as HTML <a href="moped">mask</a>
#
# ```
# <html>
# ```
#
# ```
# a > 2
# ```
#
# Sedan kombinerar du utskriften av kommandona in till variabler i Bash.
# Använd man-sidorna vid behov för att finna informaiton om hur du löser
# uppgifterna.
#

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.1 (1 points) 
# 
# Skapa en variabel `FILE` och tilldela den värdet `ircLog.txt`.
#
# Svara med variabelns värde, dvs `$FILE`.
#
# Write your code below and put the answer into the variable ANSWER.
#


File='ircLog.txt'



ANSWER="$File"

# I will now test your answer - change false to true to get a hint.
assertEqual "1.1" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.2 (1 points) 
# 
# Använd kommandot `wc` för att räkna ut hur många rader ircloggen
# består av. Visa endast antalet rader och filens namn, separerade av ett
# mellanslag.
#
# Spara svaret i en variabel och svara med variabelns innehåll.
#
# Write your code below and put the answer into the variable ANSWER.
#

wc_1=$(
		wc $File -l
	)

ANSWER="$wc_1"

# I will now test your answer - change false to true to get a hint.
assertEqual "1.2" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.3 (1 points) 
# 
# Använd `wc` tillsammans med `cut` för att räkna ut hur många ord,
# words, ircloggen består av.
#
# Spara enbart antalet ord i en variabel och svara med den.
#
# Write your code below and put the answer into the variable ANSWER.
#
wc_2=$(
		wc -w $File | cut -f1 -d' '
	)


ANSWER="$wc_2"

# I will now test your answer - change false to true to get a hint.
assertEqual "1.3" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.4 (1 points) 
# 
# Hitta raden med 'pansars' åsikt om 'notepad'.
#
# Spara svaret i en variabel och svara med variabelns innehåll.
#
# Write your code below and put the answer into the variable ANSWER.
#

grepper=$(
		grep "pansar" $File | grep "notepad"
		)





ANSWER="$grepper"

# I will now test your answer - change false to true to get a hint.
assertEqual "1.4" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.5 (1 points) 
# 
# Hitta de fyra sista raderna i filen.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			tail -n 4 $File
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.5" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.6 (1 points) 
# 
# När öppnades ircloggen för första gången? Ledtråd 'Log opened'. Svara
# med raden som säger när loggen öppnades för första gången.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
		head -n 1 $File | grep "Log opened"
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.6" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.7 (1 points) 
# 
# Vad innehåller den tredje raden där wasa säger något?
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
		grep -m 3 "<@wasa>" $File | tail -n 1
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.7" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.8 (1 points) 
# 
# Hur många rader är det som är loggade enligt tiden 11:15?
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
		grep -c "11:15" $File
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.8" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.9 (3 points) 
# 
# Hitta de första 10 raderna från dagen 'Wed Jun 17 2015'.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
		grep -A 10 "Wed Jun 17 2015" $File | tail -n 10
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.9" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.10 (3 points) 
# 
# Hitta raderna som är inlagda angående 'forum' och innehåller detaljer om
# 'projektet' och 'htmlphp'.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
		grep "Forumet" ircLog.txt | grep "htmlphp" | grep "projektet"
		)
# I will now test your answer - change false to true to get a hint.
assertEqual "1.10" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.11 (3 points) 
# 
# Vad sa 'Bobbzorzen' två rader innan han sa 'cewl'?
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
		grep "Bobbzorzen" ircLog.txt | grep "cewl" -B 2 | head -n 1	
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.11" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.12 (3 points) 
# 
# Hur många ord är det i den fjärde till nionde raden, under dagen 'Mon
# Jun 08 2015'?
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
		grep "Mon Jun 08 2015" ircLog.txt -A 9 | tail -n 6 | wc -w
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.12" true "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.13 (3 points) 
# 
# Hitta den första raden där 'pansar' säger något när klockan är 07:48.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
		grep "07:48" $File | grep "pansar" | head -n 1
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.13" false "$ANSWER"


exitWithSummary
