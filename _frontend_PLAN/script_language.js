import App from './script_app.js';
import Builder from './script_builder.js';
import Study from './script_study.js';

const Language = {

    set(lng) {
        App.obj.language = lng;
        App.storageSet();
        this.headerRefresh();
        Study.close();
        Builder.refresh();
    },

    getBrowserLanguage() {
        const browserLanguage = navigator.language || navigator.userLanguage;
        if (browserLanguage.startsWith('en-')) {
            return 'en';
        } else if (browserLanguage.startsWith('pt-')) {
            return 'pt';
        } else if (browserLanguage.startsWith('es-')) {
            return 'es';
        } else {
            return 'en';
        }
    },

    get(key) {
        const obj = this.dictionay.find(item => item.key === key);
        if (obj) {
            return obj[App.obj.language];
        } else {
            return `{{{${key}}}}`;
        }
    },

    headerRefresh() {

        // Header and menu
        document.getElementById('header-title').innerHTML = Language.get('header-title');
        document.getElementById('menu-caption-new').innerHTML = Language.get('menu-caption-new');
        document.getElementById('menu-caption-cache-edit').innerHTML = Language.get('menu-caption-cache-edit');
        document.getElementById('menu-caption-cache-clean').innerHTML = Language.get('menu-caption-cache-clean');
        document.getElementById('menu-caption-about').innerHTML = Language.get('menu-caption-about');




    },


    dictionay: [
        {
            "key": "header-title",
            "pt": "Solverplan - Planejador Pedagógico PBL",
            "en": "Solverplan - Pedagogical Planner - PBL",
            "es": "Solverplan - Planificador Pedagógico - PBL",
            "te": "Solverplan - పాఠశాల ప్రణాళిక - PBL"
        },
        {
            "key": "menu-caption-new",
            "pt": "Novo",
            "en": "New",
            "es": "Nuevo",
            "te": "కొత్తది"
        },
        {
            "key": "menu-caption-cache-edit",
            "pt": "Editar cachê",
            "en": "Edit cache",
            "es": "Editar caché",
            "te": "క్యాష్‌ను సవరించండి"
        },
        {
            "key": "menu-caption-cache-clean",
            "pt": "Limpar cachê",
            "en": "Clean cache",
            "es": "Limpiar caché",
            "te": "క్యాష్‌ను శుభ్రం చేయండి"
        },
        {
            "key": "menu-caption-about",
            "pt": "Sobre",
            "en": "About",
            "es": "Sobre",
            "te": "గురించి"
        },
        {
            "key": "Sim",
            "pt": "Sim",
            "en": "Yes",
            "es": "Sí",
            "te": "అవును"
        },
        {
            "key": "Não",
            "pt": "Não",
            "en": "No",
            "es": "No",
            "te": "కాదు"
        },
        {
            "key": "Termos de uso",
            "pt": "Termos de uso",
            "en": "Terms of use",
            "es": "Términos de uso",
            "te": "వినియోగ నిబంధనలు"
        },
        {
            "key": "terms-of-use",
            "pt": "Essa ferramenta é apenas um teste de conceito. Seu objetivo é testar suas funcionalidades para subsidiar análises e eventual adoção. Não é um ambiente comercial e está sujeito a erros e imperfeições. Como se trata apenas de um teste, poderá ser retirado do ar a qualquer momento, sem aviso prévio. Dessa forma, esta ferramenta não deve ser usada como ambiente de produção, pois não há garantias de segurança, de estabilidade e de continuidade. Além disso, a ferramenta tem por objetivo apoiar educadores no planejamento acadêmico. Só deve ser usada para fins educacionais, pacíficos e legais. Não há garantias por eventual mau uso ou qualquer outro propósito.<p>Você concorda em participar desse teste e usar essa ferramenta com base nessas condições?",
            "en": "This tool is only a proof of concept. Its purpose is to test its functionalities to support analysis and eventual adoption. It is not a commercial environment and is subject to errors and imperfections. Since it is only a test, it may be taken offline at any time, without prior notice. Therefore, this tool should not be used as a production environment, as there are no guarantees of security, stability and continuity. In addition, the tool is intended to support educators in academic planning. It should only be used for educational, peaceful and legal purposes. There are no guarantees for possible misuse or any other purpose.<p>Do you agree to participate in this test and use this tool based on these conditions?",
            "es": "Esta herramienta es sólo una prueba de concepto. Su objetivo es probar sus funcionalidades para apoyar el análisis y eventual adopción. No es un entorno comercial y está sujeto a errores e imperfecciones. Como esto es sólo una prueba, puede desconectarse en cualquier momento, sin previo aviso. Por lo tanto, esta herramienta no debe utilizarse como entorno de producción, ya que no existen garantías de seguridad, estabilidad y continuidad. Además, la herramienta tiene como objetivo apoyar a los educadores en la planificación académica. Sólo debe utilizarse con fines educativos, pacíficos y legales. No hay garantías por un posible mal uso o cualquier otro propósito.<p>¿Aceptas participar en esta prueba y utilizar esta herramienta según estas condiciones?",
            "te": "ఈ సాధనం భావనకు రుజువు మాత్రమే. విశ్లేషణ మరియు చివరికి స్వీకరించడానికి మద్దతు ఇవ్వడానికి దాని కార్యాచరణలను పరీక్షించడం దీని ఉద్దేశ్యం. ఇది వాణిజ్య వాతావరణం కాదు మరియు లోపాలు మరియు అసంపూర్ణతలకు లోబడి ఉంటుంది. ఇది ఒక పరీక్ష మాత్రమే కాబట్టి, ముందస్తు నోటీసు లేకుండా ఎప్పుడైనా దీన్ని ఆఫ్‌లైన్‌లో తీసుకోవచ్చు. అందువల్ల, భద్రత, స్థిరత్వం మరియు కొనసాగింపుకు ఎటువంటి హామీలు లేనందున, ఈ సాధనాన్ని ఉత్పత్తి వాతావరణంగా ఉపయోగించకూడదు. అదనంగా, ఈ సాధనం విద్యా ప్రణాళికలో విద్యావేత్తలకు మద్దతు ఇవ్వడానికి ఉద్దేశించబడింది. దీనిని విద్యా, శాంతియుత మరియు చట్టపరమైన ప్రయోజనాల కోసం మాత్రమే ఉపయోగించాలి. దుర్వినియోగం లేదా మరే ఇతర ప్రయోజనం కోసం ఎటువంటి హామీలు లేవు.<p>మీరు ఈ పరీక్షలో పాల్గొనడానికి మరియు ఈ షరతుల ఆధారంగా ఈ సాధనాన్ని ఉపయోగించడానికి అంగీకరిస్తున్నారా?"
        },
        {
            "key": "Competência",
            "pt": "Competência",
            "en": "Competence",
            "es": "Competencia",
            "te": "నైపుణ్యం"
        },
        {
            "key": "Defina o nível educacional",
            "pt": "Defina o nível educacional",
            "en": "Define the educational level",
            "es": "Defina el nivel educativo",
            "te": "విద్యా స్థాయిని నిర్వచించండి"
        },
        {
            "key": "Insira palavras-chave para elaborar a competência a ser desenvolvida",
            "pt": "Insira palavras-chave para elaborar a competência a ser desenvolvida",
            "en": "Enter keywords to elaborate the competence to be developed",
            "es": "Introduce palabras clave para elaborar la competencia a desarrollar",
            "te": "అభివృద్ధి చేయాల్సిన నైపుణ్యాన్ని రూపొందించడానికి కీలక పదాలను నమోదు చేయండి"
        },
        {
            "key": "Educação Infantil",
            "pt": "Educação Infantil",
            "en": "Early Childhood Education",
            "es": "Educación Infantil",
            "te": "చిన్నపిల్లల విద్య"
        },
        {
            "key": "Ensino Fundamental",
            "pt": "Ensino Fundamental",
            "en": "Elementary School",
            "es": "Educación Primaria",
            "te": "ప్రాథమిక విద్య"
        },
        {
            "key": "Ensino Médio",
            "pt": "Ensino Médio",
            "en": "High School",
            "es": "Educación Secundaria",
            "te": "మాధ్యమిక విద్య"
        },
        {
            "key": "Ensino Superior - Graduação",
            "pt": "Ensino Superior - Graduação",
            "en": "Higher Education - Undergraduate",
            "es": "Educación Superior - Grado",
            "te": "ఉన్నత విద్య - పట్టభద్రులు"
        },
        {
            "key": "Ensino Superior - Pós-graduação",
            "pt": "Ensino Superior - Pós-graduação",
            "en": "Higher Education - Graduate",
            "es": "Educación Superior - Postgrado",
            "te": "ఉన్నత విద్య - పీజీ"
        },
        {
            "key": "Educação Executiva",
            "pt": "Educação Executiva",
            "en": "Executive Education",
            "es": "Educación Ejecutiva",
            "te": "నిర్వహణ విద్య"
        },
        {
            "key": "Outros tipos de educação",
            "pt": "Outros tipos de educação",
            "en": "Other types of education",
            "es": "Otros tipos de educación",
            "te": "ఇతర విద్యా రకాలు"
        },
        {
            "key": "Gerar competência",
            "pt": "Gerar competência",
            "en": "Generate competence",
            "es": "Generar competencia",
            "te": "నైపుణ్యాన్ని రూపొందించండి"
        },
        {
            "key": "Nível educacional",
            "pt": "Nível educacional",
            "en": "Educational level",
            "es": "Nivel educativo",
            "te": "విద్యా స్థాయి"
        },
        {
            "key": "Gerar conhecimentos",
            "pt": "Gerar conhecimentos",
            "en": "Generate knowledge",
            "es": "Generar conocimientos",
            "te": "జ్ఞానాన్ని రూపొందించండి"
        },
        {
            "key": "Voltar",
            "pt": "Voltar",
            "en": "Back",
            "es": "Volver",
            "te": "వెనక్కి"
        },
        {
            "key": "menu-new-confirm",
            "pt": "Deseja realmente criar um novo planejamento? Os dados atuais serão perdidos.",
            "en": "Do you really want to create a new plan? Current data will be lost.",
            "es": "¿Realmente quieres crear un nuevo plan? Los datos actuales se perderán.",
            "te": "మీరు నిజంగా కొత్త ప్రణాళికను ఏర్పాటు చేయాలా? ప్రస్తుత డేటా కోలుకుంటుంది."
        },
        {
            "key": "Arquivo inválido, dados não foram carregados",
            "pt": "Arquivo inválido, dados não foram carregados",
            "en": "Invalid file, data was not loaded",
            "es": "Archivo inválido, datos no fueron cargados",
            "te": "చెల్లని ఫైల్, డేటా లోడ్ కాలేదు"
        },
        {
            "key": "menu-cache-edit-confirm",
            "pt": "Atenção! Esse recurso só deve ser usado por pessoas com experiência no formato JSON, para editar pontos específicos do planejamento. É recomendável fazer antes uma cópia de segurança (download).",
            "en": "Attention! This feature should only be used by people with experience with the JSON format, to edit specific points of the planning. It is recommended to make a backup copy (download) beforehand.",
            "es": "¡Atención! Esta característica sólo debe ser utilizada por personas con experiencia en el formato JSON, para editar puntos específicos de la planificación. Se recomienda realizar primero una copia de seguridad (descargar).",
            "te": "గమనించండి! ఈ లక్షణం ప్రణాళికను నిర్దిష్ట పాయింట్‌లను సవరించడానికి JSON ఫార్మాట్‌తో అనుభవం ఉండే వారు మాత్రమే ఉపయోగించాలి. ముందుగా బ్యాకప్ కాపీ (డౌన్‌లోడ్) చేసుకోవడం మంజూరు."
        },
        {
            "key": "Erro ao salvar, verifique o formato JSON.",
            "pt": "Erro ao salvar, verifique o formato JSON.",
            "en": "Error saving, check JSON format.",
            "es": "Error al guardar, compruebe el formato JSON.",
            "te": "సేవ్ చేయడంలో లోపం, JSON ఫార్మాట్‌ను తనిఖీ చేయండి."
        },
        {
            "key": "Atenção. Essa ação irá limpar os dados armazenados e não poderá ser refeita. Confirma?",
            "pt": "Atenção. Essa ação irá limpar os dados armazenados e não poderá ser refeita. Confirma?",
            "en": "Attention. This action will clear the stored data and cannot be undone. Confirm?",
            "es": "Atención. Esta acción borrará los datos almacenados y no se puede deshacer. ¿Confirmar?",
            "te": "గమనించండి. ఈ చర్య నిలిపించడం మరియు పునఃప్రారంభించడం కాదు. నిశ్చితంగా?"
        },
        {
            "key": "Idealizado e desenvolvido por Maurício Garcia",
            "pt": "Idealizado e desenvolvido por Maurício Garcia",
            "en": "Idealized and developed by Maurício Garcia",
            "es": "Idealizado y desarrollado por Maurício Garcia",
            "te": "ఆలోచించబడింది మరియు అభివృద్ధి చేసినది మౌరిసియో గార్సియా"
        },
        {
            "key": "menu-about-txt",
            "pt": "O <b>Solverplan</b> é uma ferramenta para auxiliar educadores a elaborar um planejamento acadêmico de acordo com o Project-Based Learning (PBL).<p><p>A base teórica, histórica e pedagógica, utilizada nessa ferramenta pode ser acessada <a href='https://www.solvertank.tech/solverplan/documents/Solverplan_Base_Teorica.pdf' target='_blank'>AQUI</a>.<p>A partir de uma competência informada, o <b>Solverplan</b>:<p>1. Reescreve a competência, incluindo objetivo, condição e contexto, caso não tenham sido informados.<br>2. Pesquisa e lista dez conhecimentos, cinco habilidades e cinco atitudes (CHA) relacionados com essa competência.<br>3. Propõe um desafio para ser feito no projeto, com cinco artefatos e respectivas rubricas.<br>4. Elabora um conjunto de atividades (LBL) em cinco sprints ou semanas, cada um com:<p><li>Um encontro de orientação<li>Quatro encontros de instrução<li>Cinco autoestudos<li>Um artefato a ser entregue<p>Depois, ao clicar em cada um dos 25 autoestudos criados, o <b>Solverplan</b>:<p>1. Elabora um texto com a teoria relacionada com o autoestudo selecionado.<br>2. Faz um resumo do texto elaborado.<br>3. Pesquisa e seleciona um vídeo do Youtube relacionado com o texto.<br>4. Pesquisa e seleciona uma notícia recente relacionada com o texto.<br>5. Elabora um quiz com cinco testes (ao clicar em uma alternativa ele dá o feedback).<br>6. Elabora uma pergunta para uma redação (ao responder ele corrige corrige dá o feedback).<p>Detalhe importante: nenhuma informação fica gravada no servidor, portanto se for limpo o cachê do navegador, os dados são perdidos. Mas é possível baixar localmente um json com os dados produzidos e subir posteriormente, caso necessário.<p>No backend, o <b>Solverplan</b> aciona cerca de 20 agentes de IA, usando as API do Gemini e da OpenAI. Eu estou bancando o uso com base em modelos mais baratos. Se fossem modelos robustos, os resultados poderiam ser melhores, mas fica muito caro.<p><div id='mgar'>Eu uso também algumas outras APIs, mas como estou usando versões gratuitas, pode ser que não funcionem se for excedida a cota free.</div><p>Ainda está em refinamento, agradeço por participar desse teste. Opiniões, comentários e sugestões são muito bem vindos: <a href='mailto:mauricio@solvertank.tech'>mauricio@solvertank.tech</a>.",
            "en": "<b>Solverplan</b> is a tool to help educators develop an academic plan according to Project-Based Learning (PBL).<p><p>The theoretical, historical and pedagogical basis used in this tool can be accessed <a href='https://www.solvertank.tech/solverplan/documents/Solverplan_Base_Teorica.pdf' target='_blank'>HERE</a>.<p>Based on an informed competence, <b>Solverplan</b>:<p>1. Rewrites the competence, including objective, condition and context, if they have not been informed.<br>2. Researches and lists ten knowledge, five skills and five attitudes (CHA) related to this competence.<br>3. Proposes a challenge to be done in the project, with five artifacts and respective rubrics.<br>4. It develops a set of activities (LBL) in five sprints or weeks, each with:<p><li>One orientation meeting<li>Four instruction meetings<li>Five self-studies<li>One artifact to be delivered<p>Then, when clicking on each of the 25 self-studies created, <b>Solverplan</b>:<p>1. Develops a text with the theory related to the selected self-study.<br>2. Makes a summary of the text developed.<br>3. Researches and selects a YouTube video related to the text.<br>4. Researches and selects a recent news item related to the text.<br>5. Develops a quiz with five tests (when clicking on an alternative it provides feedback).<br>6. Develops a question for an essay (when answering it it corrects it and provides feedback).<p>Important detail: no information is saved on the server, therefore if the browser cache is cleared, the data is lost. But it is possible to locally download a json with the data produced and upload it later, if necessary.<p>In the backend, <b>Solverplan</b> triggers about 20 AI agents, using the Gemini and OpenAI APIs. I am funding the use based on cheaper models. If they were robust models, the results could be better, but it is very expensive.<p><div id='mgar'>I also use some other APIs, but since I am using free versions, they may not work if the free quota is exceeded.</div><p>It is still being refined, thank you for participating in this test. Opinions, comments and suggestions are very welcome: <a href='mailto:mauricio@solvertank.tech'>mauricio@solvertank.tech</a>.",
            "es": "<b>Solverplan</b> es una herramienta que ayuda a los educadores a desarrollar una planificación académica de acuerdo con el Aprendizaje Basado en Proyectos (ABP).<p><p>Se puede acceder a las bases teóricas, históricas y pedagógicas utilizadas en esta herramienta <a href='https://www.solvertank.tech/solverplan/documents/Solverplan_Base_Teorica.pdf' target='_blank'>AQUÍ</a>.<p>Desde una competencia informada, el <b>Solverplan</b>:<p>1. Reescribe la competencia, incluyendo objetivo, condición y contexto, si no se han proporcionado.<br>2. Investiga y enumera diez conocimientos, cinco habilidades y cinco actitudes (CHA) relacionados con esta competencia.<br>3. Propone un desafío a realizar en el proyecto, con cinco artefactos y sus respectivos encabezados.<br>4. Desarrolla un conjunto de actividades (LBL) en cinco sprints o semanas, cada uno con:<p><li>Una reunión de orientación<li>Cuatro reuniones de instrucción<li>Cinco autoestudios<li>Un artefacto para entregar<p > Luego, al hacer clic en cada uno de los 25 autoestudios creados, <b>Solverplan</b>:<p>1. Elabora un texto con la teoría relacionada con el autoestudio seleccionado.<br>2. Hace un resumen del texto preparado.<br>3. Busca y selecciona un video de YouTube relacionado con el texto.<br>4. Busca y selecciona noticias recientes relacionadas con el texto.<br>5. Prepara un cuestionario con cinco preguntas (al hacer clic en una alternativa, se obtiene retroalimentación).<br>6. Crea una pregunta para un ensayo (cuando respondes, él la corrige y te da su opinión).<p>Detalle importante: no se guarda ninguna información en el servidor, por lo que si se borra el caché del navegador, los datos se pierden. Pero es posible descargar localmente un json con los datos producidos y cargarlo más tarde, si es necesario.<p>En el backend, el <b>Solverplan</b> impulsa alrededor de 20 agentes de IA, utilizando las API Gemini y OpenAI. Estoy pagando por el uso en base a modelos más baratos. Si fueran modelos robustos, los resultados podrían ser mejores, pero es muy caro.<p><div id='mgar'>También uso algunas otras API, pero como estoy usando versiones gratuitas, es posible que no funcionen si se superó el límite de cuota libre.</div><p>Aún se está perfeccionando, gracias por participar en esta prueba. Opiniones, comentarios y sugerencias son bienvenidas: <a href='mailto:mauricio@solvertank.tech'>mauricio@solvertank.tech</a>.",
            "te": "<b>Solverplan</b> ప్రాజెక్ట్-బేస్డ్ లెర్నింగ్ (PBL) ప్రకారం విద్యా ప్రణాళికను అభివృద్ధి చేయడంలో విద్యావేత్తలకు సహాయపడే సాధనం.<p><p>ఈ సాధనంలో ఉపయోగించిన సైద్ధాంతిక, చారిత్రక మరియు బోధనా ప్రాతిపదికను <a href='https://www.solvertank.tech/solverplan/documents/Solverplan_Base_Teorica.pdf' target='_blank'>ఇక్కడ</a> యాక్సెస్ చేయవచ్చు.<p>సమాచార సామర్థ్యం ఆధారంగా, <b>Solverplan</b>:<p>1. వారికి సమాచారం ఇవ్వకపోతే లక్ష్యం, పరిస్థితి మరియు సందర్భంతో సహా సామర్థ్యాన్ని తిరిగి వ్రాస్తుంది.<br>2. ఈ సామర్థ్యానికి సంబంధించిన పది జ్ఞానం, ఐదు నైపుణ్యాలు మరియు ఐదు వైఖరులు (CHA) పరిశోధించి జాబితా చేస్తుంది.<br>3. ఐదు కళాఖండాలు మరియు సంబంధిత రూబ్రిక్‌లతో ప్రాజెక్ట్‌లో చేయవలసిన సవాలును ప్రతిపాదిస్తుంది.<br>4. ఇది ఐదు స్ప్రింట్‌లు లేదా వారాలలో కార్యకలాపాల సమితిని (LBL) అభివృద్ధి చేస్తుంది, ప్రతి ఒక్కటి:<p><li>ఒక ఓరియంటేషన్ సమావేశం<li>నాలుగు బోధనా సమావేశాలు<li>ఐదు స్వీయ అధ్యయనాలు<li>బట్వాడా చేయవలసిన ఒక కళాఖండం<p>తర్వాత, సృష్టించబడిన 25 స్వీయ అధ్యయనాలలో ప్రతిదానిపై క్లిక్ చేసినప్పుడు, <b>పరిష్కార ప్రణాళిక</b>:<p>1. ఎంచుకున్న స్వీయ అధ్యయనానికి సంబంధించిన సిద్ధాంతంతో ఒక వచనాన్ని అభివృద్ధి చేస్తుంది.<br>2. అభివృద్ధి చేయబడిన వచనం యొక్క సారాంశాన్ని రూపొందిస్తుంది.<br>3. వచనానికి సంబంధించిన YouTube వీడియోను పరిశోధించి ఎంచుకుంటుంది.<br>4. వచనానికి సంబంధించిన ఇటీవలి వార్తలను పరిశోధించి ఎంచుకుంటుంది.<br>5. ఐదు పరీక్షలతో ఒక క్విజ్‌ను అభివృద్ధి చేస్తుంది (ప్రత్యామ్నాయంపై క్లిక్ చేసినప్పుడు అది అభిప్రాయాన్ని అందిస్తుంది).<br>6. ఒక వ్యాసం కోసం ఒక ప్రశ్నను అభివృద్ధి చేస్తుంది (దానికి సమాధానం ఇచ్చినప్పుడు అది దాన్ని సరిదిద్దుతుంది మరియు అభిప్రాయాన్ని అందిస్తుంది).<p>ముఖ్యమైన వివరాలు: సర్వర్‌లో ఎటువంటి సమాచారం సేవ్ చేయబడదు, కాబట్టి బ్రౌజర్ కాష్ క్లియర్ చేయబడితే, డేటా పోతుంది. కానీ ఉత్పత్తి చేయబడిన డేటాతో స్థానికంగా jsonని డౌన్‌లోడ్ చేసుకుని, అవసరమైతే దానిని తర్వాత అప్‌లోడ్ చేయడం సాధ్యమవుతుంది.<p>బ్యాకెండ్‌లో, <b>Solverplan</b> జెమిని మరియు OpenAI APIలను ఉపయోగించి దాదాపు 20 AI ఏజెంట్‌లను ట్రిగ్గర్ చేస్తుంది. నేను చౌకైన మోడల్‌ల ఆధారంగా వినియోగానికి నిధులు సమకూరుస్తున్నాను. అవి బలమైన మోడల్‌లు అయితే, ఫలితాలు మెరుగ్గా ఉండవచ్చు, కానీ అది చాలా ఖరీదైనది.<p><div id='mgar'>నేను కొన్ని ఇతర APIలను కూడా ఉపయోగిస్తున్నాను, కానీ నేను ఉచిత వెర్షన్‌లను ఉపయోగిస్తున్నందున, ఉచిత కోటా మించిపోతే అవి పనిచేయకపోవచ్చు.</div><p>ఇది ఇప్పటికీ మెరుగుపరచబడుతోంది, ఈ పరీక్షలో పాల్గొన్నందుకు ధన్యవాదాలు. అభిప్రాయాలు, వ్యాఖ్యలు మరియు సూచనలు చాలా స్వాగతం: <a href='mailto:mauricio@solvertank.tech'>mauricio@solvertank.tech</a>."
        },
        {
            "key": "Sobre o Solverplan",
            "pt": "Sobre o Solverplan",
            "en": "About Solverplan",
            "es": "Sobre el Solverplan",
            "te": "సోల్వర్‌ప్లాన్ గురించి"
        },
        {
            "key": "Conhecimentos",
            "pt": "Conhecimentos",
            "en": "Knowledge",
            "es": "Conocimientos",
            "te": "అవగాహనలు"
        },
        {
            "key": "Gerar habilidades",
            "pt": "Gerar habilidades",
            "en": "Generate skills",
            "es": "Generar habilidades",
            "te": "నైపుణ్యాలను సృష్టించండి"
        },
        {
            "key": "Habilidades",
            "pt": "Habilidades",
            "en": "Skills",
            "es": "Habilidades",
            "te": "నైపుణ్యాలు"
        },
        {
            "key": "Atenção: essa ação não poderá ser desfeita. Confirma a exclusão dessa linha?",
            "pt": "Atenção: essa ação não poderá ser desfeita. Confirma a exclusão dessa linha?",
            "en": "Attention: this action cannot be undone. Confirm the deletion of this line?",
            "es": "Atención: esta acción no se puede deshacer. ¿Confirmar la eliminación de esta línea?",
            "te": "గమనించండి: ఈ చర్యను పునఃప్రారంభించడం కాదు. ఈ లైన్‌ను తొలగించడం నిర్ధారించండి?"
        },
        {
            "key": "Digite, caso necessário, algum contexto adicional para o desafio",
            "pt": "Digite, caso necessário, algum contexto adicional para o desafio",
            "en": "Enter, if necessary, any additional context for the challenge",
            "es": "Ingrese, si es necesario, cualquier contexto adicional para el desafío",
            "te": "అవసరమైతే, ఛాలెంజ్ కోసం ఏదో అదనపు సందర్భాన్ని నమోదు చేయండి"
        },
        {
            "key": "Digite o novo conhecimento",
            "pt": "Digite o novo conhecimento",
            "en": "Enter the new knowledge",
            "es": "Introduzca el nuevo conocimiento",
            "te": "క్రొత్త జ్ఞానం నమోదు చేయండి"
        },
        {
            "key": "Digite a nova habilidade",
            "pt": "Digite a nova habilidade",
            "en": "Enter the new skill",
            "es": "Introduzca la nueva habilidad",
            "te": "క్రొత్త నైపుణ్యాన్ని నమోదు చేయండి"
        },
        {
            "key": "Digite a nova atitude",
            "pt": "Digite a nova atitude",
            "en": "Enter the new attitude",
            "es": "Introduzca la nueva actitud",
            "te": "క్రొత్త ప్రవర్తనను నమోదు చేయండి"
        },
        {
            "key": "Gerar atitudes",
            "pt": "Gerar atitudes",
            "en": "Generate attitudes",
            "es": "Generar actitudes",
            "te": "ప్రవర్తనలను ఉత్పత్తి చేయండి"
        },
        {
            "key": "Atitudes",
            "pt": "Atitudes",
            "en": "Attitudes",
            "es": "Actitudes",
            "te": "ప్రవర్తనలు"
        },
        {
            "key": "Gerar desafio",
            "pt": "Gerar desafio",
            "en": "Generate challenge",
            "es": "Generar desafío",
            "te": "ఒక సవాలును ఉత్పత్తి చేయండి"
        },
        {
            "key": "Desafio",
            "pt": "Desafio",
            "en": "Challenge",
            "es": "Desafío",
            "te": "సవాలు"
        },
        {
            "key": "Gerar atividades",
            "pt": "Gerar atividades",
            "en": "Generate activities",
            "es": "Generar actividades",
            "te": "కార్యకలాపాలను ఉత్పత్తి చేయండి"
        },
        {
            "key": "Atividades",
            "pt": "Atividades",
            "en": "Activities",
            "es": "Actividades",
            "te": "కార్యకలాపాలు"
        },
        {
            "key": "Encontro de Orientação",
            "pt": "Encontro de Orientação",
            "en": "Orientation Meeting",
            "es": "Reunión de Orientación",
            "te": "దిశా నిర్దేశక సమావేశం"
        },
        {
            "key": "Encontros de Instrução",
            "pt": "Encontros de Instrução",
            "en": "Instruction Meetings",
            "es": "Reuniones de Instrucción",
            "te": "నిర్దేశక సమావేశాలు"
        },
        {
            "key": "Título",
            "pt": "Título",
            "en": "Title",
            "es": "Título",
            "te": "శీర్షిక"
        },
        {
            "key": "Descrição",
            "pt": "Descrição",
            "en": "Description",
            "es": "Descripción",
            "te": "వివరణ"
        },
        {
            "key": "Ocorreu um erro, lamento. Por favor, tente novamente.",
            "pt": "Ocorreu um erro, lamento. Por favor, tente novamente.",
            "en": "An error occurred, sorry. Please try again.",
            "es": "Ocurrió un error, lo siento. Por favor, inténtalo de nuevo.",
            "te": "ఒక లోపం సంభవించింది. దయచేసి మళ్లీ ప్రయత్నించండి."
        },
        {
            "key": "Contexto",
            "pt": "Contexto",
            "en": "Context",
            "es": "Contexto",
            "te": "సందర్భం"
        },
        {
            "key": "Objetivo",
            "pt": "Objetivo",
            "en": "Objective",
            "es": "Objetivo",
            "te": "లక్ష్యం"
        },
        {
            "key": "Artefatos",
            "pt": "Artefatos",
            "en": "Artifacts",
            "es": "Artefactos",
            "te": "ఆర్టిఫాక్టులు"
        },
        {
            "key": "Artefato",
            "pt": "Artefato",
            "en": "Artifact",
            "es": "Artefacto",
            "te": "ఆర్టిఫాక్ట్"
        },
        {
            "key": "Rubrica",
            "pt": "Rubrica",
            "en": "Rubric",
            "es": "Rúbrica",
            "te": "రూబ్రిక్"
        },
        {
            "key": "Unidade",
            "pt": "Unidade",
            "en": "Unit",
            "es": "Unidad",
            "te": "యూనిట్"
        },
        {
            "key": "Autoestudos",
            "pt": "Autoestudos",
            "en": "Self-studies",
            "es": "Autoestudios",
            "te": "స్వీయ అధ్యయనాలు"
        },
        {
            "key": "Artefato a ser entregue",
            "pt": "Artefato a ser entregue",
            "en": "Artifact to be delivered",
            "es": "Artefacto a entregar",
            "te": "ప్రదానం చేయాల్సిన ఆర్టిఫాక్ట్"
        },
        {
            "key": "Carregando",
            "pt": "Carregando",
            "en": "Loading",
            "es": "Cargando",
            "te": "లోడింగ్"
        },
        {
            "key": "Conceitos",
            "pt": "Conceitos",
            "en": "Concepts",
            "es": "Conceptos",
            "te": "కాంసెప్ట్స్"
        },
        {
            "key": "Pontos principais",
            "pt": "Pontos principais",
            "en": "Key points",
            "es": "Puntos principales",
            "te": "ప్రధాన బిందువులు"
        },
        {
            "key": "Vídeo",
            "pt": "Vídeo",
            "en": "Video",
            "es": "Vídeo",
            "te": "వీడియో"
        },
        {
            "key": "Notícias",
            "pt": "Notícias",
            "en": "News",
            "es": "Noticias",
            "te": "వార్తలు"
        },
        {
            "key": "Redação",
            "pt": "Redação",
            "en": "Essay",
            "es": "Ensayo",
            "te": "వ్యాసం"
        },
        {
            "key": "Gerar",
            "pt": "Gerar",
            "en": "Generate",
            "es": "Generar",
            "te": "ఉత్పత్తి చేయండి"
        },
        {
            "key": "alert-text",
            "pt": "Esse comando irá gerar um texto para esse autoestudo, favor observar os seguintes pontos:<p><ol><li> Serão apagados os dados desse autoestudo (conceitos, pontos principais, vídeo, notícias, quiz e redação).</li> <li> É recomendável baixar um backup antes (clicar no menu superior, opção 'Download').</li> <li> O sistema usa LLMs de baixo custo, é ALTAMENTE PROVÁVEL que o texto contenha imprecisões e alucinações.</li> <li> Se quiser, inclua abaixo algum texto que possa contribuir para a geração do autoestudo.</li>  </ol>",
            "en": "This command will generate a text for this self-study, please note the following points: <p><ol><li> The data from this self-study (concepts, main points, video, news, quiz and essay) will be deleted.</li> <li> It is recommended to download a backup beforehand (click on the top menu, 'Download' option).</li> <li> The system uses low-cost LLMs, it is HIGHLY LIKELY that the text will contain inaccuracies and hallucinations.</li> <li> If you wish, include some text below that could contribute to the generation of the self-study.</li> </ol>",
            "es": "Este comando generará texto para este autoestudio, tenga en cuenta los siguientes puntos:<p><ol><li> Los datos de este autoestudio (conceptos, puntos principales, videos, noticias, cuestionarios y ensayos) se eliminarán .</li> <li> Se recomienda descargar una copia de seguridad previamente (haga clic en el menú superior, opción 'Download').</li> <li> El sistema utiliza LLM de bajo costo, es MUY PROBABLE que el El texto contiene inexactitudes y alucinaciones.</li> <li>Si lo deseas, incluye a continuación algún texto que pueda contribuir a la generación de autoestudio.</li></ol>"
        },
        {
            "key": "Deseja realmente excluir este estudo?",
            "pt": "Deseja realmente excluir este estudo?",
            "en": "Do you really want to delete this study?",
            "es": "¿Realmente quieres eliminar este estudio?",
            "te": "మీరు నిజంగా ఈ అధ్యయనాన్ని తొలగించాలనుకుంటున్నారా?"
        },
        {
            "key": "Analisar",
            "pt": "Analisar",
            "en": "Analyze",
            "es": "Analizar",
            "te": "విశ్లేషించండి"
        },
        {
            "key": "Palavras-chave inválidas!",
            "pt": "Palavras-chave inválidas!",
            "en": "Invalid keywords!",
            "es": "¡Palabras clave inválidas!",
            "te": "చెల్లని కీవర్డ్స్!"
        },
        {
            "key": "As palavras-chave devem ter no mínimo 10 caracteres!",
            "pt": "As palavras-chave devem ter no mínimo 10 caracteres!",
            "en": "Keywords must have at least 10 characters!",
            "es": "¡Las palabras clave deben tener al menos 10 caracteres!",
            "te": "కీవర్డ్స్ కనీసం 10 అక్షరాలు ఉండాలి!"
        },
        {
            "key": "Inserir imagem",
            "pt": "Inserir imagem",
            "en": "Insert image",
            "es": "Insertar imagen",
            "te": "చిత్రాన్ని చేర్చండి"
        },
        {
            "key": "Inserir link",
            "pt": "Inserir link",
            "en": "Insert link",
            "es": "Insertar enlace",
            "te": "లింక్ చేర్చండి"
        },
        {
            "key": "URL da imagem",
            "pt": "URL da imagem",
            "en": "Image URL",
            "es": "URL de la imagen",
            "te": "చిత్ర URL"
        },
        {
            "key": "Tamanho da imagem",
            "pt": "Tamanho da imagem",
            "en": "Image size",
            "es": "Tamaño de la imagen",
            "te": "చిత్ర పరిమాణం"
        },
        {
            "key": "URL inválida",
            "pt": "URL inválida",
            "en": "Invalid URL",
            "es": "URL inválida",
            "te": "చెల్లని URL"
        },
        {
            "key": "URL do link",
            "pt": "URL do link",
            "en": "Link URL",
            "es": "URL del enlace",
            "te": "లింక్ URL"
        },
        {
            "key": "Texto do link",
            "pt": "Texto do link",
            "en": "Link text",
            "es": "Texto del enlace",
            "te": "లింక్ టెక్స్ట్"
        },
        {
            "key": "Gerar texto",
            "pt": "Gerar texto",
            "en": "Generate text",
            "es": "Generar texto",
            "te": "టెక్స్ట్ ఉత్పత్తి చేయండి"
        },
        {
            "key": "Dados do autoestudo",
            "pt": "Dados do autoestudo",
            "en": "Self-study data",
            "es": "Datos del autoestudio",
            "te": "స్వీయ అధ్యయన డేటా"
        },
        {
            "key": "Nenhum vídeo encontrado. Tente novamente.",
            "pt": "Nenhum vídeo encontrado. Tente novamente.",
            "en": "No video found. Try again.",
            "es": "No se encontró ningún video. Inténtalo de nuevo.",
            "te": "ఏ వీడియో కనుగొనబడలేదు. మళ్ళీ ప్రయత్నించండి."
        }
    
    ]


};

export default Language;