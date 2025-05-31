import Language from './script_language.js';
import Study from './script_study.js';
import App from './script_app.js';

const StudyVideo = {

    load() {
        if (Study.obj.video) {
            let tx = ``;
            tx += `<div style="width:100%;margin: 0 auto;text-align:center;">`;
            if (Study.obj.video.id.indexOf('abc') >= 0 || Study.obj.video.id.indexOf('123') >= 0) {
                tx += Language.get('Nenhum vídeo encontrado. Tente novamente.');
            } else {
                const url = `https://www.youtube.com/embed/${Study.obj.video.id}`;
                const title = Study.obj.video.title;
                tx += `<b>${title}</b>`;
                tx += `<p><div id="study-video-container"><iframe id="study-video-iframe" src="${url}" frameborder="0" allowfullscreen></iframe></div>`;
            }
            tx += `</div>`;
            Study.divVideo.innerHTML = tx;
        }
    },


    refresh() {
        Study.postStudyAdd('video', Study.divVideo);
    },

    edit() {
        if (!Study.obj.video) Study.obj.video = { "title": "", "id": "" };
        const title = Language.get('Vídeo');
        let tx = '';
        tx += `<div class="study-modal-row">`;
        tx += `<div class="study-modal-cell-left">${Language.get('Título')}</div>`;
        tx += `<div class="study-modal-cell-right"><input id="study-video-title" size="60" value="${Study.obj.video.title}"></div>`;
        tx += `</div>`
        tx += `<div class="study-modal-row">`;
        tx += `<div class="study-modal-cell-left">Id</div>`;
        tx += `<div class="study-modal-cell-right"><input id="study-video-id" size="60" value="${Study.obj.video.id}"></div>`;
        tx += `</div>`
        document.getElementById('modal-title').innerHTML = title;
        document.getElementById('modal-body').innerHTML = tx;
        document.getElementById('modal-body').contentEditable = false;
        document.getElementById('modal-save').style.display = 'block';
        document.getElementById('modal').showModal();
        document.getElementById('modal').scrollTop = 0;
        document.getElementById('modal-close').addEventListener('click', () => App.modalClose());
        document.getElementById('modal-save').addEventListener('click', () => this.save());
    },

    save() {
        Study.obj.video.title = document.getElementById('study-video-title').value;
        Study.obj.video.id = document.getElementById('study-video-id').value;
        Study.storageSet();
        Study.refreshAll();
        App.modalClose();
    }



}

export default StudyVideo;