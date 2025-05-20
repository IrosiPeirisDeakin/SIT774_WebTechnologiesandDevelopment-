// Example: Toggle dark mode (you could wire this to a button)
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-theme');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  // Auto-dismiss alert messages after 3 seconds
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000);
  });
});