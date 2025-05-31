import Language from './script_language.js';
import App from './script_app.js';
import Study from './script_study.js';

const StudyText = {

    divButtons: '',
    divPretty: '',
    divRaw: '',
    view: 'pretty',

    // load text
    load() {
        let content = '';
        if (Study.obj.text) {
            content = marked.parse(Study.obj.text); // https://github.com/markedjs/marked
            content = content.replace(/<a /g, '<a target="_blank" ');
            document.getElementById('study-refresh-summary').style.display = 'block';
            document.getElementById('study-refresh-video').style.display = 'block';
            document.getElementById('study-refresh-news').style.display = 'block';
            document.getElementById('study-refresh-quiz').style.display = 'block';
            document.getElementById('study-refresh-essay').style.display = 'block';
        }
        this.show(content);
    },

    // show text
    show(content) {
        let tx = '';
        tx += `<div>`;

        // Buttons
        tx += `<div id="study-text-buttons">`;
        tx += `<button class="study-text-button" id="study-text-button-pretty" style="display:none"><i class="fa-regular fa-file"></i></button>`;
        tx += `<button class="study-text-button" id="study-text-button-raw"><i class="fa-solid fa-code"></i></button>`;
        tx += `&nbsp;&nbsp;&nbsp;&nbsp;`
        tx += `<button class="study-text-button" id="study-text-button-bold"><i class="fa-solid fa-bold"></i></button>`;
        tx += `<button class="study-text-button" id="study-text-button-italic"><i class="fa-solid fa-italic"></i></button>`;
        tx += `<button class="study-text-button" id="study-text-button-underline"><i class="fa-solid fa-underline"></i></button>`;
        tx += `<button class="study-text-button" id="study-text-button-strikethrough"><i class="fa-solid fa-strikethrough"></i></button>`;
        tx += `<button class="study-text-button" id="study-text-button-superscript"><i class="fa-solid fa-superscript"></i></button>`;
        tx += `<button class="study-text-button" id="study-text-button-subscript"><i class="fa-solid fa-subscript"></i></button>`;
        tx += `<button class="study-text-button" id="study-text-button-removeFormat"><i class="fa-solid fa-eraser"></i></button>`;
        tx += `&nbsp;&nbsp;&nbsp;&nbsp;`
        tx += `<button class="study-text-button" id="study-text-button-h2">H1</button>`;
        tx += `<button class="study-text-button" id="study-text-button-h3">H2</button>`;
        tx += `<button class="study-text-button" id="study-text-button-p">P</button>`;
        tx += `<button class="study-text-button" id="study-text-button-justifyLeft"><i class="fa-solid fa-align-left"></i></button>`;
        tx += `<button class="study-text-button" id="study-text-button-justifyCenter"><i class="fa-solid fa-align-center"></i></button>`;
        tx += `<button class="study-text-button" id="study-text-button-justifyRight"><i class="fa-solid fa-align-right"></i></button>`;
        // tx += `<button class="study-text-button" id="study-text-button-ol"><i class="fa-solid fa-list-ol"></i></button>`;
        // tx += `<button class="study-text-button" id="study-text-button-ul"><i class="fa-solid fa-list-ul"></i></button>`;
        tx += `&nbsp;&nbsp;&nbsp;&nbsp;`
        tx += `<button class="study-text-button" id="study-text-button-image"><i class="fa-regular fa-image"></i></button>`;
        tx += `<button class="study-text-button" id="study-text-button-link"><i class="fa-solid fa-link"></i></button>`;
        tx += `</div>`;

        // Content
        tx += `<div id="study-text-pretty">${content}</div>`;
        tx += `<textarea id="study-text-raw">${content}</textarea>`;

        tx += `</div>`;

        Study.divText.innerHTML = tx;
        this.divButtons = document.getElementById('study-text-buttons');
        this.divPretty = document.getElementById('study-text-pretty');
        this.divRaw = document.getElementById('study-text-raw');
        this.listenners();
    },

    // Listeners for buttons
    listenners() {

        // Listeners for all study-text-button
        document.querySelectorAll('.study-text-button').forEach(item => {
            item.addEventListener('click', event => {
                let id = event.target.closest('.study-text-button').id.split('-')[3];
                if (id == 'image' || id == 'link') {
                    this.buttonAdd(id);
                } else if (id == 'ol' || id == 'ul') {
                    this.buttonList(id);
                } else if (id == 'pretty' || id == 'raw') {
                    this.buttonView(id);
                } else {
                    let option = '';
                    if (id == 'h2' || id == 'h3' || id == 'p') {
                        option = id;
                        id = 'formatBlock';
                    }
                    this.buttonExecCommand(id, option);
                }
            })
        });

        // Listeners for divPretty and divRaw
        this.divPretty.addEventListener('input', () => this.divRaw.value = this.divPretty.innerHTML);
        this.divRaw.addEventListener('input', () => this.divPretty.innerHTML = this.divRaw.value);
    },

    // open edit mode
    edit() {
        Study.sectionEditShow('text');
        this.divButtons.style.display = 'flex';
        this.divPretty.contentEditable = true;
        this.divPretty.style.border = '1px solid #CCC';
        this.divPretty.style.padding = '10px';
        this.divPretty.focus();
    },

    // save changes and close edit mode
    save() {
        Study.obj.text = this.divPretty.innerHTML;
        Study.storageSet();
        this.hide();
    },

    // don't save changes (return to original text) and close edit mode
    cancel() {
        this.divPretty.innerHTML = marked.parse(App.obj.study[Study.unit][Study.id].text); // https://github.com/markedjs/marked
        this.divRaw.value = App.obj.study[Study.unit][Study.id].text;
        this.hide();
    },

    // close edit mode
    hide() {
        Study.sectionEditHide('text');
        this.divButtons.style.display = 'none';
        this.divPretty.contentEditable = false;
        this.divPretty.style.border = 'none';
        this.divPretty.style.padding = '0';
        this.view = 'pretty';
        this.buttonView(this.view);
        App.modalClose();
    },

    // insert image or link in cursor position
    buttonAdd(option) {

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        let urtTest = ''; // for development purposes
        let valueTest = ''; // for development purposes
        let urlLabel = '';
        let valueLabel = '';
        let valueSize = '';
        let title = '';

        if (option == 'image') {
            title = Language.get('Inserir imagem');
            // urtTest = 'https://www.solvertank.tech/images/cube.png'; // for development purposes
            // valueTest = '10'; // for development purposes
            urlLabel = Language.get('URL da imagem')
            valueLabel = Language.get('Tamanho da imagem')
            valueSize = '5';
        } else if (option == 'link') {
            title = Language.get('Inserir link');
            // urtTest = 'https://www.solvertank.tech/'; // for development purposes
            // valueTest = 'Solvertank'; // for development purposes
            urlLabel = Language.get('URL do link')
            valueLabel = Language.get('Texto do link')
            valueSize = '20';
        } else {
            return;
        }

        let tx = '';
        tx += `<div class="study-modal-row">`;
        tx += `<div class="study-modal-cell-left">${urlLabel}</div>`;
        tx += `<div class="study-modal-cell-right"><input id="study-add-url" size="60" value="${urtTest}"></div>`;
        tx += `</div>`
        tx += `<div class="study-modal-row">`;
        tx += `<div class="study-modal-cell-left">${valueLabel}</div>`;
        tx += `<div class="study-modal-cell-right"><input id="study-add-value" size="${valueSize}" value="${valueTest}"></div>`;
        tx += `</div>`

        document.getElementById('modal-title').innerHTML = title;
        document.getElementById('modal-body').innerHTML = tx;
        document.getElementById('modal-body').contentEditable = false;
        document.getElementById('modal-save').style.display = 'true';
        document.getElementById('modal').showModal();
        document.getElementById('modal').scrollTop = 0;
        document.getElementById('modal-close').addEventListener('click', () => App.modalClose());

        document.getElementById('modal-save').addEventListener('click', () => {
            const url = document.getElementById('study-add-url').value;
            const value = document.getElementById('study-add-value').value;
            if (url && url.match(/(https?:\/\/[^\s]+)/g)) {
                if (option == 'image') {
                    const img = document.createElement('img');
                    img.src = url;
                    img.style.width = value ? `${value}%` : '100%';
                    img.style.height = 'auto';
                    range.insertNode(img);
                } else if (option == 'link') {
                    const link = document.createElement('a');
                    link.href = url;
                    link.target = '_blank';
                    link.textContent = value ? value : url;
                    range.insertNode(link);
                }
                this.divRaw.value = this.divPretty.innerHTML
                App.modalClose();
            } else {
                alert(Language.get('URL inválida'));
            }
        });
    },

    // insert list in cursor position
    // FAZER FUNCIONAR !!!!!!!
    buttonList(option) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        const list = document.createElement(option);
        selectedText.split("\n").forEach(line => {
            console.log(line);
            const li = document.createElement("li");
            li.textContent = line.trim();
            list.appendChild(li);
        });
        range.deleteContents();
        range.insertNode(list);
    },

    // execute command in cursor position
    buttonExecCommand(command, option) {
        document.execCommand(command, false, option);
    },

    // toggle view between pretty and raw
    buttonView(option) {
        this.view = option;
        if (this.view == 'raw') {
            document.querySelectorAll('.study-text-button').forEach(item => item.style.display = 'none');
            document.getElementById('study-text-button-pretty').style.display = 'block';
            this.divRaw.style.display = 'block';
            this.divPretty.style.display = 'none';
        } else {
            document.querySelectorAll('.study-text-button').forEach(item => item.style.display = 'block');
            document.getElementById('study-text-button-pretty').style.display = 'none';
            this.divRaw.style.display = 'none';
            this.divPretty.style.display = 'block';
        }
    },

 
    refresh() {

        const title = Language.get('Gerar texto');
        let tx = '';
        tx += Language.get('alert-text');
        tx += `<textarea id="study-text-prompt-area" style="width:100%;height:200px"></textarea>`;
        tx += `<button class="button" id="study-text-prompt-button"><img width="25" src="images/aiStars.png"><div>${Language.get('Gerar')}</div></button>`;
       
        document.getElementById('modal-title').innerHTML = title;
        document.getElementById('modal-body').innerHTML = tx;
        document.getElementById('modal-body').contentEditable = false;
        document.getElementById('modal-save').style.display = 'none';
        document.getElementById('modal').showModal();
        document.getElementById('modal').scrollTop = 0;
        document.getElementById('modal-close').addEventListener('click', () => App.modalClose());

        document.getElementById('study-text-prompt-button').addEventListener('click', () => {
            const complement = document.getElementById('study-text-prompt-area').value;
            this.generate(complement);
            App.modalClose();
        });

    },
 

    // AI Generation of MAIN TEXT
    async generate(complement) {

        // Apaga tudo
        Study.obj.summary = '';
        Study.obj.text = '';
        Study.obj.video = '';
        Study.obj.news = '';
        Study.obj.quiz = '';
        Study.obj.essay = '';
        Study.divSummary.innerHTML = '';
        Study.divVideo.innerHTML = '';
        Study.divNews.innerHTML = '';
        Study.divQuiz.innerHTML = '';
        Study.divEssay.innerHTML = '';
        Study.storageSet();


        // Processamento no servidor
        Study.divText.innerHTML = Study.processing;
        document.getElementById(`study-refresh-text`).style.display = 'none';

        const url = App.path + 'study_text';
        const data = {
            competency: Study.competency,
            challenge: Study.challenge,
            title: Study.title,
            description: Study.description,
            language: App.obj.language,
            level: App.obj.builder.level,
            complement: complement,
        };

        // AI Generation of MAIN TEXT
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                Study.divText.innerHTML = 'Error...';
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const resp = await response.json();
            const texto = resp.texto;
            Study.obj.text = texto;
            Study.storageSet();
            Study.refreshAll();
        } catch (error) {
            Study.divText.innerHTML = Language.get('Ocorreu um erro, lamento. Por favor, tente novamente.');
            console.error('An error occurred:', error.message);
            console.log(JSON.stringify(data));
        }

    },



}

export default StudyText;