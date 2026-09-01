# 🎮 Brian: A Mansão de Blackwood - Versão HTML

Uma versão interativa em **HTML5** do jogo de horror em texto "Brian: A Mansão de Blackwood", com integração visual de imagens e interface moderna.

## 🎯 Características

✨ **Interface Split-Screen**
- Imagem da cena na esquerda com efeito luminoso
- Narrativa e escolhas na direita
- Design responsivo para desktop e mobile

🎨 **Visual Elegante**
- Tema escuro com acentos dourados
- Animações suaves de transição
- Barras de status em tempo real (Vida e Sanidade)
- 32 imagens diferentes integradas aos capítulos

🎲 **Sistema de Jogo Completo**
- 5 capítulos principais
- Sistema de Vida (0-100) e Sanidade (0-100)
- Inventário dinâmico com itens coletáveis
- 3 chaves para encontrar
- 3 finais diferentes baseados em suas escolhas

💾 **Funcionalidades**
- Salvar progresso (localStorage)
- Carregar jogo anterior
- Reiniciar a qualquer momento
- Game Over automático se Vida ou Sanidade chegarem a 0

## 📁 Estrutura do Projeto

```
/workspaces/jogoterrorpy_html/
├── index.html           # Arquivo HTML principal
├── styles.css           # Estilos CSS
├── game.js              # Engine do jogo (JavaScript)
├── static/              # Pasta com imagens
│   └── Code_Generated_Image (1-32).png
└── README.md            # Este arquivo
```

## 🚀 Como Usar

### Opção 1: Abrir Diretamente
1. Abra o arquivo `index.html` em seu navegador
2. Comece a jogar clicando nas opções

### Opção 2: Usar com Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html` → "Open with Live Server"
3. O navegador abrirá automaticamente na URL `http://127.0.0.1:5500`

### Opção 3: Servidor Python
```bash
# Python 3
python -m http.server 8000

# Acesse em: http://localhost:8000
```

### Opção 4: Servidor Node.js (http-server)
```bash
# Instalar (se não tiver)
npm install -g http-server

# Executar
http-server

# Acesse em: http://localhost:8080
```

## 🎮 Como Jogar

1. **Leia a narrativa** - A história é apresentada na seção direita
2. **Observe a imagem** - Cada cena tem uma imagem correspondente na esquerda
3. **Faça escolhas** - Clique em uma das opções para progredir
4. **Acompanhe seu status**:
   - ❤️ **Vida**: Diminui com dano de monstro
   - 🧠 **Sanidade**: Diminui com eventos assustadores
   - 🔑 **Chaves**: Necessárias para fugir no final
   - 🎒 **Inventário**: Itens coletados durante o jogo

5. **Salve seu progresso** - Use o botão "Salvar Progresso"
6. **Descubra os finais** - Suas escolhas influenciam o desfecho

## 📖 Capítulos

- **Capítulo 1 - A Herança** 🏚️
  Conheca a mansão de Blackwood

- **Capítulo 2 - A Ala Oeste** 🔍
  Explore os mistérios guardados

- **Capítulo 3 - O Laboratório** 🧪
  Descubra o segredo do tio Arthur

- **Capítulo 4 - O Monstro** 👹
  Confronto final com a criatura

- **Capítulo 5 - O Segredo** 🔐
  Revelação da verdade

## 🏁 Finais

O jogo tem **3 finais diferentes**:

1. **Final da Fuga** 🏃 - Brian escapa da mansão
2. **Final do Antídoto** 💊 - Brian salva a criatura
3. **Final da Verdade** 🌙 - Brian se torna o novo Arthur

## 🎨 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com gradientes e animações
- **JavaScript Vanilla** - Lógica do jogo (sem dependências)
- **LocalStorage** - Sistema de save/load

## 🔧 Personalização

### Adicionar Mais Capítulos
Edite o objeto `gameData` em `game.js`:

```javascript
capitulo6_nome: {
    title: "CAPÍTULO 6 - TÍTULO",
    image: "static/Code_Generated_Image (X).png",
    text: "Sua narrativa aqui...",
    effects: { /* efeitos */ },
    choices: [ /* opções */ ]
}
```

### Mudar Cores/Tema
Edite as variáveis CSS em `styles.css`:

```css
:root {
    --primary-color: #1a1a1a;
    --accent-color: #d4af37;
    /* etc */
}
```

## ⚙️ Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- JavaScript habilitado
- Conexão com a internet (para exibir as imagens)

## 📝 Notas

- O jogo funciona completamente **offline** após a primeira carga das imagens
- Dados salvos são armazenados no navegador (localStorage)
- Limpar cache/dados do navegador apagará os saves
- Responsivo em dispositivos móveis (layout vertical)

## 🐛 Troubleshooting

**Imagens não carregam?**
- Certifique-se de que a pasta `static/` está no mesmo diretório
- Verifique se os arquivos PNG estão com os nomes corretos

**Jogo não inicia?**
- Verifique o console do navegador (F12) para erros
- Certifique-se de que `game.js` está carregado

**Save não funciona?**
- localStorage pode estar desabilitado
- Tente em modo privado/incógnito
- Verifique as permissões do navegador

## 📄 Licença

Criado como adaptação interativa do jogo original em Python.

---

**Divirta-se! 🎮👹**

*"A mansão aguarda... você conseguirá descobrir seus segredos?"*
