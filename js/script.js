document.addEventListener("DOMContentLoaded", () => {
  // Atualiza ano no rodapé
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Menu mobile
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // Alternar Tema Claro/Escuro
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("ronald_theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌙 Modo Escuro";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    themeToggle.textContent = isLight ? "🌙 Modo Escuro" : "☀️ Modo Claro";
    localStorage.setItem("ronald_theme", isLight ? "light" : "dark");
  });

  // Sistema de Metas Interativas + Barra de Progresso
  const checkboxes = document.querySelectorAll(".goal-check");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");

  function updateProgress() {
    const total = checkboxes.length;
    let checkedCount = 0;

    checkboxes.forEach((box, index) => {
      const item = box.closest(".goal-item");
      if (box.checked) {
        checkedCount++;
        item.classList.add("completed");
      } else {
        item.classList.remove("completed");
      }
      localStorage.setItem(`ronald_goal_${index}`, box.checked);
    });

    const percent = total > 0 ? Math.round((checkedCount / total) * 100) : 0;
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `${percent}% concluído (${checkedCount}/${total})`;
  }

  checkboxes.forEach((box, index) => {
    const saved = localStorage.getItem(`ronald_goal_${index}`);
    if (saved !== null) {
      box.checked = saved === "true";
    }
    box.addEventListener("change", updateProgress);
  });

  updateProgress();

  // Filtro de Prazo das Metas
  const filterBtns = document.querySelectorAll(".filter-btn");
  const goalItems = document.querySelectorAll(".goal-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      goalItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-term") === filter) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Simulação de Envio do Formulário
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value.trim();
      formFeedback.textContent = `Obrigado, ${nome}! Sua mensagem para o Ronald foi registrada com sucesso.`;
      contactForm.reset();
    });
  }
});
