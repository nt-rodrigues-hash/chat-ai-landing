// ============================================
// Chat AI - Front-end Logic
// Simulated AI responses with typing effect
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
