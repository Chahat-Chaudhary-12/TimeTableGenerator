const PAGE_TITLES = {
  dashboard: 'Dashboard',
  generate:  'Generate',
  timetable: 'Timetables',
  subjects:  'Subjects',
  teachers:  'Teachers',
  rooms:     'Rooms',
  sections:  'Sections',
  conflicts: 'Conflicts',
  export:    'Export'
};

const PAGE_FILES = [
  'dashboard','generate','timetable',
  'subjects','teachers','rooms','sections',
  'conflicts','export'
];


async function loadPages() {
  const container = document.getElementById('app-content');
  for (const page of PAGE_FILES) {
    const res  = await fetch(`pages/${page}.html`);
    const html = await res.text();
    container.insertAdjacentHTML('beforeend', html);
  }
  initInteractions();
}


function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (btn) btn.classList.add('active');
  document.getElementById('page-title').textContent     = PAGE_TITLES[id] || id;
  document.getElementById('breadcrumb-sub').textContent = PAGE_TITLES[id] || id;
}


function initInteractions() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
      const group = this.closest('.section-tabs');
      if (group) group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  document.querySelectorAll('.gen-option').forEach(opt => {
    opt.addEventListener('click', function () {
      document.querySelectorAll('.gen-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
}

loadPages();
