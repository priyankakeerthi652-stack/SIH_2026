const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

let challenges = [...initialChallenges];

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

function normalizeText(text = '') {
  return String(text).trim().toLowerCase();
}

function isDuplicate(newChallenge) {
  const title = normalizeText(newChallenge.title);
  const location = normalizeText(newChallenge.location);

  return challenges.some(item => {
    const sameTitle = normalizeText(item.title) === title;
    const sameLocation = normalizeText(item.location) === location;
    return sameTitle && sameLocation;
  });
}

function getStats() {
  const totalChallenges = challenges.length;
  const highSeverity = challenges.filter(item => item.severity === 'High').length;
  const activeUniversities = universityData.length;
  const pendingReview = challenges.filter(item => item.status === 'Under Review').length;

  return {
    totalChallenges,
    highSeverity,
    activeUniversities,
    pendingReview
  };
}

function getDomainBreakdown() {
  const acc = {};
  for (const item of challenges) {
    acc[item.domain] = (acc[item.domain] || 0) + 1;
  }
  return Object.entries(acc).map(([name, count]) => ({ name, count }));
}

function getDistrictBreakdown() {
  const acc = {};
  for (const item of challenges) {
    acc[item.district] = (acc[item.district] || 0) + 1;
  }
  return Object.entries(acc).map(([name, count]) => ({ name, count }));
}

app.get('/api/challenges', (req, res) => {
  res.json({ challenges, universityData, industryData, notifications, stats: getStats(), domainBreakdown: getDomainBreakdown(), districtBreakdown: getDistrictBreakdown() });
});

app.post('/api/challenges', (req, res) => {
  const { title, district, domain, severity, description, location, evidence } = req.body;

  if (!title || !district || !domain || !severity || !description || !location) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const newChallenge = {
    id: Date.now(),
    title,
    district,
    domain,
    severity,
    description,
    location,
    evidence: evidence || 'No supporting documents provided',
    submittedBy: 'Citizen / Community Member',
    university: 'Auto-routing to best-matched institution',
    status: 'Submitted for Review',
    industry: 'Open for partnership matching',
    progress: 12,
    aiLabel: `AI classified as ${domain} with priority ${severity}`
  };

  if (isDuplicate(newChallenge)) {
    return res.status(409).json({ message: 'A similar problem already exists. Duplicate records are not allowed.' });
  }

  challenges.unshift(newChallenge);

  res.status(201).json({
    message: 'Challenge submitted successfully',
    challenge: newChallenge,
    stats: getStats(),
    domainBreakdown: getDomainBreakdown(),
    districtBreakdown: getDistrictBreakdown()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'SIH backend is running' });
});

app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`SIH backend running on http://localhost:${PORT}`);
});
