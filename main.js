
// special cases where LP should be kept intact
const specialCases_LP = [13, 14, 16, 19, 11, 22, 33];
const cipherMapping_name = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }

function formatBirthdayInput() {
    const input = document.getElementById("birthday");
    const value = input.value.replace(/\D/g, '').slice(0, 8); // Remove non-digits and limit to 8 characters
    const formattedValue = value.replace(/(\d{1,2})(\d{0,2})(\d{0,4})/, function (match, p1, p2, p3) {
        let result = "";
        if (p1) result += p1;
        if (p2) result += '/' + p2;
        if (p3) result += '/' + p3;
        return result;
    });
    input.value = formattedValue;
}

function numerology() {
    var name1 = document.getElementById("name").value;
    var name2 = removeAccents(name1);
    console.log(name2);

    const nameConverted = decodeNameToNumber(name2);
    const nameConvertedHtml = decodeNameToNumberToHTML(nameConverted);
    document.getElementById("nameAndIdentifyCharactersResult").innerHTML = nameConvertedHtml;

    const fortune = calculateSumDigitForDecodedText(nameConverted.decodedNameWords);
    document.getElementById("fortuneResult").textContent = "Fortune: " + fortune;

    const compass = calculateSumDigitForDecodedText(nameConverted.decodedLastName);
    document.getElementById("compassResult").textContent = "Compass: " + compass;

    const lastNameVowelDecoded = nameConverted.lastNameVowels.map(decodeCipherText);
    const firstNameVowelDecoded = nameConverted.firstNameVowels.map(decodeCipherText);
    const soul = calculateSumDigitForDecodedText(firstNameVowelDecoded.concat(lastNameVowelDecoded));
    document.getElementById("soulResult").textContent = "Soul: " + soul;

    const lastNameConsonantDecoded = nameConverted.lastNameConsonants.map(decodeCipherText);
    const firstNameConsonantDecoded = nameConverted.firstNameConsonants.map(decodeCipherText);
    const personality = calculateSumDigitForDecodedText(firstNameConsonantDecoded.concat(lastNameConsonantDecoded));
    document.getElementById("personalityResult").textContent = "Personality: " + personality;

    const lastNameInitialDecoded = nameConverted.lastNameInitial.map(decodeCipherText);
    const firstNameInitialDecoded = nameConverted.firstNameInitial.map(decodeCipherText);
    const balance = calculateSumDigitForDecodedText(firstNameInitialDecoded.concat(lastNameInitialDecoded));
    document.getElementById("balanceResult").textContent = "Balance: " + balance;

    const numArray = convertStringArrayToNumberArray(nameConverted.decodedNameWords);
    const weaknessAndPassion = calculateWeaknessAndPassion(numArray);
    const weaknessAndPassionHTML = convertWeaknessAndPassionToHTML(weaknessAndPassion);
    document.getElementById("weaknessAndPassionResult").innerHTML = "Weakness And Passion: " + weaknessAndPassionHTML;

    //---------
    const dateOfBirth = document.getElementById("birthday").value;
    
    const birthday = calculateBirthday(dateOfBirth);
    document.getElementById("birthdayResult").textContent = "Birthday: " + birthday;

    const lifePath = calculateLifePath(dateOfBirth);
    document.getElementById("lifePathResult").textContent = "Life Path: " + lifePath;

    const lifeStage = calculateLifeStage(dateOfBirth);
    const lifeStageHTML = lifeStageToHTML(lifeStage);
    document.getElementById("lifeStageResult").innerHTML = lifeStageHTML;

    const lifeLesson = calculateLifeLesson(dateOfBirth);
    const lifeLessonHTML = lifeLessonToHTML(lifeLesson);
    document.getElementById("lifeLessonResult").innerHTML = lifeLessonHTML;

    const personalYear = calculatePersonalYear(dateOfBirth);
    document.getElementById("personalYearResult").textContent = "Personal Year: " + personalYear;
    
    const personalMonth = calculatePersonalMonth(dateOfBirth);
    document.getElementById("personalMonthResult").textContent = "Personal Month: " + personalMonth;

    // ----
    const LP = sumDigits(calculateLifePath_DMYLP(dateOfBirth).LP);
    document.getElementById("maturityResult").textContent = "Maturity: " + sumDigits(LP + fortune);

    document.getElementById("rationalThoughtResult").textContent = "Rational Thought: " + sumDigits(birthday + compass);
}

// Function to sum the digits of a number until it's a single digit
// function sumDigits(num) {
//     let sum = 0;
//     while (num > 0 || sum > 9) {
//         if (num === 0) {
//             num = sum;
//             sum = 0;
//         }
//         sum += num % 10;
//         num = Math.floor(num / 10);
//     }
//     return sum;
// };

// Function to sum the digits of a number until it's a single digit
function sumDigits(num) {
    let sum = num;
    while (sum > 9) {
        sum = String(sum).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
}


function calculateBirthday(dateOfBirth){
    
    // Extracting day, month, and year from the date of birth
    const [day, month, year] = dateOfBirth.split('/').map(Number);
    return sumDigits(day);
}

function calculateLifePath(dateOfBirth) {
    const DMYLP =  calculateLifePath_DMYLP(dateOfBirth);

    // Handling special cases where LP should be export with format
    if (specialCases_LP.includes(DMYLP.LP)) {
        return DMYLP.LP + '/' + sumDigits(DMYLP.LP);
    }
    return DMYLP.LP;
}

function calculateLifePath_DMYLP(dateOfBirth) {
    // Extracting day, month, and year from the date of birth
    const [day, month, year] = dateOfBirth.split('/').map(Number);

    // Step 1: Summing up day, month, and year
    const D = sumDigits(day);
    const M = sumDigits(month);
    const Y = sumDigits(year);

    // Step 2: Summing up D, M, and Y
    let LP = D + M + Y;

    // Handling special cases where LP should be kept intact
    if (!specialCases_LP.includes(LP)) {
        LP = sumDigits(LP);
    }
    return {
        D: D,
        M: M,
        Y: Y,
        LP: LP,
    }
}

function calculateLifeStage(dateOfBirth) {

    const DMYLP =  calculateLifePath_DMYLP(dateOfBirth);

    // Step 2: Calculating Life Stages
    const firstLS = sumDigits(DMYLP.D + DMYLP.M);
    const secondLS = sumDigits(DMYLP.D + DMYLP.Y);
    const thirdLS = sumDigits(firstLS + secondLS);
    const fourthLS = sumDigits(DMYLP.M + DMYLP.Y);

    // Step 3: Calculating years for each Life Stage
    const LP = sumDigits(DMYLP.LP);
    const yearOfFirstLS = 36 - LP;
    const yearOfSecondLS = yearOfFirstLS + 9;
    const yearOfThirdLS = yearOfSecondLS + 9;
    const yearOfFourthLS = yearOfThirdLS + 9;

    return {
        firstLS: firstLS,
        secondLS: secondLS,
        thirdLS: thirdLS,
        fourthLS: fourthLS,
        yearOfFirstLS: yearOfFirstLS,
        yearOfSecondLS: yearOfSecondLS,
        yearOfThirdLS: yearOfThirdLS,
        yearOfFourthLS: yearOfFourthLS
    };
}

function lifeStageToHTML(lifeStage) {
    let html = "<h4>Life Stages</h4>";
    html += "<ul>";
    html += "<li>1st LS: " + lifeStage.firstLS + "</li>";
    html += "<li>2nd LS: " + lifeStage.secondLS + "</li>";
    html += "<li>3rd LS: " + lifeStage.thirdLS + "</li>";
    html += "<li>4th LS: " + lifeStage.fourthLS + "</li>";
    html += "</ul>";

    html += "<h4>Years</h4>";
    html += "<ul>";
    html += "<li>Year of 1st LS: " + lifeStage.yearOfFirstLS + "</li>";
    html += "<li>Year of 2nd LS: " + lifeStage.yearOfSecondLS + "</li>";
    html += "<li>Year of 3rd LS: " + lifeStage.yearOfThirdLS + "</li>";
    html += "<li>Year of 4th LS: " + lifeStage.yearOfFourthLS + "</li>";
    html += "</ul>";

    return html;
}

function calculateLifeLesson(dateOfBirth) {

    const DMYLP =  calculateLifePath_DMYLP(dateOfBirth);

    // Step 2: Calculating Life Lessons
    const firstLL = Math.abs(DMYLP.D - DMYLP.M);
    const secondLL = Math.abs(DMYLP.D - DMYLP.Y);
    const thirdLL = Math.abs(firstLL - secondLL);
    const fourthLL = Math.abs(DMYLP.M - DMYLP.Y);

    // Step 3: Calculating years for each Life Lesson (same as LS)
    const LP = sumDigits(DMYLP.LP);
    const yearOfFirstLL = 36 - LP;
    const yearOfSecondLL = yearOfFirstLL + 9;
    const yearOfThirdLL = yearOfSecondLL + 9;
    const yearOfFourthLL = yearOfThirdLL + 9;

    return {
        firstLL: firstLL,
        secondLL: secondLL,
        thirdLL: thirdLL,
        fourthLL: fourthLL,
        yearOfFirstLL: yearOfFirstLL,
        yearOfSecondLL: yearOfSecondLL,
        yearOfThirdLL: yearOfThirdLL,
        yearOfFourthLL: yearOfFourthLL
    };
}

function lifeLessonToHTML(lifeLesson) {
    let html = "<h4>Life Lessons</h4>";
    html += "<ul>";
    html += "<li>1st LL: " + lifeLesson.firstLL + "</li>";
    html += "<li>2nd LL: " + lifeLesson.secondLL + "</li>";
    html += "<li>3rd LL: " + lifeLesson.thirdLL + "</li>";
    html += "<li>4th LL: " + lifeLesson.fourthLL + "</li>";
    html += "</ul>";

    html += "<h4>Years</h4>";
    html += "<ul>";
    html += "<li>Year of 1st LL: " + lifeLesson.yearOfFirstLL + "</li>";
    html += "<li>Year of 2nd LL: " + lifeLesson.yearOfSecondLL + "</li>";
    html += "<li>Year of 3rd LL: " + lifeLesson.yearOfThirdLL + "</li>";
    html += "<li>Year of 4th LL: " + lifeLesson.yearOfFourthLL + "</li>";
    html += "</ul>";

    return html;
}

function calculatePersonalYear(dateOfBirth) {
    // Get the recent year
    const recentYear = new Date().getFullYear();

    // Extracting day, month, and year from the date of birth
    const [day, month, year] = dateOfBirth.split('/').map(Number);

    // Step 1: Summing up day, month, and recent year
    let D = sumDigits(day);
    let M = sumDigits(month);
    let Y = sumDigits(recentYear);

    // Step 2: Calculating Personal Year
    const personalYear = sumDigits(D + M + Y);

    return personalYear;
}

function calculatePersonalMonth(dateOfBirth) {
    // Get the recent month
    const recentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns month index starting from 0

    // Extracting day, month, and year from the date of birth
    // const [day, month] = dateOfBirth.split('/').map(Number);

    // Calculate Personal Year
    const personalYear = calculatePersonalYear(dateOfBirth);

    // Step 1: Summing up Personal Year and recent month
    let PM = sumDigits(personalYear + recentMonth);

    return PM;
}

// -----------

function decodeCipherText(cipherText) {

    // Split the cipher text into individual characters
    const characters = cipherText.toUpperCase().split('');

    // Array to store decoded numbers
    const decodedNumbers = [];

    // Decode each character and push the corresponding number to the decodedNumbers array
    characters.forEach(char => {
        if (cipherMapping_name.hasOwnProperty(char)) {
            decodedNumbers.push(cipherMapping_name[char]);
        } else if (char === ' ') {
            // Preserve space characters in the decoded text
            decodedNumbers.push(' ');
        } else {
            // Ignore any characters that are not in the mapping
            // You can handle error cases here if needed
        }
    });

    // Join the decoded numbers into a single string and return
    return decodedNumbers.join(' ');
}

function separateVowelsAndConsonants(name) {
    // Convert the name to lowercase to simplify the comparison
    const words = name.toUpperCase().split(" ");
    let prevIsVowel = false; // Flag to track if the previous character was a vowel
    // Initialize arrays to hold vowels and consonants
    let vowels = [];
    let consonants = [];
    words.forEach(word => {    // Loop through each character in the name
      for (let i = 0; i < word.length; i++) {
          let char = word.charAt(i);
          // Check if the character is a vowel
          if ( "AEIOU".includes(char) || (char === "y" && !/[AEIOU]/.test(word))) {
            if (prevIsVowel) {
              vowels.push(vowels.pop() + char);
            } else {
              vowels.push(char);
            }
            prevIsVowel = true;
          } else {
            consonants.push(char);
            prevIsVowel = false;
          }
      }
    });
    
    // Return an object containing the separated vowels and consonants
    return {
        vowels: vowels,
        consonants: consonants
    };
}

function convertStringArrayToNumberArray(stringArray) {
    // Join all strings in the array into a single string
    const concatenatedString = stringArray.join(' ');

    // Split the concatenated string into an array of numbers
    const numberArray = concatenatedString.split(' ').map(Number);
    
    return numberArray;
}

function decodeNameToNumber(name) {
    // Step 1: Split the name into last name and first name
    const lastName = name.split(' ').pop(); // Extract last name
    const firstName = name.substring(0, name.lastIndexOf(lastName)).trim(); // Extract first name

    // Step 2: Identify vowels and consonants in the name
    var lastNameSP = separateVowelsAndConsonants(lastName);
    var firstNameSP = separateVowelsAndConsonants(firstName);
    const lastNameVowels = lastNameSP.vowels;
    const firstNameVowels = firstNameSP.vowels;
    const lastNameConsonants = lastNameSP.consonants;
    const firstNameConsonants = firstNameSP.consonants;

    // Step 3: Determine the initial letter of each cluster
    const lastNameInitial = [lastName.charAt(0)];
    const firstNameWords = firstName.split(' ');
    const firstNameInitial = firstNameWords.map(word => word.charAt(0));

    // Step 4: Decode the cipher text (assuming the function is already implemented)
    const decodedLastName = decodeCipherText(lastName);
    //const decodedFirstName = decodeCipherText(firstName);

    const nameWords = name.split(' ');

    // Decode each word separately
    const decodedNameWords = nameWords.map(decodeCipherText);

    // Return the results
    return {
        lastName: lastName,
        firstName: firstName,
        lastNameVowels: lastNameVowels,
        firstNameVowels: firstNameVowels,
        lastNameConsonants: lastNameConsonants,
        firstNameConsonants: firstNameConsonants,
        lastNameInitial: lastNameInitial,
        firstNameInitial: firstNameInitial,
        decodedLastName: decodedLastName,
        //decodedFirstName: decodedFirstName,
        decodedNameWords: decodedNameWords
    };
}

function decodeNameToNumberToHTML(results) {
    let html = "<h4>Name Details</h4>";
    html += "<ul>";
    html += "<li>Last Name: " + results.lastName + "</li>";
    html += "<li>First Name: " + results.firstName + "</li>";
    html += "<li>Last Name Vowels: " + results.lastNameVowels.join(', ') + "</li>";
    html += "<li>First Name Vowels: " + results.firstNameVowels.join(', ') + "</li>";
    html += "<li>Last Name Consonants: " + results.lastNameConsonants.join(', ') + "</li>";
    html += "<li>First Name Consonants: " + results.firstNameConsonants.join(', ') + "</li>";
    html += "<li>Last Name Initial: " + results.lastNameInitial.join(', ') + "</li>";
    html += "<li>First Name Initial: " + results.firstNameInitial.join(', ') + "</li>";
    html += "<li>Decoded Last Name: " + results.decodedLastName + "</li>";
    // html += "<li>Decoded First Name: " + results.decodedFirstName + "</li>";
    html += "<li>Decoded Name: " + results.decodedNameWords.join(', ') + "</li>";
    html += "</ul>";

    return html;
}

function calculateSumDigitForDecodedText(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        const numbers = array[i].split(' ').map(Number);
        const sumOfNumbers = numbers.reduce((acc, num) => acc + num, 0);
        sum += sumDigits(sumOfNumbers);
    }
    return sumDigits(sum);
}

function calculateWeaknessAndPassion(numbers) {
    // Initialize an object to store the frequency of each number
    const frequency = {};
    for (let i = 1; i <= 9; i++) {
        frequency[i] = 0;
    }

    // Count the frequency of each number
    numbers.forEach(num => {
        frequency[num]++;
    });

    // Determine weakness (0), passion (2 or more), or normal occurrence (1) for each number
    const result = {};
    for (let num in frequency) {
        if (frequency[num] === 0) {
            result[num] = 'W';
        } else if (frequency[num] >= 2) {
            result[num] = 'P';
        } else {
            result[num] = '-';
        }
    }

    return result;
}

function convertWeaknessAndPassionToHTML(result) {
    // Create an empty string to store HTML content
    let htmlContent = '';

    // Iterate over each number in the result object
    for (let num in result) {
        // Determine the color based on the result (W, P, or 1)
        let color = '';
        if (result[num] === 'W') {
            color = 'red'; // Weakness (W) color
        } else if (result[num] === 'P') {
            color = 'green'; // Passion (P) color
        }

        // Generate HTML code for the number with the determined color
        htmlContent += `<span style="color: ${color};">${num}: ${result[num]} &nbsp;</span>`;
    }

    // Return the HTML content
    return htmlContent;
}
