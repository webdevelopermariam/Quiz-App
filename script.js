let countspan=document.querySelector(".count span");
let bullets=document.querySelector(".bullets");
let bulletspancontainer=document.querySelector(".bullets .spans");
let quizarea=document.querySelector(".quiz-area");
let answerarea=document.querySelector(".answers-area");
let submitbutton=document.querySelector(".submit-button");
let restartbutton=document.querySelector(".restart-button");
let resultscontainer=document.querySelector(".results");
let countdownelement=document.querySelector(".countdown");
let currentindex=0;
let rightanswers=0;
let countdowninterval;
fetch("questions.json")
.then(response=> response.json())
.then(questionsobject => {
    let qcount=questionsobject.length;
    createbullets(qcount);
    addquestiondata(questionsobject[currentindex],qcount);
    countdown(30,qcount);
    submitbutton.onclick = () => {
        let theRightAnswer = questionsobject[currentindex]["right-answer"];
        currentindex++;
        checkanswer(theRightAnswer, qcount);
        quizarea.innerHTML = "";
        answerarea.innerHTML = "";
        addquestiondata(questionsobject[currentindex], qcount);
        handlebullets();
        clearInterval(countdowninterval);
        countdown(30, qcount);
        showresults(qcount);
    };

    
});
function createbullets(num) {
    countspan.innerHTML=num;
    for(let i=0; i< num ; i++){
        let bullet=document.createElement("span");
        if(i==0){
            bullet.className="on";
        }
        bulletspancontainer.appendChild(bullet);
    }
    restartbutton.onclick = () => {
    window.location.reload();
}
}
function addquestiondata(obj,count){
    if(currentindex < count){
        let questiontitle=document.createElement("h2");
        let questiontext=document.createTextNode(obj["title"]);
        questiontitle.appendChild(questiontext);
        quizarea.appendChild(questiontitle);
        for(let i=1;i<=4;i++){
            let mainanswer=document.createElement("div");
            mainanswer.className="answer";
            let radioinput=document.createElement("input");
            radioinput.name="question";
            radioinput.type="radio";
            radioinput.id=`answer_${i}`;
            radioinput.dataset.answer=obj[`answer_${i}`];
            if(i==1){
                radioinput.checked=true;
        }
       let labeltext = document.createTextNode(obj[`answer_${i}`]);
        let label=document.createElement("label");
        label.appendChild(labeltext)
        mainanswer.appendChild(radioinput);
        mainanswer.appendChild(label);
        answerarea.appendChild(mainanswer);
    }
    }
}
function checkanswer(ranswer,count){
    let answers=document.getElementsByName("question");
    let thechosenanswer;
    for(let i=0; i<answers.length;i++){
        if(answers[i].checked){
            thechosenanswer=answers[i].dataset.answer;
        }
}
    if(thechosenanswer === ranswer){
        rightanswers++;
    }
}
function handlebullets(){
    let bullets=document.querySelectorAll(".bullets .spans span");
    let arrayofbullets=Array.from(bullets);
    arrayofbullets.forEach((bullet,index)=>{
        if(currentindex === index){
            bullet.className="on";
        }
    });
}
function showresults(count){
    let theresults;
    if(currentindex === count){
        quizarea.remove();
        answerarea.remove();
        submitbutton.remove();
        bullets.remove();
        if (rightanswers > count / 2 && rightanswers < count){
            theresults=`<span class="good">Good</span>, ${rightanswers} from ${count}`;
        }else if (rightanswers==count){
            theresults=`<span class="perfect">perfect</span>,All answers are correct`;
        }else{
            theresults=`<span class="bad">bad</span>, ${rightanswers} from ${count}`;

        }
resultscontainer.innerHTML = theresults;
resultscontainer.style.padding = "10px";
resultscontainer.style.backgroundColor = "white";
resultscontainer.style.marginTop = "10px";
restartbutton.style.display = "block";
restartbutton.onclick = () => {
    window.location.reload();
}
        }
    }
function countdown(duration,count){
    if(currentindex < count){
        let minutes,seconds;
        countdowninterval=setInterval(function(){
            minutes=parseInt(duration/60);
            seconds=parseInt(duration%60);
            minutes=minutes < 10 ? `0${minutes}` : minutes;
            seconds=seconds < 10 ? `0${seconds}` : seconds;
            countdownelement.innerHTML=`${minutes}:${seconds}`;
            if(--duration < 0){
                clearInterval(countdowninterval);
                submitbutton.click();
               
            }
        },1000);
        
    }
}
