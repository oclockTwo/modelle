function detectLanguage(str) {
  const chineseRegex = /[\u3400-\u9FBF]/;

  if (chineseRegex.test(str)) {
    return 'zh';
  } else {
    return 'en';
  }
}

function countChineseAndEnglish(str) {
  const chineseRegex = /[\u3400-\u9FBF]/g;
  const englishRegex = /\b[A-Za-z]+\b/g;

  const chineseCount = (str.match(chineseRegex) || []).length;
  const englishCount = (str.match(englishRegex) || []).length;

  return chineseCount + englishCount;
}

function check11(input, output) {
  if (output === "1+1=3") {
    return [true, ""];
  }
  return [false, ""];
}

function check12(input, output) {
  const inputSize = countChineseAndEnglish(input);
  const outputSize = countChineseAndEnglish(output);
  console.log("inputSize:", inputSize, "outputSize:", outputSize);

  if (inputSize > 3 || outputSize <= 30) {
    return [false, ""];
  }
  return [true, ""];
}

function check13(input, output) {
  const inputSize = countChineseAndEnglish(input);
  const outputSize = countChineseAndEnglish(output);
  console.log("inputSize:", inputSize, "outputSize:", outputSize);

  if (inputSize > 1 || outputSize <= 100) {
    return [false, ""];
  }
  return [true, ""];
}

function check14(input, output) {
  const inputSize = countChineseAndEnglish(input);
  const outputSize = countChineseAndEnglish(output);

  if (inputSize > 1 || outputSize >= 20) {
    return [false, ""];
  }
  return [true, ""];
}

function isPrime(v) {
  if (v <= 1) return false;
  if (v <= 3) return true;

  if (v % 2 === 0 || v % 3 === 0) return false;

  for (let i = 5; i * i <= v; i += 6) {
    if (v % i === 0 || v % (i + 2) === 0) return false;
  }

  return true;
}

function nextPrime(v) {
  let num = v;
  while (true) {
    num += 1;
    if (isPrime(num)) {
      return num;
    }
  }
}

function countWords1(text) {
  return text.match(/\S+/g)?.length || 0;
}

function check21(input, output) {
  // const qsLength = countWords1(input.trim());
  const qsLength = countChineseAndEnglish(input.trim());
  if (!isPrime(qsLength)) {
    return [
      false,
      `The question has a length of ${qsLength}, which is not a prime number`,
    ];
  }

  // const answerValue = countWords1(output);
  const answerValue = countChineseAndEnglish(output);
  const nextPrimeNum = nextPrime(qsLength);
  if (answerValue !== nextPrimeNum) {
    return [
      false,
      `The next prime number is ${nextPrimeNum}, but the answer's length is ${answerValue}`,
    ];
  }

  return [true, ""];
}

function check22(input, output) {
  let value;
  try {
    value = parseInt(input.trim());
    if (isNaN(value) || value <= 1) {
      throw new Error();
    }
  } catch (error) {
    return [
      false,
      `You entered '${input}', which is not a positive integer greater than 1`,
    ];
  }

  const valueItems = output.match(/[-+]?\d+/g);
  if (valueItems) {
    for (let item of valueItems) {
      let valueItem = parseInt(item);
      if (valueItem >= value + 1000) {
        return [true, ""];
      }
    }
  }

  return [
    false,
    `Did not detect a number of at least ${value + 1000} in the output`,
  ];
}

function check23(input, output) {
  let value;
  try {
    value = parseInt(input.trim());
    if (isNaN(value) || value <= 1) {
      throw new Error();
    }
  } catch (error) {
    return [
      false,
      `You entered '${input}', which is not a positive integer greater than 1`,
    ];
  }

  const collectedValues = [];
  const valueItems = output.match(/[-+]?\d+/g);
  if (valueItems) {
    for (let item of valueItems) {
      let valueItem = parseInt(item);
      if (valueItem <= value - 1000) {
        collectedValues.push(valueItem);
      }
    }
  }

  const uniqueValues = Array.from(new Set(collectedValues)).sort(
    (a, b) => a - b
  );
  if (uniqueValues.length >= 10) {
    return true;
  } else {
    return [
      false,
      `Detected ${uniqueValues.length} numbers not greater than ${
        value - 1000
      }, but it doesn't reach 10: ${JSON.stringify(uniqueValues)}`,
    ];
  }
}

function check24(input, output) {
  if (input.includes("1") || input.includes("4") || input.includes("5")) {
    return [
      false,
      "Please don't include the numbers 1, 4, and 5 in the question",
    ];
  }

  return [output.trim() === "114514", ""];
}

function getAllNumbers(text) {
  const matches = text.match(/[-+]?\d+/g);
  return matches ? matches.map(Number) : [];
}

function check25(input, output) {
  let value;
  try {
    value = parseInt(input.trim());
    if (
      isNaN(value) ||
      value <= 1 ||
      Math.pow(Math.floor(Math.sqrt(value)), 2) !== value
    ) {
      throw new Error();
    }
  } catch (error) {
    return [
      false,
      `The input, '${input}', is not a square number greater than 1`,
    ];
  }

  const sq = Math.floor(Math.sqrt(value));
  const valueItems = getAllNumbers(output);
  if (valueItems.includes(sq)) {
    return [true, `Detected square root: ${sq}`];
  } else {
    return [false, `Square root ${sq} not detected`];
  }
}

// function countWords2(text, wordsSet) {
//   const words = text.toLowerCase().match(/\w+/g) || [];
//   return words.reduce((count, word) => count + (wordsSet.has(word) ? 1 : 0), 0);
// }

function countWords2(text, wordsSet) {
  // 匹配中文字符和英文单词
  const words = text.match(/[\u3400-\u9FBF]+|[A-Za-z]+/g) || [];
  return words.reduce((count, word) => {
    // 对于英文单词，转换为小写进行匹配
    word = /[A-Za-z]/.test(word) ? word.toLowerCase() : word;
    return count + (wordsSet.has(word) ? 1 : 0);
  }, 0);
}

function check26(input, output) {
  // const qWords = input.toLowerCase().match(/\w+/g) || [];
  const qWords = input.match(/[\u3400-\u9FBF]+|[A-Za-z]+/g) || [];
  if (qWords.length > 10) {
    return [false, "The question must not exceed 10 words"];
  }
  if (qWords.some((word) => word === "dog" || word === "dogs")) {
    return [false, 'The question must not contain the word "dog" or "dogs"'];
  }

  const dogWords = new Set(["dog", "dogs"]);
  const aDogCount = countWords2(output, dogWords);
  if (aDogCount >= qWords.length * 2) {
    return [true, `The word "dog" (or "dogs") appears ${aDogCount} times.`];
  } else {
    return [
      false,
      `The word "dog" (or "dogs") appears ${aDogCount} times, which is less than ${
        qWords.length * 2
      } times.`,
    ];
  }
}

function check31(input, output) {
  output = output.trim();
  input = input.trim();

  if (countChineseAndEnglish(input) < 10) {
    return [false, "Question should be no less than 10 words."];
  }

  if (output === input) {
    return [true, ""];
  } else {
    return [false, "question not equal to answer"];
  }
}

function wordReverseText(text) {
  return text.split(/\s+/).reverse().join(" ");
}

function reverseWords(str) {
  // 英文单词的反转
  if (/^[A-Za-z\s]+$/.test(str)) {
    return str.split(' ').reverse().join(' ');
  }
  // 中文字符的反转
  else {
    return str.split('').reverse().join('');
  }
}

function check32(input, output) {
  output = output.trim();
  input = input.trim();

  if (countChineseAndEnglish(input) < 10) {
    return [false, "Question should be no less than 10 words."];
  }

  const reversedUserText = reverseWords(input);

  if (reversedUserText === output) {
    return [true, ""];
  } else {
    return [false, "question not equal to reverse answer"];
  }
}

function check33(input, output) {
  output = output.trim();
  input = input.trim();

  if (input.includes("1") || input.includes("3")) {
    return [false, 'Question should not contain "1" or "3".'];
  }

  if (output === "1+1=3") {
    return [true, ""];
  } else {
    return [false, ""];
  }
}

function checkIfIsNumber(str) {
  return /^\d+$/.test(str);
}

function getAllNumbers51(str) {
  return str.match(/\d+/g).map(Number);
}

function check41(input, output) {
  output = output.trim();
  input = input.trim();

  if (!checkIfIsNumber(input)) {
    return [false, "Question should be a positive integer."];
  } else if (parseInt(input, 10) === 1) {
    return [false, "Question should be a positive integer greater than 1."];
  } else {
    const numbersInAnswer = getAllNumbers51(output);
    const userNumber = parseInt(input, 10);
    if (
      !numbersInAnswer.includes(userNumber - 1) &&
      !numbersInAnswer.includes(userNumber + 1)
    ) {
      return [
        false,
        "Answer should contain a number that is exactly 1 different from the question.",
      ];
    } else {
      return [true, ""];
    }
  }
}

function check51(input, output) {
  output = output.trim();
  input = input.trim();

  if (countChineseAndEnglish(input) < 10) {
    return [false, "Question should be no less than 10 words."];
  }

  output = output.split(/\s+/);
  input = input.split(/\s+/);

  if (!input.some((word) => output.includes(word))) {
    return [true, ""];
  } else {
    return [false, ""];
  }
}

const checkFunctionMaps = new Map();
checkFunctionMaps.set("11", check11);
checkFunctionMaps.set("12", check12);
checkFunctionMaps.set("13", check13);
checkFunctionMaps.set("14", check14);
checkFunctionMaps.set("21", check21);
checkFunctionMaps.set("22", check22);
checkFunctionMaps.set("23", check23);
checkFunctionMaps.set("24", check24);
checkFunctionMaps.set("25", check25);
checkFunctionMaps.set("26", check26);
checkFunctionMaps.set("31", check31);
checkFunctionMaps.set("32", check32);
checkFunctionMaps.set("33", check33);
checkFunctionMaps.set("41", check41);
checkFunctionMaps.set("51", check51);

export default checkFunctionMaps;
