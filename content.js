// Create tooltip element and add it to the page
function createTooltipElement() {
  const tooltip = document.createElement('div');
  tooltip.id = 'ai-explainer-tooltip';
  tooltip.className = 'ai-explainer-tooltip hidden';

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('ai-explainer-theme') || 'dark';
  if (savedTheme === 'light') {
    tooltip.classList.add('light-mode');
  }

  // Header section with title and controls
  const header = document.createElement('div');
  header.id = 'ai-explainer-header';

  // Title with brain icon
  const title = document.createElement('div');
  title.id = 'ai-explainer-title';
  title.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" stroke-width="2"/>
      <path d="M12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14C13.6569 14 15 15.3431 15 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
      <circle cx="12" cy="7" r="1" fill="currentColor"/>
    </svg>
    AI Explainer
  `;

  // Controls container
  const controls = document.createElement('div');
  controls.className = 'ai-explainer-controls';

  // Theme toggle button
  const themeToggle = document.createElement('div');
  themeToggle.id = 'ai-explainer-theme-toggle';
  themeToggle.innerHTML = savedTheme === 'light' ?
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>` :
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
      <path d="M12 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 20V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M4 12L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M22 12L20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M19.7778 4.22217L17.5558 6.44418" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6.44434 17.5557L4.22234 19.7777" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M19.7778 19.7778L17.5558 17.5558" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6.44434 6.44418L4.22234 4.22217" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

  themeToggle.onclick = toggleTheme;

  // Close button
  const closeBtn = document.createElement('div');
  closeBtn.id = 'ai-explainer-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => tooltip.classList.add('hidden');

  controls.appendChild(themeToggle);
  controls.appendChild(closeBtn);

  header.appendChild(title);
  header.appendChild(controls);

  // Tooltip content
  const tooltipText = document.createElement('div');
  tooltipText.id = 'ai-explainer-text';

  // Create loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'ai-explainer-loading';
  loadingIndicator.innerHTML = '<span></span><span></span><span></span>';

  // Action buttons
  const actions = document.createElement('div');
  actions.className = 'ai-explainer-actions';

  const simplifyBtn = document.createElement('button');
  simplifyBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Simplify
  `;
  simplifyBtn.onclick = (e) => {
    createRippleEffect(e);
    simplifyText();
  };

  const followUpBtn = document.createElement('button');
  followUpBtn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
    Ask follow-up
  `;
  followUpBtn.onclick = (e) => {
    createRippleEffect(e);
    askFollowUp();
  };

  actions.appendChild(simplifyBtn);
  actions.appendChild(followUpBtn);

  // Resize handle
  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'ai-explainer-resize-handle';

  tooltip.appendChild(header);
  tooltip.appendChild(tooltipText);
  tooltip.appendChild(actions);
  tooltip.appendChild(resizeHandle);

  document.body.appendChild(tooltip);

  // Setup resizing functionality only
  setupResizing(tooltip, resizeHandle);

  return { tooltip, tooltipText, loadingIndicator };
}

// Function to toggle between light and dark mode
function toggleTheme() {
  const tooltip = document.getElementById('ai-explainer-tooltip');
  const themeToggle = document.getElementById('ai-explainer-theme-toggle');

  if (tooltip.classList.contains('light-mode')) {
    // Switch to dark mode
    tooltip.classList.remove('light-mode');
    themeToggle.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
      <path d="M12 2V4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 20V22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M4 12L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M22 12L20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M19.7778 4.22217L17.5558 6.44418" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6.44434 17.5557L4.22234 19.7777" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M19.7778 19.7778L17.5558 17.5558" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6.44434 6.44418L4.22234 4.22217" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
    localStorage.setItem('ai-explainer-theme', 'dark');
  } else {
    // Switch to light mode
    tooltip.classList.add('light-mode');
    themeToggle.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    localStorage.setItem('ai-explainer-theme', 'light');
  }
}

// Setup resizing functionality
function setupResizing(element, handle) {
  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  handle.addEventListener('mousedown', (e) => {
    // Prevent text selection during resize
    e.preventDefault();

    // Start resizing
    isResizing = true;

    // Store initial values
    startX = e.clientX;
    startY = e.clientY;
    startWidth = element.offsetWidth;
    startHeight = element.offsetHeight;

    // Add a class to indicate resizing state
    element.classList.add('resizing');
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    // Calculate new dimensions
    const width = startWidth + (e.clientX - startX);
    const height = startHeight + (e.clientY - startY);

    // Apply minimum dimensions
    if (width >= 250) {
      element.style.width = `${width}px`;
    }

    if (height >= 150) {
      element.style.height = `${height}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      element.classList.remove('resizing');
    }
  });
}

// Create ripple effect on button click
function createRippleEffect(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - (size / 2)}px`;
  ripple.style.top = `${event.clientY - rect.top - (size / 2)}px`;

  button.appendChild(ripple);

  // Remove the ripple element after animation completes
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Function to simplify the explanation
function simplifyText() {
  const tooltipText = document.getElementById('ai-explainer-text');
  const currentText = tooltipText.innerText;

  // Show loading indicator
  tooltipText.innerHTML = '';
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'ai-explainer-loading';
  loadingIndicator.innerHTML = '<span></span><span></span><span></span>';
  tooltipText.appendChild(loadingIndicator);

  fetch('http://127.0.0.1:5050/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: `Simplify this even more for a child: "${currentText}"` })
  })
    .then(response => response.json())
    .then(data => {
      tooltipText.innerText = data.explanation || "Could not simplify further.";
    })
    .catch(err => {
      tooltipText.innerText = "Error simplifying explanation.";
    });
}

// Function to ask a follow-up question
function askFollowUp() {
  const tooltipText = document.getElementById('ai-explainer-text');
  tooltipText.innerHTML = `
    <div style="background: linear-gradient(90deg, #6e8efb, #a777e3); 
         -webkit-background-clip: text; 
         background-clip: text; 
         color: transparent; 
         font-weight: bold; 
         margin-bottom: 8px;">
      ✨ Coming Soon! ✨
    </div> 
    This feature will allow you to ask follow-up questions about the explanation.
  `;
}

// Initialize tooltip when content script loads
const { tooltip, tooltipText, loadingIndicator } = createTooltipElement();

// Listen for text selection
document.addEventListener('mouseup', async (e) => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 10) { // Only activate for selections with meaningful length
    // Show loading message
    tooltipText.innerHTML = '';
    tooltipText.appendChild(loadingIndicator.cloneNode(true));

    // Add subtle animation when showing tooltip
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(10px)';

    // Position tooltip near mouse cursor with some bounds checking
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = 350; // Default width from CSS
    const tooltipHeight = 200; // Approximate default height

    // Calculate position to ensure the tooltip stays within viewport
    let xPos = e.pageX + 10;
    let yPos = e.pageY + 10;

    // Ensure tooltip doesn't go off the right edge
    if (xPos + tooltipWidth > viewportWidth) {
      xPos = viewportWidth - tooltipWidth - 10;
    }

    // Ensure tooltip doesn't go off the bottom edge
    if (yPos + tooltipHeight > viewportHeight) {
      yPos = viewportHeight - tooltipHeight - 10;
    }

    tooltip.style.left = `${xPos}px`;
    tooltip.style.top = `${yPos}px`;
    tooltip.classList.remove('hidden');

    // Trigger animation
    setTimeout(() => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(0)';
    }, 10);

    try {
      const response = await fetch('http://127.0.0.1:5050/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedText })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      tooltipText.innerText = data.explanation || "No explanation found.";
    } catch (err) {
      tooltipText.innerHTML = `
        <span style="color: #ff6b6b; font-weight: bold;">Connection Error</span><br>
        Make sure the explanation server is running at http://127.0.0.1:5050
      `;
    }
  }
});

// Close tooltip when clicking elsewhere on the page
document.addEventListener('mousedown', (e) => {
  if (!tooltip.contains(e.target) && e.target.id !== 'ai-explainer-tooltip') {
    tooltip.classList.add('hidden');
  }
});

// Add escape key handler to close tooltip
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !tooltip.classList.contains('hidden')) {
    tooltip.classList.add('hidden');
  }
});

// Create language dropdown
const langSelect = document.createElement('select');
langSelect.innerHTML = `
  <option value="en">English</option>
  <option value="hi">Hindi</option>
  <option value="mr">Marathi</option>
`;
langSelect.style.marginTop = '10px';
langSelect.style.padding = '6px';
langSelect.style.borderRadius = '10px';
langSelect.style.width = '100%';

// Follow-up input
const followUpInput = document.createElement('input');
followUpInput.type = 'text';
followUpInput.placeholder = 'Ask a follow-up question...';
followUpInput.style.marginTop = '8px';
followUpInput.style.padding = '8px';
followUpInput.style.width = '100%';
followUpInput.style.borderRadius = '10px';

// Follow-up send button
const sendBtn = document.createElement('button');
sendBtn.textContent = 'Send';
sendBtn.style.marginTop = '8px';
sendBtn.style.padding = '8px';
sendBtn.style.width = '100%';
sendBtn.style.borderRadius = '10px';
sendBtn.style.background = '#6e8efb';
sendBtn.style.color = 'white';
sendBtn.style.border = 'none';
sendBtn.style.cursor = 'pointer';

sendBtn.onclick = async () => {
  const question = followUpInput.value.trim();
  const lang = langSelect.value;
  if (question.length < 5) return;

  tooltipText.innerHTML = '<div class="ai-explainer-loading"><span></span><span></span><span></span></div>';

  const res = await fetch('http://127.0.0.1:5050/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: question, lang })
  });

  const data = await res.json();
  tooltipText.innerText = data.explanation || "No explanation found.";
};

tooltip.appendChild(langSelect);
tooltip.appendChild(followUpInput);
tooltip.appendChild(sendBtn);


