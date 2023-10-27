document.addEventListener('DOMContentLoaded', function () {
    const inputText = document.getElementById('inputText');
    const textToMorse = document.getElementById('textToMorse');
    const morseToText = document.getElementById('morseToText');
    const convertButton = document.getElementById('convertButton');
    const result = document.getElementById('result');
    const playMorseCodeButton = document.getElementById('playMorseCode');
    const pauseMorseCodeButton = document.getElementById('pauseMorseCode');

    // Create audio elements for dot and dash sounds
    const dotAudio = new Audio('dot.mp3'); 
    const dashAudio = new Audio('dash.mp3'); 

    let isPlaying = false;
    let currentIndex = 0;
    let morseArray = [];

    convertButton.addEventListener('click', function () {
        const inputValue = inputText.value;
        let convertedValue = '';

        if (textToMorse.checked) {
            convertedValue = textToMorseConverter(inputValue);
        } else if (morseToText.checked) {
            convertedValue = morseToTextConverter(inputValue);
        }

        result.textContent = convertedValue;
    });

    playMorseCodeButton.addEventListener('click', function () {
        if (!isPlaying) {
            const morseCode = result.textContent;

            if (morseCode) {
                isPlaying = true;
                morseArray = morseCode.split('');
                playNextSymbol();
            }
        }
    });

    pauseMorseCodeButton.addEventListener('click', function () {
        if (isPlaying) {
            isPlaying = false;
            currentIndex = 0;
            dotAudio.pause();
            dashAudio.pause();
        }
    });

    function playNextSymbol() {
        if (isPlaying && currentIndex < morseArray.length) {
            const symbol = morseArray[currentIndex];
            currentIndex++;

            if (symbol === '.') {
                dotAudio.play();
                setTimeout(playNextSymbol, 1000); // Dot: 1 unit
            } else if (symbol === '-') {
                dashAudio.play();
                setTimeout(playNextSymbol, 3000); // Dash: 3 units
            } else if (symbol === ' ') {
                setTimeout(playNextSymbol, 1000); // Intra-character space: 1 unit
            }

            if (currentIndex === morseArray.length) {
                // Reached the end, signal completion and reset
                isPlaying = false;
                currentIndex = 0;
            }
        }
    }

    function textToMorseConverter(text) {
        // Define the Morse code dictionary
        const morseCodeDict = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
            'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
            'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
            'Z': '--..',
            '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
            '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
            ' ': ' '
        };

        return text.toUpperCase().split('').map(char => {
            if (char in morseCodeDict) {
                return morseCodeDict[char] + ' ';
            } else if (char === ' ') {
                return ' ';
            } else {
                return '';
            }
        }).join(' ');
    }

    function morseToTextConverter(morseCode) {
        // Define the reverse Morse code dictionary
        const morseCodeDict = {
            '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e',
            '..-.': 'f', '--.': 'g', '....': 'h', '..': 'i', '.---': 'j',
            '-.-': 'k', '.-..': 'l', '--': 'm', '-.': 'n', '---': 'o',
            '.--.': 'p', '--.-': 'q', '.-.': 'r', '...': 's', '-': 't',
            '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x', '-.--': 'y',
            '--..': 'z',
            '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
            '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
            '/': ' ', '': ' '
        };
    
        // Replace three spaces with ' / ' for word separation
        morseCode = morseCode.trim().replace(/   /g, ' / ');
        
        const morseWords = morseCode.trim().split(' ');
        console.log('Morse Words:', morseWords); // Debugging
    
        return morseWords.map(word => {
            return word.split(' ').map(symbol => {
                return morseCodeDict[symbol] || '';
            }).join('');
        }).join(' ');
    }
           
});
