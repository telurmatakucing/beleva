// Login Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const loginBtn = document.getElementById("loginBtn");
  const btnText = loginBtn.querySelector(".btn-text");
  const btnSpinner = loginBtn.querySelector(".btn-spinner");
  const registerBtn = document.getElementById("registerBtn");
  const registerBtnText = registerBtn?.querySelector(".btn-text");
  const registerBtnSpinner = registerBtn?.querySelector(".btn-spinner");
  const errorModal = document.getElementById("errorModal");
  const closeErrorModal = document.getElementById("closeErrorModal");
  const errorMessage = document.getElementById("errorMessage");
  const toggleFormBtn = document.getElementById("toggleFormBtn");

  // Demo admin credentials
  const adminCredentials = {
    email: "admin@glowgrace.com",
    password: "admin123",
  };

  // Manage user data in localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Toggle password visibility
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    const icon = togglePassword.querySelector("i");
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });

  // Toggle between login and register forms
  toggleFormBtn.addEventListener("click", () => {
    loginForm.classList.toggle("hidden");
    registerForm.classList.toggle("hidden");
    toggleFormBtn.textContent = loginForm.classList.contains("hidden") ? "Sudah punya akun? Login" : "Belum punya akun? Daftar";
  });

  // Handle login form submission
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate inputs
    if (!email || !password) {
      showError("Mohon isi semua field yang diperlukan.");
      return;
    }

    setLoadingState(true, loginBtn);

    setTimeout(() => {
      // Check admin credentials
      if (email === adminCredentials.email && password === adminCredentials.password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            email: email,
            name: "Admin Glow & Grace",
            role: "admin",
            loginTime: new Date().toISOString(),
          })
        );
        showSuccessNotification("Login admin berhasil! Mengalihkan ke dashboard...");
        setTimeout(() => {
          window.location.href = "/pages/index.html"; // Arahkan ke dashboard admin
        }, 1500);
      } else {
        // Check user credentials
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("currentUser", JSON.stringify(user));
          showSuccessNotification("Login berhasil! Mengalihkan ke pembayaran...");
          setTimeout(() => {
            window.location.href = "/payment/index.html"; // Arahkan ke payment
          }, 1500);
        } else {
          setLoadingState(false, loginBtn);
          showError("Email atau password salah. Silakan coba lagi.");
        }
      }
    }, 1500);
  });

  // Handle register form submission
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const name = document.getElementById("registerName").value.trim();

    // Validate inputs
    if (!email || !password || !name) {
      showError("Mohon isi semua field yang diperlukan.");
      return;
    }

    if (users.some(u => u.email === email)) {
      showError("Email sudah terdaftar. Gunakan email lain.");
      return;
    }

    setLoadingState(true, registerBtn);

    setTimeout(() => {
      const newUser = {
        id: `U${Date.now()}`,
        email,
        password,
        name,
        role: "customer",
        joinDate: new Date().toISOString().split("T")[0],
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      setLoadingState(false, registerBtn);
      showSuccessNotification("Registrasi berhasil! Silakan login.");
      registerForm.reset();
      loginForm.classList.remove("hidden");
      registerForm.classList.add("hidden");
      toggleFormBtn.textContent = "Belum punya akun? Daftar";
    }, 1500);
  });

  // Set loading state for buttons
  function setLoadingState(loading, button) {
    button.disabled = loading;
    const btnText = button.querySelector(".btn-text");
    const btnSpinner = button.querySelector(".btn-spinner");
    if (loading) {
      btnText.style.display = "none";
      btnSpinner.style.display = "inline-block";
    } else {
      btnText.style.display = "inline-block";
      btnSpinner.style.display = "none";
    }
  }

  // Show error modal
  function showError(message) {
    errorMessage.textContent = message;
    errorModal.classList.add("show");
  }

  // Close error modal
  closeErrorModal.addEventListener("click", () => {
    errorModal.classList.remove("show");
  });

  // Close modal when clicking outside
  errorModal.addEventListener("click", (e) => {
    if (e.target === errorModal) {
      errorModal.classList.remove("show");
    }
  });

  // Show success notification
  function showSuccessNotification(message) {
    const notification = document.createElement("div");
    notification.className = "success-notification";
    notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;

    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 2000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease;
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // KODE INI YANG MENYEBABKAN AUTO REDIRECT - SUDAH DIHAPUS
  // Check if already logged in and redirect from cart
  // if (localStorage.getItem("isLoggedIn") === "true") {
  //   const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   if (adminUser) {
  //     window.location.href = "/pages/index.html"; // Arahkan ke dashboard admin
  //   } else if (currentUser) {
  //     window.location.href = "/payment/index.html"; // Arahkan ke payment
  //   }
  // }
});

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .hidden {
        display: none;
    }
`;
document.head.appendChild(style);