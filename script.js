// ============================================
// Chat AI - Front-end Logic
// Tab Navigation + Simulated AI responses with typing effect
// ============================================

const STORAGE_KEY = 'chatSessions';
const CURRENT_KEY = 'currentChatId';

// Simulated AI response database
const AI_RESPONSES = {
  'css grid':
    '**CSS Grid** e um sistema de layout bidimensional.\n\n' +
    'Exemplo basico:\n\n' +
    '```\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n```\n\n' +
    'Pergunta sobre algo especifico para uma resposta mais detalhada!',

  'flexbox':
    '**Flexbox** e ideal para layout unidimensional (linha ou coluna).\n\n' +
    'Exemplo de centralizacao perfeita:\n\n' +
    '```\n.container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n```\n\n' +
    'Isso centraliza tudo vertical e horizontalmente!',

  'custom properties':
    '**CSS Custom Properties** (variaveis CSS) permitem reutilizar valores.\n\n' +
    '```\n:root {\n  --cor-primaria: #10a37f;\n}\n\n.botao {\n  background: var(--cor-primaria);\n}\n```\n\n' +
    'Voce pode ate atualizar via JavaScript!',

  'melhores praticas':
    'Top 5 de melhores praticas de CSS:\n\n' +
    '1. Use variaveis CSS para cores e espacamentos\n' +
    '2. Prefira `rem` e `em` em vez de `px`\n' +
    '3. Use Flexbox para layouts unidimensionais, Grid para bidimensionais\n' +
    '4. Mantenha especificidade baixa para evitar overrides\n' +
    '5. Use `clamp()` para tipografia responsiva',
};

// Documentation data
const DOCS_DATA = [
  {
    id: 'flexbox',
    title: 'Flexbox Avançado',
    icon: 'layout',
    tag: 'Layout',
    content: `
## Flexbox - Guia Completo

Flexbox (Flexible Box Layout) é um modelo de layout unidimensional que distribui espaço entre itens em um container.

### Propriedades do Container

\`\`\`css
.container {
  display: flex;
  justify-content: center; /* alinhamento horizontal */
  align-items: center; /* alinhamento vertical */
  flex-wrap: wrap; /* quebra de linha */
  gap: 16px; /* espaçamento entre itens */
}
\`\`\`

### Propriedades dos Itens

\`\`\`css
.item {
  flex-grow: 1; /* cresce se houver espaço */
  flex-shrink: 0; /* não encolhe */
  flex-basis: 200px; /* tamanho inicial */
  align-self: flex-start; /* alinhamento individual */
}
\`\`\`

### Casos de Uso Comuns

- Centralização perfeita (vertical + horizontal)
- Barras de navegação
- Cards com igual altura
- Layouts responsivos
    `
  },
  {
    id: 'grid',
    title: 'CSS Grid Avançado',
    icon: 'grid',
    tag: 'Layout',
    content: `
## CSS Grid - Sistema Bidimensional

CSS Grid é perfeito para criar layouts complexos de forma simples e poderosa.

### Grid Básico

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
\`\`\`

### Grid Areas

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

### Repeat e Auto-fit

\`\`\`css
.grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
\`\`\`

Cria colunas responsivas automaticamente!
    `
  },
  {
    id: 'custom-properties',
    title: 'CSS Custom Properties',
    icon: 'variables',
    tag: 'Variáveis',
    content: `
## Variáveis CSS (Custom Properties)

Variáveis CSS permitem armazenar e reutilizar valores em toda a folha de estilo.

### Declaração

\`\`\`css
:root {
  --primary-color: #10a37f;
  --spacing-md: 16px;
  --font-main: system-ui, sans-serif;
}

.elemento {
  color: var(--primary-color);
  padding: var(--spacing-md);
  font-family: var(--font-main);
}
\`\`\`

### JavaScript dynamic update

\`\`\`javascript
document.documentElement.style.setProperty(
  '--primary-color',
  '#ff5722'
);
\`\`\`

### Herança e Sobrescrita

Variáveis CSS respeitam cascata e herdam como qualquer propriedade CSS:

\`\`\`css
.card {
  --bg-color: #333;
  background: var(--bg-color);
}

.card.highlight {
  --bg-color: #10a37f; /* sobrescreve apenas aqui */
}
\`\`\`
    `
  },
  {
    id: 'container-queries',
    title: 'Container Queries',
    icon: 'responsive',
    tag: 'Responsivo',
    content: `
## Container Queries

.container queries permitem estilizar elementos baseados no tamanho do container, não da viewport!

### Sintaxe Básica

\`\`\`css
.card-container {
  container-type: inline-size;
}

/* Estilos baseados no container */
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}

@container (max-width: 300px) {
  .card {
    flex-direction: column;
  }
}
\`\`\`

### Container Name

\`\`\`css
.sidebar {
  container-name: sidebar;
}

@container sidebar (min-width: 300px) {
  /* estilos */
}
\`\`\`

### Benefícios

- Componentes verdadeiramente responsivos
- Reutilização de componentes
- Independente do viewport
- Modularidade
    `
  },
  {
    id: 'animations',
    title: 'Animações CSS Avançadas',
    icon: 'animation',
    tag: 'Animações',
    content: `
## Animações e Transições

Crie animações performáticas e suaves com CSS puro.

### Transitions

\`\`\`css
.button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
\`\`\`

### Keyframes

\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.element {
  animation: fadeIn 0.5s ease-out forwards;
}
\`\`\`

### Performance

- Use \`transform\` e \`opacity\` para animações de alta performance
- Evite animar \`width\`, \`height\`, \`margin\`
- Use \`will-change\` quando necessário
- Prefira \`translate3d\` para ativar GPU
    `
  },
  {
    id: 'selectors',
    title: 'Seletores Avançados',
    icon: 'code',
    tag: 'Seletores',
    content: `
## Seletores CSS Poderosos

Dominar seletores avançados permite criar estilos mais específicos e reutilizáveis.

### Pseudo-classes

\`\`\`css
/* Primeiro e último filho */
li:first-child { margin-left: 0; }
li:last-child { margin-right: 0; }

/* nth-child */
tr:nth-child(even) { background: #f5f5f5; }

/* State selectors */
a:hover, a:focus { text-decoration: underline; }
\`\`\`

### Pseudo-elementos

\`\`\`css
/* Conteúdo gerado */
.button::before {
  content: '→ ';
}

/* First line/letter */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }

/* Selection */
::selection {
  background: var(--primary-color);
  color: white;
}
\`\`\`

### Combinators

\`\`\`css
/* Descendant */
nav ul li a { color: blue; }

/* Child (mais específico) */
nav > ul > li > a { color: red; }

/* Adjacent sibling */
h2 + p { margin-top: 0; }

/* General sibling */
h2 ~ p { color: gray; }
\`\`\`

### Attribute selectors

\`\`\`css
a[href^="https"]::after {
  content: ' (external)';
}

input[type="email"] {
  border-color: blue;
}
\`\`\`
    `
  }
];

// Examples data
const EXAMPLES_DATA = [
  {
    id: 'flex-center',
    title: 'Centralização com Flexbox',
    description: 'Centraliza elementos vertical e horizontalmente',
    code: `.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}`,
    styles: `
.demo-flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
}
.demo-child {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
    `
  },
  {
    id: 'grid-layout',
    title: 'Layout com Grid',
    description: 'Grid layout responsivo com áreas nomeadas',
    code: `.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 10px;
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`,
    styles: `
.demo-grid-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
  height: 200px;
  background: #f0f0f0;
  padding: 8px;
  border-radius: 8px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
.demo-header {
  grid-area: header;
  background: #667eea;
  color: white;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
}
.demo-main {
  grid-area: main;
  background: #764ba2;
  color: white;
  padding: 8px;
  border-radius: 4px;
}
.demo-sidebar {
  grid-area: sidebar;
  background: #f093fb;
  color: white;
  padding: 8px;
  border-radius: 4px;
}
.demo-footer {
  grid-area: footer;
  background: #4facfe;
  color: white;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
}
    `
  },
  {
    id: 'card-hover',
    title: 'Card Hover Effects',
    description: 'Efeitos suaves de hover com transition e transform',
    code: `.card {
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 12px;
  background: white;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}`,
    styles: `
.demo-card-hover {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 8px;
}
.demo-card-item {
  background: white;
  padding: 24px 32px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-weight: 500;
}
.demo-card-item:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}
    `
  },
  {
    id: 'gradient-bg',
    title: 'Gradient Background',
    description: 'Backgrounds animados com gradientes CSS',
    code: `.box {
  background: linear-gradient(
    45deg,
    #ff6b6b,
    #feca57,
    #48dbfb,
    #ff9ff3
  );
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`,
    styles: `
.demo-gradient-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  background: #1a1a2e;
  border-radius: 8px;
}
.demo-gradient-box {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  background: linear-gradient(
    45deg,
    #ff6b6b,
    #feca57,
    #48dbfb,
    #ff9ff3
  );
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
    `
  }
];

// --- State Management ---
let sessions = loadSessions();
let currentChatId = localStorage.getItem(CURRENT_KEY);
let isTyping = false;
let currentTab = 'chat';

loadUI();

// --- DOM Elements ---
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const chatHistory = document.getElementById('chatHistory');
const newChatBtn = document.getElementById('newChatBtn');
const messagesEl = document.getElementById('messages');
const welcomeScreen = document.getElementById('welcomeScreen');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const inputArea = document.getElementById('inputArea');

// --- Sidebar Navigation ---
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const section = item.dataset.nav;
    navigateToSection(section);
  });
});

function navigateToSection(section) {
  // Update nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.nav === section);
  });

  // Update panels
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === section + 'Panel');
  });

  currentTab = section;

  // Load content based on section
  if (section === 'docs') {
    loadDocumentation();
  } else if (section === 'examples') {
    loadExamples();
  }

  // Close mobile sidebar on navigation
  closeSidebar();

  // Save preference
  localStorage.setItem('currentSection', section);
}

// Restore last section on load
window.addEventListener('DOMContentLoaded', () => {
  const savedSection = localStorage.getItem('currentSection') || 'chat';
  navigateToSection(savedSection);
});

function loadDocumentation() {
  const docsList = document.getElementById('docsList');
  if (docsList.querySelector('.doc-card')) return; // already loaded

  docsList.innerHTML = DOCS_DATA.map(doc => `
    <div class="doc-card" data-doc="${doc.id}">
      <div class="doc-icon">
        ${getIcon(doc.icon)}
      </div>
      <h3>${doc.title}</h3>
      <p>${doc.content.split('\n')[1]}</p>
      <span class="doc-tag">${doc.tag}</span>
    </div>
  `).join('');

  // Add click listeners
  docsList.querySelectorAll('.doc-card').forEach(card => {
    card.addEventListener('click', () => {
      const doc = DOCS_DATA.find(d => d.id === card.dataset.doc);
      if (doc) {
        openDocumentationModal(doc);
      }
    });
  });
}

function loadExamples() {
  const examplesGrid = document.getElementById('examplesGrid');
  if (examplesGrid.querySelector('.example-card')) return; // already loaded

  examplesGrid.innerHTML = EXAMPLES_DATA.map(example => `
    <div class="example-card" data-example="${example.id}">
      <h3>${example.title}</h3>
      <p>${example.description}</p>
      <div class="example-preview" style="${example.styles}">
        ${getExamplePreview(example.id)}
      </div>
      <button class="example-btn">Ver Código</button>
    </div>
  `).join('');

  // Add click listeners
  examplesGrid.querySelectorAll('.example-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.example-card');
      const example = EXAMPLES_DATA.find(ex => ex.id === card.dataset.example);
      if (example) {
        openExampleModal(example);
      }
    });
  });
}

function getExamplePreview(id) {
  const previews = {
    'flex-center': '<div class="demo-child"></div>',
    'grid-layout': `
      <div class="demo-header">Header</div>
      <div class="demo-main">Main</div>
      <div class="demo-sidebar">Sidebar</div>
      <div class="demo-footer">Footer</div>
    `,
    'card-hover': '<div class="demo-card-item">Hover me</div>',
    'gradient-bg': '<div class="demo-gradient-box"></div>'
  };
  return previews[id] || '';
}

function getIcon(type) {
  const icons = {
    layout: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
    grid: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="8" height="8"></rect><rect x="14" y="2" width="8" height="8"></rect><rect x="2" y="14" width="8" height="8"></rect><rect x="14" y="14" width="8" height="8"></rect></svg>',
    variables: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"></path></svg>',
    responsive: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20l4-16m2 4l4 12M5 20h14"></path></svg>',
    animation: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3l14 9-14 9V3z"></path></svg>',
    code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'
  };
  return icons[type] || '';
}

function openDocumentationModal(doc) {
  const modal = document.getElementById('modalOverlay');
  const title = document.getElementById('modalTitle');
  const content = document.getElementById('modalContent');

  title.textContent = doc.title;
  content.innerHTML = formatMarkdown(doc.content);
  modal.classList.add('active');
}

function openExampleModal(example) {
  const modal = document.getElementById('modalOverlay');
  const title = document.getElementById('modalTitle');
  const content = document.getElementById('modalContent');

  title.textContent = example.title;
  content.innerHTML = `
    <p>${example.description}</p>
    <h3>CSS</h3>
    <pre><code>${escapeHtml(example.code)}</code></pre>
    <h3>Preview</h3>
    <div class="example-preview" style="${example.styles}">
      ${getExamplePreview(example.id)}
    </div>
  `;
  modal.classList.add('active');
}

// Modal close functionality
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

// Format markdown content (simplified)
function formatMarkdown(text) {
  let html = escapeHtml(text);

  // Code blocks
  html = html.replace(/\`\`\`css([\s\S]*?)\`\`\`/g, '<pre><code>$1</code></pre>');
  html = html.replace(/\`\`\`([\s\S]*?)\`\`\`/g, '<pre><code>$1</code></pre>');

  // Inline code
  html = html.replace(/\`([^]+?)\`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');

  // Wrap consecutive li in ul
  html = html.replace(/((<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');

  return `<p>${html}</p>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getAIResponse(userMessage) {
  const lower = userMessage.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (lower.includes('grid') || lower.includes('css grid')) return AI_RESPONSES['css grid'];
  if (lower.includes('flexbox') || lower.includes('flex')) return AI_RESPONSES['flexbox'];
  if (lower.includes('custom prop') || lower.includes('var(')) return AI_RESPONSES['custom properties'];
  if (lower.includes('boas praticas') || lower.includes('melhores praticas')) return AI_RESPONSES['melhores praticas'];

  const defaults = [
    'Interessante! Para aprofundar, tente perguntar sobre CSS Grid, Flexbox, Custom Properties ou boas praticas de CSS.',
    'Boa pergunta! Que tal explorar tecnicas avançadas de CSS? Posso explicar Grid, Flexbox ou variaveis CSS.',
    'Entendido! Quer que eu detalhe algum conceito especifico de CSS? Grid, Flexbox e Custom Properties sao otimos pontos de partida.',
  ];

  return defaults[Math.floor(Math.random() * defaults.length)];
}

// --- State Management ---
let sessions = loadSessions();
let currentChatId = localStorage.getItem(CURRENT_KEY);
let isTyping = false;

loadUI();

// --- DOM Elements ---
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const chatHistory = document.getElementById('chatHistory');
const newChatBtn = document.getElementById('newChatBtn');
const messagesEl = document.getElementById('messages');
const welcomeScreen = document.getElementById('welcomeScreen');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const inputArea = document.getElementById('inputArea');

// --- Event Listeners ---
newChatBtn.addEventListener('click', createNewChat);
menuToggle.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

document.querySelectorAll('.suggestion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    messageInput.value = btn.textContent.trim();
    sendMessage();
  });
});

// Auto-resize textarea
messageInput.addEventListener('input', () => {
  messageInput.style.height = 'auto';
  messageInput.style.height = Math.min(messageInput.scrollHeight, 200) + 'px';
  sendBtn.disabled = !messageInput.value.trim();
});

// --- Core Functions ---
function createNewChat() {
  currentChatId = null;
  localStorage.removeItem(CURRENT_KEY);
  messagesEl.innerHTML = '';
  messagesEl.hidden = true;
  welcomeScreen.hidden = false;
  messageInput.value = '';
  renderChatHistory();
  closeSidebar();
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text || isTyping) return;

  messageInput.value = '';
  messageInput.style.height = 'auto';
  sendBtn.disabled = true;
  welcomeScreen.hidden = true;
  messagesEl.hidden = false;

  // Init session if needed
  if (!currentChatId) {
    const session = {
      id: Date.now().toString(),
      title: text.substring(0, 40) + (text.length > 40 ? '...' : ''),
      createdAt: Date.now(),
    };
    sessions.push(session);
    currentChatId = session.id;
    localStorage.setItem(CURRENT_KEY, currentChatId);
    saveSessions();
    renderChatHistory();
  }

  appendMessage(text, 'user');
  saveCurrentMessages();

  // Scroll to bottom
  messagesEl.scrollTop = messagesEl.scrollHeight;

  // Simulate AI response
  simulateAIResponse(text);
}

function simulateAIResponse(userMessage) {
  isTyping = true;

  const typingIndicator = document.createElement('div');
  typingIndicator.innerHTML = `<div class="typing-indicator">
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  </div>`;

  const msgEl = appendMessageContent(getAIResponse(userMessage), 'ai');
  const contentEl = msgEl.querySelector('.message-content');

  // Show dots, then replace with streaming text
  contentEl.innerHTML = '';
  contentEl.appendChild(typingIndicator);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  const response = getAIResponse(userMessage);
  streamText(contentEl, response, () => {
    isTyping = false;
    saveCurrentMessages();
  });
}

function appendMessage(text, role) {
  const msgEl = document.createElement('div');
  msgEl.className = `message ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = role === 'user' ? 'CB' : 'AI';

  const content = document.createElement('div');
  content.className = 'message-content';
  content.innerHTML = formatMessage(text);

  msgEl.appendChild(avatar);
  msgEl.appendChild(content);
  messagesEl.appendChild(msgEl);

  return msgEl;
}

function appendMessageContent(text, role) {
  return appendMessage(text, role);
}

function streamText(element, text, onComplete) {
  let i = 0;
  const speed = 12; // ms per character
  const formatted = formatMessage(text);

  function type() {
    if (i <= text.length) {
      // Insert progressively: re-format up to position i
      const current = formatted.substring(0, findCloseTagIndex(formatted, i));
      element.innerHTML = (text.substring(0, i) + getCursorAt()).replace(/\n/g, '<br>');
      i++;
      messagesEl.scrollTop = messagesEl.scrollHeight;
      setTimeout(type, speed + Math.random() * 15);
    } else {
      element.innerHTML = formatted.replace(/\n/g, '<br>');
      onComplete();
    }
  }

  type();
}

function findCloseTagIndex(html, charCount) {
  // Simple approximation: return charCount * 2 to account for markup
  return html.length;
}

function getCursorAt() {
  return '<span class="typing-dot"></span>';
}

function formatMessage(text) {
  // Code blocks
  text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Line breaks (not inside code blocks)
  text = text.replace(/^\d+\.\s/gm, match => match); // preserve list numbers

  return text;
}

// --- Message Persistence ---
function getSessionMessages(id) {
  const key = 'messages_' + id;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveCurrentMessages() {
  if (!currentChatId) return;

  // Rebuild messages from DOM
  const messages = [];
  document.querySelectorAll('.message').forEach(el => {
    messages.push({
      role: el.classList.contains('user') ? 'user' : 'ai',
      content: el.querySelector('.message-content').textContent,
    });
  });

  localStorage.setItem('messages_' + currentChatId, JSON.stringify(messages));
}

// --- Session Persistence ---
function loadSessions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveSessions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function loadUI() {
  renderChatHistory();

  // Restore last open chat
  const lastId = localStorage.getItem(CURRENT_KEY);
  if (lastId) {
    const msgs = getSessionMessages(lastId);
    if (msgs.length > 0) {
      currentChatId = lastId;
      welcomeScreen.hidden = true;
      messagesEl.hidden = false;

      msgs.forEach(m => appendMessageContent(m.content, m.role));
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }
}

// --- Sidebar / Mobile Menu ---
function renderChatHistory() {
  chatHistory.innerHTML = '';

  sessions.slice().reverse().forEach(session => {
    const item = document.createElement('div');
    item.className = 'chat-history-item';
    item.textContent = session.title;
    item.dataset.id = session.id;

    item.addEventListener('click', () => loadSession(session.id));
    chatHistory.appendChild(item);
  });
}

function loadSession(id) {
  currentChatId = id;
  localStorage.setItem(CURRENT_KEY, id);

  messagesEl.innerHTML = '';

  const msgs = getSessionMessages(id);
  if (msgs.length === 0) {
    messagesEl.hidden = true;
    welcomeScreen.hidden = false;
    return;
  }

  welcomeScreen.hidden = true;
  messagesEl.hidden = false;

  msgs.forEach(m => appendMessageContent(m.content, m.role));
  messagesEl.scrollTop = messagesEl.scrollHeight;

  closeSidebar();
}

function toggleSidebar() {
  sidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('active');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
}
