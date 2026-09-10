const initialChallenges = [
  {
    id: 1,
    title: 'Waterlogging near market road in Ranchi',
    district: 'Ranchi',
    domain: 'Water Management',
    severity: 'High',
    description: 'During monsoon, low-lying roads remain flooded for days, disrupting local trade and creating sanitation risks for residents.',
    location: 'Hatia Market Road, Ranchi',
    evidence: 'Photos and flood map shared by local ward committee',
    submittedBy: 'Citizen Group - Ward 12',
    university: 'National Institute of Technology, Jamshedpur',
    status: 'Under Review',
    industry: 'Smart City Startup Partner',
    progress: 42,
    aiLabel: 'AI classified as Water Management / Urban Infrastructure'
  },
  {
    id: 2,
    title: 'Student absenteeism in rural schools',
    district: 'Giridih',
    domain: 'Education',
    severity: 'Medium',
    description: 'A significant number of students in several villages are not attending school regularly due to migration, food insecurity, and lack of digital access.',
    location: 'Madhuban Block, Giridih',
    evidence: 'School records and attendance reports',
    submittedBy: 'School Principal',
    university: 'Vinoba Bhave University, Hazaribagh',
    status: 'Assigned to University',
    industry: 'EdTech Accelerator',
    progress: 64,
    aiLabel: 'AI classified as Education Access / Rural Livelihoods'
  },
  {
    id: 3,
    title: 'Access barrier for disabled passengers in public transport',
    district: 'Jamshedpur',
    domain: 'Accessibility',
    severity: 'High',
    description: 'The city lacks accessible bus stop design and accessible transport information, creating barriers for disabled commuters.',
    location: 'Bistupur Bus Terminal, Jamshedpur',
    evidence: 'Survey by civil society organization',
    submittedBy: 'Disability Rights Collective',
    university: 'XLRI Xavier School of Management',
    status: 'Industry Co-Development',
    industry: 'Mobility Innovation Lab',
    progress: 80,
    aiLabel: 'AI classified as Accessibility / Urban Mobility'
  }
];

const universityData = [
  {
    name: 'National Institute of Technology, Jamshedpur',
    focus: 'Water, infrastructure, AI, and sustainability',
    strengths: '3 innovation labs, 12 faculty mentors, 2 startup incubators',
    partnership: 'Open for research and pilot deployment'
  },
  {
    name: 'Vinoba Bhave University, Hazaribagh',
    focus: 'Education, rural development, social impact',
    strengths: 'Community outreach cells, education research unit',
    partnership: 'Ready for student-led field projects'
  },
  {
    name: 'XLRI Xavier School of Management',
    focus: 'Public systems, entrepreneurship, governance',
    strengths: 'Leadership and innovation programs, industry network',
    partnership: 'Supports policy and service design pilots'
  }
];

const industryData = [
  {
    name: 'Smart City Startup Partner',
    type: 'Startup / IoT',
    role: 'Pilot deployment and sensor integration'
  },
  {
    name: 'EdTech Accelerator',
    type: 'MSME / Education',
    role: 'Learning platform design and digital access solutions'
  },
  {
    name: 'Mobility Innovation Lab',
    type: 'Research Lab / Mobility',
    role: 'Accessibility technologies and transport diagnostics'
  }
];

const notifications = [
  {
    title: 'Challenge validated by admin',
    detail: 'Waterlogging issue in Ranchi has been classified and routed to NIT Jamshedpur.',
    time: '2 hours ago'
  },
  {
    title: 'Faculty review requested',
    detail: 'Vinoba Bhave University is seeking mentors for the education access challenge.',
    time: '5 hours ago'
  },
  {
    title: 'Industry pitch scheduled',
    detail: 'Mobility Innovation Lab has expressed intent to co-develop an accessibility solution.',
    time: 'Yesterday'
  }
];

const state = {
  challenges: [...initialChallenges]
};

function formatDomain(domain) {
  const safe = domain || 'General';
  return safe;
}

function renderStats() {
  const container = document.getElementById('statsGrid');
  const totalChallenges = state.challenges.length;
  const highSeverity = state.challenges.filter(item => item.severity === 'High').length;
  const activeUniversities = universityData.length;
  const pendingReview = state.challenges.filter(item => item.status === 'Under Review').length;

  const stats = [
    { label: 'Total challenges', value: totalChallenges, trend: '+18% this quarter' },
    { label: 'High priority', value: highSeverity, trend: 'Needs rapid response' },
    { label: 'Universities engaged', value: activeUniversities, trend: 'Across 3 institutions' },
    { label: 'Pending review', value: pendingReview, trend: 'Awaiting routing' }
  ];

  container.innerHTML = stats.map(stat => `
    <div class="stat-card">
      <div class="label">${stat.label}</div>
      <div class="value">${stat.value}</div>
      <div class="trend">${stat.trend}</div>
    </div>
  `).join('');
}

function renderBarChart(containerId, items, formatter) {
  const container = document.getElementById(containerId);
  const max = Math.max(...items.map(item => item.count), 1);

  container.innerHTML = items.map(item => `
    <div class="bar-item">
      <div class="bar-label">
        <span>${formatter.label(item)}</span>
        <strong>${item.count}</strong>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${(item.count / max) * 100}%"></div>
      </div>
    </div>
  `).join('');
}

function renderDashboard() {
  const domainCounts = Object.entries(
    state.challenges.reduce((acc, item) => {
      acc[item.domain] = (acc[item.domain] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  const districtCounts = Object.entries(
    state.challenges.reduce((acc, item) => {
      acc[item.district] = (acc[item.district] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count]) => ({ name, count }));

  renderStats();
  renderBarChart('domainBreakdown', domainCounts, {
    label: item => item.name
  });
  renderBarChart('districtBreakdown', districtCounts, {
    label: item => item.name
  });
}

function renderChallenges() {
  const container = document.getElementById('challengeList');

  container.innerHTML = state.challenges.map(item => `
    <div class="challenge-item">
      <div class="challenge-top">
        <h4>${item.title}</h4>
        <span class="badge domain">${formatDomain(item.domain)}</span>
      </div>
      <div class="challenge-meta">
        <span>${item.district}</span>
        <span>•</span>
        <span>Submitted by ${item.submittedBy}</span>
      </div>
      <p>${item.description}</p>
      <div class="detail-row">
        <span><strong>Severity:</strong> <span class="badge severity-${item.severity.toLowerCase()}">${item.severity}</span></span>
        <span><strong>Status:</strong> ${item.status}</span>
      </div>
      <div class="detail-row">
        <span><strong>Location:</strong> ${item.location}</span>
        <span><strong>AI routing:</strong> ${item.aiLabel}</span>
      </div>
      <div class="detail-row">
        <span><strong>Assigned University:</strong> ${item.university}</span>
        <span><strong>Industry:</strong> ${item.industry}</span>
      </div>
      <div class="detail-row">
        <span><strong>Progress:</strong> ${item.progress}%</span>
        <span><strong>Documents:</strong> ${item.evidence}</span>
      </div>
    </div>
  `).join('');
}

function renderUniversities() {
  const container = document.getElementById('universityGrid');

  container.innerHTML = universityData.map(item => `
    <div class="card">
      <h4>${item.name}</h4>
      <p><strong>Focus:</strong> ${item.focus}</p>
      <p><strong>Strengths:</strong> ${item.strengths}</p>
      <p><strong>Partnership:</strong> ${item.partnership}</p>
      <span class="pill">Available to collaborate</span>
    </div>
  `).join('');
}

function renderIndustry() {
  const container = document.getElementById('industryGrid');

  container.innerHTML = industryData.map(item => `
    <div class="card">
      <h4>${item.name}</h4>
      <p><strong>Type:</strong> ${item.type}</p>
      <p><strong>Role:</strong> ${item.role}</p>
      <span class="pill">Ready for pilots</span>
    </div>
  `).join('');
}

function renderNotifications() {
  const container = document.getElementById('notificationList');

  container.innerHTML = notifications.map(item => `
    <div class="notification-item">
      <h4>${item.title}</h4>
      <p>${item.detail}</p>
      <p><small>${item.time}</small></p>
    </div>
  `).join('');
}

function renderAll() {
  renderDashboard();
  renderChallenges();
  renderUniversities();
  renderIndustry();
  renderNotifications();
}

function seedDefaultData() {
  state.challenges = [...initialChallenges];
  renderAll();
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newChallenge = {
    id: Date.now(),
    title: formData.get('title'),
    district: formData.get('district'),
    domain: formData.get('domain'),
    severity: formData.get('severity'),
    description: formData.get('description'),
    location: formData.get('location'),
    evidence: formData.get('evidence') || 'No supporting documents provided',
    submittedBy: 'Citizen / Community Member',
    university: 'Auto-routing to best-matched institution',
    status: 'Submitted for Review',
    industry: 'Open for partnership matching',
    progress: 12,
    aiLabel: `AI classified as ${formData.get('domain')} with priority ${formData.get('severity')}`
  };

  state.challenges.unshift(newChallenge);
  renderAll();
  event.target.reset();
  document.querySelector('[data-target="challenges"]').click();
}

function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
      button.classList.add('active');

      document.querySelectorAll('.content-section').forEach(section => {
        section.classList.toggle('active', section.id === button.dataset.target);
      });
    });
  });
}

function initialize() {
  setupNavigation();
  renderAll();
  document.getElementById('challengeForm').addEventListener('submit', handleSubmit);
  document.getElementById('seedDataBtn').addEventListener('click', seedDefaultData);
}

initialize();
