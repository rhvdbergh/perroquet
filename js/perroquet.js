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

const button = document.querySelector('#toggleButton');
const feedbackwindow = document.querySelector('#feedbackwindow');
let fbdiv;
let feedback = document.querySelector('.feedback');
let question = document.querySelector('.question');
let qdiv;

button.addEventListener('click', () => {
  if (button.innerHTML === 'Pause Session') {
    recognition.stop();
    button.innerHTML = 'Continue';
  } else {
    recognition.start();
    button.innerHTML = 'Pause Session';
  }
})

recognition.continuous = true;
recognition.start();

recognition.onresult = (evt) => {

  const len = evt.results.length - 1;
  let str = '';

  for (i = evt.resultIndex; i <= len; i++) {
    str += evt.results[i][0].transcript + ' ';
  }

  feedback.innerHTML = sentenceCase(str) + '.';
  fbdiv = document.createElement("DIV");
  feedback = document.createElement("SPAN");
  feedback.setAttribute('class', 'feedback');
  feedbackwindow.appendChild(fbdiv);
  fbdiv.appendChild(feedback);
  question.innerHTML=prepend[randNum(prepend.length)] + " " + replacePronouns(str.trim()) + ". " + append[randNum(append.length)];
  qdiv = document.createElement("DIV");
  question = document.createElement("SPAN")
  question.setAttribute('class', 'question');
  feedbackwindow.appendChild(qdiv);
  qdiv.appendChild(question);

}

recognition.onend = (evt) => {
  button.innerHTML = 'Continue';
}

