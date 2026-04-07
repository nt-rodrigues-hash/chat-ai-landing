// ============================================
// CSS Social Media - App Logic
// Tab Navigation + Chat + Modals
// ============================================

const STORAGE_KEY = 'chatSessions';
const CURRENT_KEY = 'currentChatId';

// Simulated AI responses
const AI_RESPONSES = {
  'css grid':
    '**CSS Grid** é um sistema de layout bidimensional.\n\n' +
    'Exemplo básico:\n\n' +
    '```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n```\n\n' +
    'Ideal para layouts complexos com linhas e colunas.',

  'flexbox':
    '**Flexbox** é ideal para layout unidimensional.\n\n' +
    'Exemplo de centralização:\n\n' +
    '```css\n.container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n```\n\n' +
    'Isso centraliza tudo vertical e horizontalmente!',

  'custom properties':
    '**CSS Custom Properties** (variáveis CSS) permitem reutilizar valores.\n\n' +
    '```css\n:root {\n  --primary: #10a37f;\n}\n\n.button {\n  background: var(--primary);\n}\n```\n\n' +
    'Você pode até atualizar via JavaScript!',

  'melhores praticas':
    'Top 5 de melhores práticas de CSS:\n\n' +
    '1. Use variáveis CSS para cores e espaçamentos\n' +
    '2. Prefira `rem` e `em` em vez de `px`\n' +
    '3. Flexbox para layouts unidimensionais, Grid para bidimensionais\n' +
    '4. Mantenha especificidade baixa\n' +
    '5. Use `clamp()` para tipografia responsiva'
};

// Documentation data - from markdown files
const DOCS_DATA = [
  {
    id: 'flexbox',
    title: 'Flexbox Avançado',
    tag: 'Layout',
    content: `# Flexbox - Guia Completo

Flexbox é um modelo de layout unidimensional que distribui espaço entre itens.

## Propriedades do Container

\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
\`\`\`

## Propriedades dos Itens

\`\`\`css
.item {
  flex: 1 1 200px;
  align-self: flex-start;
}
\`\`\`

## Casos de Uso

- Centralização perfeita
- Barras de navegação
- Cards com igual altura
- Layouts responsivos`
  },
  {
    id: 'grid',
    title: 'CSS Grid Avançado',
    tag: 'Layout',
    content: `# CSS Grid - Sistema Bidimensional

CSS Grid permite layouts complexos com linhas e colunas.

## Grid Básico

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## Grid Areas

\`\`\`css
.container {
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
\`\`\`

## Responsivo

\`\`\`css
.grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
\`\`\``
  },
  {
    id: 'custom-properties',
    title: 'Custom Properties',
    tag: 'Variáveis',
    content: `# Variáveis CSS

Armazene e reutilize valores em toda a folha de estilo.

## Declaração

\`\`\`css
:root {
  --primary: #10a37f;
  --spacing: 16px;
}

.elemento {
  color: var(--primary);
  padding: var(--spacing);
}
\`\`\`

## Update via JavaScript

\`\`\`javascript
document.documentElement.style.setProperty(
  '--primary',
  '#ff5722'
);
\`\`\``
  },
  {
    id: 'container-queries',
    title: 'Container Queries',
    tag: 'Responsivo',
    content: `# Container Queries

Estilize baseado no tamanho do container, não da viewport!

## Sintaxe

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { display: flex; }
}
\`\`\`

## Benefícios

- Componentes verdadeiramente responsivos
- Independente do viewport
- Modularidade`
  },
  {
    id: 'animations',
    title: 'Animações CSS',
    tag: 'Animações',
    content: `# Animações e Transições

Crie animações performáticas com CSS puro.

## Transitions

\`\`\`css
.button {
  transition: all 0.3s ease;
}
.button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
\`\`\`

## Keyframes

\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
\`\`\`

## Dica

Use \`transform\` e \`opacity\` para animações de alta performance.`
  },
  {
    id: 'selectors',
    title: 'Seletores Avançados',
    tag: 'Seletores',
    content: `# Seletores CSS Poderosos

Dominar seletores avançados permite estilos mais específicos.

## Pseudo-classes

\`\`\`css
li:first-child { margin-left: 0; }
li:last-child { margin-right: 0; }
tr:nth-child(even) { background: #f5f5f5; }
\`\`\`

## Pseudo-elementos

\`\`\`css
.button::before {
  content: '→ ';
}

::selection {
  background: var(--primary);
  color: white;
}
\`\`\`

## Combinators

\`\`\`css
nav > ul > li > a { color: red; }
h2 + p { margin-top: 0; }
\`\`\``
  }
];

// Examples data
const EXAMPLES_DATA = [
  {
    id: 'flex-center',
    title: 'Centralização com Flexbox',
    description: 'Centraliza elementos vertical e horizontalmente.',
    code: `.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}`,
    styles: `.demo-flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
}`,
    previewHTML: '<div class="demo-child"></div>',
    childStyles: `.demo-child {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}`
  },
  {
    id: 'grid-layout',
    title: 'Layout com Grid',
    description: 'Grid responsivo com áreas nomeadas.',
    code: `.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 10px;
}`,
    styles: `.demo-grid-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
  height: 200px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}`,
    previewHTML: `
  <div class="demo-header">Header</div>
  <div class="demo-main">Main</div>
  <div class="demo-sidebar">Sidebar</div>
  <div class="demo-footer">Footer</div>`,
    childStyles: `
  .demo-header { grid-area: header; background: #667eea; color: white; padding: 8px; border-radius: 4px; text-align: center; }
  .demo-main { grid-area: main; background: #764ba2; color: white; padding: 8px; border-radius: 4px; }
  .demo-sidebar { grid-area: sidebar; background: #f093fb; color: white; padding: 8px; border-radius: 4px; }
  .demo-footer { grid-area: footer; background: #4facfe; color: white; padding: 8px; border-radius: 4px; text-align: center; }`
  },
  {
    id: 'card-hover',
    title: 'Card Hover Effects',
    description: 'Efeitos suaves com transition e transform.',
    code: `.card {
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 12px;
  background: white;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}`,
    styles: `.demo-card-hover {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  background: #f5f5f5;
  border-radius: 8px;
}`,
    previewHTML: '<div class="demo-card-item">Hover me</div>',
    childStyles: `
  .demo-card-item {
    background: white;
    padding: 24px 32px;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .demo-card-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }`
  },
  {
    id: 'gradient-bg',
    title: 'Gradient Background',
    description: 'Backgrounds animados com gradientes CSS.',
    code: `.box {
  background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}`,
    styles: `.demo-gradient-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  background: #1a1a2e;
  border-radius: 8px;
}`,
    previewHTML: '<div class="demo-gradient-box"></div>',
    childStyles: `
  .demo-gradient-box {
    width: 120px;
    height: 120px;
    border-radius: 12px;
    background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }`
  }
];

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const welcomeScreen = document.getElementById('welcomeScreen');
const messagesEl = document.getElementById('messages');
const chatInputContainer = document.getElementById('chatInputContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const suggestions = document.querySelectorAll('.suggestion-btn');

// Chat state
let sessions = loadSessions();
let currentChatId = localStorage.getItem(CURRENT_KEY);
let isTyping = false;

// ===========================
// Navigation
// ===========================
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const section = item.dataset.section;
    switchSection(section);
  });
});

function switchSection(sectionId) {
  // Update nav items
  navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.section === sectionId);
  });

  // Update sections
  sections.forEach(section => {
    section.classList.toggle('active', section.id === sectionId + 'Section');
  });

  // Close mobile sidebar
  closeSidebar();

  // Load content
  if (sectionId === 'docs') loadDocs();
  if (sectionId === 'examples') loadExamples();

  // Save preference
  localStorage.setItem('currentSection', sectionId);
}

// Restore last section on load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('currentSection') || 'chat';
  switchSection(saved);
});

// ===========================
// Sidebar Mobile
// ===========================
menuToggle.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

function toggleSidebar() {
  sidebar.classList.toggle('open');
  sidebarOverlay.classList.toggle('active');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
}

// ===========================
// Documentation
// ===========================
function loadDocs() {
  const grid = document.getElementById('docsGrid');
  if (grid.children.length > 0) return; // Already loaded

  grid.innerHTML = DOCS_DATA.map(doc => `
    <div class="doc-card" data-doc="${doc.id}">
      <div class="doc-icon">${getDocIcon(doc.id)}</div>
      <div class="doc-info">
        <h3>${doc.title}</h3>
        <span class="doc-tag">${doc.tag}</span>
      </div>
      <button class="doc-btn">Abrir</button>
    </div>
  `).join('');

  grid.querySelectorAll('.doc-card').forEach(card => {
    card.addEventListener('click', () => {
      const doc = DOCS_DATA.find(d => d.id === card.dataset.doc);
      if (doc) openModal(doc.title, formatContent(doc.content));
    });
  });
}

function getDocIcon(id) {
  const icons = {
    'flexbox': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
    'grid': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="8" height="8"></rect><rect x="14" y="2" width="8" height="8"></rect><rect x="2" y="14" width="8" height="8"></rect><rect x="14" y="14" width="8" height="8"></rect></svg>',
    'custom-properties': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"></path></svg>',
    'container-queries': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
    'animations': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
    'selectors': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'
  };
  return icons[id] || '';
}

// ===========================
// Examples
// ===========================
function loadExamples() {
  const grid = document.getElementById('examplesGrid');
  if (grid.children.length > 0) return; // Already loaded

  grid.innerHTML = EXAMPLES_DATA.map(ex => `
    <div class="example-card" data-example="${ex.id}">
      <div class="example-preview" style="${ex.styles}">
        ${ex.previewHTML}
      </div>
      <div class="example-info">
        <h3>${ex.title}</h3>
        <p>${ex.description}</p>
      </div>
      <button class="example-btn">Ver Código</button>
    </div>
  `).join('');

  grid.querySelectorAll('.example-card').forEach(card => {
    const btn = card.querySelector('.example-btn');
    const example = EXAMPLES_DATA.find(ex => ex.id === card.dataset.example);
    if (btn && example) {
      btn.addEventListener('click', () => {
        openModal(example.title, `
          <p>${example.description}</p>
          <h4>CSS:</h4>
          <pre><code>${escapeHtml(example.code)}</code></pre>
          <h4>Preview:</h4>
          <div class="example-preview" style="${example.styles}">
            ${example.previewHTML}
          </div>
        `);
      });
    }
  });
}

// ===========================
// Chat
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  loadUI();

  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      messageInput.value = btn.dataset.prompt;
      sendMessage();
    });
  });

  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  sendBtn.addEventListener('click', sendMessage);

  messageInput.addEventListener('input', () => {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 200) + 'px';
    sendBtn.disabled = !messageInput.value.trim();
  });
});

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text || isTyping) return;

  messageInput.value = '';
  messageInput.style.height = 'auto';
  sendBtn.disabled = true;
  welcomeScreen.hidden = true;
  messagesEl.hidden = false;
  chatInputContainer.hidden = false;

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
  }

  appendMessage(text, 'user');
  saveCurrentMessages();
  messagesEl.scrollTop = messagesEl.scrollHeight;

  simulateAIResponse(text);
}

function simulateAIResponse(userMessage) {
  isTyping = true;

  const response = getAIResponse(userMessage);
  const msgEl = appendMessage(response, 'ai');
  const contentEl = msgEl.querySelector('.message-content');

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

function streamText(element, text, onComplete) {
  let i = 0;
  const speed = 12;
  const formatted = formatMessage(text);

  function type() {
    if (i <= formatted.length) {
      element.innerHTML = formatted.substring(0, i) + '<span class="typing-dot"></span>';
      i++;
      messagesEl.scrollTop = messagesEl.scrollHeight;
      setTimeout(type, speed + Math.random() * 15);
    } else {
      element.innerHTML = formatted;
      onComplete();
    }
  }

  type();
}

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('grid')) return AI_RESPONSES['css grid'];
  if (lower.includes('flexbox') || lower.includes('flex')) return AI_RESPONSES['flexbox'];
  if (lower.includes('custom prop') || lower.includes('var(')) return AI_RESPONSES['custom properties'];
  if (lower.includes('prática') || lower.includes('melhor')) return AI_RESPONSES['melhores praticas'];

  const defaults = [
    'Interessante! Que tal perguntar sobre CSS Grid, Flexbox, Custom Properties ou boas práticas?',
    'Boa pergunta! Posso detalhar conceitos de CSS para você.',
    'Entendido! Quer explores técnicas avançadas de CSS? Grid, Flexbox ou variáveis são ótimos pontos de partida.'
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

function formatMessage(text) {
  let html = escapeHtml(text);
  html = html.replace(/```css([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return html;
}

// ===========================
// Persistence
// ===========================
function loadSessions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveSessions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function getSessionMessages(id) {
  const key = 'messages_' + id;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveCurrentMessages() {
  if (!currentChatId) return;

  const messages = [];
  document.querySelectorAll('.message').forEach(el => {
    messages.push({
      role: el.classList.contains('user') ? 'user' : 'ai',
      content: el.querySelector('.message-content').textContent,
    });
  });

  localStorage.setItem('messages_' + currentChatId, JSON.stringify(messages));
}

function loadUI() {
  if (currentChatId) {
    const msgs = getSessionMessages(currentChatId);
    if (msgs.length > 0) {
      welcomeScreen.hidden = true;
      messagesEl.hidden = false;
      chatInputContainer.hidden = false;
      msgs.forEach(m => appendMessage(m.content, m.role));
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }
}

// ===========================
// Modal
// ===========================
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function openModal(title, content) {
  modalTitle.textContent = title;
  modalContent.innerHTML = content;
  modalOverlay.classList.add('active');
}

modalClose.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === e.target) {
    modalOverlay.classList.remove('active');
  }
});

// Helpers
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatContent(markdown) {
  let html = escapeHtml(markdown);
  html = html.replace(/```css([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/((<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
  html = html.replace(/\n\n/g, '</p><p>');
  return `<div class="doc-content">${html}</div>`;
}
