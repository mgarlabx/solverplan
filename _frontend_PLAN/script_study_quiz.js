import Language from './script_language.js';
import Study from './script_study.js';

const StudyQuiz = {

    load() {
        if (Study.obj.quiz) {
            let tx = ``;
            tx += `<div style="width:100%;margin: 0 auto;text-align:left;">`;
            if (Study.obj.quiz) {
                Study.obj.quiz.forEach((item, index) => {
                    const input = `<input type="radio" class="radio-quiz" name="quiz-${index}" id="">`
                    tx += `<b>${item.command}</b><p>`;
                    tx += `<input type="radio" class="radio-quiz" name="quiz-${index}" id="alt-${index}-0"> ${item.alternative_1}<p>`;
                    tx += `<input type="radio" class="radio-quiz" name="quiz-${index}" id="alt-${index}-1"> ${item.alternative_2}<p>`;
                    tx += `<input type="radio" class="radio-quiz" name="quiz-${index}" id="alt-${index}-2"> ${item.alternative_3}<p>`;
                    tx += `<input type="radio" class="radio-quiz" name="quiz-${index}" id="alt-${index}-3"> ${item.alternative_4}<p>`;
                    tx += `<div id="feedback-${index}"></div>`;
                    tx += `<hr>`;
                });
            } else {
                console.log(Study.obj.quiz);
            }
            tx += `</div>`;
            Study.divQuiz.innerHTML = tx;
            

            document.querySelectorAll('.radio-quiz').forEach(button => {
                button.addEventListener('click', event => {
                    const id = event.target.id;
                    const index = id.split('-')[1];
                    let alternative = id.split('-')[2];
                    alternative = parseInt(alternative) + 1;
                    const question = Study.obj.quiz[index];
                    const color = (question[`correct`] == alternative) ? 'green' : 'red';
                    document.getElementById(`feedback-${index}`).innerHTML = `<font color="${color}">` + question[`feedback_${alternative}`] + `</font>`;

                });
            });

        }
    
    },

    refresh() {
        Study.postStudyAdd('quiz', Study.divQuiz);
    },

   

}

export default StudyQuiz;