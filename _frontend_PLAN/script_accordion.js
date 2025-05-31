import Builder from "./script_builder.js";

const Accordion = {

    // listen clicks
    listeners() {
        document.querySelectorAll('.accordion-parent').forEach(item => {
            item.addEventListener('click', event => {
                const parentDiv = event.target.closest('.accordion-parent');
                const group = parentDiv.id.split('-')[0];
                const subgroup = parentDiv.id.split('-')[1];
                const index = Number(parentDiv.id.split('-')[3]);
                this.showChild(group, subgroup, index);
            });
        });
    },

    // mostra ou oculta o accordion filho
    showChild(group, subgroup, index) {

        // pega o accordion filho
        const child = document.getElementById(`${group}-${subgroup}-child-${index}`);

        // toggle o accordion
        const display = child.style.display === 'block' ? 'none' : 'block';

        // oculta / mostra o accordion
        child.style.display = display;

        // mostra ou oculta os ícones
        if (display === 'block') {
            document.getElementById(`${group}-${subgroup}-chevron-up-${index}`).style.display = 'block';
            document.getElementById(`${group}-${subgroup}-chevron-down-${index}`).style.display = 'none';
        } else {
            document.getElementById(`${group}-${subgroup}-chevron-up-${index}`).style.display = 'none';
            document.getElementById(`${group}-${subgroup}-chevron-down-${index}`).style.display = 'block';
        }

        // atualiza o array de accordions
        if (group == 'builder' && subgroup == 'artifact') {
            Builder.accordionsArtifacts[index] = display;
        } else if (group == 'builder' && subgroup == 'activity') {
            Builder.accordionsActivities[index] = display;
        }
    },

    // cria o accordion pai
    getParent(group, subgroup, index, label) {
        let tx = ``;
        tx += `<div class="accordion-parent" id="${group}-${subgroup}-parent-${index}">`;
        tx += `<div>${label} ${index + 1}</div>`;
        tx += `<div class="accordion-icons">`;
        tx += `<div class="accordion-icon" id="${group}-${subgroup}-chevron-up-${index}" style="display:none"><i class="fa-solid fa-chevron-up"></i></div>`;
        tx += `<div class="accordion-icon" id="${group}-${subgroup}-chevron-down-${index}"><i class="fa-solid fa-chevron-down"></i></div>`;
        tx += `</div>`;
        tx += `</div>`;
        return tx;
    },


};

export default Accordion;