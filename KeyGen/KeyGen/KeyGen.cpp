// KeyGen.cpp : Defines the entry point for the console application.
//
#include <iostream>
#include "time.h"
#include <string>
#include <fstream>

using namespace std;

int main()
{
	//seed rand() so its different
	srand((unsigned int)time(NULL));

	//length of key to generate
	const int length = 20;

	//range that rand() is between
	const int max = 9;
	const int min = 1;

	int i = 0;

	//start with an empty key
	string key = "";
	while (i < length) {
		//get a random number length number of times
		int number = (rand() % max) + min;
		string s = to_string(number);
		//append random number onto current key
		key += s;
		++i;
	}

	key += "\n";
	//write the key to a database and output the key.
	printf(key.c_str());
	//check if key is in db if not proceed

	ofstream out ("keys.txt", ofstream::app);
	out.write(key.c_str(), 21);
	out.close();

    return 0;
}

