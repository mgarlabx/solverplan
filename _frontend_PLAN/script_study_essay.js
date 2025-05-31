import Language from './script_language.js';
import Study from './script_study.js';
import App from './script_app.js';

const StudyEssay = {

    load() {
        if (Study.obj.essay) {
            let tx = ``;
            tx += `<div style="width:100%;margin: 0 auto;text-align:left;">`;
            if (Study.obj.essay) {
                tx += `${Study.obj.essay.command}<p>`;
                tx += `<textarea id="essay-answer" style="width:100%;height:150px;"></textarea>`;
                tx += `<div id="essay-comment" style="width:100%;margin: 0 auto;text-align:left;"></div>`;
                tx += `<button class="button" id="essay-send"><img width="25" src="images/aiStars.png"><div>${Language.get('Analisar')}</div></button>`;
            } else {
                console.log(Study.obj.essay);
            }
            tx += `</div>`;
            Study.divEssay.innerHTML = tx;
            
            document.getElementById('essay-send').addEventListener('click', () => {
                const answer = document.getElementById('essay-answer').value;
                const data = {
                    question: Study.obj.essay.command,
                    rubric: Study.obj.essay.rubric,
                    answer: answer,
                    text: Study.obj.text,
                    language: App.obj.language,
                    level: App.obj.builder.level,
                };
                document.getElementById('essay-send').style.display = 'none';
                document.getElementById('essay-comment').innerHTML = `<img width="150" src="images/processing1.gif"><p>&nbsp;<p>&nbsp;<p>&nbsp;<p>&nbsp;`;
                document.getElementById('study-refresh-essay').style.display = 'none';

                // AI analysis of ESSAY
                const url = App.path + 'study_essay_ai';
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(resp => {
                        let newText = marked.parse(resp.correcao); // https://github.com/markedjs/marked
                        newText = newText.replace(/<a /g, '<a target="_blank" ');
                        document.getElementById('essay-send').style.display = 'flex';
                        document.getElementById('essay-comment').innerHTML = newText;
                        document.getElementById('study-refresh-essay').style.display = 'block';
                    }).catch(error => {
                        document.getElementById('essay-send').style.display = 'flex';
                        document.getElementById('essay-comment').innerHTML = Language.get('Ocorreu um erro, lamento. Por favor, tente novamente.');
                        document.getElementById('study-refresh-essay').style.display = 'block';
                        console.error('An error occurred:', error.message);
                        console.log(JSON.stringify(body));
                    });
            });
        }
     
    },
    
    refresh() {
        Study.postStudyAdd('essay', Study.divEssay);
    },
}

export default StudyEssay;