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

const randNum = (forLength) => {
  return Math.floor(Math.random() * forLength);
}

const button = document.querySelector('#startButton');
const feedback = document.querySelector('#feedback');
const question = document.querySelector('#question');

button.addEventListener('click', () => {
  console.log('Recognition started.');
  recognition.start();
})

recognition.onresult = (evt) => {
  console.log(`succes`, evt.results);
  const len = evt.results.length - 1;
  let str = '';

  for (i = 0; i <= len; i++) {
    str += evt.results[i][0].transcript + ' ';
  }

  feedback.innerHTML=str;
  question.innerHTML=prepend[randNum(prepend.length)] + " " + str.trim() + ". " + append[randNum(append.length)];
}
