const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList || SpeechGrammarList;
const SpeechRecognitionEvent = webkitSpeechRecognitionEvent || SpeechRecognitionEvent;

const recognition = new SpeechRecognition();


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
  question.innerHTML="So, I hear you say that " + str + "- how do you feel about that?";
}
