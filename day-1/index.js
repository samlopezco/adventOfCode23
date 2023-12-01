const fs = require('fs');

let file = fs.readFileSync('./input.txt').toString().split('\n');

const convertWordsToNumbers = (input) => {
    const dictionary = {
        'zero': '0',
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9',
    };

    let original = input.toLowerCase();
    let replacements = [];

    for (let word in dictionary) {
        let regex = new RegExp(word, 'g');
        let match;
        while ((match = regex.exec(original)) !== null) {
            replacements.push({ index: match.index, word: word });
        }
    }

    replacements.sort((a, b) => b.index - a.index);

    for (let replacement of replacements) {
        original = original.substring(0, replacement.index) + dictionary[replacement.word] + original.substring(replacement.index);
    }

    return original;
}

const find = (line) => {
    line = convertWordsToNumbers(line);
    let nums = line.split('').filter(char => !isNaN(parseInt(char)));

    return nums[0] + nums[nums.length - 1];
}

let runningSum = file.map(line => parseInt(find(line))).reduce((a, b) => a + b, 0);

console.log(runningSum);