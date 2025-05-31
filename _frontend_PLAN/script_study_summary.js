import Language from './script_language.js';
import Study from './script_study.js';
import App from './script_app.js';

const StudySummary = {

    load() {
        if (Study.obj.summary) {
            let tx = ``;
            tx += `<ul>`;
            Study.obj.summary.forEach(item => {
                tx += `<li>${item}</li>`;
            });
            tx += `</ul>`;
            Study.divSummary.innerHTML = tx;

        }
    },

    refresh() {
        Study.postStudyAdd('summary', Study.divSummary);
    },

    edit() {
        if (!Study.obj.summary) Study.obj.summary = ["", "", "", "", ""];
        const title = Language.get('Pontos principais');
        let tx = '';
        Study.obj.summary.forEach(item => {
            tx += `<div>`;
            tx += `<input class="summary-item" value="${item}" style="width: 100%; margin-bottom: 5px;">`;
            tx += `</div>`;
        });
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
        document.querySelectorAll('.summary-item').forEach((item, index) => Study.obj.summary[index] = item.value);
        Study.storageSet();
        Study.refreshAll();
        App.modalClose();
    }

}

export default StudySummary;