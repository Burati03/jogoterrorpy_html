// ============================================================
// BRIAN: A MANSÃO DE BLACKWOOD - ENGINE DE JOGO HTML
// ============================================================

// Estado do Jogo
let gameState = {
    chapter: 1,
    player: {
        vida: 100,
        sanidade: 100,
        chaves: [],
        inventario: [],
        livros: [],
        municao: 0,
        municao_espingarda: 0,
        monstro_ferido: 0
    },
    currentImageIndex: 0
};

// Mapas de Capítulos
const chapters = {
    1: {
        title: "CAPÍTULO 1 - A HERANÇA",
        imageIndex: 1,
        initial: true
    },
    2: {
        title: "CAPÍTULO 2 - A ALA OESTE",
        imageIndex: 2
    },
    3: {
        title: "CAPÍTULO 3 - O LABORATÓRIO",
        imageIndex: 3
    },
    4: {
        title: "CAPÍTULO 4 - O MONSTRO",
        imageIndex: 4
    },
    5: {
        title: "CAPÍTULO 5 - O SEGREDO",
        imageIndex: 5
    }
};

// DADOS DO JOGO - HISTÓRIAS E NARRATIVAS
const gameData = {
    // ========== CAPÍTULO 1 ==========
    capitulo1_inicio: {
        title: "CAPÍTULO 1 - A HERANÇA",
        image: "static/Entradanamansao.png",
        text: "Uma chuva pesada cai sobre Blackwood.\n\nBrian estaciona diante da mansão que herdou de seu tio, Arthur Blackwood. O homem morreu há duas semanas. Brian nunca gostou dele.\n\n\"Meu tio sempre dizia que eu nunca deveria entrar no porão...\"\n\nA chave gira na fechadura. A porta se abre sozinha.",
        choices: [
            { text: "Acender a luz e explorar o hall", next: "capitulo1_sala_escolha" },
            { text: "Ir direto para o escritório do tio", next: "capitulo1_escritorio" },
            { text: "Investigar um barulho vindo da cozinha", next: "capitulo1_cozinha" }
        ]
    },
    
    capitulo1_sala_escolha: {
        title: "CAPÍTULO 1 - A HERANÇA",
        image: "static/Fotoecartadotio.png",
        text: "A luz pisca três vezes.\n\nEm uma parede, Brian encontra uma fotografia antiga da família. O rosto do tio foi riscado com tinta preta.\n\n😨 Sua sanidade diminuiu em 5 pontos.",
        effects: { sanidade: -5 },
        choices: [
            { text: "Continuar explorando", next: "capitulo1_livro" }
        ]
    },

    capitulo1_escritorio: {
        title: "CAPÍTULO 1 - A HERANÇA",
        image: "static/Escritoriodotio.png",
        text: "Brian encontra o escritório trancado.\n\nUma placa diz: 'Somente Arthur'.\n\nDepois de procurar, encontra uma chave escondida atrás de um quadro.\n\n✅ Você ganhou: Chave do escritório",
        effects: { inventario: "Chave do escritório" },
        choices: [
            { text: "Abrir o escritório", next: "capitulo1_livro" }
        ]
    },

    capitulo1_cozinha: {
        title: "CAPÍTULO 1 - A HERANÇA",
        image: "static/Armaencontrada.png",
        text: "Na cozinha, uma panela cai sozinha.\n\nNão há ninguém.\n\nBrian encontra um revólver antigo dentro de uma gaveta, com apenas 2 balas e um pequeno diário.\n\n✅ Você ganhou: Revólver (2 balas)",
        effects: { inventario: "Revólver", municao: 2 },
        choices: [
            { text: "Ler o diário", next: "capitulo1_livro" }
        ]
    },

    capitulo1_livro: {
        title: "📖 DIÁRIO DE ARTHUR - ENTRADA 01",
        image: "static/diariodotio.png",
        text: "\"13 de outubro.\n\nO espécime continua vivo.\n\nA criatura não é uma doença.\nÉ uma adaptação.\n\nEla aprende.\nEla observa.\nE, principalmente, ela reconhece quem tem medo.\"\n\n😨 Sua sanidade diminuiu em 3 pontos.",
        effects: { sanidade: -3, chaves: "Chave da entrada" },
        choices: [
            { text: "Prosseguir para o próximo capítulo", next: "capitulo2_inicio" }
        ]
    },

    // ========== CAPÍTULO 2 ==========
    capitulo2_inicio: {
        title: "CAPÍTULO 2 - A ALA OESTE",
        image: "static/CorredorOeste.png",
        text: "A chuva aumenta.\n\nBrian atravessa um corredor coberto por retratos antigos. Um deles parece ter sido arrancado recentemente.\n\nHá três caminhos diante dele...",
        choices: [
            { text: "Entrar na Biblioteca", next: "capitulo2_biblioteca" },
            { text: "Explorar o Quarto do tio", next: "capitulo2_quarto" },
            { text: "Acessar a Sala de segurança", next: "capitulo2_seguranca" }
        ]
    },

    capitulo2_biblioteca: {
        title: "CAPÍTULO 2 - A ALA OESTE",
        image: "static/Biblioteca.png",
        text: "A biblioteca é vasta e escura.\n\nBrian encontra um caderno de anatomia com anotações perturbadoras sobre uma criatura.\n\n\"Os ossos da criatura suportam impactos absurdos. A fraqueza real está no sistema nervoso. A fórmula N-17 pode neutralizar o organismo.\"\n\n😨 Sua sanidade diminuiu em 3 pontos.",
        effects: { sanidade: -3, inventario: "Caderno de Anatomia" },
        choices: [
            { text: "Continuar explorando", next: "capitulo2_fim" }
        ]
    },

    capitulo2_quarto: {
        title: "CAPÍTULO 2 - A ALA OESTE",
        image: "static/Cartadotio.png",
        text: "O quarto de Arthur está impecável.\n\nNa mesa existe uma carta nunca enviada:\n\n\"Brian,\nse você está lendo isso, significa que falhei.\n\nNão confie nas gravações.\nNão abra a porta de ferro.\nE jamais deixe o espécime chegar ao andar superior.\"",
        effects: { inventario: "Carta de Arthur" },
        choices: [
            { text: "Continuar explorando", next: "capitulo2_fim" }
        ]
    },

    capitulo2_seguranca: {
        title: "CAPÍTULO 2 - A ALA OESTE",
        image: "static/Mapadamansao.png",
        text: "Monitores mostram diferentes cômodos da mansão.\n\nUm dos monitores mostra uma cela subterrânea.\n\nA cela está vazia.\n\n😨 Sua sanidade diminuiu em 5 pontos.",
        effects: { sanidade: -5, inventario: "Código da cela: 3-7-11" },
        choices: [
            { text: "Continuar explorando", next: "capitulo2_fim" }
        ]
    },

    capitulo2_fim: {
        title: "CAPÍTULO 2 - A ALA OESTE",
        image: "static/Chaveencontrada.png",
        text: "Você encontra mais uma chave com a etiqueta 'ALA SUL'.\n\n✅ Você ganhou: Chave da Ala Sul\n\nO misterio se aprofunda. É hora de investigar ainda mais fundo...",
        effects: { chaves: "Chave da Ala Sul" },
        choices: [
            { text: "Prosseguir para o próximo capítulo", next: "capitulo3_inicio" }
        ]
    },

    // ========== CAPÍTULO 3 ==========
    capitulo3_inicio: {
        title: "CAPÍTULO 3 - O LABORATÓRIO",
        image: "static/Laboratorio.png",
        text: "A Ala Sul é diferente.\n\nOs corredores têm paredes de vidro com vidros embaçados.\n\nBrian consegue discernir silhuetas dentro deles.\n\nSeu coração acelerado ecoa pela mansão.\n\n😨 Sua sanidade diminuiu em 8 pontos.",
        effects: { sanidade: -8 },
        choices: [
            { text: "Investigar os vidros", next: "capitulo3_vidros" },
            { text: "Procurar por mais chaves", next: "capitulo3_chaves" },
            { text: "Voltar e repensar", next: "capitulo3_recuo" }
        ]
    },

    capitulo3_vidros: {
        title: "CAPÍTULO 3 - O LABORATÓRIO",
        image: "static/Criaturaencarcerada.png",
        text: "Brian limpa o vidro embaçado com a mão.\n\nSeu reflexo o olha de volta.\n\nMas não é seu reflexo.\n\nÉ a criatura.\n\nEla está bem ali, do outro lado do vidro.\n\n😨😨😨 Sua sanidade diminuiu em 15 pontos! Vida diminuiu em 10 pontos!",
        effects: { sanidade: -15, vida: -10 },
        choices: [
            { text: "Correr para longe", next: "capitulo3_fuga" }
        ]
    },

    capitulo3_chaves: {
        title: "CAPÍTULO 3 - O LABORATÓRIO",
        image: "static/Injeçãon17.png",
        text: "Entre vários documentos e equipamentos, Brian encontra:\n\n✅ Chave do Laboratório\n✅ Seringas com líquido estranho (Fórmula N-17)\n\nEssas podem ser importantes para o final do jogo.",
        effects: { inventario: "Seringas N-17", chaves: "Chave do Laboratório" },
        choices: [
            { text: "Continuar explorando", next: "capitulo3_fuga" }
        ]
    },

    capitulo3_recuo: {
        title: "CAPÍTULO 3 - O LABORATÓRIO",
        image: "static/ProjetoHecate.png",
        text: "Brian decide recuar estrategicamente.\n\nÉ melhor estar preparado antes de enfrentar qualquer coisa neste lugar.\n\nEle se afasta cautelosamente dos vidros embaçados.\n\n✅ Sua sanidade se recuperou um pouco (+2 pontos).",
        effects: { sanidade: 2 },
        choices: [
            { text: "Prosseguir para o próximo capítulo", next: "capitulo4_inicio" }
        ]
    },

    capitulo3_fuga: {
        title: "CAPÍTULO 3 - O LABORATÓRIO",
        image: "static/Criaturasolta.png",
        text: "Brian corre pelos corredores.\n\nAtrás dele, sons de vidro quebrando.\n\nA criatura saiu de seu vidro.\n\nBrian sente o hálito quente na nuca.\n\nMas consegue chegar a uma porta e a tranca.\n\nMais uma vez, ele escapou. Mal.",
        effects: { sanidade: -5, vida: -5 },
        choices: [
            { text: "Prosseguir para o próximo capítulo", next: "capitulo4_inicio" }
        ]
    },

    // ========== CAPÍTULO 4 ==========
    capitulo4_inicio: {
        title: "CAPÍTULO 4 - O MONSTRO",
        image: "static/Criaturaenlouquecida.png",
        text: "Depois de horas se escondendo, Brian finalmente se vê face a face com a criatura.\n\nNão há mais para onde correr.\n\nA criatura o bloqueia na entrada do porão.\n\nÉ hora de enfrentar tudo isso.",
        choices: [
            { text: "Lutar com toda força", next: "capitulo4_luta" },
            { text: "Tentar negociar", next: "capitulo4_negociar" },
            { text: "Usar a Fórmula N-17", next: "capitulo4_formula" }
        ]
    },

    capitulo4_luta: {
        title: "CAPÍTULO 4 - O MONSTRO",
        image: "static/Lanterna.png",
        text: "O combate é feroz.\n\nBrian dispara com o revólver. Os tiros fazem impacto, mas a criatura continua avançando.\n\nCom dificuldade, Brian consegue ferir a criatura gravemente e escapar para o andar superior.\n\n💔 Vida: -25 | 😨 Sanidade: -20",
        effects: { vida: -25, sanidade: -20, municao: 0 },
        choices: [
            { text: "Prosseguir para o final", next: "capitulo5_inicio" }
        ]
    },

    capitulo4_negociar: {
        title: "CAPÍTULO 4 - O MONSTRO",
        image: "static/Desenhodacriatura.png",
        text: "\"Eu não sou seu inimigo!\" grita Brian.\n\nPor um momento, a criatura para.\n\nBrian vê inteligência em seus olhos. A criatura é consciente. É... humana?\n\nA criatura baixa os braços, confusa, como se lembrasse de algo esquecido.\n\n😨 Sanidade: -10",
        effects: { sanidade: -10 },
        choices: [
            { text: "Tentar a Fórmula N-17", next: "capitulo5_inicio" }
        ]
    },

    capitulo4_formula: {
        title: "CAPÍTULO 4 - O MONSTRO",
        image: "static/Preparandoainjeção.png",
        text: "Brian consegue injetar a Fórmula N-17 na criatura.\n\nEla começa a tremer.\n\nOs músculos relaxam.\n\nA criatura cai de joelhos.\n\n✅ Você adquiriu o conhecimento da verdade final...",
        effects: { inventario: "Verdade revelada" },
        choices: [
            { text: "Descobrir o final", next: "capitulo5_inicio" }
        ]
    },

    // ========== CAPÍTULO 5 ==========
    capitulo5_inicio: {
        title: "CAPÍTULO 5 - O SEGREDO",
        image: "static/Relatorioexperimento.png",
        text: "Brian finalmente alcança o porão.\n\nDocumentos cobrem todo o chão.\n\nEm uma mesa, uma nota final do tio:\n\n\"Se você chegou até aqui, descobriu a verdade.\n\nA criatura não era um monstro. Era minha tentativa de transcendência.\n\nAgora, a escolha é sua.\"",
        choices: [
            { text: "Destruir tudo e fugir (Final da Fuga)", next: "final_fuga" },
            { text: "Salvar a criatura (Final do Antídoto)", next: "final_antidoto" },
            { text: "Ficar e desvendar tudo", next: "final_verdade" }
        ]
    },

    // ========== FINAIS ==========
    final_fuga: {
        title: "🏁 FINAL 1 - A FUGA",
        image: "static/Finalsobrevivente.png",
        text: "Brian encaixa a terceira chave na porta principal.\n\nO mecanismo antigo range. A porta finalmente se abre.\n\nAtrás dele, o monstro atravessa o corredor.\n\n\"Eu não vou morrer aqui!\"\n\nBrian corre para fora da mansão. A porta bate violentamente atrás dele.\n\nEle olha para a janela do segundo andar. Por um instante, vê a silhueta da criatura observando.\n\nEnto a mansão fica completamente escura.\n\nBrian sobreviveu. Mas nunca descobriu quantas outras criaturas o tio havia escondido.\n\n🏁 FIM DO JOGO - SOBREVIVENTE",
        choices: [
            { text: "Reiniciar jogo", next: "restart" }
        ]
    },

    final_antidoto: {
        title: "🏁 FINAL 2 - O ANTÍDOTO",
        image: "static/Aplicaçãodainjeção.png",
        text: "Brian coloca a injeção no braço da criatura.\n\nPor alguns segundos, nada acontece.\n\nEntão o monstro começa a tremer.\n\nOs músculos relaxam. A respiração diminui.\n\nA criatura cai de joelhos.\n\n\"Meu Deus... você era humano.\"\n\nEntre os documentos do tio, Brian encontra uma última anotação:\n\n\"Se alguém conseguir neutralizá-lo, não destrua a criatura. Ela não nasceu assim. Eu fiz isso com ela.\"\n\nBrian destrói os equipamentos do laboratório e chama as autoridades.\n\nA verdade sobre o tio finalmente vem à tona.\n\nMas, enquanto Brian deixa a mansão, um dos monitores quebrados volta a acender.\n\n🏁 FIM DO JOGO - A VERDADE",
        choices: [
            { text: "Reiniciar jogo", next: "restart" }
        ]
    },

    final_verdade: {
        title: "🏁 FINAL 3 - O SEGREDO ETERNO",
        image: "static/FinalAverdade(neutralizado).png",
        text: "Brian decide não destruir nada.\n\nEle estuda os documentos do tio noite após noite.\n\nOs anos passam.\n\nO que era experimento grotesco de Arthur se torna obsessão de Brian.\n\nA criatura não é mais um monstro para ele, mas um... projeto.\n\nOs detetives nunca encontram a mansão.\n\nBrian vira o novo Arthur.\n\nE em algum lugar profundo da mansão...\n\nUma nova criatura está sendo criada.\n\n🏁 FIM DO JOGO - UM NOVO COMEÇO",
        choices: [
            { text: "Reiniciar jogo", next: "restart" }
        ]
    }
};

// FUNÇÕES PRINCIPAIS
function initGame() {
    gameState.player = {
        vida: 100,
        sanidade: 100,
        chaves: [],
        inventario: [],
        livros: [],
        municao: 0,
        municao_espingarda: 0,
        monstro_ferido: 0
    };
    displayScene("capitulo1_inicio");
}

function displayScene(sceneKey) {
    const scene = gameData[sceneKey];
    
    if (!scene) {
        console.error("Cena não encontrada:", sceneKey);
        return;
    }

    // Atualizar imagem
    const imageElement = document.getElementById("gameImage");
    const captionElement = document.getElementById("imageCaption");
    imageElement.src = scene.image;
    captionElement.textContent = scene.title;

    // Atualizar título do capítulo
    document.getElementById("chapterTitle").textContent = scene.title;

    // Atualizar narrativa com animação
    const narrativeElement = document.getElementById("narrativeText");
    narrativeElement.innerHTML = scene.text.replace(/\n/g, "<br>");
    narrativeElement.style.animation = "none";
    setTimeout(() => {
        narrativeElement.style.animation = "fadeIn 0.8s ease-in-out";
    }, 10);

    // Aplicar efeitos
    if (scene.effects) {
        applyEffects(scene.effects);
    }

    // Atualizar escolhas
    displayChoices(scene.choices);

    // Atualizar UI
    updateStatus();

    // Scroll para o topo
    document.querySelector(".story-section").scrollTop = 0;
}

function displayChoices(choices) {
    const container = document.getElementById("choicesContainer");
    container.innerHTML = "";

    choices.forEach((choice, index) => {
        const button = document.createElement("div");
        button.className = "choice-button";
        button.innerHTML = `
            <span class="choice-number">[${index + 1}]</span>
            <span class="choice-text">${choice.text}</span>
        `;
        button.onclick = () => selectChoice(choice.next);
        container.appendChild(button);
    });
}

function selectChoice(nextScene) {
    if (nextScene === "restart") {
        restartGame();
    } else {
        displayScene(nextScene);
    }
}

function applyEffects(effects) {
    if (effects.vida) {
        gameState.player.vida = Math.max(0, Math.min(100, gameState.player.vida + effects.vida));
    }
    if (effects.sanidade) {
        gameState.player.sanidade = Math.max(0, Math.min(100, gameState.player.sanidade + effects.sanidade));
    }
    if (effects.inventario) {
        if (Array.isArray(effects.inventario)) {
            gameState.player.inventario.push(...effects.inventario);
        } else {
            gameState.player.inventario.push(effects.inventario);
        }
    }
    if (effects.chaves) {
        if (Array.isArray(effects.chaves)) {
            gameState.player.chaves.push(...effects.chaves);
        } else {
            gameState.player.chaves.push(effects.chaves);
        }
    }
    if (effects.municao) {
        gameState.player.municao = effects.municao;
    }
    if (effects.livros) {
        gameState.player.livros.push(effects.livros);
    }
}

function updateStatus() {
    // Atualizar vida
    const vidaPercent = (gameState.player.vida / 100) * 100;
    document.getElementById("vidaBar").style.width = vidaPercent + "%";
    document.getElementById("vidaValue").textContent = `${gameState.player.vida}/100`;

    // Atualizar sanidade
    const sanidadePercent = (gameState.player.sanidade / 100) * 100;
    document.getElementById("sanidadeBar").style.width = sanidadePercent + "%";
    document.getElementById("sanidadeValue").textContent = `${gameState.player.sanidade}/100`;

    // Atualizar chaves
    document.getElementById("chavesValue").textContent = `${gameState.player.chaves.length}/3`;

    // Atualizar inventário
    const inventarioText = gameState.player.inventario.length > 0 
        ? gameState.player.inventario.join(", ") 
        : "Vazio";
    document.getElementById("inventarioValue").textContent = inventarioText;

    // Verificar game over
    if (gameState.player.vida <= 0) {
        setTimeout(() => {
            alert("💀 GAME OVER - Brian sucumbiu à mansão.\n\nPressione OK para reiniciar.");
            restartGame();
        }, 500);
    }

    if (gameState.player.sanidade <= 0) {
        setTimeout(() => {
            alert("😵 SANIDADE CRÍTICA - A mente de Brian entrou em colapso.\n\nPressione OK para reiniciar.");
            restartGame();
        }, 500);
    }
}

function restartGame() {
    gameState = {
        chapter: 1,
        player: {
            vida: 100,
            sanidade: 100,
            chaves: [],
            inventario: [],
            livros: [],
            municao: 0,
            municao_espingarda: 0,
            monstro_ferido: 0
        },
        currentImageIndex: 0
    };
    initGame();
}

function saveGame() {
    localStorage.setItem("brianGameSave", JSON.stringify(gameState));
    alert("✅ Jogo salvo com sucesso!");
}

function loadGame() {
    const saved = localStorage.getItem("brianGameSave");
    if (saved) {
        gameState = JSON.parse(saved);
        alert("✅ Jogo carregado!");
        // Nota: Idealmente você precisaria rastrear qual cena está ativa
        // Por enquanto, reinicia do capítulo 1
        initGame();
    } else {
        alert("❌ Nenhuma partida salva encontrada.");
    }
}

function closeModal() {
    document.getElementById("eventModal").style.display = "none";
}

// Inicializar o jogo ao carregar a página
window.addEventListener("load", () => {
    initGame();
});

// Fechar modal ao clicar fora dele
window.addEventListener("click", (event) => {
    const modal = document.getElementById("eventModal");
    if (event.target === modal) {
        closeModal();
    }
});
