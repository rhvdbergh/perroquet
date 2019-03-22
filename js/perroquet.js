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
  
  const ch = str[0];
  return ch.toUpperCase() + str.substring(1);
}

function replacePronouns(str) {
  str.replace(/your/gi, 'my');
  str.replace(/my/gi, 'your');
  str.replace(/i\s/gi, "you ");
  str.replace(/me\s/gi, "you ");
  str.replace(/you/gi, "I");
  str.replace(/mine/gi, "yours");
  str.replace(/yours/gi, "mine");
  str.replace(/our/gi, "your");

  return str;
}

const button = document.querySelector('#toggleButton');
const feedbackwindow = document.querySelector('#feedbackwindow');
let feedback = document.querySelector('#feedback');
let question = document.querySelector('#question');

button.addEventListener('click', () => {
  if (button.innerHTML === 'Pause Session') {
    recognition.stop();
    button.innerHTML = 'Start Session';
  } else {
    recognition.start();
    button.innerHTML = 'Pause Session';
  }
})

recognition.continuous = true;
recognition.start();

recognition.onresult = (evt) => {
  console.log(`succes`, evt.results);
  const len = evt.results.length - 1;
  let str = '';

  for (i = evt.resultIndex; i <= len; i++) {
    str += evt.results[i][0].transcript + ' ';
  }

  feedback.innerHTML = str.trim(sentenceCase(str)) + '.';
  feedback.removeAttribute('id');
  feedback = document.createElement("P");
  feedback.setAttribute('id', 'feedback');
  feedbackwindow.appendChild(feedback);
  question.innerHTML=prepend[randNum(prepend.length)] + " " + replacePronouns(str.trim()) + ". " + append[randNum(append.length)];
  question.removeAttribute('id');
  question = document.createElement("P")
  question.setAttribute('id', 'question');
  feedbackwindow.appendChild(question);

}

