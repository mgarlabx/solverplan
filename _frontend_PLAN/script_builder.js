import App from './script_app.js';
import Study from './script_study.js';
import Editor from './script_editor.js';
import Accordion from './script_accordion.js';
import Language from './script_language.js';

const Builder = {

    dom: null,

    accordionsArtifacts: [],
    accordionsActivities: [],
    scrollY: 0,

    // Carrega parâmetros iniciais
    load() {
        this.dom = document.getElementById('builder');
    },

    // Inicia a construção da div do builder
    beginDiv(title, class_name = '') {
        let tx = '';
        tx += `<div class="builder-section ${class_name}">`;
        tx += `<h2>${title}</h2>`;
        return tx;
    },

    // Finaliza a construção da div do builder
    endDiv() {
        return '</div>';
    },


    // Atualiza a tela do builder
    refresh() {


        // Versões anteriores ... sorry
        if (App.obj.builder.challenge) {
            if (!App.obj.builder.challenge.artifacts) {
                alert('Eu ainda estou definindo a estrutura dos dados, pode ser que planejamentos feitos antes dessa versão sejam exibidos apenas parcialmente. Tente refazer, por favor. Lamento pelo transtorno e agradeço a compreensão.');
                App.obj.builder.challenge = null;
                App.obj.builder.activities = null;
                App.obj.study = [];
                App.storageSet();
            }
        }
        if (App.obj.builder.activities) {
            if (!App.obj.builder.activities[0].advising) {
                alert('Eu ainda estou definindo a estrutura dos dados, pode ser que planejamentos feitos antes dessa versão sejam exibidos apenas parcialmente. Tente refazer, por favor. Lamento pelo transtorno e agradeço a compreensão.');
                App.obj.builder.activities = null;
                App.obj.study = [];
                App.storageSet();
            }
        }


        // Define o nível educacional padrão
        if (!App.obj.builder.level) {
            App.obj.builder.level = 'graduacao';
            App.storageSet();
        }

        // Exibe ou oculta botões de download/upload do JSON
        document.querySelectorAll('.header-button-json').forEach(element => element.style.display = App.obj.accepted ? 'block' : 'none');

        let tx = '';

        // Terms
        const checked = App.obj.accepted ? 'checked' : '';
        tx += this.beginDiv(Language.get('Termos de uso'), 'builder-terms');
        tx += Language.get('terms-of-use');
        tx += `<input type="checkbox" id="builder-terms" ${checked}>` + Language.get('Sim');
        tx += this.endDiv();
        if (!App.obj.accepted) {
            this.write(tx);
            return;
        }

        // Competency
        if (App.obj.builder.competency === null) {

            const level = App.obj.builder.level;
            const selected_infantil = level === 'infantil' ? ' selected' : '';
            const selected_fundamental = level === 'fundamental' ? ' selected' : '';
            const selected_medio = level === 'medio' ? ' selected' : '';
            const selected_graduacao = level === 'graduacao' ? ' selected' : '';
            const selected_posgraduacao = level === 'posgraduacao' ? ' selected' : '';
            const selected_executiva = level === 'executiva' ? ' selected' : '';
            const selected_outros = level === 'outros' ? ' selected' : '';
            const tx_input = App.obj.builder.input ? App.obj.builder.input : '';

            tx += this.beginDiv(Language.get('Competência'));
            tx += `<p>${Language.get('Defina o nível educacional')}: `;
            tx += '<select id="input-level">';
            tx += `<option ${selected_infantil} value="infantil">${Language.get('Educação Infantil')}</option>`;
            tx += `<option ${selected_fundamental} value="fundamental">${Language.get('Ensino Fundamental')}</option>`;
            tx += `<option ${selected_medio} value="medio">${Language.get('Ensino Médio')}</option>`;
            tx += `<option ${selected_graduacao} value="graduacao">${Language.get('Ensino Superior - Graduação')}</option>`;
            tx += `<option ${selected_posgraduacao} value="posgraduacao">${Language.get('Ensino Superior - Pós-graduação')}</option>`;
            tx += `<option ${selected_executiva} value="executiva">${Language.get('Educação Executiva')}</option>`;
            tx += `<option ${selected_outros} value="outros">${Language.get('Outros tipos de educação')}</option>`;
            tx += '</select>';
            tx += `<p>${Language.get('Insira palavras-chave para elaborar a competência a ser desenvolvida')}:</p>`;
            tx += `<input type="text" id="input-competency" value="${tx_input}"><p>`;
            if (App.obj.language === 'pt') {
                tx += `<div class="builder-competency-links">Precisa de inspiração? `;
                tx += `<a target="_blank" href="http://portal.mec.gov.br/component/content/article?id=12991">DCN</a>&nbsp;&nbsp;&nbsp;`;
                tx += `<a target="_blank" href="https://cientificar1992.pythonanywhere.com/visualizarBncc/">BNCC</a>&nbsp;&nbsp;&nbsp;`;
                tx += `<a target="_blank" href="https://odsbrasil.gov.br/">ODS</a>`;
                tx += `</div>`;
            }
            tx += `<button class="button" id="builder-competency"><img width="25" src="images/aiStars.png"><div>${Language.get('Gerar competência')}</div></button>`;
            tx += this.endDiv();
            this.write(tx);
            return;
        } else {
            let txLevel = '';
            if (App.obj.builder.level === 'infantil') txLevel = Language.get('Educação Infantil');
            else if (App.obj.builder.level === 'fundamental') txLevel = Language.get('Ensino Fundamental');
            else if (App.obj.builder.level === 'medio') txLevel = Language.get('Ensino Médio');
            else if (App.obj.builder.level === 'graduacao') txLevel = Language.get('Ensino Superior - Graduação');
            else if (App.obj.builder.level === 'posgraduacao') txLevel = Language.get('Ensino Superior - Pós-graduação');
            else if (App.obj.builder.level === 'executiva') txLevel = Language.get('Educação Executiva');
            else if (App.obj.builder.level === 'outros') txLevel = Language.get('Outros tipos de educação');
            tx += this.beginDiv(Language.get('Competência'));
            tx += `${Language.get('Nível educacional')}: ${txLevel}<p>`;
            tx += Editor.line('competency_0', App.obj.builder.competency, false);
            if (!App.obj.builder.knowledge) tx += this.buttons(Language.get('Gerar conhecimentos'));
            tx += this.endDiv();
        }

        // Knowledge
        if (App.obj.builder.knowledge) {
            tx += this.beginDiv(Language.get('Conhecimentos'));
            tx += `<ul>`;
            App.obj.builder.knowledge.forEach((item, index) => {
                tx += `<li>`;
                tx += Editor.line(`knowledge_${index}`, item.charAt(0).toUpperCase() + item.slice(1));
                tx += `</li>`;

            });
            tx += Editor.insertButton('knowledge');
            tx += `</ul>`;
            if (!App.obj.builder.skills) tx += this.buttons(Language.get('Gerar habilidades'));
            tx += this.endDiv();
        }

        // Skills
        if (App.obj.builder.skills) {
            tx += this.beginDiv(Language.get('Habilidades'));
            tx += `<ul>`;
            App.obj.builder.skills.forEach((item, index) => {
                tx += `<li>`;
                tx += Editor.line(`skills_${index}`, item.charAt(0).toUpperCase() + item.slice(1));
                tx += `</li>`;

            });
            tx += Editor.insertButton('skills');
            tx += `</ul>`;
            if (!App.obj.builder.attitudes) tx += this.buttons(Language.get('Gerar atitudes'));
            tx += this.endDiv();
        }

        // Attitudes
        if (App.obj.builder.attitudes) {
            tx += this.beginDiv(Language.get('Atitudes'));
            tx += `<ul>`;
            App.obj.builder.attitudes.forEach((item, index) => {
                tx += `<li>`;
                tx += Editor.line(`attitudes_${index}`, item.charAt(0).toUpperCase() + item.slice(1));
                tx += `</li>`;

            });
            tx += Editor.insertButton('attitudes');
            tx += `</ul>`;
            if (!App.obj.builder.challenge) tx += this.buttons(Language.get('Gerar desafio'));
            tx += this.endDiv();
        }

        // Challenge
        if (App.obj.builder.challenge) {
            tx += this.beginDiv(Language.get('Desafio'));
            tx += `<b>${Language.get('Título')}</b>: ` + Editor.line(`challengeTitle`, App.obj.builder.challenge.title, false) + `<p>`;
            tx += `<b>${Language.get('Contexto')}</b>: ` + Editor.line(`challengeContext`, App.obj.builder.challenge.context, false) + `<p>`;
            tx += `<b>${Language.get('Objetivo')}</b>: ` + Editor.line(`challengeObjective`, App.obj.builder.challenge.objective, false) + `<p>`;
            tx += `<b>${Language.get('Artefatos')}</b>:<p>`;
            App.obj.builder.challenge.artifacts.forEach((artifact, index) => {
                if (this.accordionsArtifacts.length == index) this.accordionsArtifacts.push('none'); // Accordion open/closed
                tx += Accordion.getParent('builder', 'artifact', index, Language.get('Artefato'));
                tx += `<div class="accordion-child" id="builder-artifact-child-${index}" style="display:${this.accordionsArtifacts[index]};">`;
                tx += `<b>${Language.get('Título')}</b>: ` + Editor.line(`challengeArtifact_${index}`, artifact.title, false) + `<p>`;
                tx += `<b>${Language.get('Descrição')}</b>: ` + Editor.line(`challengeDescription_${index}`, artifact.description, false) + `<p>`;
                tx += `<b>${Language.get('Rubrica')}</b>: ` + Editor.line(`challengeRubric_${index}`, artifact.rubric, false) + `<p>`;
                tx += `</div>`;
            });
            if (!App.obj.builder.activities) tx += this.buttons(Language.get('Gerar atividades'));
            tx += this.endDiv();
        }

        // Activities
        if (App.obj.builder.activities) {
            tx += this.beginDiv(Language.get('Atividades'));
            App.obj.builder.activities.forEach((activity, index) => {
                if (this.accordionsActivities.length == index) this.accordionsActivities.push('none'); // Accordion open/closed
                tx += Accordion.getParent('builder', 'activity', index, Language.get('Unidade'));
                tx += `<div class="accordion-child" id="builder-activity-child-${index}" style="display:${this.accordionsActivities[index]};">`;

                tx += `<h4>${Language.get('Encontro de Orientação')}</h4>`;
                tx += `<ul><li>`;
                tx += `<p><b>${Language.get('Título')}</b>: ` + Editor.line(`advisingTitle_${index}`, activity.advising.title, false) + `</p>`;
                tx += `<p><b>${Language.get('Descrição')}</b>: ` + Editor.line(`advisingDescription_${index}`, activity.advising.description, false) + `</p>`;
                tx += `</li></ul>`;

                tx += `<h4>${Language.get('Encontros de Instrução')}</h4>`;
                tx += `<ul>`;
                activity.instructions.forEach((instruction, index2) => {
                    tx += `<li>`;
                    tx += `<p><b>${Language.get('Título')}</b>: ` + Editor.line(`instructionTitle_${index}_${index2}`, instruction.title, false) + `</p>`;
                    tx += `<p><b>${Language.get('Descrição')}</b>: ` + Editor.line(`instructionDescription_${index}_${index2}`, instruction.description, false) + `</p>`;
                    tx += `</li>`;
                });
                tx += `</ul>`;

                tx += `<h4>${Language.get('Autoestudos')}</h4>`;
                tx += `<ul>`;
                activity.studies.forEach((study, index2) => {
                    tx += `<li>`;
                    tx += `<div class="study-line" id="study-line-${activity.unit}-${index2}">${study.title}</div>`;
                    tx += `</li>`;
                });
                tx += `</ul>`;

                tx += `<h4>${Language.get('Artefato a ser entregue')}:</h4>`;
                tx += `<ul>`;
                tx += `<li><p>` + App.obj.builder.challenge.artifacts[index].title + `</p></li>`;
                tx += `</ul>`;

                tx += `</div>`;
            });

            tx += '<div class="buttons">';
            tx += '<button class="button button-back" id="builder-previous">' + Language.get('Voltar') + '</button>';
            tx += '</div>';
            tx += this.endDiv();

            // Array for "autoestudos"
            if (App.obj.study.length === 0) {
                let atv = [];
                App.obj.builder.activities.forEach(activity => {
                    let atvw = [];
                    activity.studies.forEach(() => {
                        atvw.push({
                            summary: '',
                            text: '',
                            video: '',
                            news: '',
                            quiz: '',
                            essay: '',
                        });
                    });
                    atv.push(atvw);
                });
                App.obj.study = atv;
                App.storageSet();
            }
        }

        this.write(tx);

        //Study.showStudy(1, 1); // GAMBWARE 

    },

    // Escreve o texto na div do builder
    write(tx) {

        this.dom.innerHTML = tx;

        // Accordion
        Accordion.listeners();

        // Click event dos botões
        if (document.getElementById('builder-terms')) document.getElementById('builder-terms').addEventListener('click', () => this.terms());
        if (document.getElementById('builder-competency')) document.getElementById('builder-competency').addEventListener('click', () => this.competency());
        if (document.getElementById('builder-previous')) document.getElementById('builder-previous').addEventListener('click', () => this.previous());
        if (document.getElementById('builder-next')) document.getElementById('builder-next').addEventListener('click', () => this.next());

        // Eventos das atividades
        if (App.obj.builder.activities) {
            // Click nos botões dos autoestudos
            document.querySelectorAll('.study-line').forEach(item => {
                item.addEventListener('click', event => {
                    const unit = parseInt(event.target.id.split('-')[2]);
                    const id = parseInt(event.target.id.split('-')[3]);
                    this.scrollY = window.scrollY || window.pageYOffset; // Salva a posição vertical da janela, para voltar depois do Study
                    Study.showStudy(unit, id);
                });
            });
        };

        // Oculta botões de edição das linhas conforme a etapa
        document.querySelectorAll('.editor-buttons').forEach(item => item.style.display = 'none');
        document.querySelectorAll('.editor-button-insert').forEach(item => item.style.display = 'none');
        if (App.obj.builder.activities) {
            document.querySelectorAll('.editor-button-delete').forEach(item => item.style.display = 'none');
            document.querySelectorAll('.editor-buttons-advisingTitle').forEach(item => item.style.display = 'flex');
            document.querySelectorAll('.editor-buttons-advisingDescription').forEach(item => item.style.display = 'flex');
            document.querySelectorAll('.editor-buttons-instructionTitle').forEach(item => item.style.display = 'flex');
            document.querySelectorAll('.editor-buttons-instructionDescription').forEach(item => item.style.display = 'flex');
            document.querySelectorAll('.editor-buttons-studyTitle').forEach(item => item.style.display = 'flex');
        } else if (App.obj.builder.challenge) {
            document.querySelectorAll('.editor-button-delete').forEach(item => item.style.display = 'none');
            document.querySelectorAll('.editor-buttons-challengeTitle').forEach(item => item.style.display = 'flex');
            document.querySelectorAll('.editor-buttons-challengeContext').forEach(item => item.style.display = 'flex');
            document.querySelectorAll('.editor-buttons-challengeObjective').forEach(item => item.style.display = 'flex');
            document.querySelectorAll('.editor-buttons-challengeArtifact').forEach(item => item.style.display = 'flex');
            document.querySelectorAll('.editor-buttons-challengeDescription').forEach(item => item.style.display = 'flex');
            document.querySelectorAll('.editor-buttons-challengeRubric').forEach(item => item.style.display = 'flex');
        } else if (App.obj.builder.attitudes) {
            document.querySelectorAll('.editor-buttons-attitudes').forEach(item => item.style.display = 'flex');
        } else if (App.obj.builder.skills) {
            document.querySelectorAll('.editor-buttons-skills').forEach(item => item.style.display = 'flex');
        } else if (App.obj.builder.knowledge) {
            document.querySelectorAll('.editor-buttons-knowledge').forEach(item => item.style.display = 'flex');
        } else if (App.obj.builder.competency) {
            document.querySelectorAll('.editor-buttons-competency').forEach(item => item.style.display = 'flex');
        }

        // Click no select do nível educacional
        if (document.getElementById('input-level')) {
            document.getElementById('input-level').addEventListener('change', () => {
                App.obj.builder.level = document.getElementById('input-level').value;
                App.storageSet();
            });
        }

        // Click event editor buttons
        Editor.listeners();

        // Salva a sessão
        App.sessionSave();

    },

    // Botões de navegação
    buttons(buttonNext) {
        let tx = '';
        tx += '<div class="buttons">';
        tx += '<button class="button button-back" id="builder-previous">' + Language.get('Voltar') + '</button>&nbsp;&nbsp;&nbsp;';
        tx += `<button class="button" id="builder-next">`;
        tx += `<div class="button-element"><img width="25" src="images/aiStars.png"></div>`;
        tx += `<div class="button-element">${buttonNext}</div>`;
        tx += `</button>`;
        tx += '</div>';
        return tx;
    },


    // Avança na navegação do builder
    next() {
        if (App.obj.builder.competency && !App.obj.builder.knowledge) {
            this.knowledge();
        } else if (App.obj.builder.knowledge && !App.obj.builder.skills) {
            this.skills();
        } else if (App.obj.builder.skills && !App.obj.builder.attitudes) {
            this.attitudes();
        } else if (App.obj.builder.attitudes && !App.obj.builder.challenge) {
            this.challenge();
        } else if (App.obj.builder.challenge && !App.obj.builder.activities) {
            this.activities();
        }
    },


    // Volta na navegação do builder
    previous() {

        if (App.obj.builder.competency && !App.obj.builder.knowledge) {
            App.obj.builder.competency = null;
            App.storageSet();
            this.refresh();
        } else if (App.obj.builder.knowledge && !App.obj.builder.skills) {
            App.obj.builder.knowledge = null;
            App.storageSet();
            this.refresh();
        } else if (App.obj.builder.skills && !App.obj.builder.attitudes) {
            App.obj.builder.skills = null;
            App.storageSet();
            this.refresh();
        } else if (App.obj.builder.attitudes && !App.obj.builder.challenge) {
            App.obj.builder.attitudes = null;
            App.storageSet();
            this.refresh();
        } else if (App.obj.builder.challenge && !App.obj.builder.activities) {
            App.obj.builder.challenge = null;
            App.storageSet();
            this.refresh();
        } else if (App.obj.builder.activities) {
            App.obj.builder.activities = null;
            App.obj.study = []; // Limpa os autoestudos
            App.storageSet();
            this.refresh();
        }
    },


    // Etapa 0 - Aceite dos termos
    terms() {
        const accepted = document.getElementById('builder-terms').checked;
        App.obj.accepted = accepted;
        App.storageSet();
        this.refresh();
    },

    // Etapa 1 - Competência
    async competency() {
        const competency = document.getElementById('input-competency').value.trim();
        if (!competency) {
            alert(Language.get('Palavras-chave inválidas!'));
            return;
        }
        if (competency.length < 10) {
            alert(Language.get('As palavras-chave devem ter no mínimo 10 caracteres!'));
            return;
        }
        App.obj.builder.input = competency;
        const resp = await this.postStep('competency', { competency: competency });
        App.obj.builder.competency = resp.competency;
        App.storageSet();
        this.refresh();
    },

    // Etapa 2 - Conhecimentos
    async knowledge() {
        const resp = await this.postStep('knowledge', { competency: App.obj.builder.competency });
        App.obj.builder.knowledge = resp.knowledge;
        App.storageSet();
        this.refresh();
    },

    // Etapa 3 - Habilidades
    async skills() {
        const resp = await this.postStep('skills', { competency: App.obj.builder.competency, knowledge: App.obj.builder.knowledge });
        App.obj.builder.skills = resp.skills;
        App.storageSet();
        this.refresh();
    },

    // Etapa 4 - Atitudes
    async attitudes() {
        const resp = await this.postStep('attitudes', { competency: App.obj.builder.competency, knowledge: App.obj.builder.knowledge, skills: App.obj.builder.skills });
        App.obj.builder.attitudes = resp.attitudes;
        App.storageSet();
        this.refresh();
    },

    // Etapa 5 - Desafio
    async challenge() {
        const additionalPrompt = prompt(Language.get('Digite, caso necessário, algum contexto adicional para o desafio') + ':');
        if (additionalPrompt == null) return;
        const resp = await this.postStep('challenge', { competency: App.obj.builder.competency, knowledge: App.obj.builder.knowledge, skills: App.obj.builder.skills, attitudes: App.obj.builder.attitudes, additionalPrompt: additionalPrompt });
        App.obj.builder.challenge = resp.challenge;
        App.storageSet();
        this.refresh();
    },

    // Etapa 6 - Atividades
    async activities() {
        const resp = await this.postStep('activities', { competency: App.obj.builder.competency, knowledge: App.obj.builder.knowledge, skills: App.obj.builder.skills, attitudes: App.obj.builder.attitudes, challenge: App.obj.builder.challenge });
        App.obj.builder.activities = resp.activities;
        App.storageSet();
        this.refresh();
    },


    // Envia POST para o servidor
    async postStep(path, body) {
        body.level = App.obj.builder.level; // Adiciona o nível educacional em todas as requisições
        body.language = App.obj.language; // Adiciona o idioma em todas as requisições
        App.processingShow();
        const url = `${App.path}${path}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                App.processingHide();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            App.processingHide();
            const data = await response.json();
            return data;
        } catch (error) {
            App.processingHide();
            alert(Language.get('Ocorreu um erro, lamento. Por favor, tente novamente.'));
            console.error('An error occurred:', error.message);
            console.log(JSON.stringify(body));
            return {};
        }
    },

};

export default Builder;