// Minimal admin interactions (sidebar, sections, modal, sample data)
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('toggleSidebar');
  const navLinks = document.querySelectorAll('.sidebar nav a');
  const sections = document.querySelectorAll('.section');
  const modal = document.getElementById('modal');
  const modalClose = modal.querySelector('.modal-close');
  const cancelModal = document.getElementById('cancelModal');
  const addUserBtn = document.getElementById('addUserBtn');
  const usersTableBody = document.querySelector('#usersTable tbody');
  const recentTableBody = document.querySelector('#recentTable tbody');

  // sample data
  const users = [
    {id:1,name:'Đạt Đỗ',contact:'dat@example.com',created:'2025-01-10'},
    {id:2,name:'Dương Gió',contact:'0352512556',created:'2025-02-02'}
  ];
  const recent = [
    {time:'2025-10-01 09:12',event:'Đặt lịch',user:'Đạt Đỗ'},
    {time:'2025-10-01 08:40',event:'Đăng ký',user:'Dương Gió'}
  ];

  function renderUsers(){
    usersTableBody.innerHTML = users.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.contact}</td>
        <td>${u.created}</td>
        <td>
          <button class="btn" data-id="${u.id}" onclick="editUser(${u.id})">Sửa</button>
          <button class="btn" data-id="${u.id}" onclick="deleteUser(${u.id})">Xóa</button>
        </td>
      </tr>`).join('');
    document.getElementById('totalUsers').textContent = users.length;
  }

  function renderRecent(){
    recentTableBody.innerHTML = recent.map(r => `<tr><td>${r.time}</td><td>${r.event}</td><td>${r.user}</td></tr>`).join('');
  }

  // expose simple actions to window for inline buttons
  window.editUser = (id) => {
    const u = users.find(x=>x.id===id);
    if(!u) return;
    openModal('Sửa khách hàng', {name:u.name,contact:u.contact}, (formData) => {
      u.name = formData.name; u.contact = formData.contact;
      renderUsers(); closeModal();
    });
  };
  window.deleteUser = (id) => {
    if(!confirm('Xóa khách hàng?')) return;
    const idx = users.findIndex(x=>x.id===id);
    if(idx>-1) users.splice(idx,1);
    renderUsers();
  };

  // modal helpers
  function openModal(title, data = {}, onSubmit){
    modal.classList.add('active'); modal.setAttribute('aria-hidden','false');
    document.getElementById('modalTitle').textContent = title;
    const form = document.getElementById('modalForm');
    form.name.value = data.name || '';
    form.contact.value = data.contact || '';
    form.onsubmit = (e) => {
      e.preventDefault();
      const fd = {name: form.name.value.trim(), contact: form.contact.value.trim()};
      if(onSubmit) onSubmit(fd);
    };
  }
  function closeModal(){ modal.classList.remove('active'); modal.setAttribute('aria-hidden','true'); }

  // open add user
  addUserBtn?.addEventListener('click', () => {
    openModal('Thêm khách hàng', {}, (formData) => {
      const id = users.length ? users[users.length-1].id+1 : 1;
      users.push({id,name:formData.name,contact:formData.contact,created:new Date().toISOString().slice(0,10)});
      renderUsers(); closeModal();
    });
  });

  modalClose.addEventListener('click', closeModal);
  cancelModal?.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if(e.target===modal) closeModal(); });

  // sidebar toggle and navigation
  toggle?.addEventListener('click', () => {
    if(window.innerWidth <= 900) sidebar.classList.toggle('open');
  });
  navLinks.forEach(a=>{
    a.addEventListener('click', () => {
      navLinks.forEach(n=>n.classList.remove('active'));
      a.classList.add('active');
      const target = a.getAttribute('data-section');
      sections.forEach(s => s.id === target ? s.classList.add('active-section') : s.classList.remove('active-section'));
      if(window.innerWidth<=900) sidebar.classList.remove('open');
    });
  });

  // initial render
  renderUsers(); renderRecent();
});