(function() {
  if (window.__lnChatBootstrapped) return;
  window.__lnChatBootstrapped = true;

  // 1. Inject Styles for Chat and Quiz
  const css = `
    :root {
      --ln-brown: #3d372e;
      --ln-tan: #b5925a;
      --ln-cream: #e5e0d4;
      --ln-light-tan: #d6c9b1;
      --ln-dark-tan: #8c7046;
    }
    .ln-chat-launcher {
      position: fixed;
      bottom: 32px;
      left: 32px;
      z-index: 1501;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--ln-brown);
      border: 1px solid rgba(255,255,255,0.08);
      color: var(--ln-cream);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      transition: transform 0.2s ease, background 0.2s ease;
    }
    .ln-chat-launcher:hover { background: var(--ln-dark-tan); transform: translateY(-2px); }
    .ln-chat-launcher svg { width: 26px; height: 26px; }
    .ln-chat-panel {
      position: fixed;
      bottom: 28px;
      left: 28px;
      width: 380px;
      max-width: calc(100vw - 48px);
      max-height: calc(100vh - 120px);
      background: #f7efe2;
      border: 1px solid rgba(199,163,122,0.25);
      box-shadow: 0 30px 80px rgba(0,0,0,0.55);
      z-index: 1600;
      display: none;
      flex-direction: column;
      border-radius: 0;
      overflow: hidden;
    }
    .ln-chat-panel.open { display: flex; }
    .ln-chat-header {
      background: var(--ln-brown);
      color: var(--ln-cream);
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .ln-chat-header .lp { display: flex; align-items: center; gap: 10px; }
    .ln-chat-header .lp-dot { width: 8px; height: 8px; background: #7ee787; border-radius: 50%; box-shadow: 0 0 0 3px rgba(126,231,135,0.25); }
    .ln-chat-header .lp-title { font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; }
    .ln-chat-header .lp-badge { font-size: 9px; opacity: 0.8; letter-spacing: 0.15em; text-transform: uppercase; }
    .ln-chat-close { background: transparent; border: none; color: rgba(255,255,255,0.7); cursor: pointer; font-size: 18px; line-height: 1; padding: 4px; }
    .ln-chat-close:hover { color: #fff; }
    .ln-chat-messages { padding: 16px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 10px; }
    .ln-chat-message { background: rgba(255,255,255,0.65); border: 1px solid rgba(199,163,122,0.2); padding: 10px 12px; font-size: 13.5px; line-height: 1.55; color: var(--ln-brown); }
    .ln-chat-message.bot { background: rgba(255,255,255,0.75); border-color: rgba(199,163,122,0.35); }
    .ln-chat-message.user { background: var(--ln-brown); color: var(--ln-cream); border-color: transparent; align-self: flex-end; max-width: 78%; }
    .ln-chat-message strong { color: var(--ln-dark-tan); }
    .ln-chat-message.bot strong { color: var(--ln-dark-tan); }
    .ln-chat-actions { padding: 12px 14px; border-top: 1px solid rgba(199,163,122,0.2); display: flex; flex-direction: column; gap: 8px; }
    .ln-chat-btn {
      background: transparent;
      border: 1px solid rgba(61,55,46,0.28);
      color: var(--ln-brown);
      padding: 9px 12px;
      font-family: "Outfit", sans-serif;
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .ln-chat-btn:hover { background: var(--ln-brown); color: var(--ln-cream); border-color: transparent; }
    
    /* Quiz styling */
    .quiz-container { padding: 40px; color: var(--ln-brown); font-family: "Outfit", sans-serif; }
    .quiz-title { font-family: "Libre Baskerville", serif; font-size: 24px; margin-bottom: 12px; color: var(--ln-brown); }
    .quiz-desc { font-size: 14px; color: rgba(61,55,46,0.7); line-height: 1.6; margin-bottom: 24px; }
    .quiz-option-btn {
      width: 100%; text-align: left; padding: 16px 20px; border: 1px solid rgba(181, 146, 90, 0.3);
      background: #fdfbf7; margin-bottom: 12px; transition: all 0.25s ease; cursor: pointer;
      font-size: 14px; font-weight: 500;
    }
    .quiz-option-btn:hover { border-color: var(--ln-tan); background: rgba(181, 146, 90, 0.05); transform: translateY(-1px); }
    .quiz-progress { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--ln-tan); margin-bottom: 8px; }
    
    @media (max-width: 480px) {
      .ln-chat-launcher { bottom: 20px; left: 20px; width: 52px; height: 52px; }
      .ln-chat-panel { left: 12px; right: 12px; width: auto; bottom: 16px; max-height: calc(100vh - 100px); }
      .quiz-container { padding: 24px 16px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // 2. Inject HTML for Floating Chat Panel
  const html = `
    <div class="ln-chat-frame" id="ln-chat-frame">
      <aside class="ln-chat-panel" id="ln-chat-panel" role="dialog" aria-modal="true" aria-label="Assistant">
        <div class="ln-chat-header">
          <div class="lp">
            <div class="lp-dot"></div>
            <div>
              <div class="lp-title" id="chat-header-title">Member Support</div>
              <div class="lp-badge" id="chat-header-badge">Desk</div>
            </div>
          </div>
          <button class="ln-chat-close" id="ln-chat-close" aria-label="Close">×</button>
        </div>

        <div class="ln-chat-messages" id="ln-chat-messages">
          <div class="ln-chat-message bot" id="ln-msg-0">
            Welcome to <strong>LandNow</strong>. Please submit your details below to connect with Member Relations.
          </div>
        </div>

        <div class="ln-chat-actions" id="ln-chat-actions">
          <!-- Gate Form / Textbox loaded dynamically here -->
        </div>
      </aside>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  // 3. Bind Chat Behavior
  const panel = document.getElementById('ln-chat-panel');
  const messages = document.getElementById('ln-chat-messages');
  const actions = document.getElementById('ln-chat-actions');
  const openBtn = document.getElementById('ln-chat-launcher');
  const closeBtn = document.getElementById('ln-chat-close');
  const chatSessionId = 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  const AGENT_NAMES = ['Marcus', 'Sarah', 'Christian', 'David'];

  function openChat() { panel.classList.add('open'); if (openBtn) openBtn.style.transform = 'scale(0)'; }
  function closeChat() { panel.classList.remove('open'); if (openBtn) openBtn.style.transform = 'scale(1)'; }
  if (openBtn) openBtn.addEventListener('click', openChat);
  if (closeBtn) closeBtn.addEventListener('click', closeChat);
  window.openChat = openChat;

  function addMessage(text, type, attrs) {
    const div = document.createElement('div');
    div.className = 'ln-chat-message ' + (type || 'bot');
    Object.keys(attrs || {}).forEach(function(k) { div.setAttribute(k, attrs[k]); });
    div.innerHTML = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function setActions(html) { actions.innerHTML = html; }

  function showTyping() {
    const t = document.createElement('div'); t.className = 'ln-chat-message bot'; t.id = 'ln-typing'; t.innerHTML = 'Thinking…'; messages.appendChild(t); messages.scrollTop = messages.scrollHeight;
  }
  function hideTyping() { var t = document.getElementById('ln-typing'); if (t) t.remove(); }

  function getChatHistory() {
    const history = [];
    const elements = messages.querySelectorAll('.ln-chat-message');
    elements.forEach(el => {
      const isBot = el.classList.contains('bot');
      const cleanText = el.innerText.replace(/Thinking…/g, '').trim();
      if (cleanText && !cleanText.includes("Please submit your details") && !cleanText.includes("Connecting you to our acquisitions desk")) {
        history.push({
          role: isBot ? 'assistant' : 'user',
          content: cleanText
        });
      }
    });
    return history;
  }

  function renderChatGate() {
    const html = `
      <form id="ln-chat-gate-form" style="display:flex; flex-direction:column; width:100%; gap:8px;">
        <input type="text" id="g-name" placeholder="Full Name" required style="padding:10px; border:1px solid rgba(61,55,46,0.25); font-family:inherit; font-size:13px; outline:none; color:var(--ln-brown);" />
        <input type="tel" id="g-phone" placeholder="Mobile Number" required style="padding:10px; border:1px solid rgba(61,55,46,0.25); font-family:inherit; font-size:13px; outline:none; color:var(--ln-brown);" />
        <input type="email" id="g-email" placeholder="Email Address" required style="padding:10px; border:1px solid rgba(61,55,46,0.25); font-family:inherit; font-size:13px; outline:none; color:var(--ln-brown);" />
        <div id="g-msg" style="font-size:11px; color:#b91c1c; font-weight:600;"></div>
        <button type="submit" class="ln-chat-btn" style="margin:0; padding:10px; font-weight:bold;">Connect with Representative</button>
      </form>
    `;
    setActions(html);

    const form = document.getElementById('ln-chat-gate-form');
    const msg = document.getElementById('g-msg');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('g-name').value.trim();
        const phone = document.getElementById('g-phone').value.trim();
        const email = document.getElementById('g-email').value.trim();

        if (!name || !phone || !email) {
          msg.textContent = "All fields are required.";
          return;
        }

        msg.style.color = 'var(--ln-tan)';
        msg.textContent = "Connecting...";

        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'visitor', name, phone, email })
        })
        .then(res => {
          if (!res.ok) throw new Error("Verification failed");
          return res.json();
        })
        .then(() => {
          const agent = AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)];
          sessionStorage.setItem('ln_chat_visitor_unlocked', '1');
          sessionStorage.setItem('ln_assigned_agent', agent);
          sessionStorage.setItem('ln_visitor_name', name);
          
          document.getElementById('chat-header-title').textContent = agent;
          document.getElementById('chat-header-badge').textContent = 'Relations Desk';

          messages.innerHTML = `<div class="ln-chat-message bot">Welcome <strong>${name}</strong>. Connecting you to our acquisitions desk, please wait...</div>`;
          
          setTimeout(() => {
            messages.innerHTML += `<div class="ln-chat-message bot">Hi <strong>${name}</strong>, thank you for verifying your details. ${agent} here from Member Relations. What specific topic or asset class are you looking at today?</div>`;
            renderTextInput();
          }, 1500);
        })
        .catch(err => {
          console.error(err);
          msg.style.color = '#b91c1c';
          msg.textContent = "Failed to connect. Please try again.";
        });
      });
    }
  }

  function renderTextInput() {
    const html = `
      <form id="ln-chat-input-form" style="display:flex; width:100%; gap:8px; margin:0; padding:0;">
        <input type="text" id="ln-chat-input" placeholder="Type your message..." required style="flex:1; padding:10px 12px; border:1px solid rgba(61,55,46,0.25); background:#fff; font-family:inherit; font-size:13px; outline:none; border-radius:0; color:var(--ln-brown);" />
        <button type="submit" class="ln-chat-btn" style="margin:0; padding:10px 16px; border-radius:0;">Send</button>
      </form>
    `;
    setActions(html);

    const input = document.getElementById('ln-chat-input');
    const form = document.getElementById('ln-chat-input-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const typedVal = input.value.trim();
        if (!typedVal) return;

        addMessage(typedVal, 'user');
        const history = getChatHistory();
        input.value = '';
        input.focus();
        showTyping();

        // 1.2 to 2.5 seconds random typing delay to look human
        const delay = 1200 + Math.random() * 1300;

        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: typedVal, 
            history, 
            session_id: chatSessionId,
            user_name: sessionStorage.getItem('ln_visitor_name') || '',
            agent_name: sessionStorage.getItem('ln_assigned_agent') || 'Marcus'
          })
        })
        .then(function(res) {
          if (!res.ok) throw new Error('API Error');
          return res.json();
        })
        .then(function(data) {
          setTimeout(() => {
            hideTyping();
            addMessage(data.reply, 'bot');
          }, delay);
        })
        .catch(function(err) {
          hideTyping();
          addMessage('Sorry, connection interrupted. Trying to reconnect...', 'bot');
        });
      });
    }
  }

  // Initialize correct panel state based on session unlock
  if (sessionStorage.getItem('ln_chat_visitor_unlocked')) {
    const agent = sessionStorage.getItem('ln_assigned_agent') || 'Marcus';
    const name = sessionStorage.getItem('ln_visitor_name') || 'Guest';
    document.getElementById('chat-header-title').textContent = agent;
    document.getElementById('chat-header-badge').textContent = 'Relations Desk';
    messages.innerHTML = `<div class="ln-chat-message bot">Welcome back <strong>${name}</strong>. How can I assist you with your land or water-rights acquisitions today?</div>`;
    renderTextInput();
  } else {
    renderChatGate();
  }

  // 4. BIND INLINE CHATBOX (Inside #chat-agent-section)
  window.addEventListener('DOMContentLoaded', () => {
    const inlineGateForm = document.getElementById('inline-chat-gate-form');
    const inlineGate = document.getElementById('inline-chat-gate');
    const inlineMessages = document.getElementById('inline-chat-messages');
    const inlineInputWrapper = document.getElementById('inline-input-wrapper') || document.getElementById('inline-chat-input-wrapper');
    const inlineChatForm = document.getElementById('inline-chat-form');
    const inlineChatInput = document.getElementById('inline-chat-input');
    
    const inlineTitle = document.getElementById('inline-chat-title') || { textContent: '' };
    const inlineBadge = document.getElementById('inline-chat-badge') || { textContent: '' };

    if (inlineGateForm) {
      if (sessionStorage.getItem('ln_chat_visitor_unlocked')) {
        inlineGate.style.display = 'none';
        inlineMessages.style.display = 'block';
        if (inlineInputWrapper) inlineInputWrapper.style.display = 'block';
        
        const agent = sessionStorage.getItem('ln_assigned_agent') || 'Marcus';
        const name = sessionStorage.getItem('ln_visitor_name') || 'Guest';
        inlineTitle.textContent = agent;
        inlineBadge.textContent = 'Relations Desk';
        inlineMessages.innerHTML = `<div class="ln-chat-message bot">Welcome back <strong>${name}</strong>. How can I assist you with your land or water-rights acquisitions today?</div>`;
      }

      inlineGateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('icg-name').value.trim();
        const phone = document.getElementById('icg-phone').value.trim();
        const email = document.getElementById('icg-email').value.trim();
        const msg = document.getElementById('icg-msg');

        if (!name || !phone || !email) return;
        msg.style.color = 'var(--ln-tan)';
        msg.textContent = "Connecting to Concierge...";

        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'visitor', name, phone, email })
        })
        .then(res => {
          if (!res.ok) throw new Error("Failed");
          return res.json();
        })
        .then(() => {
          const agent = AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)];
          sessionStorage.setItem('ln_chat_visitor_unlocked', '1');
          sessionStorage.setItem('ln_assigned_agent', agent);
          sessionStorage.setItem('ln_visitor_name', name);
          
          inlineGate.style.display = 'none';
          inlineMessages.style.display = 'block';
          if (inlineInputWrapper) inlineInputWrapper.style.display = 'block';
          
          inlineTitle.textContent = agent;
          inlineBadge.textContent = 'Relations Desk';
          
          // Sync floating widget if open
          document.getElementById('chat-header-title').textContent = agent;
          document.getElementById('chat-header-badge').textContent = 'Relations Desk';
          messages.innerHTML = `<div class="ln-chat-message bot">Welcome <strong>${name}</strong>. Connecting you to our acquisitions desk, please wait...</div>`;

          inlineMessages.innerHTML = `<div class="ln-chat-message bot">Welcome <strong>${name}</strong>. Connecting you to our acquisitions desk, please wait...</div>`;
          
          setTimeout(() => {
            const initialMsg = `<div class="ln-chat-message bot">Hi <strong>${name}</strong>, thank you for verifying your details. ${agent} here from Member Relations. What specific topic or asset class are you looking at today?</div>`;
            inlineMessages.innerHTML += initialMsg;
            messages.innerHTML += initialMsg;
            renderTextInput();
          }, 1500);
        })
        .catch(err => {
          console.error(err);
          msg.style.color = '#b91c1c';
          msg.textContent = "Failed. Please check details and try again.";
        });
      });
    }

    if (inlineChatForm) {
      inlineChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const typedVal = inlineChatInput.value.trim();
        if (!typedVal) return;

        // Render user message inline
        const userDiv = document.createElement('div');
        userDiv.className = 'ln-chat-message user';
        userDiv.textContent = typedVal;
        inlineMessages.appendChild(userDiv);
        inlineMessages.scrollTop = inlineMessages.scrollHeight;

        inlineChatInput.value = '';

        // Typing indicator
        const typeDiv = document.createElement('div');
        typeDiv.className = 'ln-chat-message bot';
        typeDiv.id = 'inline-typing';
        typeDiv.textContent = 'Thinking...';
        inlineMessages.appendChild(typeDiv);
        inlineMessages.scrollTop = inlineMessages.scrollHeight;

        // Retrieve full history from inline messages
        const chatHistory = [];
        inlineMessages.querySelectorAll('.ln-chat-message').forEach(el => {
          if (el.id === 'inline-typing') return;
          const isBot = el.classList.contains('bot');
          chatHistory.push({
            role: isBot ? 'assistant' : 'user',
            content: el.innerText.trim()
          });
        });

        // 1.2 to 2.5 seconds random typing delay to look human
        const delay = 1200 + Math.random() * 1300;

        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: typedVal, 
            history: chatHistory, 
            session_id: chatSessionId,
            user_name: sessionStorage.getItem('ln_visitor_name') || '',
            agent_name: sessionStorage.getItem('ln_assigned_agent') || 'Marcus'
          })
        })
        .then(res => {
          if (!res.ok) throw new Error('API Error');
          return res.json();
        })
        .then(data => {
          setTimeout(() => {
            const typeEl = document.getElementById('inline-typing');
            if (typeEl) typeEl.remove();

            const replyDiv = document.createElement('div');
            replyDiv.className = 'ln-chat-message bot';
            replyDiv.innerHTML = data.reply;
            inlineMessages.appendChild(replyDiv);
            inlineMessages.scrollTop = inlineMessages.scrollHeight;
          }, delay);
        })
        .catch(err => {
          console.error(err);
          const typeEl = document.getElementById('inline-typing');
          if (typeEl) typeEl.remove();

          const errDiv = document.createElement('div');
          errDiv.className = 'ln-chat-message bot';
          errDiv.textContent = 'Connection interrupted. Trying to reconnect...';
          inlineMessages.appendChild(errDiv);
          inlineMessages.scrollTop = inlineMessages.scrollHeight;
        });
      });
    }
  });

  // 5. INLINE & POPUP SCREENING QUIZ ENGINE
  window.addEventListener('DOMContentLoaded', () => {
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname.endsWith('/index.html') || 
                       window.location.pathname === '' ||
                       window.location.hostname === 'localhost' && window.location.pathname === '/';

    const leadTrigger = document.getElementById('lead-trigger');
    if (leadTrigger) {
      const fullText = leadTrigger.querySelector('.lt-text-full') || leadTrigger.querySelector('.lt-text');
      if (fullText) fullText.textContent = "Take A Quiz";
      const shortText = leadTrigger.querySelector('.lt-text-short');
      if (shortText) shortText.textContent = "Quiz";

      if (isHomePage) {
        leadTrigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const target = document.getElementById('quiz-section');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      } else {
        leadTrigger.setAttribute('href', '/#quiz-section');
      }
    }

    // Auto initialize the inline quiz section on homepage load
    const inlineQuizContainer = document.getElementById('inline-quiz-container');
    if (inlineQuizContainer && isHomePage) {
      initInlineQuiz(inlineQuizContainer);
    }
  });

  let quizQuestions = [];
  let answers = {};
  let currentLayer = 1;
  let currentQuestion = null;
  let quizSessionId = '';

  window.openQuizPopup = openQuizPopup;
  async function openQuizPopup() {
    const overlay = document.getElementById('lead-popup-overlay');
    const popup = document.getElementById('lead-popup');
    if (!overlay || !popup) return;

    overlay.classList.add('active');
    popup.innerHTML = `
      <div class="quiz-container text-center">
        <div class="w-8 h-8 mx-auto border-2 border-ln-tan border-t-transparent animate-spin mb-4"></div>
        <p class="text-sm text-ln-brown/60">Loading screening round...</p>
      </div>
    `;

    try {
      const res = await fetch('/api/quiz?action=get-questions');
      const data = await res.json();
      quizQuestions = data.questions || [];
      
      // Generate a unique session ID for progress tracking
      quizSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      answers = {};
      currentLayer = 1;
      currentQuestion = quizQuestions.find(q => Number(q.layer) === 1);
      renderQuestion();
    } catch (e) {
      console.error(e);
      popup.innerHTML = `
        <div class="quiz-container text-center">
          <p class="text-sm text-red-600 mb-4">Failed to load quiz. Please try again.</p>
          <button class="ln-chat-btn" onclick="location.reload()">Retry</button>
        </div>
      `;
    }
  }

  function renderQuestion() {
    if (!currentQuestion) {
      renderEmailGate();
      return;
    }

    const popup = document.getElementById('lead-popup');
    popup.innerHTML = `
      <button id="lead-popup-close" aria-label="Close" class="absolute top-4 right-4 text-ln-brown text-xl">×</button>
      <div class="quiz-container">
        <div class="quiz-progress">Step ${currentLayer} of 2</div>
        <h2 class="quiz-title">${currentQuestion.question_text}</h2>
        <p class="quiz-desc">Select the option that matches your objectives.</p>
        
        <button class="quiz-option-btn" data-key="${currentQuestion.option_a_key}">
          ${currentQuestion.option_a_text}
        </button>
        <button class="quiz-option-btn" data-key="${currentQuestion.option_b_key}">
          ${currentQuestion.option_b_text}
        </button>
      </div>
    `;

    // Asynchronously record question view (non-blocking)
    fetch(`/api/quiz?action=track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: currentQuestion.id, type: 'view' })
    }).catch(err => console.error(err));

    document.getElementById('lead-popup-close').addEventListener('click', () => {
      document.getElementById('lead-popup-overlay').classList.remove('active');
    });

    popup.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const optionKey = btn.getAttribute('data-key');
        const qId = currentQuestion.id;
        answers[qId] = optionKey;

        // Instantly submit selection & track in background (non-blocking)
        fetch(`/api/quiz?action=track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question_id: qId, option_key: optionKey, type: 'click' })
        }).catch(err => console.error(err));

        fetch(`/api/quiz?action=submit-selection`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: quizSessionId, question_id: qId, option_key: optionKey })
        }).catch(err => console.error(err));

        // Instantly transition to the next step (No await, extremely snappy UI)
        if (currentLayer === 1) {
          currentLayer = 2;
          currentQuestion = quizQuestions.find(q => Number(q.layer) === 2 && q.parent_option === optionKey);
          renderQuestion();
        } else {
          renderEmailGate();
        }
      });
    });
  }

  function determineSegment() {
    const q1Answer = answers['q1'];
    let q2Answer = '';
    if (q1Answer === 'active_ops') {
      q2Answer = answers['q2_active'];
    } else {
      q2Answer = answers['q2_capital'];
    }

    if (q1Answer === 'active_ops' && q2Answer === 'institutional') {
      return { key: 'A', name: 'The Operator', actionText: 'Join active acquisitions', desc: 'Join active deals room and acquire land/water assets.' };
    } else if (q1Answer === 'active_ops' && q2Answer === 'boutique') {
      return { key: 'B', name: 'The Strategist', actionText: 'Start with the frameworks', desc: 'Access deal analysis toolkits, maps, and regulatory templates.' };
    } else if (q1Answer === 'capital_alloc' && q2Answer === 'immediate') {
      return { key: 'C', name: 'The Buyer', actionText: 'See member deals', desc: 'Vetted operator pipelines and direct co-investment opportunities.' };
    } else {
      return { key: 'D', name: 'The Tire Kicker', actionText: 'Download Public Ebook', desc: 'Access the free public natural capital ebook to begin learning.' };
    }
  }

  function renderEmailGate() {
    const popup = document.getElementById('lead-popup');
    popup.innerHTML = `
      <button id="lead-popup-close" aria-label="Close" class="absolute top-4 right-4 text-ln-brown text-xl">×</button>
      <div class="quiz-container">
        <div class="quiz-progress">Step 3 of 3</div>
        <h2 class="quiz-title">Enter details to unlock results</h2>
        <p class="quiz-desc">Verification screening requires a name and contact email to generate your custom access pipeline.</p>
        
        <form id="quiz-email-form" class="space-y-4">
          <div class="lp-field">
            <label for="qz-name" class="block text-xs uppercase tracking-wider font-bold mb-1">Full Name</label>
            <input type="text" id="qz-name" placeholder="Your full name" required class="w-full p-3 border border-ln-tan/30 outline-none bg-white text-ln-brown text-sm" />
          </div>
          <div class="lp-field">
            <label for="qz-email" class="block text-xs uppercase tracking-wider font-bold mb-1">Email Address</label>
            <input type="email" id="qz-email" placeholder="you@example.com" required class="w-full p-3 border border-ln-tan/30 outline-none bg-white text-ln-brown text-sm" />
          </div>
          <div class="lp-field">
            <label for="qz-phone" class="block text-xs uppercase tracking-wider font-bold mb-1">Phone Number</label>
            <input type="tel" id="qz-phone" placeholder="Phone" required class="w-full p-3 border border-ln-tan/30 outline-none bg-white text-ln-brown text-sm" />
          </div>
          <div id="qz-msg" class="text-xs font-semibold"></div>
          <button type="submit" class="w-full py-4 bg-ln-brown hover:bg-ln-dark-tan text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300">
            Submit & View Screening Result
          </button>
        </form>
      </div>
    `;

    document.getElementById('lead-popup-close').addEventListener('click', () => {
      document.getElementById('lead-popup-overlay').classList.remove('active');
    });

    const form = document.getElementById('quiz-email-form');
    const msg = document.getElementById('qz-msg');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('qz-name').value.trim();
      const email = document.getElementById('qz-email').value.trim();
      const phone = document.getElementById('qz-phone').value.trim();

      if (!name || !email || !phone) {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Please fill in name, email, and phone.';
        return;
      }

      msg.style.color = 'var(--ln-tan)';
      msg.textContent = 'Verifying application pipeline...';

      const segment = determineSegment();

      try {
        const response = await fetch('/api/quiz?action=submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            funnelCategory: segment.name,
            answers,
            session_id: quizSessionId
          })
        });

        if (!response.ok) throw new Error('Failed to submit');
        
        renderResultsScreen(segment);
      } catch (err) {
        console.error(err);
        msg.style.color = '#b91c1c';
        msg.textContent = 'Connection error. Please try again.';
      }
    });
  }

  function renderResultsScreen(segment) {
    const popup = document.getElementById('lead-popup');
    
    let redirectUrl = 'payment.html';
    if (segment.key === 'B') {
      redirectUrl = 'payment.html?admission=frameworks';
    } else if (segment.key === 'C') {
      redirectUrl = 'payment.html?admission=consult';
    } else if (segment.key === 'D') {
      redirectUrl = 'F1.UltimateGuideToLandStrategies.pdf';
    }

    popup.innerHTML = `
      <button id="lead-popup-close" aria-label="Close" class="absolute top-4 right-4 text-ln-brown text-xl">×</button>
      <div class="quiz-container text-center">
        <div class="quiz-progress">Screening Result</div>
        <h2 class="quiz-title">Segment: ${segment.name}</h2>
        <p class="quiz-desc">${segment.desc}</p>
        
        <div class="py-6 px-4 bg-ln-cream/30 rounded border border-ln-tan/10 mb-6">
          <p class="text-xs text-ln-brown/70 leading-relaxed font-serif italic">
            "Your profile has been analyzed. You qualify for our private access room."
          </p>
        </div>
        
        <a href="${redirectUrl}" id="results-cta-btn" class="block w-full py-4 bg-ln-tan hover:bg-ln-dark-tan text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 text-center select-none">
          ${segment.actionText}
        </a>
      </div>
    `;

    document.getElementById('lead-popup-close').addEventListener('click', () => {
      document.getElementById('lead-popup-overlay').classList.remove('active');
    });
  }

  // 6. INLINE QUIZ LOGIC (Specifically for the embedded quiz on the homepage)
  let inlineQuestions = [];
  let inlineAnswers = {};
  let inlineLayer = 1;
  let inlineActiveQuestion = null;
  let inlineSessionId = '';

  async function initInlineQuiz(containerEl) {
    containerEl.innerHTML = `
      <div class="text-center py-8">
        <div class="w-6 h-6 mx-auto border-2 border-ln-tan border-t-transparent animate-spin mb-2"></div>
        <p class="text-xs text-ln-brown/60">Loading screening questions...</p>
      </div>
    `;

    try {
      const res = await fetch('/api/quiz?action=get-questions');
      const data = await res.json();
      inlineQuestions = data.questions || [];
      inlineSessionId = 'session_inline_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      inlineAnswers = {};
      inlineLayer = 1;
      inlineActiveQuestion = inlineQuestions.find(q => Number(q.layer) === 1);
      renderInlineStep(containerEl);
    } catch (e) {
      console.error(e);
      containerEl.innerHTML = `<p class="text-sm text-red-600 text-center py-4">Failed to load screening quiz. Refresh to try again.</p>`;
    }
  }

  function renderInlineStep(containerEl) {
    if (!inlineActiveQuestion) {
      renderInlineEmailGate(containerEl);
      return;
    }

    containerEl.innerHTML = `
      <div>
        <div class="quiz-progress text-center mb-4">Step ${inlineLayer} of 2</div>
        <h3 class="text-xl serif-font text-center text-ln-brown mb-6">${inlineActiveQuestion.question_text}</h3>
        
        <div class="space-y-3">
          <button class="quiz-option-btn text-center" data-key="${inlineActiveQuestion.option_a_key}">
            ${inlineActiveQuestion.option_a_text}
          </button>
          <button class="quiz-option-btn text-center" data-key="${inlineActiveQuestion.option_b_key}">
            ${inlineActiveQuestion.option_b_text}
          </button>
        </div>
      </div>
    `;

    // Track view in background
    fetch(`/api/quiz?action=track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: inlineActiveQuestion.id, type: 'view' })
    }).catch(err => console.error(err));

    containerEl.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const optionKey = btn.getAttribute('data-key');
        const qId = inlineActiveQuestion.id;
        inlineAnswers[qId] = optionKey;

        // Submit selection and click analytics
        fetch(`/api/quiz?action=track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question_id: qId, option_key: optionKey, type: 'click' })
        }).catch(err => console.error(err));

        fetch(`/api/quiz?action=submit-selection`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: inlineSessionId, question_id: qId, option_key: optionKey })
        }).catch(err => console.error(err));

        // snappy inline transition
        if (inlineLayer === 1) {
          inlineLayer = 2;
          inlineActiveQuestion = inlineQuestions.find(q => Number(q.layer) === 2 && q.parent_option === optionKey);
          renderInlineStep(containerEl);
        } else {
          renderInlineEmailGate(containerEl);
        }
      });
    });
  }

  function renderInlineEmailGate(containerEl) {
    containerEl.innerHTML = `
      <div>
        <div class="quiz-progress text-center mb-2">Step 3 of 3</div>
        <h3 class="text-xl serif-font text-center text-ln-brown mb-2">Enter details to unlock results</h3>
        <p class="text-xs text-ln-brown/70 text-center mb-6">Screening requires name and contact details to categorize your access.</p>
        
        <form id="inline-quiz-email-form" class="space-y-4 max-w-md mx-auto">
          <div>
            <label for="iqz-name" class="block text-xs uppercase tracking-wider font-bold mb-1">Full Name</label>
            <input type="text" id="iqz-name" placeholder="Full name" required class="w-full p-3 border border-ln-tan/30 outline-none bg-white text-ln-brown text-sm" />
          </div>
          <div>
            <label for="iqz-phone" class="block text-xs uppercase tracking-wider font-bold mb-1">Mobile Number</label>
            <input type="tel" id="iqz-phone" placeholder="Mobile" required class="w-full p-3 border border-ln-tan/30 outline-none bg-white text-ln-brown text-sm" />
          </div>
          <div>
            <label for="iqz-email" class="block text-xs uppercase tracking-wider font-bold mb-1">Email Address</label>
            <input type="email" id="iqz-email" placeholder="you@example.com" required class="w-full p-3 border border-ln-tan/30 outline-none bg-white text-ln-brown text-sm" />
          </div>
          <div id="iqz-msg" class="text-xs font-semibold text-center"></div>
          <button type="submit" class="w-full py-4 bg-ln-brown hover:bg-ln-dark-tan text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all">
            Submit & View Screening Result
          </button>
        </form>
      </div>
    `;

    const form = document.getElementById('inline-quiz-email-form');
    const msg = document.getElementById('iqz-msg');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('iqz-name').value.trim();
      const phone = document.getElementById('iqz-phone').value.trim();
      const email = document.getElementById('iqz-email').value.trim();

      if (!name || !email || !phone) return;

      msg.style.color = 'var(--ln-tan)';
      msg.textContent = 'Verifying application details...';

      // Determine segment based on inlineAnswers
      const q1Answer = inlineAnswers['q1'];
      let q2Answer = '';
      if (q1Answer === 'active_ops') {
        q2Answer = inlineAnswers['q2_active'];
      } else {
        q2Answer = inlineAnswers['q2_capital'];
      }

      let segment = { key: 'D', name: 'The Tire Kicker', actionText: 'Download Public Ebook', desc: 'Access the free public natural capital ebook to begin learning.' };
      if (q1Answer === 'active_ops' && q2Answer === 'institutional') {
        segment = { key: 'A', name: 'The Operator', actionText: 'Join active acquisitions', desc: 'Join active deals room and acquire land/water assets.' };
      } else if (q1Answer === 'active_ops' && q2Answer === 'boutique') {
        segment = { key: 'B', name: 'The Strategist', actionText: 'Start with the frameworks', desc: 'Access deal analysis toolkits, maps, and regulatory templates.' };
      } else if (q1Answer === 'capital_alloc' && q2Answer === 'immediate') {
        segment = { key: 'C', name: 'The Buyer', actionText: 'See member deals', desc: 'Vetted operator pipelines and direct co-investment opportunities.' };
      }

      try {
        const response = await fetch('/api/quiz?action=submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            funnelCategory: segment.name,
            answers: inlineAnswers,
            session_id: inlineSessionId
          })
        });

        if (!response.ok) throw new Error('Failed to submit');
        
        // Show results inline
        let redirectUrl = 'payment.html';
        if (segment.key === 'B') {
          redirectUrl = 'payment.html?admission=frameworks';
        } else if (segment.key === 'C') {
          redirectUrl = 'payment.html?admission=consult';
        } else if (segment.key === 'D') {
          redirectUrl = 'F1.UltimateGuideToLandStrategies.pdf';
        }

        containerEl.innerHTML = `
          <div class="text-center">
            <div class="quiz-progress mb-2">Screening Result</div>
            <h3 class="text-2xl serif-font text-ln-brown mb-2">Segment: ${segment.name}</h3>
            <p class="text-sm text-ln-brown/70 mb-6">${segment.desc}</p>
            
            <div class="py-4 px-4 bg-ln-cream/30 rounded border border-ln-tan/10 mb-6 italic text-sm font-serif">
              "Your profile has been analyzed. You qualify for our private access room."
            </div>
            
            <a href="${redirectUrl}" class="block w-full py-4 bg-ln-tan hover:bg-ln-dark-tan text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all text-center select-none">
              ${segment.actionText}
            </a>
          </div>
        `;
      } catch (err) {
        console.error(err);
        msg.style.color = '#b91c1c';
        msg.textContent = 'Connection error. Please try again.';
      }
    });
  }

})();
