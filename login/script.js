// Login Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const loginForm = document.getElementById("loginForm")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const togglePassword = document.getElementById("togglePassword")
  const loginBtn = document.getElementById("loginBtn")
  const btnText = loginBtn.querySelector(".btn-text")
  const btnSpinner = loginBtn.querySelector(".btn-spinner")
  const errorModal = document.getElementById("errorModal")
  const closeErrorModal = document.getElementById("closeErrorModal")
  const errorMessage = document.getElementById("errorMessage")

  // Demo credentials
  const validCredentials = {
    email: "admin@glowgrace.com",
    password: "admin123",
  }

  // Toggle password visibility
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)

    const icon = togglePassword.querySelector("i")
    icon.classList.toggle("fa-eye")
    icon.classList.toggle("fa-eye-slash")
  })

  // Handle form submission
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()

    // Validate inputs
    if (!email || !password) {
      showError("Mohon isi semua field yang diperlukan.")
      return
    }

    // Show loading state
    setLoadingState(true)

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials
      if (email === validCredentials.email && password === validCredentials.password) {
        // Success - store login state
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            email: email,
            name: "Admin Glow & Grace",
            role: "admin",
            loginTime: new Date().toISOString(),
          }),
        )

        // Show success message
        showSuccessNotification("Login berhasil! Mengalihkan ke dashboard...")

        // Redirect to dashboard after short delay
        setTimeout(() => {
          window.location.href = "../admin/index.html"
        }, 1500)
      } else {
        // Failed login
        setLoadingState(false)
        showError("Email atau password salah. Silakan coba lagi.")
      }
    }, 1500)
  })

  // Set loading state
  function setLoadingState(loading) {
    loginBtn.disabled = loading
    if (loading) {
      btnText.style.display = "none"
      btnSpinner.style.display = "inline-block"
    } else {
      btnText.style.display = "inline-block"
      btnSpinner.style.display = "none"
    }
  }

  // Show error modal
  function showError(message) {
    errorMessage.textContent = message
    errorModal.classList.add("show")
  }

  // Close error modal
  closeErrorModal.addEventListener("click", () => {
    errorModal.classList.remove("show")
  })

  // Close modal when clicking outside
  errorModal.addEventListener("click", (e) => {
    if (e.target === errorModal) {
      errorModal.classList.remove("show")
    }
  })

  // Show success notification
  function showSuccessNotification(message) {
    const notification = document.createElement("div")
    notification.className = "success-notification"
    notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `

    // Add styles
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
        `

    document.body.appendChild(notification)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  // Check if already logged in
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "../admin/index.html"
  }

  // Add CSS animations
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `
  document.head.appendChild(style)
})


