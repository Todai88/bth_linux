#!/usr/bin/env bash

#
# 67b36afa638c1aa3cf08fd1765af66c6
# linux
# bash1
# jobk16
# 2017-01-17 13:27:30
# v2.2.25 (2017-01-16)
#
# Generated 2017-01-17 14:27:30 by dbwebb lab-utility v2.2.25 (2017-01-16).
# https://github.com/mosbth/lab
#

. .dbwebb.bash
echo "${PROMPT}Ready to begin."



# ==========================================================================
# Bash 1 - linux 
# 
# En lab där du använder Unix kommandon som finns tillgängliga via
# kommandoraden för att lista, hitta, skriva ut information om filer och
# ändra i en katalogstruktur.
#
# Labben använder sig av en apache2 katalogstruktur som finns på denna
# sökväg './apache2'.
#

# --------------------------------------------------------------------------
# Section 1. ls 
# 
# I denna del använder vi kommandot `ls` för att lista filer och kataloger.
#

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.1 (1 points) 
# 
# Använd kommandot `ls` för att lista filerna i apache2 katalogen, lista
# filerna så varje ny fil hamnar på en egen rad.
#
# Tips: Använd kommandot `man ls` för att se de olika flaggor man kan
# använda för ls.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
				ls -1 apache2
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.1" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.2 (1 points) 
# 
# Använd kommandot `ls` för att lista filerna i apache2 katalogen, använd
# en flagga så alla kataloger får ett snedstreck (`/`) efter namnet. Lista
# filerna så varje ny fil hamnar på en egen rad.
#
# Tips: Använd kommandot `man ls` för att se de olika flaggor man kan
# använda för ls.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			ls -1p apache2
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.2" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.3 (1 points) 
# 
# Gä först till katalogen `apache2/mods-available` och använd  här
# kommandot `ls` för att lista filerna i katalogen. Lista bara filer som
# börjar på 'a' och har filändelsen '.conf'. Lista filerna så varje ny
# fil hamnar på en egen rad.
#
# Du kan använda `&&` för att kedja ihop två eller fler kommandon på
# samma rad.
#
# Tips: Använd ett wildcard `*` för att matcha mot flera filer.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
				cd apache2/mods-available && ls -1 a*.conf
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.3" true "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.4 (1 points) 
# 
# Lista alla, även dolda, filer och kataloger i `apache2/sites-available`
# katalogen, lista filerna så varje ny fil hamnar på en egen rad.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
				ls -a1 apache2/sites-available
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.4" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 1.5 (1 points) 
# 
# Lista filer och kataloger i `apache2/conf-available`, sortera filerna i
# storleksordning med den minsta filen först. Lista filerna så varje ny fil
# hamnar på en egen rad.
#
# Visa inte dolda filer.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			ls -1Sr apache2/conf-available/
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "1.5" false "$ANSWER"

# --------------------------------------------------------------------------
# Section 2. file 
# 
# I denna del använder vi kommandot `file` för att ta reda på information
# om filerna i katalogstrukturen.
#

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 2.1 (1 points) 
# 
# Använd kommandot `file` för att skriva ut filtypen för alla filer och
# kataloger i `apache2`.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			file apache2/*
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "2.1" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 2.2 (1 points) 
# 
# Använd kommandot `file` för att skriva ut filtypen för alla filer och
# kataloger i `apache2`. Denna gång skriv bara ut filtypen utan filnamn.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			file -b apache2/*
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "2.2" false "$ANSWER"

# --------------------------------------------------------------------------
# Section 3. cp, mv, mkdir och rm 
# 
# I denna del använder vi kommandona  `cp`, `mv`, `mkdir` och `rm` för att
# ändra i en katalogstruktur.
#

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 3.1 (1 points) 
# 
# Använd kommandot `mkdir` för att skapa en katalog med namnet `backup/` om
# katalogen inte redan finns. Kopiera alla filer som har filändelsen `.conf`
# i `apache2/mods-available` till en ny katalog i `backup/` med namnet
# `conf/`.
#
# Lista filerna i den nya `backup/conf/` katalogen, sortera filerna i
# storleksordning med den största filen först. Lista filerna så varje ny
# fil hamnar på en egen rad.
#
# Tips: Använd `&&` för att exekverera flera kommandon i rad och `man
# mkdir` för att hitta rätt flagga.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			mkdir -p backup 
			mkdir -p backup/conf/ 
			cp apache2/mods-available/*.conf backup/conf/ 
			ls -1 --sort size backup/conf/

		)

# I will now test your answer - change false to true to get a hint.
assertEqual "3.1" true "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 3.2 (1 points) 
# 
# Använd kommandot `mkdir` för att skapa en ny underkatalog `backup/php/`
# om den inte redan finns.
# Använd kommandot `mv` för att flytta alla filer som börjar med 'php'
# från `backup/conf` till den nya katalogen `backup/php/`.
#
# Lista filerna i `backup/conf/` katalogen så varje ny fil hamnar på en
# egen rad.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			cd backup
			mkdir -p php
			mv conf/php* php/
			ls -1 conf
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "3.2" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 3.3 (1 points) 
# 
# Ta bort alla filer som börjar med 'proxy' från `backup/conf`.
#
# Lista filerna i `backup/conf` katalogen så varje ny fil hamnar på en egen
# rad.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			cd backup/conf
			rm proxy*
			ls -1
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "3.3" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 3.4 (1 points) 
# 
# Använd kommandot `cp` för att flytta alla filer från `backup/php` till
# `backup` och ta sedan bort hela `backup/php` katalogen.
#
# Lista filer och kataloger i `backup` katalogen, använd en flagga så alla
# kataloger får ett snedstreck (`/`) efter namnet. Lista filerna så varje
# ny fil hamnar på en egen rad.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			cp -r backup/php/. backup/
			rm -r backup/php
			ls -1p backup/
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "3.4" false "$ANSWER"

# --------------------------------------------------------------------------
# Section 4. find 
# 
# I denna del använder vi kommandot `find` för att ta hitta i en
# katalogstruktur.
#
# I denna del av labben arbetar du med ursprungskatalogen `apache2/`.
#

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 4.1 (1 points) 
# 
# Använd kommandot `find` för att hitta filen `apache2.conf` i `apache2/`
# katalogen.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			find apache2/ -name apache2.conf 
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "4.1" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 4.2 (1 points) 
# 
# Använd kommandot `find` för att hitta alla tomma filer i `apache2/`
# katalogen.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			find apache2/ -empty 
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "4.2" false "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 4.3 (1 points) 
# 
# Använd kommandot `find` för att hitta alla kataloger som har 'conf' i
# filnamnet i `apache2/` katalogen.
# Sök endast i `apache2/` katalogen och inte i de underliggande katalogerna.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			find apache2/ -maxdepth 1 -name "*conf*" -type d 
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "4.3" true "$ANSWER"

#"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# Exercise 4.4 (1 points) 
# 
# Använd kommandot `find` för att hitta alla filer som har `ssl` i
# filnamnet och har filändelsen `.conf`, sök i de två katalogerna
# `apache2/sites-available` och `apache2/mods-available`.
#
# Write your code below and put the answer into the variable ANSWER.
#






ANSWER=$(
			find apache2/sites-available apache2/mods-available -type f -name "*ssl*" -a -name "*.conf"
		)

# I will now test your answer - change false to true to get a hint.
assertEqual "4.4" true "$ANSWER"


exitWithSummary
