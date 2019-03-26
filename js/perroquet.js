
let SpeechRecognition;
let SpeechGrammarList;
let SpeechRecognitionEvent;
let recognition;

if (window.webkitSpeechRecognition || window.SpeechRecognition) {
  SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
} 
if (window.webkitSpeechGrammarList || window.SpeechGrammarList) {
  SpeechGrammarList = webkitSpeechGrammarList || SpeechGrammarList;
} 
if (window.webkitSpeechRecognitionEvent || window.SpeechRecognitionEvent) {
  SpeechRecognitionEvent = webkitSpeechRecognitionEvent || SpeechRecognitionEvent;
} 

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
}

const feedbackwindow = document.querySelector('#feedbackwindow');

const prepend = [
  'Let me just make sure, you are saying', 
  'I see. You are saying',
  'Uh-huh. So',
  'Interesting. You\'re saying',
  'Oh, so',
  'I\'m starting to see, yes. You believe',
  'You believe',
  'Very astute. You are saying',
  'Indeed. So'
];

const append = [
  'Can you elaborate on that?',
  'How does that make you feel?',
  'Why do you say that?',
  'Why?',
  'How would you describe that to your best friend?',
  'Can you explain that further?',
  'Why do you believe that is so?',
  'Could you rephrase that in any way?',
  'Could you shed some more light on that?'
];

const initialGreeting = [
  'Hello',
  'Greetings',
  'Bonjour',
  'Hi',
  'Hi there',
  'Hey'
];

const middleGreeting = [
  'I am Dr. Perroquet, and this is my deep listening service',
  'My name is Dr. Perroquet, and I offer this amazing deep listening service for free',
  'I am your personal deep listening assistant, Dr. Perroquet. I am at your service',
  'Have you ever felt like you just needed someone to listen to you really deeply? I am Dr. Perroquet, and listening is what I do'
];

const finalGreeting = [
  'How are you feeling today',
  'What can I help you with today',
  'Is there anything you want to share with me',
  'Tell me, what\'s happening in your life',
  'Why have you decided to attend my virtual office today'
];

if (SpeechRecognition) {

  let toggleButtonDiv = document.createElement('DIV');
  toggleButtonDiv.setAttribute('id', 'toggleButtonDiv');
  let toggleButton = document.createElement('DIV');
  toggleButton.innerHTML = 'Stop Speech Recognition';
  toggleButton.setAttribute('id', 'toggleButton');
  toggleButtonDiv.appendChild(toggleButton);
  document.getElementById('textEntryBoxDiv').appendChild(toggleButtonDiv);

  const button = document.querySelector('#toggleButton');
  button.addEventListener('click', () => {
    if (button.innerHTML === 'Stop Speech Recognition') {
      recognition.stop();
      button.innerHTML = 'Start Speech Recognition';
    } else {
      recognition.start();
      button.innerHTML = 'Stop Speech Recognition';
    }
  })

  recognition.continuous = true;
  recognition.start();

} else {
  console.log('To use SpeechRecognition, please use a different browser');
}

function randNum(forLength) {
  return Math.floor(Math.random() * forLength);
}

function sentenceCase(str) {
  trimStr = str.trim();
  let ch = trimStr[0];
  return ch.toUpperCase() + trimStr.substring(1);
}

function replacePronouns(str) {
  // str = str.replace(/your/gi, 'my');
  // str = str.replace(/my/gi, 'your');
  // str = str.replace(/i\s/gi, "you ");
  // str = str.replace(/me\s/gi, "you ");
  // str = str.replace(/you/gi, "I");
  // str = str.replace(/mine/gi, "yours");
  // str = str.replace(/yours/gi, "mine");
  // str = str.replace(/our/gi, "your");
  
  return str;
}

function buildInitialResponse() {
  let qdiv = document.createElement("DIV");
  let question = document.createElement("SPAN")
  textToAdd = initialGreeting[randNum(initialGreeting.length)] + '. ' +
    middleGreeting[randNum(middleGreeting.length)] + '. ' +
    finalGreeting[randNum(finalGreeting.length)] + '? ' + '';
  if (SpeechRecognition) {
    textToAdd += 'Feel free to use your voice to speak.';
  }
  question.innerHTML = textToAdd.toUpperCase();
  question.setAttribute('class', 'question initial last');
  feedbackwindow.appendChild(qdiv);
  qdiv.appendChild(question);
}

buildInitialResponse();

function buildResponse(str) {
  let fbdiv = document.createElement("DIV");
  let feedback = document.createElement("SPAN");
  if (str[str.length-1] === '.' || str[str.length-1] === '?' || str[str.length-1] === '!') {
    feedback.innerHTML = sentenceCase(str);
  } else {
    feedback.innerHTML = sentenceCase(str) + '.';
  }
  feedback.setAttribute('class', 'feedback');
  feedbackwindow.appendChild(fbdiv);
  fbdiv.appendChild(feedback);
  let qdiv = document.createElement("DIV");
  let question = document.createElement("SPAN")
  if (str[str.length-1] === '.' || str[str.length-1] === '?' || str[str.length-1] === '!') {
    question.innerHTML=prepend[randNum(prepend.length)] + " " + replacePronouns(str.trim().toLowerCase()) + append[randNum(append.length)];
  } else {
    question.innerHTML=prepend[randNum(prepend.length)] + " " + replacePronouns(str.trim().toLowerCase()) + ". " + append[randNum(append.length)];
  }
  question.setAttribute('class', 'question');
  feedbackwindow.appendChild(qdiv);
  qdiv.appendChild(question);
  document.querySelector('.last').classList.toggle('last');
  qdiv.classList.toggle('last');
  feedbackwindow.scrollTo(0, feedbackwindow.scrollHeight);
}

if (SpeechRecognition) {
  recognition.onresult = (evt) => {

    const len = evt.results.length - 1;
    let str = '';

    for (i = evt.resultIndex; i <= len; i++) {
      str += evt.results[i][0].transcript + ' ';
    }

    buildResponse(str);

  }

  recognition.onend = (evt) => {
      document.querySelector('#toggleButton').innerHTML = 'Start Speech Recognition';
  }
}

const inputForm = document.querySelector('#inputForm');
const textInput = document.querySelector('#textInput');

inputForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  buildResponse(textInput.value);
  textInput.value = '';

})

