import App from './script_app.js';
import Builder from './script_builder.js';
import Language from './script_language.js';
import StudyText from './script_study_text.js';
import StudySummary from './script_study_summary.js';
import StudyVideo from './script_study_video.js';
import StudyNews from './script_study_news.js';
import StudyQuiz from './script_study_quiz.js';
import StudyEssay from './script_study_essay.js';

const Study = {

    study: null,
    studyTitle: null,
    studyDescription: null,
    studyChange: null,
    studyTrash: null,
    studyClose: null,
    studyBody: null,

    obj: {},

    id: null,
    unit: null,
    title: null,
    description: null,

    competency: '',
    challenge: '',

    processing: '',

    divSummary: '',
    divText: '',
    divVideo: '',
    divNews: '',
    divQuiz: '',
    divEssay: '',


    // Top right button CHANGE
    change() {
        const title = Language.get('Dados do autoestudo');
        let tx = '';
        tx += `<div class="study-modal-row">`;
        tx += `<div class="study-modal-cell-left">${Language.get('Título')}</div>`;
        tx += `<div class="study-modal-cell-right"><input id="study-change-title" size="60" value="${this.title}"></div>`;
        tx += `</div>`
        tx += `<div class="study-modal-row">`;
        tx += `<div class="study-modal-cell-left">${Language.get('Descrição')}</div>`;
        tx += `<div class="study-modal-cell-right"><input id="study-change-description" size="60" value="${this.description}"></div>`;
        tx += `</div>`
        document.getElementById('modal-title').innerHTML = title;
        document.getElementById('modal-body').innerHTML = tx;
        document.getElementById('modal-body').contentEditable = false;
        document.getElementById('modal-save').style.display = 'block';
        document.getElementById('modal').showModal();
        document.getElementById('modal').scrollTop = 0;
        document.getElementById('modal-close').addEventListener('click', () => App.modalClose());
        document.getElementById('modal-save').addEventListener('click', () => this.changeSave());
    },

    // Save changes (title and description)
    changeSave() {
        this.title = document.getElementById('study-change-title').value;
        this.description = document.getElementById('study-change-description').value;
        this.studyTitle.innerHTML = this.title;
        this.studyDescription.innerHTML = this.description;
        App.obj.builder.activities[this.unit].studies[this.id].title = this.title;
        App.obj.builder.activities[this.unit].studies[this.id].description = this.description;
        this.storageSet();
        Builder.refresh();
        App.modalClose();
    },

    // Top right button TRASH
    trash() {
        if (confirm(Language.get('Deseja realmente excluir este estudo?'))) {
            App.obj.study[this.unit][this.id].summary = '';
            App.obj.study[this.unit][this.id].text = '';
            App.obj.study[this.unit][this.id].video = '';
            App.obj.study[this.unit][this.id].news = '';
            App.obj.study[this.unit][this.id].quiz = '';
            App.obj.study[this.unit][this.id].essay = '';
            App.storageSet();
            this.close();
        }
    },

    // Top right button CLOSE
    close() {
        if (this.study) this.study.style.display = 'none';
        App.videoStop();
        Builder.dom.style.display = 'block';
        window.scrollTo(0, Builder.scrollY); // return to the previous scroll position
    },


    // Show study
    showStudy(unit, id) {

        this.unit = unit - 1;
        this.id = id;
        this.obj = App.obj.study[this.unit][this.id];
        this.title = App.obj.builder.activities[this.unit].studies[this.id].title;
        this.description = App.obj.builder.activities[this.unit].studies[this.id].description;
        this.competency = App.obj.builder.competency;

        this.challenge = App.obj.builder.challenge.artifacts[this.unit].title + ' - ';
        this.challenge += App.obj.builder.challenge.artifacts[this.unit].description;

        this.study = document.getElementById('study');
        this.studyTitle = document.getElementById('study-title');
        this.studyDescription = document.getElementById('study-description');
        this.studyChange = document.getElementById('study-change');
        this.studyTrash = document.getElementById('study-trash');
        this.studyClose = document.getElementById('study-close');
        this.studyBody = document.getElementById('study-body');

        this.processing = '<img src="images/processing1.gif" alt="' + Language.get('Carregando') + '..." width="100" />';

        this.studyTitle.innerHTML = this.title;
        this.studyDescription.innerHTML = this.description;

        let tx = '';
        tx += this.section(Language.get('Conceitos'), 'text');
        tx += this.section(Language.get('Pontos principais'), 'summary');
        tx += this.section(Language.get('Vídeo'), 'video');
        tx += this.section(Language.get('Notícias'), 'news');
        tx += this.section('Quiz', 'quiz');
        tx += this.section(Language.get('Redação'), 'essay');

        Builder.dom.style.display = 'none';
        this.studyBody.innerHTML = tx;
        this.study.style.display = 'block';
        window.scrollTo(0, 0);

        this.divSummary = document.getElementById('study-summary');
        this.divText = document.getElementById('study-text');
        this.divVideo = document.getElementById('study-video');
        this.divNews = document.getElementById('study-news');
        this.divQuiz = document.getElementById('study-quiz');
        this.divEssay = document.getElementById('study-essay');

        this.studyChange.addEventListener('click', () => this.change());
        this.studyTrash.addEventListener('click', () => this.trash());
        this.studyClose.addEventListener('click', () => this.close());

        // Listener for AI genertion buttons
        document.querySelectorAll('.study-section-refresh').forEach(button => {
            button.addEventListener('click', event => {
                const option = event.target.closest('.study-section-refresh').dataset.option;
                this.refresh(option);
            });
        });

        // Listener for EDIT buttons
        document.querySelectorAll('.study-edit').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.closest('.study-section-button').id.split('-')[2];
                if (id == 'text') {
                    StudyText.edit();
                } else if (id == 'summary') {
                    StudySummary.edit();
                } else if (id == 'video') {
                    StudyVideo.edit();
                } else if (id == 'news') {
                    StudyNews.edit();
                } else if (id == 'quiz') {
                    StudyQuiz.edit();
                } else if (id == 'essay') {
                    StudyEssay.edit();
                }
            });
        });

        // Listener for SAVE buttons
        document.querySelectorAll('.study-save').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.closest('.study-section-button').id.split('-')[2];
                if (id == 'text') {
                    StudyText.save();
                }

            });
        });

        // Listener for CANCEL buttons
        document.querySelectorAll('.study-cancel').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.closest('.study-section-button').id.split('-')[2];
                if (id == 'text') {
                    StudyText.cancel();
                }

            });
        });

        this.refreshAll();


    },

    section(label, option) {
        let tx = '';
        tx += `<div class="study-section">`;
        tx += `<div class="study-section-header">`;
        tx += `<div class="study-section-title">${label}</div>`;
        tx += `<div class="study-section-buttons">`;
        tx += `<button class="study-section-button button study-edit" id="study-edit-${option}"><i class="fa fa-edit"></i></button>`;
        tx += `<div class="study-section-refresh" data-option="${option}" id="study-refresh-${option}">`;
        tx += `<button class="button"><img width="25" src="images/aiStars.png"><div>${Language.get('Gerar')}</div></button>`;
        tx += `</div>`;
        tx += `<button class="study-section-button button study-cancel" id="study-cancel-${option}" style="display:none"><i class="fa fa-cancel"></i></button>`;
        tx += `<button class="study-section-button button study-save" id="study-save-${option}" style="display:none"><i class="fa fa-check"></i></button>`;
        tx += `</div>`;
        tx += `</div>`;
        tx += `<div id="study-${option}"></div>`;
        tx += `</div>`;
        return tx;
    },

    sectionEditShow(option) {
        document.getElementById(`study-edit-${option}`).style.display = `none`;
        document.getElementById(`study-refresh-${option}`).style.display = `none`;
        document.getElementById(`study-save-${option}`).style.display = `block`;
        document.getElementById(`study-cancel-${option}`).style.display = `block`;
    },

    sectionEditHide(option) {
        document.getElementById(`study-edit-${option}`).style.display = `block`;
        document.getElementById(`study-refresh-${option}`).style.display = `block`;
        document.getElementById(`study-save-${option}`).style.display = `none`;
        document.getElementById(`study-cancel-${option}`).style.display = `none`;
    },


    storageSet() {
        App.obj.study[this.unit][this.id] = this.obj;
        App.storageSet();
    },

    refreshAll() {
        StudyText.load();
        StudySummary.load();
        StudyVideo.load();
        StudyNews.load();
        StudyQuiz.load();
        StudyEssay.load();

        document.getElementById('study-edit-news').style.display = 'none'; // gambware - ocultar botão de edição - rotina ainda não implementada
        document.getElementById('study-edit-quiz').style.display = 'none'; // gambware - ocultar botão de edição - rotina ainda não implementada
        document.getElementById('study-edit-essay').style.display = 'none'; // gambware - ocultar botão de edição - rotina ainda não implementada
    },


    refresh(option) {

        switch (option) {
            case 'summary':
                StudySummary.refresh();
                break;
            case 'text':
                StudyText.refresh();
                break;
            case 'video':
                StudyVideo.refresh();
                break;
            case 'news':
                StudyNews.refresh();
                break;
            case 'quiz':
                StudyQuiz.refresh();
                break;
            case 'essay':
                StudyEssay.refresh();
                break;
        }
    },



    // Envia requisição ao servidor -  KEY POINTS, VIDEO, NEWS, QUIZ, ESSAY
    postStudyAdd(option, addDiv) {

        addDiv.innerHTML = this.processing;
        document.getElementById(`study-refresh-${option}`).style.display = 'none';

        const url = App.path + 'study_adds';
        const body = {
            option: option,
            competency: this.competency,
            challenge: this.challenge,
            title: this.title,
            description: this.description,
            text: this.obj.text,
            language: App.obj.language,
            level: App.obj.builder.level,
        };

        // AI Generation of KEY POINTS, VIDEO, NEWS, QUIZ, ESSAY
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(resp => {
                if (option === 'summary') this.obj.summary = resp.summary;
                else if (option === 'video') this.obj.video = resp;
                else if (option === 'news') this.obj.news = resp;
                else if (option === 'quiz') this.obj.quiz = resp.quiz;
                else if (option === 'essay') this.obj.essay = resp.essay;
                document.getElementById(`study-refresh-${option}`).style.display = 'block';
                this.storageSet();
                this.refreshAll();
            }).catch(error => {
                document.getElementById(`study-refresh-${option}`).style.display = 'block';
                addDiv.innerHTML = Language.get('Ocorreu um erro, lamento. Por favor, tente novamente.');
                console.error('An error occurred:', error.message);
                console.log(JSON.stringify(body));
            });

    },

}

export default Study;