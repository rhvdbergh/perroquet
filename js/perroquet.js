const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList || SpeechGrammarList;
const SpeechRecognitionEvent = webkitSpeechRecognitionEvent || SpeechRecognitionEvent;

const recognition = new SpeechRecognition();

const prepend = [
  'Let me just make sure, you are saying', 
  'I see. You are saying',
  'Uh-huh. So'
];

const append = [
  'Can you elaborate on that?',
  'How does that make you feel?',
  'Why do you say that?',
  'Why?',
  'How would you describe that to your best friend?',
];

if (SpeechRecognition) {
  let toggleButtonDiv = document.createElement('DIV');
  toggleButtonDiv.setAttribute('id', 'toggleButtonDiv');
  let toggleButton = document.createElement('DIV');
  toggleButton.innerHTML = 'Stop Speech Recognition';
  toggleButton.setAttribute('id', 'toggleButton');
  toggleButtonDiv.appendChild(toggleButton);
  document.getElementById('footer').appendChild(toggleButtonDiv);

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

function buildResponse(str) {
  let fbdiv = document.createElement("DIV");
  let feedback = document.createElement("SPAN");
  if (str[str.length-1] === '.') {
    feedback.innerHTML = sentenceCase(str);
  } else {
    feedback.innerHTML = sentenceCase(str) + '.';
  }
  feedback.setAttribute('class', 'feedback');
  feedbackwindow.appendChild(fbdiv);
  fbdiv.appendChild(feedback);
  let qdiv = document.createElement("DIV");
  let question = document.createElement("SPAN")
  if (str[str.length-1] === '.') {
    question.innerHTML=prepend[randNum(prepend.length)] + " " + replacePronouns(str.trim()) + append[randNum(append.length)];
  } else {
    question.innerHTML=prepend[randNum(prepend.length)] + " " + replacePronouns(str.trim()) + ". " + append[randNum(append.length)];
  }
    question.setAttribute('class', 'question');
  feedbackwindow.appendChild(qdiv);
  qdiv.appendChild(question);
}

const feedbackwindow = document.querySelector('#feedbackwindow');

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

const inputForm = document.querySelector('#inputForm');
const textInput = document.querySelector('#textInput');

inputForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  buildResponse(textInput.value);
  textInput.value = '';

})

