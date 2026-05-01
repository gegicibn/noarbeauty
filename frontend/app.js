const API_BASE = 'http://localhost:8000';

// --- DRAG & DROP ---
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewZone = document.getElementById('previewZone');
const previewImg = document.getElementById('previewImg');
const analyzeBtn = document.getElementById('analyzeBtn');
const resetBtn = document.getElementById('resetBtn');

let selectedFile = null;

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) showPreview(file);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) showPreview(fileInput.files[0]);
});

function showPreview(file) {
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    dropZone.style.display = 'none';
    previewZone.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

resetBtn.addEventListener('click', () => {
  selectedFile = null;
  fileInput.value = '';
  previewImg.src = '';
  dropZone.style.display = 'block';
  previewZone.style.display = 'none';
  document.getElementById('resultsSection').style.display = 'none';
});

// --- ANALIZA ---
analyzeBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  const btnText = analyzeBtn.querySelector('.btn-analyze-text');
  const btnLoading = analyzeBtn.querySelector('.btn-analyze-loading');
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  analyzeBtn.disabled = true;

  try {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Greška na serveru');
    const data = await res.json();
    showResults(data);
  } catch (err) {
    alert('Došlo je do greške: ' + err.message);
  } finally {
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    analyzeBtn.disabled = false;
  }
});

function showResults(data) {
  const section = document.getElementById('resultsSection');
  const grid = document.getElementById('resultsGrid');
  const overallEl = document.getElementById('overallScore');
  const reportEl = document.getElementById('aiReport');

  const scores = data.scores || {};
  const cards = [
    { label: 'Simetrija', key: 'symmetry' },
    { label: 'Zlatni rez', key: 'golden_ratio' },
    { label: 'Oblik lica', key: 'face_shape_score' },
    { label: 'Jawline', key: 'jawline' },
    { label: 'Oči', key: 'eyes' },
    { label: 'Nos', key: 'nose' },
    { label: 'Usne', key: 'lips' },
    { label: 'Harmonija', key: 'harmony' },
  ];

  grid.innerHTML = cards.map(c => `
    <div class="result-card">
      <div class="result-score">${scores[c.key] ?? '–'}</div>
      <div class="result-label">${c.label}</div>
    </div>
  `).join('');

  overallEl.innerHTML = `
    <h3>Ukupna ocena</h3>
    <div class="big-score">${data.overall ?? '–'}<small style="font-size:2rem">/100</small></div>
    <p style="color:var(--text2);margin-top:8px">Oblik lica: <strong style="color:var(--accent)">${data.face_shape ?? 'N/A'}</strong></p>
  `;

  reportEl.innerHTML = `
    <h3>AI Izveštaj</h3>
    <p>${data.ai_report ?? 'Izveštaj nije dostupan.'}</p>
  `;

  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth' });
}

// --- FAQ ---
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-q').forEach(b => b.classList.remove('open'));
    if (!isOpen) {
      answer.classList.add('open');
      btn.classList.add('open');
    }
  });
});

// --- NAVBAR scroll efekt ---
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').style.borderBottomColor =
    window.scrollY > 10 ? 'var(--border)' : 'transparent';
});
