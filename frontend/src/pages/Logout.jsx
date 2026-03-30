const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('companyId');
  localStorage.removeItem('userId');
  localStorage.removeItem('candidateId')
  window.location.href = '/login';
}

export default function Logout() {
  handleLogout();
  return null;
}

