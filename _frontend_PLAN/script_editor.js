import App from './script_app.js';
import Builder from './script_builder.js';
import Language from './script_language.js';

const Editor = {

    lastClickedElement: null,

    // Inicializa o editor em cada linha
    line(id, content, buttonDelete = true) {
        const action = id.split('_')[0];
        let tx = '';
        tx += `<div class="editor-line">`;
        tx += `<div data-editor="lineContent-${id}" id="lineContent-${id}" class="editor-line-content">${content}</div>`;
        tx += `<div class="editor-buttons editor-buttons-${action}">`;
        tx += `<div data-editor="lineButtonEdit-${id}" id="lineButtonEdit-${id}" class="editor-button editor-button-edit"><i class="fa-solid fa-pen-to-square"></i></div>`;
        if (buttonDelete) tx += `<div data-editor="lineButtonDelete-${id}" id="lineButtonDelete-${id}" class="editor-button editor-button-delete"><i class="fa-solid fa-trash"></i></div>`;
        tx += `<div data-editor="lineButtonSave-${id}" id="lineButtonSave-${id}" class="editor-button editor-button-save"><i class="fa-solid fa-check"></i></div>`;
        tx += `<div data-editor="lineButtonCancel-${id}" id="lineButtonCancel-${id}" class="editor-button editor-button-cancel"><i class="fa-solid fa-ban"></i></div>`;
        tx += `</div>`;
        tx += `</div>`;
        return tx;
    },

    // Inicializa os eventos do editor
    listeners() {

        // Captura o último elemento clicado
        document.addEventListener('mousedown', (event) => {
            this.lastClickedElement = event.target.outerHTML;
        });

        // Click no botão de edição
        document.querySelectorAll('.editor-button').forEach(item => {
            item.addEventListener('click', event => {
                const data = event.target.closest('.editor-button').dataset.editor;
                const action = data.split('-')[0];
                const id = data.split('-')[1];
                if (action === 'lineButtonEdit') {
                    this.lineEdit(id);
                } else if (action === 'lineButtonDelete') {
                    this.lineDelete(id);
                } else if (action === 'lineButtonSave') {
                    this.lineSave(id);
                } else if (action === 'lineButtonCancel') {
                    this.lineCancel(id);
                } else if (action === 'lineButtonInsert') {
                    this.insert(id);
                }
            });
        });


        // Eventos do campo de edição
        document.querySelectorAll('.editor-line-content').forEach(item => {

            // Sai do modo de edição ao clicar fora do campo
            item.addEventListener('focusout', event => {
                if (this.lastClickedElement != '<i class="fa-solid fa-check"></i>') { // Se não clicou no botão salvar
                    this.lineCancel();
                }
            });

            // Cola somente texto puro no campo de edição
            item.addEventListener('paste', event => {
                event.preventDefault();
                const text = event.clipboardData.getData('text/plain');
                document.execCommand('insertHTML', false, text);
            });

        });

    },

    // Oculta os SELECIONADOS botões editar e excluir, mostrando os SELECIONADOS salvar e cancelar
    lineButtonsHide(id) {
        document.getElementById(`lineButtonEdit-${id}`).style.display = 'none';
        if (document.getElementById(`lineButtonDelete-${id}`)) document.getElementById(`lineButtonDelete-${id}`).style.display = 'none';
        document.getElementById(`lineButtonSave-${id}`).style.display = 'block';
        document.getElementById(`lineButtonCancel-${id}`).style.display = 'block';
    },

    // Mostra TODOS os botões editar e excluir, ocultando TODOS salvar e cancelar
    lineButtonsShow() {
        document.querySelectorAll('.editor-button-edit').forEach(item => item.style.display = 'block');
        document.querySelectorAll('.editor-button-delete').forEach(item => item.style.display = 'block');
        document.querySelectorAll('.editor-button-save').forEach(item => item.style.display = 'none');
        document.querySelectorAll('.editor-button-cancel').forEach(item => item.style.display = 'none');
        document.querySelectorAll('.editor-line-content').forEach(item => item.contentEditable = false); // Desabilita a edição
    },

    // Habilita a edição do conteúdo da linha
    lineEdit(id) {
        document.getElementById(`lineContent-${id}`).contentEditable = true; // Habilita a edição
        document.getElementById(`lineContent-${id}`).focus();
        this.lineButtonsHide(id);
    },

    // Salva o conteúdo da linha
    lineSave(id) {
        const contentTXT = document.getElementById(`lineContent-${id}`).innerText;
        const index = id.split('_')[1];
        const index2 = id.split('_')[2];

        // Competência
        if (id == 'competency_0') {
            App.obj.builder.competency = contentTXT;

            // CHA
        } else if (id.includes('knowledge')) {
            App.obj.builder.knowledge[index] = contentTXT;
        } else if (id.includes('skills')) {
            App.obj.builder.skills[index] = contentTXT;
        } else if (id.includes('attitudes')) {
            App.obj.builder.attitudes[index] = contentTXT;

            // Desafio
        } else if (id.includes('challengeTitle')) {
            App.obj.builder.challenge.title = contentTXT;
        } else if (id.includes('challengeContext')) {
            App.obj.builder.challenge.context = contentTXT;
        } else if (id.includes('challengeObjective')) {
            App.obj.builder.challenge.objective = contentTXT;
        } else if (id.includes('challengeArtifact')) {
            App.obj.builder.challenge.artifacts[index].title = contentTXT;
        } else if (id.includes('challengeDescription')) {
            App.obj.builder.challenge.artifacts[index].description = contentTXT;
        } else if (id.includes('challengeRubric')) {
            App.obj.builder.challenge.artifacts[index].rubric = contentTXT;

            // Atividades
        } else if (id.includes('advisingTitle')) {
            App.obj.builder.activities[index].advising.title = contentTXT;
        } else if (id.includes('advisingDescription')) {
            App.obj.builder.activities[index].advising.description = contentTXT;
        } else if (id.includes('instructionTitle')) {
            App.obj.builder.activities[index].instructions[index2].title = contentTXT;
        } else if (id.includes('instructionDescription')) {
            App.obj.builder.activities[index].instructions[index2].description = contentTXT;
        } else if (id.includes('studyTitle')) {
            App.obj.builder.activities[index].studies[index2].title = contentTXT;

        }
        App.storageSet();
        this.lineCancel();
    },

    // Cancela a edição da linha e volta ao estado inicial
    lineCancel() {
        Builder.refresh();
        this.lineButtonsShow();
    },

    // Exclui a linha selecionada
    lineDelete(id) {
        if (confirm(Language.get('Atenção: essa ação não poderá ser desfeita. Confirma a exclusão dessa linha?'))) {
            if (id == 'competency_0') {
                App.obj.builder.competency = '';
            } else if (id.includes('knowledge')) {
                const index = id.split('_')[1];
                App.obj.builder.knowledge.splice(index, 1);
            } else if (id.includes('skills')) {
                const index = id.split('_')[1];
                App.obj.builder.skills.splice(index, 1);
            } else if (id.includes('attitudes')) {
                const index = id.split('_')[1];
                App.obj.builder.attitudes.splice(index, 1);
            }
            App.storageSet();
            this.lineCancel(id);
        }
    },

    // Retorna o botão de inserção
    insertButton(id) {
        const action = id.split('_')[0];
        let tx = '';
        tx += `<div data-editor="lineButtonInsert-${id}" id="lineButtonInsert-${id}" class="editor-button editor-buttons-${action} editor-button-insert"><i class="fa-solid fa-plus"></i></div>`;
        return tx;
    },

    // Insere um novo item
    insert(id) {
        let msg = '';
        if (id.includes('knowledge')) {
            msg = 'Digite o novo conhecimento';
        } else if (id.includes('skills')) {
            msg = 'Digite a nova habilidade';
        } else if (id.includes('attitudes')) {
            msg = 'Digite a nova atitude';
        }
        msg = Language.get(msg) + ':';
        const newItem = prompt(msg);
        if (newItem) {
            if (id.includes('knowledge')) {
                App.obj.builder.knowledge.push(newItem);
            } else if (id.includes('skills')) {
                App.obj.builder.skills.push(newItem);
            } else if (id.includes('attitudes')) {
                App.obj.builder.attitudes.push(newItem);
            }
            App.storageSet();
            Builder.refresh();
        }
    },


}


export default Editor;