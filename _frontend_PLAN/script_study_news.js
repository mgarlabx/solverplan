import Language from './script_language.js';
import Study from './script_study.js';
import App from './script_app.js';

const StudyNews = {

    load() {
        if (Study.obj.news) {
            let tx = ``;
            Study.obj.news.articles.forEach((new0, i) => {
                tx += `<li><a target="_blank" href="${new0.url}">`;
                tx += new0.title;
                tx += `</a></li><p>`;

            });
            Study.divNews.innerHTML = tx;
            
        }
    },

    
    refresh() {
        Study.postStudyAdd('news', Study.divNews);
    },

    edit() {
        return; // GAMBWARE - Não implementado

        if (!Study.obj.news) Study.obj.news = { "articles": [{ "title": "", "description": "", "url": "", "urlToImage": "" }] };
        const new0 = Study.obj.news.articles[0];
        const title = Language.get('Notícias');
        let tx = '';
        tx += `<div class="study-modal-row">`;
        tx += `<div class="study-modal-cell-left">${Language.get('Título')}</div>`;
        tx += `<div class="study-modal-cell-right"><input id="study-news-title" size="60" value="${new0.title}"></div>`;
        tx += `</div>`
        tx += `<div class="study-modal-row">`;
        tx += `<div class="study-modal-cell-left">${Language.get('Descrição')}</div>`;
        tx += `<div class="study-modal-cell-right"><input id="study-news-description" size="60" value="${new0.description}"></div>`;
        tx += `</div>`
        tx += `<div class="study-modal-row">`;
        tx += `<div class="study-modal-cell-left">URL</div>`;
        tx += `<div class="study-modal-cell-right"><input id="study-news-url" size="60" value="${new0.url}"></div>`;
        tx += `</div>`
        tx += `<div class="study-modal-row">`;
        tx += `<div class="study-modal-cell-left">URL image</div>`;
        tx += `<div class="study-modal-cell-right"><input id="study-news-url-image" size="60" value="${new0.urlToImage}"></div>`;
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
        Study.obj.news.articles[0].title = document.getElementById('study-news-title').value;
        Study.obj.news.articles[0].description = document.getElementById('study-news-description').value;
        Study.obj.news.articles[0].url = document.getElementById('study-news-url').value;
        Study.obj.news.articles[0].urlToImage = document.getElementById('study-news-url-image').value;
        Study.storageSet();
        Study.refreshAll();
        App.modalClose();
    }

}

export default StudyNews;