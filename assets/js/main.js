// Global JavaScript - Main JS
class AdminApp {
  constructor() {
    this.init()
  }

  init() {
    this.checkAuth()
    this.setupGlobalEventListeners()
    this.setupNotificationSystem()
  }

  checkAuth() {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn !== "true") {
      // For demo purposes, set as logged in
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          name: "Admin",
          role: "Administrator",
          email: "admin@glowgrace.com",
        }),
      )
    }
  }

  setupGlobalEventListeners() {
    // DOM Elements
    const sidebar = document.getElementById("sidebar")
    const menuToggle = document.getElementById("menuToggle")
    const sidebarToggle = document.getElementById("sidebarToggle")
    const userName = document.getElementById("userName")
    const logoutBtn = document.getElementById("logoutBtn")
    const logoutModal = document.getElementById("logoutModal")
    const cancelLogout = document.getElementById("cancelLogout")
    const confirmLogout = document.getElementById("confirmLogout")

    // Set user name
    const adminUser = JSON.parse(localStorage.getItem("adminUser")) || { name: "Admin" }
    if (userName) {
      userName.textContent = adminUser.name
    }

    // Mobile menu toggle
    if (menuToggle && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active")
      })
    }

    // Sidebar toggle
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.remove("active")
      })
    }

    // Logout functionality
    if (logoutBtn && logoutModal) {
      logoutBtn.addEventListener("click", () => {
        logoutModal.classList.add("show")
      })
    }

    if (cancelLogout && logoutModal) {
      cancelLogout.addEventListener("click", () => {
        logoutModal.classList.remove("show")
      })
    }

    if (confirmLogout) {
      confirmLogout.addEventListener("click", () => {
        this.logout()
      })
    }

    // Close modal when clicking outside
    if (logoutModal) {
      logoutModal.addEventListener("click", (e) => {
        if (e.target === logoutModal) {
          logoutModal.classList.remove("show")
        }
      })
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768 && sidebar && menuToggle) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove("active")
        }
      }
    })

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && sidebar) {
        sidebar.classList.remove("active")
      }
    })

    // Set active navigation
    this.setActiveNavigation()
  }

  setActiveNavigation() {
    const currentPath = window.location.pathname
    const navLinks = document.querySelectorAll(".nav-link")

    navLinks.forEach((link) => {
      link.classList.remove("active")
      const href = link.getAttribute("href")

      if (
        currentPath.includes(href) ||
        (currentPath.endsWith("/") && href === "index.html") ||
        (currentPath.includes("index.html") && href === "index.html")
      ) {
        link.classList.add("active")
      }
    })
  }

  logout() {
    // Clear authentication data
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("adminUser")

    // Show logout notification
    this.showNotification("Logout berhasil! Mengalihkan ke halaman login...", "success")

    // Redirect after delay
    setTimeout(() => {
      // Determine the correct path based on current location
      const currentPath = window.location.pathname
      if (currentPath.includes("/pages/")) {
        window.location.href = "../../index.html"
      } else {
        window.location.reload()
      }
    }, 1500)
  }

  setupNotificationSystem() {
    // Add CSS for notifications if not already added
    if (!document.getElementById("notification-styles")) {
      const style = document.createElement("style")
      style.id = "notification-styles"
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }

        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 1.5rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-lg);
          z-index: 3000;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: slideInRight 0.3s ease;
          max-width: 350px;
          font-weight: 500;
        }

        .notification-success {
          background: var(--success);
          color: white;
        }

        .notification-error {
          background: var(--error);
          color: white;
        }

        .notification-info {
          background: var(--info);
          color: white;
        }

        .notification-warning {
          background: var(--warning);
          color: white;
        }
      `
      document.head.appendChild(style)
    }
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`

    const iconMap = {
      success: "check-circle",
      error: "exclamation-circle",
      info: "info-circle",
      warning: "exclamation-triangle",
    }

    notification.innerHTML = `
      <i class="fas fa-${iconMap[type]}"></i>
      <span>${message}</span>
    `

    document.body.appendChild(notification)

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 4000)
  }

  // Utility functions
  formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  generateId(prefix) {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substr(2, 3)
    return `${prefix}${timestamp}${random}`
  }

  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.adminApp = new AdminApp()
})

// Make utility functions globally available
window.showNotification = (message, type) => {
  if (window.adminApp) {
    window.adminApp.showNotification(message, type)
  }
}

window.formatCurrency = (amount) => {
  if (window.adminApp) {
    return window.adminApp.formatCurrency(amount)
  }
  return amount
}

window.formatDate = (dateString) => {
  if (window.adminApp) {
    return window.adminApp.formatDate(dateString)
  }
  return dateString
}

window.generateId = (prefix) => {
  if (window.adminApp) {
    return window.adminApp.generateId(prefix)
  }
  return prefix + Date.now()
}
