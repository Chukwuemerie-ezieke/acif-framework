// ===== ACIF Verification Pipeline Tool — Application Logic =====

// ===== DATA STORE (in-memory) =====
const _store = {
  institution: '',
  registry: [],
  hallucinations: [],
  pipeline: null,
  nextId: 1,
  currentTier: null,
  currentContentId: null
};

function loadData(key) {
  return _store[key] !== undefined ? _store[key] : null;
}
function saveData(key, data) {
  _store[key] = data;
}

function getRegistry() { return _store.registry || []; }
function saveRegistry(data) { _store.registry = data; }
function getHallucinations() { return _store.hallucinations || []; }
function saveHallucinations(data) { _store.hallucinations = data; }

function getNextContentId() {
  const year = new Date().getFullYear();
  let seq = _store.nextId || 1;
  const id = `ACIF-${year}-${String(seq).padStart(3, '0')}`;
  _store.nextId = seq + 1;
  return id;
}

// ===== NAVIGATION =====
let currentPage = 'dashboard';

function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  // Show target
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  const navLink = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (navLink) navLink.classList.add('active');

  currentPage = page;

  // Close mobile nav
  document.getElementById('mainNav').classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Refresh page-specific data
  if (page === 'dashboard') refreshDashboard();
  if (page === 'hallucination-log') refreshHallucinationLog();
  if (page === 'registry') refreshRegistry();
}

// Mobile nav toggle
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});

// ===== DASHBOARD =====
function refreshDashboard() {
  const registry = getRegistry();
  const hallucinations = getHallucinations();

  document.getElementById('statTotal').textContent = registry.length;
  document.getElementById('statPending').textContent = registry.filter(r => r.status === 'Pending').length;
  document.getElementById('statApproved').textContent = registry.filter(r => r.status === 'Approved').length;
  document.getElementById('statHallucinations').textContent = hallucinations.length;
}

// Institution name persistence
const instInput = document.getElementById('institutionName');
instInput.value = _store.institution || '';
instInput.addEventListener('input', () => {
  _store.institution = instInput.value;
});

// ===== RISK CLASSIFIER =====
let classifierStep = 1;
const totalClassifierSteps = 5;

function updateClassifierUI() {
  // Show/hide steps
  document.querySelectorAll('.classifier-step').forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.step) === classifierStep);
  });

  // Progress bar
  const progress = ((classifierStep - 1) / totalClassifierSteps) * 100;
  document.getElementById('classifierProgress').style.width = progress + '%';

  // Prev button
  document.getElementById('classifierPrev').disabled = classifierStep === 1;

  // Next button - only enabled if current step has selection
  updateClassifierNextBtn();
}

function updateClassifierNextBtn() {
  const step = document.querySelector(`.classifier-step[data-step="${classifierStep}"]`);
  if (!step) return;
  const selected = step.querySelector('input[type="radio"]:checked');
  const nextBtn = document.getElementById('classifierNext');
  nextBtn.disabled = !selected;
  nextBtn.textContent = classifierStep === totalClassifierSteps ? 'Calculate Risk Tier' : 'Next';
}

function classifierNextStep() {
  if (classifierStep < totalClassifierSteps) {
    classifierStep++;
    updateClassifierUI();
  } else {
    calculateRiskTier();
  }
}

function classifierPrevStep() {
  if (classifierStep > 1) {
    classifierStep--;
    updateClassifierUI();
  }
}

// Listen for radio changes to enable Next
document.querySelectorAll('#classifierSteps input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', updateClassifierNextBtn);
});

function getRadioValue(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : null;
}

function calculateRiskTier() {
  const contentType = getRadioValue('contentType');
  const earlyChildhood = getRadioValue('earlyChildhood') === 'yes';
  const hasStats = getRadioValue('hasStats') === 'yes';
  const hasReferences = getRadioValue('hasReferences') === 'yes';
  const isPublished = getRadioValue('isPublished') === 'yes';

  let tier = 1;
  let explanation = '';

  // Base tier from content type
  if (contentType === 'administrative') {
    tier = 1;
  } else if (contentType === 'lesson') {
    tier = 2;
  } else if (contentType === 'health-science') {
    tier = 3;
  } else if (contentType === 'sensitive') {
    tier = 4;
  } else if (contentType === 'external-exam') {
    tier = 4;
  }

  // Upgrades
  if (earlyChildhood && tier < 3) tier = 3;
  if ((hasStats || hasReferences) && tier < 3) tier = 3;
  if (isPublished && tier < 4) tier = 4;

  // Build explanation
  const tierInfo = {
    1: {
      label: 'LOW RISK',
      desc: 'Administrative and logistical content, creativity prompts, or templates. Requires educator review only.',
      gates: ['Gate 1: Pre-Delivery Screening', 'Gate 5: Final Approval'],
      reviewTime: 'Same day'
    },
    2: {
      label: 'MEDIUM RISK',
      desc: 'Lesson plans, explanatory notes, or assessment questions. Requires subject expert review and curriculum alignment check.',
      gates: ['Gate 1: Pre-Delivery Screening', 'Gate 2: Factual Verification', 'Gate 3: Age-Appropriateness', 'Gate 4: Curriculum Alignment', 'Gate 5: Final Approval'],
      reviewTime: '1–2 school days'
    },
    3: {
      label: 'HIGH RISK',
      desc: 'Health/science content, content with factual claims, or Early Childhood materials. Requires full 5-Gate Pipeline with senior educator sign-off.',
      gates: ['Gate 1: Pre-Delivery Screening', 'Gate 2: Factual Verification', 'Gate 3: Age-Appropriateness', 'Gate 4: Curriculum Alignment', 'Gate 5: Final Approval'],
      reviewTime: '3–5 school days'
    },
    4: {
      label: 'CRITICAL RISK',
      desc: 'Sensitive topics, content for publication, or formal examinations. Requires full Pipeline plus Institutional Director Approval and Legal/Compliance Review.',
      gates: ['Gate 1: Pre-Delivery Screening', 'Gate 2: Factual Verification', 'Gate 3: Age-Appropriateness', 'Gate 4: Curriculum Alignment', 'Gate 5: Final Approval + Director Approval'],
      reviewTime: '5–10 school days'
    }
  };

  const info = tierInfo[tier];

  // Hide steps, show result
  document.getElementById('classifierSteps').style.display = 'none';
  document.querySelector('.classifier-nav').style.display = 'none';
  document.getElementById('classifierProgress').parentElement.style.display = 'none';

  const result = document.getElementById('classifierResult');
  result.style.display = 'block';

  const badge = document.getElementById('tierBadge');
  badge.className = `tier-badge tier-${tier}`;
  document.getElementById('tierNumber').textContent = `Tier ${tier}`;
  document.getElementById('tierLabel').textContent = info.label;

  document.getElementById('tierDetails').innerHTML = `
    <p>${info.desc}</p>
    <p style="margin-top: var(--space-2);"><strong>Review time target:</strong> ${info.reviewTime}</p>
  `;

  document.getElementById('tierGates').innerHTML =
    '<p style="margin-bottom: var(--space-2); font-weight: 600;">Required verification gates:</p>' +
    info.gates.map(g => `<span class="gate-tag">${g}</span>`).join('');

  // Store tier for pipeline
  _store.currentTier = tier;
}

function resetClassifier() {
  classifierStep = 1;
  document.querySelectorAll('#classifierSteps input[type="radio"]').forEach(r => r.checked = false);
  document.getElementById('classifierSteps').style.display = 'block';
  document.querySelector('.classifier-nav').style.display = 'flex';
  document.getElementById('classifierProgress').parentElement.style.display = 'block';
  document.getElementById('classifierResult').style.display = 'none';
  updateClassifierUI();
}

function proceedToPipeline() {
  const tier = _store.currentTier || 2;
  navigateTo('pipeline');

  // Set tier display
  const tierDisplay = document.getElementById('pipelineTierDisplay');
  const tierColors = { 1: 'tier-1', 2: 'tier-2', 3: 'tier-3', 4: 'tier-4' };
  const tierLabels = { 1: 'Tier 1 — Low Risk', 2: 'Tier 2 — Medium Risk', 3: 'Tier 3 — High Risk', 4: 'Tier 4 — Critical Risk' };
  tierDisplay.textContent = tierLabels[tier];
  tierDisplay.style.color = getComputedStyle(document.documentElement).getPropertyValue(`--color-tier-${tier}`);

  // Generate content ID
  const contentId = getNextContentId();
  document.getElementById('pipelineContentId').textContent = contentId;
  _store.currentContentId = contentId;

  // Reset pipeline
  resetPipeline();

  // Set Gate 1 as active
  const gate1 = document.getElementById('gate-1');
  gate1.classList.remove('locked');
  gate1.classList.add('active', 'expanded');
  document.getElementById('gate-1-status').textContent = 'In Progress';
  document.getElementById('gate-1-body').style.display = 'block';

  // Update progress labels
  updatePipelineProgress();
}

// ===== VERIFICATION PIPELINE =====
let gateStates = { 1: false, 2: false, 3: false, 4: false, 5: false };

function resetPipeline() {
  gateStates = { 1: false, 2: false, 3: false, 4: false, 5: false };

  for (let i = 1; i <= 5; i++) {
    const card = document.getElementById(`gate-${i}`);
    card.className = i === 1 ? 'gate-card' : 'gate-card locked';
    document.getElementById(`gate-${i}-status`).textContent = i === 1 ? 'In Progress' : 'Locked';
    document.getElementById(`gate-${i}-body`).style.display = 'none';

    // Uncheck all
    card.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    const reviewer = document.getElementById(`gate-${i}-reviewer`);
    const dateInput = document.getElementById(`gate-${i}-date`);
    if (reviewer) reviewer.value = '';
    if (dateInput) dateInput.value = '';
  }

  document.getElementById('pipelineFinal').style.display = 'none';
  updatePipelineProgress();
}

function toggleGate(gateNum) {
  const card = document.getElementById(`gate-${gateNum}`);
  if (card.classList.contains('locked')) return;

  card.classList.toggle('expanded');
  const body = document.getElementById(`gate-${gateNum}-body`);
  body.style.display = card.classList.contains('expanded') ? 'block' : 'none';
}

function completeGate(gateNum) {
  const card = document.getElementById(`gate-${gateNum}`);

  // Validate all checkboxes
  const checkboxes = card.querySelectorAll(`input[type="checkbox"][data-gate="${gateNum}"]`);
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);

  if (!allChecked) {
    showToast('Please complete all checklist items before marking this gate complete.', 'error');
    return;
  }

  // Validate reviewer name
  const reviewer = document.getElementById(`gate-${gateNum}-reviewer`).value.trim();
  if (!reviewer) {
    showToast('Please enter the reviewer name.', 'error');
    return;
  }

  // Validate date
  const dateVal = document.getElementById(`gate-${gateNum}-date`).value;
  if (!dateVal) {
    showToast('Please enter the review date.', 'error');
    return;
  }

  // Mark complete
  gateStates[gateNum] = true;
  card.classList.remove('active', 'expanded');
  card.classList.add('completed');
  document.getElementById(`gate-${gateNum}-status`).textContent = 'Complete';
  document.getElementById(`gate-${gateNum}-body`).style.display = 'none';

  // Disable checkboxes
  card.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.disabled = true);

  // Unlock next gate
  const nextGate = gateNum + 1;
  if (nextGate <= 5) {
    const nextCard = document.getElementById(`gate-${nextGate}`);
    nextCard.classList.remove('locked');
    nextCard.classList.add('active', 'expanded');
    document.getElementById(`gate-${nextGate}-status`).textContent = 'In Progress';
    document.getElementById(`gate-${nextGate}-body`).style.display = 'block';

    // Scroll to next gate
    setTimeout(() => nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
  }

  // Check if all gates done
  if (Object.values(gateStates).every(v => v)) {
    document.getElementById('pipelineFinal').style.display = 'block';
    setTimeout(() => {
      document.getElementById('pipelineFinal').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }

  updatePipelineProgress();
  showToast(`Gate ${gateNum} completed successfully!`, 'success');

  // Save pipeline state
  savePipelineState();
}

function updatePipelineProgress() {
  const completed = Object.values(gateStates).filter(v => v).length;
  const percent = (completed / 5) * 100;
  document.getElementById('pipelineProgressFill').style.width = percent + '%';

  // Update labels
  document.querySelectorAll('.progress-label').forEach(label => {
    const gate = parseInt(label.dataset.gate);
    label.classList.remove('completed', 'active');
    if (gateStates[gate]) {
      label.classList.add('completed');
    } else if (gate === completed + 1) {
      label.classList.add('active');
    }
  });
}

function savePipelineState() {
  const state = {
    gateStates,
    contentTitle: document.getElementById('pipelineContentTitle').value,
    aiTool: document.getElementById('pipelineAITool').value,
    subject: document.getElementById('pipelineSubject').value,
    grade: document.getElementById('pipelineGrade').value,
    tier: _store.currentTier,
    contentId: _store.currentContentId,
    reviewers: {},
    dates: {}
  };

  for (let i = 1; i <= 5; i++) {
    state.reviewers[i] = document.getElementById(`gate-${i}-reviewer`).value;
    state.dates[i] = document.getElementById(`gate-${i}-date`).value;
  }

  _store.pipeline = state;
}

function approveContent() {
  const contentId = _store.currentContentId;
  const tier = _store.currentTier || 2;
  const contentTitle = document.getElementById('pipelineContentTitle').value || 'Untitled';
  const aiTool = document.getElementById('pipelineAITool').value || '—';
  const subject = document.getElementById('pipelineSubject').value || '—';
  const grade = document.getElementById('pipelineGrade').value || '—';

  const registry = getRegistry();

  const entry = {
    contentId,
    date: new Date().toISOString().split('T')[0],
    aiTool,
    contentTitle,
    subject,
    grade,
    tier,
    status: 'Approved',
    reviewers: {},
    dates: {}
  };

  for (let i = 1; i <= 5; i++) {
    entry.reviewers[i] = document.getElementById(`gate-${i}-reviewer`).value;
    entry.dates[i] = document.getElementById(`gate-${i}-date`).value;
  }

  registry.push(entry);
  saveRegistry(registry);

  showToast(`Content ${contentId} approved and added to registry!`, 'success');

  // Reset for next review
  resetClassifier();
  navigateTo('registry');
}

// ===== AGE-APPROPRIATENESS CHECKER =====
const ageBandData = {
  'early-childhood': {
    title: 'Band 1: Early Childhood (Ages 3–5, Nursery/Pre-Primary)',
    reading: 'Pre-literacy (oral/visual content only)',
    vocabulary: 'Simple, concrete, single-syllable dominant',
    sentenceLength: 'Maximum 8 words',
    allowed: [
      'Friendship and family',
      'Animals and nature',
      'Colours and shapes',
      'Basic numbers (1–10)',
      'Community helpers'
    ],
    prohibited: [
      'Conflict or violence',
      'Death or illness',
      'Fantasy violence',
      'Any sexual or romantic reference',
      'Moral complexity'
    ],
    special: [
      'All content requires specialist Early Childhood reviewer',
      'AI images must be cartoon-style only — no photorealistic depictions of people',
      'Automatically classified as Tier 3 (High Risk)'
    ]
  },
  'lower-primary': {
    title: 'Band 2: Lower Primary (Ages 6–8, Primary 1–3)',
    reading: 'Lexile 200–500',
    vocabulary: 'Familiar words; limited challenging vocabulary introduced in context',
    sentenceLength: 'Maximum 15 words',
    allowed: [
      'Simple cause-and-effect',
      'Mild challenge and resolution',
      'Community and national identity',
      'Friendship and family (expanded)',
      'Animals and nature'
    ],
    prohibited: [
      'Violence',
      'Explicit death descriptions',
      'Romantic or sexual content',
      'Fear-inducing scenarios'
    ],
    special: [
      'Factual accuracy mandatory',
      'Cultural Nigerian context required where applicable'
    ]
  },
  'upper-primary': {
    title: 'Band 3: Upper Primary (Ages 9–11, Primary 4–6)',
    reading: 'Lexile 500–800',
    vocabulary: 'Grade-level; subject-specific terms introduced with definitions',
    sentenceLength: 'No strict limit; grade-appropriate complexity',
    allowed: [
      'Multi-step narrative',
      'National and civic themes',
      'Basic scientific concepts',
      'Global topics with Nigerian perspective'
    ],
    prohibited: [
      'Graphic violence',
      'Sexual content',
      'Uncontextualized death or trauma'
    ],
    special: [
      'Handle with care: death (natural, historical), simple illness, historical injustice',
      'Subject teacher review required for all factual content'
    ]
  },
  'junior-secondary': {
    title: 'Band 4: Junior Secondary (Ages 12–14, JSS 1–3)',
    reading: 'Lexile 800–1100',
    vocabulary: 'Secondary-level academic vocabulary',
    sentenceLength: 'No strict limit',
    allowed: [
      'Critical thinking topics',
      'Puberty (within Health Education framework)',
      'Religious diversity',
      'Historical conflicts with balanced framing'
    ],
    prohibited: [
      'Explicit sexual content',
      'Graphic violence',
      'Unbalanced political messaging'
    ],
    special: [
      'Puberty/reproductive health content requires Senior Health Educator sign-off',
      'Parental communication protocol required for sensitive topics',
      'Subject teacher + departmental review for Tier 2 and above'
    ]
  },
  'senior-secondary': {
    title: 'Band 5: Senior Secondary (Ages 15–17, SS 1–3)',
    reading: 'Lexile 1100–1400',
    vocabulary: 'Advanced academic and subject-specific terminology',
    sentenceLength: 'No strict limit',
    allowed: [
      'Complex moral and ethical questions',
      'Current affairs',
      'Comparative religion',
      'Detailed biological sciences',
      'Economics and law'
    ],
    prohibited: [
      'Explicit sexual content',
      'Content promoting violence or discrimination'
    ],
    special: [
      'Subject Expert + Head of Department review for Tier 3 and above'
    ]
  },
  'pre-tertiary': {
    title: 'Band 6: Pre-Tertiary / Bridge (Ages 18+)',
    reading: 'University entry level',
    vocabulary: 'Full academic vocabulary expected',
    sentenceLength: 'No restrictions',
    allowed: [
      'All academic subjects at advanced level',
      'Critical analysis and independent evaluation',
      'WAEC/NECO-aligned content per official syllabus'
    ],
    prohibited: [
      'Content promoting hate or discrimination',
      'Fabricated sources or citations'
    ],
    special: [
      'Content sourcing must be explicitly cited',
      'Critical thinking and independent analysis expected'
    ]
  }
};

function showAgeBand() {
  const band = document.getElementById('ageBandSelect').value;
  const container = document.getElementById('ageBandContent');
  const specs = document.getElementById('ageBandSpecs');

  if (!band) {
    container.style.display = 'none';
    return;
  }

  const data = ageBandData[band];
  container.style.display = 'block';

  specs.innerHTML = `
    <div class="age-spec-card">
      <h4>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#01696F" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        Reading &amp; Vocabulary
      </h4>
      <ul class="spec-list info">
        <li><strong>Reading Level:</strong> ${data.reading}</li>
        <li><strong>Vocabulary:</strong> ${data.vocabulary}</li>
        <li><strong>Sentence Length:</strong> ${data.sentenceLength}</li>
      </ul>
    </div>

    <div class="age-spec-card" style="border-left: 3px solid var(--color-success);">
      <h4 style="color: var(--color-success);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        Themes Allowed
      </h4>
      <ul class="spec-list allowed">
        ${data.allowed.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>

    <div class="age-spec-card" style="border-left: 3px solid var(--color-error);">
      <h4 style="color: var(--color-error);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        Themes Prohibited
      </h4>
      <ul class="spec-list prohibited">
        ${data.prohibited.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>

    <div class="age-spec-card" style="border-left: 3px solid var(--color-warning);">
      <h4 style="color: var(--color-warning);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Special Requirements
      </h4>
      <ul class="spec-list info">
        ${data.special.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>
  `;

  // Uncheck all age checklist items
  document.querySelectorAll('.age-check').forEach(cb => cb.checked = false);
}

function saveAgeCheckToReview() {
  const checked = document.querySelectorAll('.age-check:checked').length;
  const total = document.querySelectorAll('.age-check').length;

  if (checked === 0) {
    showToast('Please complete the checklist before saving.', 'error');
    return;
  }

  showToast(`Age-appropriateness check saved (${checked}/${total} items).`, 'success');
}

// ===== HALLUCINATION LOG =====
let halSortKey = 'date';
let halSortAsc = false;

function logHallucination(event) {
  event.preventDefault();

  const entry = {
    id: Date.now(),
    date: document.getElementById('halDate').value,
    aiTool: document.getElementById('halAITool').value.trim(),
    contentType: document.getElementById('halContentType').value,
    subject: document.getElementById('halSubject').value.trim(),
    description: document.getElementById('halDescription').value.trim(),
    detection: document.getElementById('halDetection').value.trim(),
    action: document.getElementById('halAction').value.trim()
  };

  const hallucinations = getHallucinations();
  hallucinations.push(entry);
  saveHallucinations(hallucinations);

  document.getElementById('hallucinationForm').reset();
  // Set today's date
  document.getElementById('halDate').value = new Date().toISOString().split('T')[0];

  showToast('Hallucination logged successfully.', 'success');
  refreshHallucinationLog();
}

function refreshHallucinationLog() {
  const hallucinations = getHallucinations();

  // Summary
  document.getElementById('halTotalCount').textContent = hallucinations.length;

  if (hallucinations.length > 0) {
    // Most common AI tool
    const toolCounts = {};
    hallucinations.forEach(h => { toolCounts[h.aiTool] = (toolCounts[h.aiTool] || 0) + 1; });
    const topTool = Object.entries(toolCounts).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('halTopTool').textContent = topTool ? topTool[0] : '—';

    // Most common subject
    const subjCounts = {};
    hallucinations.forEach(h => { subjCounts[h.subject] = (subjCounts[h.subject] || 0) + 1; });
    const topSubject = Object.entries(subjCounts).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('halTopSubject').textContent = topSubject ? topSubject[0] : '—';
  } else {
    document.getElementById('halTopTool').textContent = '—';
    document.getElementById('halTopSubject').textContent = '—';
  }

  // Sort
  const sorted = [...hallucinations].sort((a, b) => {
    const av = a[halSortKey] || '';
    const bv = b[halSortKey] || '';
    return halSortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  // Table
  const tbody = document.getElementById('hallucinationTableBody');
  if (sorted.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No hallucinations logged yet.</td></tr>';
    return;
  }

  tbody.innerHTML = sorted.map(h => `
    <tr>
      <td style="white-space:nowrap;">${h.date}</td>
      <td>${escapeHtml(h.aiTool)}</td>
      <td>${escapeHtml(h.contentType)}</td>
      <td>${escapeHtml(h.subject)}</td>
      <td style="max-width:200px;">${escapeHtml(h.description).substring(0, 80)}${h.description.length > 80 ? '…' : ''}</td>
      <td>
        <button class="expand-btn" onclick="deleteHallucination(${h.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/></svg>
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

function sortHallucinations(key) {
  if (halSortKey === key) {
    halSortAsc = !halSortAsc;
  } else {
    halSortKey = key;
    halSortAsc = true;
  }
  refreshHallucinationLog();
}

function deleteHallucination(id) {
  let hallucinations = getHallucinations();
  hallucinations = hallucinations.filter(h => h.id !== id);
  saveHallucinations(hallucinations);
  refreshHallucinationLog();
  showToast('Hallucination entry deleted.', 'success');
}

function exportHallucinationsCSV() {
  const hallucinations = getHallucinations();
  if (hallucinations.length === 0) {
    showToast('No hallucinations to export.', 'error');
    return;
  }

  const headers = ['Date', 'AI Tool', 'Content Type', 'Subject', 'Description', 'How Detected', 'Corrective Action'];
  const rows = hallucinations.map(h => [
    h.date, h.aiTool, h.contentType, h.subject, h.description, h.detection, h.action
  ]);

  downloadCSV('hallucination_log.csv', headers, rows);
  showToast('Hallucination log exported.', 'success');
}

// ===== CONTENT REGISTRY =====
function refreshRegistry() {
  const registry = getRegistry();
  const search = document.getElementById('regSearch')?.value.toLowerCase() || '';
  const tierFilter = document.getElementById('regTier')?.value || '';
  const statusFilter = document.getElementById('regStatus')?.value || '';

  let filtered = registry;
  if (search) {
    filtered = filtered.filter(r =>
      (r.contentTitle || '').toLowerCase().includes(search) ||
      (r.subject || '').toLowerCase().includes(search) ||
      (r.contentId || '').toLowerCase().includes(search)
    );
  }
  if (tierFilter) {
    filtered = filtered.filter(r => String(r.tier) === tierFilter);
  }
  if (statusFilter) {
    filtered = filtered.filter(r => r.status === statusFilter);
  }

  const tbody = document.getElementById('registryTableBody');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="8">No content items found.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td><strong>${escapeHtml(r.contentId)}</strong></td>
      <td style="white-space:nowrap;">${r.date}</td>
      <td>${escapeHtml(r.aiTool)}</td>
      <td>${escapeHtml(r.subject)}</td>
      <td>${escapeHtml(r.grade)}</td>
      <td><span class="tier-badge-sm tier-${r.tier}-badge">Tier ${r.tier}</span></td>
      <td><span class="status-badge status-${r.status.toLowerCase()}">${r.status}</span></td>
      <td>
        <button class="expand-btn" onclick='showRegistryDetail(${JSON.stringify(r).replace(/'/g, "\\'")})'>View</button>
      </td>
    </tr>
  `).join('');
}

function filterRegistry() {
  refreshRegistry();
}

function showRegistryDetail(item) {
  const modal = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <h3>${escapeHtml(item.contentTitle || item.contentId)}</h3>
    <div class="detail-row"><span class="detail-label">Content ID</span><span>${item.contentId}</span></div>
    <div class="detail-row"><span class="detail-label">Date</span><span>${item.date}</span></div>
    <div class="detail-row"><span class="detail-label">AI Tool</span><span>${escapeHtml(item.aiTool)}</span></div>
    <div class="detail-row"><span class="detail-label">Subject</span><span>${escapeHtml(item.subject)}</span></div>
    <div class="detail-row"><span class="detail-label">Grade Level</span><span>${escapeHtml(item.grade)}</span></div>
    <div class="detail-row"><span class="detail-label">Risk Tier</span><span>Tier ${item.tier}</span></div>
    <div class="detail-row"><span class="detail-label">Status</span><span>${item.status}</span></div>
    <h4 style="margin-top: var(--space-5); margin-bottom: var(--space-3); font-size: var(--text-sm);">Gate Completion Record</h4>
    ${[1,2,3,4,5].map(g => `
      <div class="detail-row">
        <span class="detail-label">Gate ${g}</span>
        <span>${item.reviewers && item.reviewers[g] ? escapeHtml(item.reviewers[g]) + ' — ' + (item.dates[g] || '') : '—'}</span>
      </div>
    `).join('')}
  `;

  modal.classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function exportRegistryCSV() {
  const registry = getRegistry();
  if (registry.length === 0) {
    showToast('No registry items to export.', 'error');
    return;
  }

  const headers = ['Content ID', 'Date', 'AI Tool', 'Title', 'Subject', 'Grade Level', 'Risk Tier', 'Status',
    'Gate 1 Reviewer', 'Gate 1 Date', 'Gate 2 Reviewer', 'Gate 2 Date',
    'Gate 3 Reviewer', 'Gate 3 Date', 'Gate 4 Reviewer', 'Gate 4 Date',
    'Gate 5 Reviewer', 'Gate 5 Date'];

  const rows = registry.map(r => [
    r.contentId, r.date, r.aiTool, r.contentTitle, r.subject, r.grade, `Tier ${r.tier}`, r.status,
    r.reviewers?.[1] || '', r.dates?.[1] || '',
    r.reviewers?.[2] || '', r.dates?.[2] || '',
    r.reviewers?.[3] || '', r.dates?.[3] || '',
    r.reviewers?.[4] || '', r.dates?.[4] || '',
    r.reviewers?.[5] || '', r.dates?.[5] || ''
  ]);

  downloadCSV('content_registry.csv', headers, rows);
  showToast('Content registry exported.', 'success');
}

// ===== UTILITIES =====
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(message, type = '') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success'
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
    : type === 'error'
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
    : '';

  toast.innerHTML = icon + message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function downloadCSV(filename, headers, rows) {
  const csvContent = [
    headers.map(h => `"${h}"`).join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Set today's date on hallucination form
  const halDateInput = document.getElementById('halDate');
  if (halDateInput) halDateInput.value = new Date().toISOString().split('T')[0];

  // Set today's date on gate date fields
  const today = new Date().toISOString().split('T')[0];
  for (let i = 1; i <= 5; i++) {
    const dateInput = document.getElementById(`gate-${i}-date`);
    if (dateInput) dateInput.value = today;
  }

  // Init dashboard
  refreshDashboard();
  updateClassifierUI();

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
