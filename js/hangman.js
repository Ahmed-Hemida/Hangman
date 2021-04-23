var movies = [
	{name:"لا تراجع ولا استسلام",caption:"اين اشيائي"},
  {name:"الالماني",caption:"عندكوا شامبو ؟"},
  {name:"الناظر",caption:"ونسمع سلام لشهادة الوفاه "},
  {name:"بوشكاش",caption:"الواد بيمشي ؏ ايديه و رجلييه ولا اييه"},
  {name:"بوشكاش",caption:" الشجههه بتوللع n/ = عااارف عااارف"},
  {name:"بوشكاش",caption:"انت سلعاااوي انت سلعاااوي"},
  {name:"جائنا البيان التالي",caption:"إلهي يحلبوك مع جاموسة هبلة "},
  {name:"ظرف طارق",caption:"كنت اخترت مكرونة اسهل "},
  {name:"ظرف طارق",caption:"حاسس اني مش هشوف الارض تاني يا معتز "},
  {name:"ميدو مشاكل ",caption:"محدش ياخد ميدو ابني ويديني بداله مروحة "},
  {name:"برق بنزين",caption:" لازم الملك يكمل اخر سباق له! "},
  {name:"ابن حميدو",caption:"صلاة النبي احسن"},
  {name:"عندليييييييب الدقى",caption:"جانى جنى قصير جالى انا اخووووك يافووووواز والله جانى "},
  {name:"غبي منه فيه",caption:"المطاوة بتاعتنا اما الفلوس مش بتاعتنا"},
   {name:"اللمبي",caption:"امك حلوه اوى يا لمبي"},
   {name:"اللمبي",caption:"يا بت يا نوسي انا بحبك يا بت"},
   {name:"بوحا",caption:"تصدق سلخت قبل ما ادبح "},
   {name:"اللمبي",caption:"يا بت يا نوسي انا بحبك يا بت"},
   {name:"حرب كرموز",caption:"جوني  your mather صاحبتي"},
]

document.getElementById('wrong').style.visibility = 'hidden';
document.getElementById('success').style.visibility = 'hidden';


// document.getElementById('wrong').style.visibility = 'visible';
let movies_name = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  var x=Math.floor(Math.random() * movies.length);
  movies_name = movies[x].name;
  movies_caption = movies[x].caption;
  document.getElementById('movies_caption').innerHTML = movies_caption;

}

function generateButtons() {
  let buttonsHTML = 'دجحخهعغفقثصضشسيبلاتنمكطظ زوةىرؤءذ'.split('').map(letter =>
    `
      <button style="weghit:auto;"
        class="btn btn-lg btn-warning m-1"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (movies_name.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (movies_name.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.png';
}

function checkIfGameWon() {
  if (wordStatus === movies_name) {
    document.getElementById('keyboard').innerHTML = ' مين اشطر كتكوت ناو';
    document.getElementById('success').style.visibility = 'visible';
  var x=  document.getElementById('suc');

    x.play(); 
    x.onended=function(){
   x.style.visibility = 'hidden';
    };
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML =' اسم الفيلم ' + movies_name ;
    document.getElementById('keyboard').innerHTML = 'خلاص انا كده انطفيت';

  }
  var x=document.getElementById('wr');
    
  if(mistakes >2){
    x.src = 'video/' + mistakes + '.mp4';
    x.style.visibility = 'visible';
    x.play(); 
    x.onended=function(){
      x.style.visibility = 'hidden';
    };
    // if(x.onended){
    //   x.style.visibility = 'hidden';
    // }
  }
}

function guessedWord() {
  wordStatus = movies_name.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
