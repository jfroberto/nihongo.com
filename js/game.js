const questionText = document.querySelector(".questionText");
const optionBox = document.querySelector(".optionBox");
const currentQuestionNum= document.querySelector(".currentQuestionNumber");
const answerDesc=document.querySelector(".answerDesc");
const nextQuestionButton=document.querySelector(".nextQuestionButton");
const correctAnswer=document.querySelector(".correctAnswer");
const resultButton=document.querySelector(".resultButton");
const remainTime=document.querySelector(".remainTime");
//time up text
const quizBox=document.querySelector(".quizBox");
const quizOverBox=document.querySelector(".quizOverBox");
const quizHome=document.querySelector(".quizHome");
const startAgainQuizButton=document.querySelector(".startAgainQuizButton");
const gotoHomeButton=document.querySelector(".gotoHomeButton");
const start=document.querySelector(".start");

let attempt=0;
let questionIndex=0;
let number = 0;
let score = 0;
let myArray=[];
let interval;

//question and option answer
// myApp=[
//     {
//         question:"Watashi",
//         options:["I", "We", "You", "That person"],
//         answer:0,
//         description: "Watashi ha karuro"
//     },
//     {
//         question:"Anata",
//         options:["We", "I", "You", "That person"],
//         answer:2,
//         description: "Anata ha daijoubu desu ka?"
//     }
// ]
myApp=[
    {question:"	わたし	"	,	options:[	"	I	"	,	"	no	"	,	"	hospital	"	,	"	How do you do	"],	answer:	0	,	description:"	私	"	},
    {question:"	わたしたち	"	,	options:[	"	Pleased to meet you.	"	,	"	We	"	,	"	university	"	,	"	USA	"],	answer:	1	,	description:"	私たち	"	},
    {question:"	あなた	"	,	options:[	"	Japan	"	,	"	university	"	,	"	You	"	,	"	medical doctor	"],	answer:	2	,	description:"		"	},
    {question:"	あのひと	"	,	options:[	"	hospital	"	,	"	that person	"	,	"	employee of…company (used witd a company’s name)	"	,	"	― years old	"],	answer:	1	,	description:"	あの人	"	},
    {question:"	あのかた	"	,	options:[	"	researcher, scholar	"	,	"	Indonesia	"	,	"	Polite equivalent of あのひと	"	,	"	Germany	"],	answer:	2	,	description:"	あの方	"	},
    {question:"	みなさん	"	,	options:[	"	Everybody, all of you	"	,	"	employee of…company (used witd a company’s name)	"	,	"	I	"	,	"	That person	"],	answer:	0	,	description:"		"	},
    {question:"	～さん	"	,	options:[	"	no	"	,	"	Mr./Mrs. Title of respect added to a name	"	,	"	Indonesia	"	,	"	yes	"],	answer:	1	,	description:"		"	},
    {question:"	～ちゃん	"	,	options:[	"	I	"	,	"	Teacher, instructor ( not used when referring to one’s own job)	"	,	"	Suffix added to child’s names instead of ～さん	"	,	"	Teacher, instructor ( not used when referring to one’s own job)	"],	answer:	2	,	description:"		"	},
    {question:"	～くん	"	,	options:[	"	Suffix often added to boy’s names	"	,	"	India	"	,	"	Everybody, all of you	"	,	"	who (どなた is tde polite equivalent of だれ)	"],	answer:	0	,	description:"		"	},
    {question:"	～じん	"	,	options:[	"	thailand	"	,	"	Suffix meaning nationality	"	,	"	U.K	"	,	"	We	"],	answer:	1	,	description:"	～人	"	},
    {question:"	せんせい	"	,	options:[	"	Polite equivalent of あのひと	"	,	"	Germany	"	,	"	Japan	"	,	"	Teacher, instructor ( not used when referring to one’s own job)	"],	answer:	3	,	description:"	先生	"	},
    {question:"	きょうし	"	,	options:[	"	France	"	,	"	China	"	,	"	Teacher, instructor	"	,	"	no	"],	answer:	2	,	description:"	教師	"	},
    {question:"	がくせい	"	,	options:[	"	Student	"	,	"	Suffix added to child’s names instead of ～さん	"	,	"	no	"	,	"	China	"],	answer:	0	,	description:"	学生	"	},
    {question:"	かいしゃいん	"	,	options:[	"	Korean	"	,	"	tdailand	"	,	"	company employee	"	,	"	Mr./Mrs. Title of respect added to a name	"],	answer:	2	,	description:"	会社員	"	},
    {question:"	しゃいん	"	,	options:[	"	medical doctor	"	,	"	You	"	,	"	Germany	"	,	"	employee of…company (used witd a company’s name)	"],	answer:	0	,	description:"	社員	"	},
    {question:"	ぎんこういん	"	,	options:[	"	bank employee	"	,	"	bank employee	"	,	"	Suffix often added to boy’s names	"	,	"	Brazil	"],	answer:	0	,	description:"	銀行員	"	},
    {question:"	いしゃ	"	,	options:[	"	who (どなた is tde polite equivalent of だれ)	"	,	"	medical doctor	"	,	"	Suffix added to child’s names instead of ～さん	"	,	"	Indonesia	"],	answer:	1	,	description:"	医者	"	},
    {question:"	けんきゅうしゃ	"	,	options:[	"	U.K	"	,	"	Everybody, all of you	"	,	"	We	"	,	"	researcher, scholar	"],	answer:	3	,	description:"	研究者	"	},
    {question:"	エンジニア	"	,	options:[	"	employee of…company (used witd a company’s name)	"	,	"	Korean	"	,	"	Engineer	"	,	"	India	"],	answer:	2	,	description:"		"	},
    {question:"	だいがく	"	,	options:[	"	bank employee	"	,	"	university	"	,	"	Mr./Mrs. Title of respect added to a name	"	,	"	Suffix added to child’s names instead of ～さん	"],	answer:	1	,	description:"	大学	"	},
    {question:"	びょういん	"	,	options:[	"	Germany	"	,	"	Excuse me, but	"	,	"	thailand	"	,	"	hospital	"],	answer:	3	,	description:"	病院	"	},
    {question:"	でんき	"	,	options:[	"	electricity, light	"	,	"	medical doctor	"	,	"	Teacher, instructor ( not used when referring to one’s own job)	"	,	"	Teacher, instructor	"],	answer:	0	,	description:"	電気	"	},
    {question:"	だれ（どなた）	"	,	options:[	"	who (どなた is tde polite equivalent of だれ)	"	,	"	who (どなた is tde polite equivalent of だれ)	"	,	"	Polite equivalent of あのひと	"	,	"	hospital	"],	answer:	0	,	description:"	誰	"	},
    {question:"	―さい	"	,	options:[	"	May I have your name?	"	,	"	Teacher, instructor	"	,	"	bank employee	"	,	"	― years old	"],	answer:	3	,	description:"	～歳	"	},
    {question:"	なんさい	"	,	options:[	"	China	"	,	"	Pleased to meet you.	"	,	"	how old (おいくつ is is tde polite equivalent of  なんさい)	"	,	"	I came (come) from…	"],	answer:	2	,	description:"	何歳	"	},
    {question:"	はい	"	,	options:[	"	yes	"	,	"	Brazil	"	,	"	Teacher, instructor	"	,	"	Pleased to meet you.	"],	answer:	0	,	description:"		"	},
    {question:"	いいえ	"	,	options:[	"	no	"	,	"	Suffix meaning nationality	"	,	"	Student	"	,	"	tdailand	"],	answer:	0	,	description:"		"	},
    {question:"	しつれいですが	"	,	options:[	"	Suffix added to child’s names instead of ～さん	"	,	"	this is Mr./Ms/…	"	,	"	Excuse me, but	"	,	"	how old (おいくつ is is tde polite equivalent of  なんさい)	"],	answer:	2	,	description:"	失礼ですが	"	},
    {question:"	おなまえは？	"	,	options:[	"	You	"	,	"	May I have your name?	"	,	"	― years old	"	,	"	Excuse me, but	"],	answer:	1	,	description:"	お名前は	"	},
    {question:"	はじめまして。	"	,	options:[	"	this is Mr./Ms/…	"	,	"	How do you do	"	,	"	electricity, light	"	,	"	I	"],	answer:	1	,	description:"	初めて	"	},
    {question:"	どうぞよろしく[おねがいします]。	"	,	options:[	"	Everybody, all of you	"	,	"	electricity, light	"	,	"	Pleased to meet you.	"	,	"	employee of…company (used witd a company’s name)	"],	answer:	2	,	description:"	どうぞよろしく「お願いします」。	"	},
    {question:"	こちらは～さんです。	"	,	options:[	"	company employee	"	,	"	this is Mr./Ms/…	"	,	"	How do you do	"	,	"	Suffix meaning nationality	"],	answer:	1	,	description:"		"	},
    {question:"	～からきました。	"	,	options:[	"	I came (come) from…	"	,	"	Suffix often added to boy’s names	"	,	"	Brazil	"	,	"	Polite equivalent of あのひと	"],	answer:	0	,	description:"	～から来ました	"	},
    {question:"	アメリカ	"	,	options:[	"	France	"	,	"	Student	"	,	"	that person	"	,	"	USA	"],	answer:	3	,	description:"		"	},
    {question:"	イギリス	"	,	options:[	"	Suffix often added to boy’s names	"	,	"	We	"	,	"	U.K	"	,	"	engineer	"],	answer:	2	,	description:"		"	},
    {question:"	インド	"	,	options:[	"	engineer	"	,	"	India	"	,	"	Germany	"	,	"	university	"],	answer:	2	,	description:"		"	},
    {question:"	インドネシア	"	,	options:[	"	that person	"	,	"	I came (come) from…	"	,	"	medical doctor	"	,	"	Indonesia	"],	answer:	3	,	description:"		"	},
    {question:"	かんこく	"	,	options:[	"	university	"	,	"	Korean	"	,	"	China	"	,	"	electricity, light	"],	answer:	1	,	description:"	韓国	"	},
    {question:"	タイ	"	,	options:[	"	thailand	"	,	"	hospital	"	,	"	Pleased to meet you.	"	,	"	Korean	"],	answer:	0	,	description:"		"	},
    {question:"	ちゅうごく	"	,	options:[	"	Excuse me, but	"	,	"	I	"	,	"	China	"	,	"	Japan	"],	answer:	2	,	description:"	中国	"	},
    {question:"	ドイツ	"	,	options:[	"	Brazil	"	,	"	Germany	"	,	"	researcher, scholar	"	,	"	that person	"],	answer:	1	,	description:"		"	},
    {question:"	にほん	"	,	options:[	"	― years old	"	,	"	How do you do	"	,	"	engineer	"	,	"	Japan	"],	answer:	3	,	description:"	日本	"	},
    {question:"	フランス	"	,	options:[	"	Indonesia	"	,	"	France	"	,	"	I came (come) from…	"	,	"	U.K	"],	answer:	1	,	description:"		"	},
    {question:"	ブラジル	"	,	options:[	"	Brazil	"	,	"	Polite equivalent of あのひと	"	,	"	France	"	,	"	Student	"],	answer:	0	,	description:"		"	}
    ]






function load(){
    number++;
    questionText.innerHTML = myApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML = number + " / " + myApp.length;
}

function createOptions(){
    optionBox.innerHTML="";
    for(let i=0; i<myApp[questionIndex].options.length; i++){
        //console.log(myApp[questionIndex].option[i]);
        const option=document.createElement("div");
              option.innerHTML=myApp[questionIndex].options[i];
              option.id=i;
              option.setAttribute("onClick", "check(this)");
              option.classList.add("option");
              optionBox.appendChild(option);
    }
}

function generateRamdomQuestion (){
    // console.log("random");
     const randomNumber= Math.floor(Math.random() * myApp.length);
     let hitDuplicate=0;
    // console.log(myArray.length);
     if (myArray.length == 0) {
         questionIndex = randomNumber;
         
         //console.log(randomNumber);
     }
     else {
         for (let i=0; i< myArray.length; i++){
             if(randomNumber == myArray[i]){
                //if duplicate found
                hitDuplicate=1;
                //console.log("duplicate found:" + randomNumber);
             }
         } 
         if(hitDuplicate == 1){
             generateRamdomQuestion();
             return;
         }
         else {
            questionIndex = randomNumber;
         }

         //console.log("new")
     }
     
     myArray.push(randomNumber);
     console.log(myArray);
     load();
}

function check(ele){
    //console.log(ele.innerHTML);
    const id=ele.id;
    if(id==myApp[questionIndex].answer){
        console.log("correct");
        ele.classList.add("correct");
        score++;
        scoreBoard();
    }
    else{
        //console.log("wrong");
        ele.classList.add("wrong");
        //show correct ans when wrfong
        for (let i = 0; i < optionBox.children.length; i++){
            if(optionBox.children[i].id == myApp[questionIndex].answer){
                optionBox.children[i].classList.add("showCorrect");
            }
        }
    }
    attempt++;
    disableOptions();
    showAnswerDescription();
    showNextQuestionButton();
    stopTimer();

    if(number == myApp.length){
        //console.log("over");
        quizOver();
        
    }
}

function timeIsUp() {
    for (let i = 0; i < optionBox.children.length; i++){
        if(optionBox.children[i].id == myApp[questionIndex].answer){
            optionBox.children[i].classList.add("showCorrect");
        }
    }

    disableOptions();
    showAnswerDescription();
    showNextQuestionButton();
//add after 136
    if(number == myApp.length){
        quizOver();
      }
}

function starTimer(){
    let timeLimit = 10;
    remainTime.innerHTML=timeLimit;
    interval = setInterval(()=>{
        timeLimit--;
        if(timeLimit < 10){
            timeLimit="0"+timeLimit;
        }
        if(timeLimit < 6 ){
            remainTime.classList.add("lesstime")
        }
        remainTime.innerHTML=timeLimit;
        if(timeLimit == 0){
            clearInterval(interval);
            timeIsUp();
        }
//        console.log(timeLimit);
    },1000)
}

function stopTimer(){
    clearInterval(interval);

}

function disableOptions(){
    for(let i=0; i<optionBox.children.length; i++){
        optionBox.children[i].classList.add("alreadyAnswered");
    }
}

function showAnswerDescription(){
    if(typeof myApp[questionIndex].description !== 'undefined'){
    answerDesc.classList.add("show");
    answerDesc.innerHTML=myApp[questionIndex].description;
    }
}

function hideAnswerDescription(){
    answerDesc.classList.remove("show");
    answerDesc.innerHTML="";
}

function showNextQuestionButton(){
    nextQuestionButton.classList.add("show");
}

function hideNextQuestionButton(){
    nextQuestionButton.classList.remove("show");
}

function scoreBoard(){
    correctAnswer.innerHTML=score;
}

nextQuestionButton.addEventListener("click", nextQuestion);

function nextQuestion(){
    //console.log("hello");
    questionIndex++;
    generateRamdomQuestion();
    hideNextQuestionButton();
    hideAnswerDescription();
    starTimer();
}

function quizResult(){
    document.querySelector(".totalQuestions").innerHTML=myApp.length;
    document.querySelector(".totalAttempt").innerHTML=attempt;
    document.querySelector(".totalCorrect").innerHTML=score;
    document.querySelector(".totalWrong").innerHTML=attempt-score;
    const percentage = (score/myApp.length)*100;
    document.querySelector(".percentage").innerHTML=percentage.toFixed(2) +"%";

}

function resetQuiz() {
    attempt=0;
     //questionIndex=0;
     number = 0;
     score = 0;
     myArray=[];
}

function quizOver(){
    nextQuestionButton.classList.remove("show");
    resultButton.classList.add("show");
}

resultButton.addEventListener("click",()=>{
    //console.log("result");
   // quizBox.style.display="none";
    quizBox.classList.remove("show");
    resultButton.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResult();

})

startAgainQuizButton.addEventListener("click",()=> {
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show");
    resetQuiz();    
    nextQuestion();
})

gotoHomeButton.addEventListener("click", ()=> {
    quizOverBox.classList.remove("show");
    quizHome.classList.add("show");
    resetQuiz();
})

start.addEventListener("click", ()=> {
    quizHome.classList.remove("show");
    quizBox.classList.add("show");
   nextQuestion();
    //from windows onload  
    // starTimer();
    // generateRamdomQuestion();

})
//arrow funcion
// window.onload=()=> {
//     //load();
   
// }