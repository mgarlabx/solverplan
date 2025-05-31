import Builder from "./script_builder.js";
import Study from "./script_study.js";
import Language from "./script_language.js";

const App = {

    obj: null,

    path: 'https://4ovay2t6xzt6scwbkqd7bsvkqi0kivlw.lambda-url.us-west-2.on.aws/',

    // Carrega parâmetros iniciais
    load() {

        // Exibe menu
        document.getElementById('menu-toggle').addEventListener('click', () => this.menuShow());

        // Clique nos itens do menu
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', event => {
                const action = event.target.closest('.menu-item').id;
                this.menuClick(action);
            });
        });

        // Oculta menu
        document.getElementById('header-left').addEventListener('click', () => this.menuHide());
        document.getElementById('builder').addEventListener('click', () => this.menuHide());
        document.getElementById('menu-dropdown').addEventListener('mouseleave', () => this.menuHide());

        this.storageGet();
        Language.headerRefresh();
        Builder.load();
        Builder.refresh();
        Z.recordAccess('solverplan');

    },

    menuShow() {
        document.getElementById('menu-dropdown').style.display = 'block';
    },

    menuHide() {
        document.getElementById('menu-dropdown').style.display = 'none';
    },

    modalClose() {
        document.getElementById('modal').close();
        this.videoStop();

        const element = document.getElementById('modal-save');
        const clonedElement = element.cloneNode(true);  // Clone the element without listeners
        element.replaceWith(clonedElement);  // Replace original with the cloned one

        const element2 = document.getElementById('modal-close');
        const clonedElement2 = element2.cloneNode(true);  // Clone the element without listeners
        element2.replaceWith(clonedElement2);  // Replace original with the cloned one

    },

    videoStop() {
        if (document.getElementById('study-video-iframe')) {
            document.getElementById('study-video-iframe').src = '';
        }
    },

    menuClick(action) {
        this.menuHide();
        if (action === 'menu-new') {
            this.new();
        } else if (action === 'menu-en') {
            Language.set('en');
        } else if (action === 'menu-pt') {
            Language.set('pt');
        } else if (action === 'menu-es') {
            Language.set('es');
        } else if (action === 'menu-te') {
            Language.set('te');
        } else if (action === 'menu-download') {
            this.download();
        } else if (action === 'menu-upload') {
            this.upload();
        } else if (action === 'menu-edit') {
            this.edit();
        } else if (action === 'menu-clean') {
            this.clean();
        } else if (action === 'menu-feedback') {
            this.feedback();
        } else if (action === 'menu-info') {
            this.info();
        }
    },

    // Exibe o modal de processamento
    processingShow() {
        document.getElementById('processing').style.display = 'flex';
    },

    // Oculta o modal de processamento
    processingHide() {
        document.getElementById('processing').style.display = 'none';
    },

    // Recupera os dados do armazenamento local
    storageGet() {
        if (localStorage.getItem('solverplan')) {
            this.obj = JSON.parse(localStorage.getItem('solverplan'));
            if (!this.obj.language) {
                this.obj.language = Language.getBrowserLanguage();
                this.storageSet();
            }
        } else {
            const user = Math.random().toString(36).substring(2, 22) + '-' + Math.random().toString(36).substring(2, 22);
            this.obj = {
                user: user,
                session: null,
                language: Language.getBrowserLanguage(),
                accepted: false,
                builder: {},
                study: [],
            };
            this.newObj();
        }
        if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
            this.obj.user = 'mgar-local';
            this.storageSet();
        }
    },

    // Armazena os dados no armazenamento local
    storageSet() {
        localStorage.setItem('solverplan', JSON.stringify(this.obj));
    },

    // Cria um novo planejamento
    new() {
        if (confirm(Language.get('menu-new-confirm'))) {
            this.newObj();
            Study.close();
            Builder.refresh();
        }
    },

    // Cria um novo objeto de planejamento
    newObj() {
        const session = Math.random().toString(36).substring(2, 22) + '-' + Math.random().toString(36).substring(2, 22);
        this.obj.session = session;
        this.obj.accepted = false;
        this.obj.builder.level = null;
        this.obj.builder.input = null;
        this.obj.builder.competency = null;
        this.obj.builder.knowledge = null;
        this.obj.builder.skills = null;
        this.obj.builder.attitudes = null;
        this.obj.builder.challenge = null;
        this.obj.builder.activities = null;
        this.obj.study = [];
        this.storageSet();
        this.sessionSave();

    },

    // Baixa o arquivo JSON do planejamento
    download() {
        const objDownload = {
            builder: this.obj.builder,
            study: this.obj.study,
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objDownload));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "solverplan.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    },

    // Faz o upload do arquivo JSON do planejamento
    upload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = event => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = event => {
                try {
                    const obj = JSON.parse(event.target.result);
                    if (obj.builder && obj.study) {
                        if (obj.builder.competency) {
                            this.obj.builder = obj.builder;
                            this.obj.study = obj.study;
                            this.storageSet();
                            Builder.refresh();
                        } else {
                            alert(Language.get('Arquivo inválido, dados não foram carregados') + '.');
                        }
                    } else {
                        alert(Language.get('Arquivo inválido, dados não foram carregados') + '.');
                    }
                } catch (error) {
                    alert(Language.get('Arquivo inválido, dados não foram carregados') + '.');
                    console.error('Error:', error);
                }

            };
            reader.readAsText(file);
        };
        input.click();
    },

    // Edita o JSON do local storage
    edit() {
        alert(Language.get('menu-cache-edit-confirm'));
        let tx = JSON.stringify(this.obj, null, '\t');
        tx = tx.replace(/\n/g, '<br>');
        tx = tx.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        document.getElementById('modal-title').innerHTML = 'Cache (local storage)';
        document.getElementById('modal-body').innerHTML = tx;
        document.getElementById('modal-body').contentEditable = true;
        document.getElementById('modal-save').style.display = 'block';
        document.getElementById('modal').showModal();
        document.getElementById('modal').scrollTop = 0;
        document.getElementById('modal-close').addEventListener('click', () => App.modalClose());
        document.getElementById('modal-save').addEventListener('click', () => this.editSave());
    },

    // Salva o JSON editado
    editSave() {
        let tx = document.getElementById('modal-body').innerHTML;
        tx = tx.replace(/<br>/g, '\n');
        tx = tx.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, '');
        try {
            this.obj = JSON.parse(tx);
            this.storageSet();
            Study.close();
            Builder.refresh();
            document.getElementById('modal').close();
        } catch (error) {
            alert(Language.get('Erro ao salvar, verifique o formato JSON.'));
        }
    },

    clean() {
        if (confirm(Language.get('Atenção. Essa ação irá limpar os dados armazenados e não poderá ser refeita. Confirma?'))) {
            localStorage.removeItem('solverplan');
            this.storageGet();
            Study.close();
            Builder.refresh();
        }
    },

    feedback() {
        //https://forms.gle/czig6gKNrNNaTtYW7
        window.open('https://forms.gle/czig6gKNrNNaTtYW7', '_blank');

    },

    info() {
        let tx = '<b>' + Language.get('Idealizado e desenvolvido por Maurício Garcia') + '</b><p>';
        tx += Language.get('menu-about-txt');

        document.getElementById('modal-title').innerHTML = Language.get('Sobre o Solverplan');
        document.getElementById('modal-body').innerHTML = tx;
        document.getElementById('modal-body').contentEditable = false;
        document.getElementById('modal-save').style.display = 'none';
        document.getElementById('modal').showModal();
        document.getElementById('modal').scrollTop = 0;
        document.getElementById('modal-close').addEventListener('click', () => App.modalClose());

        // Gambware para guardar o usuário mgar
        document.getElementById('mgar').addEventListener('click', () => {
            App.obj.user = 'mgar-click';
            App.storageSet();
        });

    },

    sessionSave() {
        const url = `${App.path}session_save`;
        let step = 0;
        if (this.obj.builder.activities) step = 6
        else if (this.obj.builder.challenge) step = 5
        else if (this.obj.builder.attitudes) step = 4
        else if (this.obj.builder.skills) step = 3
        else if (this.obj.builder.knowledge) step = 2
        else if (this.obj.builder.competency) step = 1
        const body = {
            user: this.obj.user,
            session: this.obj.session,
            tool: 'solverplan',
            step: step,
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {
                //console.log('Session saved:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }

};

export default App;