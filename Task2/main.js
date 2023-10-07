const generateButton = document.querySelector('.btn')
const CategoryInput = document.querySelector('#Category')
const RegionInput = document.querySelector('#Region')
const DifficultyInput = document.querySelector('#Difficulty')
const SqueezeButton_section = document.querySelector('.SqueezeButton_section')
const questionContainer = document.querySelector('.container')
const submit_section = document.querySelector('.submit_section')
const QsubmitButton = document.querySelector('#submit')
const Qcount = document.querySelector('.Qcount')
const correctAnswers = []
const playerAnswers = []
let questionsArray = []
let questionsHtml = []
let global_Qcount_index = 0
let answerChecked = false

const inputCheckFunc = ()=>{
    //  to make radio input checked when its parent div is clicked
    if(document.querySelector('.answer') !== null){
        const answers = document.querySelectorAll('.answer');
        for(let answer of answers){
            const radio = answer.querySelector('input[type="radio"]');
            answer.addEventListener('click', () => {
                radio.checked = true;
            });
            if(radio.checked === true){
                answer.style.background ="rgba(255, 37, 37, 0.767)"
                answer.style.border = "3px solid rgb(255, 255, 255)"
                answer.style.color = "white"
                answerChecked = true

            }
            else{
                answer.style.background =""
                answer.style.border = ""
                answer.style.color = ""
            }
        }
    }
}

setInterval(inputCheckFunc, 100);
submit_section.style.display = "none";

const generateQuestions = async () => {

    console.log('...loading')
    SqueezeButton_section.innerHTML += `<div class="loaderImg"></div>`
    let CategoryValue = CategoryInput.value
    let RegionValue = RegionInput.value
    let DifficultyValue = DifficultyInput.value
    console.log(CategoryValue , RegionValue , DifficultyValue);
    fetch(`https://the-trivia-api.com/api/questions?categories=${CategoryValue}&limit=10&region=${RegionValue}&difficulty=${DifficultyValue}`)
        .then((response)=>response.json())
        .then((questions)=>{
            questionsArray =[...questions]
            console.log(questionsArray)
            console.log('Done..')
        }).then(()=>{
        questionsHtml = questionsArray.map((element , index)=>{
            let Answers = [element.correctAnswer , ...element.incorrectAnswers]
            correctAnswers.push(element.correctAnswer)
            Answers = Answers.sort()
            return(
                `<h1 class="Qindex">${index + 1}</h1>
                        <h1>${element.question}</h1>
                        <div>
                            <h4 style="margin:0%">Answers</h4>
                            <div class = "answers">
                                <div class="answer">
                                    <input type="radio" name="answer" id="a" value="${Answers[0]}">
                                    <label for="a:">a) ${Answers[0]}</label>
                                </div>
                                <div class="answer">
                                    <input type="radio" name="answer" id="b" value="${Answers[1]}">
                                    <label for="b:">b) ${Answers[1]}</label>
                                </div>
                                <div class="answer">
                                    <input type="radio" name="answer" id="c" value="${Answers[2]}">
                                    <label for="c:">c) ${Answers[2]}</label>
                                </div>
                                <div class="answer">
                                    <input type="radio" name="answer" id="d" value="${Answers[3]}">
                                    <label for="d:">d) ${Answers[3]}</label>
                                </div>
                            </div>
                        </div>
                        
                        `
            )
        })
    }).then(()=>{
        questionContainer.innerHTML = questionsHtml[0]
        submit_section.style.display = "";
        Qcount.innerHTML = `${(global_Qcount_index + 1)} / 10`

    }).catch((err)=>{
        console.log("problem loading question ..please try again!!")
        questionContainer.innerHTML += "<h2 style='color:#ff1818'>Problem loading question .Please reload the page and try again!!</h2>"
        console.log(err)
    })
}

const questionSubmit = ()=>{
    if(answerChecked){
        if(global_Qcount_index > 8){
            // finished the 10 Qs
            answerValue = document.querySelector('input[name="answer"]:checked').value;
            playerAnswers.push(answerValue)
            let wrongAnswers = 0;
            for (let i = 0; i < correctAnswers.length; i++) {
                if (correctAnswers[i] !== playerAnswers[i]) {
                    wrongAnswers++;
                }
            }
            submit_section.style.display = 'none'
            console.log("Questions Finished !!")
            if(wrongAnswers > 5){
                questionContainer.innerHTML = (`
                <div class='finish_section'>
                    <h1>You may have lost this round, but you're still a winner in our book.</h1>
                    <h2 style="color:#ff1818; font-size:x-large">You got ${(10-wrongAnswers)} / 10</h2>
                    <img src="assets/images/losing.gif" alt="losing-img" class="finish_img">
                    <a class='btn' href="index.html">Try Again<a>
                </div>    
                `)
            }else if(wrongAnswers < 4 && wrongAnswers!=0){
                questionContainer.innerHTML = (`
                <div class='finish_section'>
                    <h1>Congratulations! You're a true champion!</h1>
                    <h2 style="color:#ff1818; font-size:x-large">You got ${(10-wrongAnswers)} / 10</h2>
                    <img src="assets/images/winner.gif" alt="winning-img"  class="finish_img">
                    <a class='btn' href="index.html">Try Again<a>
                </div>    
                `)
            }else{
                questionContainer.innerHTML = (`
                <div class='finish_section'>
                    <h1>Fantastic performance! You're a master at this game.</h1>
                    <h2 style="color:#ff1818; font-size:x-large">You got ${(10-wrongAnswers)} / 10</h2>
                    <img src="assets/images/winnerCup.gif" alt="winning-img"  class="finish_img">
                    <a class='btn' href="index.html">Try Again<a>
                </div>    
                `)
            }

        }
        else{
            answerValue = document.querySelector('input[name="answer"]:checked').value;
            playerAnswers.push(answerValue)
            answerChecked = false
            console.log(`player answers are:${playerAnswers}`)
            // console.log(`correct answers are:${correctAnswers}`)
            global_Qcount_index++;
            console.log(global_Qcount_index)
            questionContainer.innerHTML = questionsHtml[global_Qcount_index]
            Qcount.innerHTML = `${(global_Qcount_index + 1)} / 10`

        }
    }else{
        questionContainer.innerHTML += "<h2 style='color:#ff1818'>You must select an answer before submiting</h2>"
    }

}
generateButton.addEventListener('click' , generateQuestions);
QsubmitButton.addEventListener('click' , questionSubmit);

