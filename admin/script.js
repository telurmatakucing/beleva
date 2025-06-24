// Admin Dashboard JavaScript - Main
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  checkAuth()

  // DOM Elements
  const sidebar = document.getElementById("sidebar")
  const menuToggle = document.getElementById("menuToggle")
  const sidebarToggle = document.getElementById("sidebarToggle")
  const navLinks = document.querySelectorAll(".nav-link")
  const contentSections = document.querySelectorAll(".content-section")
  const pageTitle = document.getElementById("pageTitle")
  const userName = document.getElementById("userName")
  const logoutBtn = document.getElementById("logoutBtn")
  const logoutModal = document.getElementById("logoutModal")
  const cancelLogout = document.getElementById("cancelLogout")
  const confirmLogout = document.getElementById("confirmLogout")

  // Initialize
  init()

  function init() {
    // Set user name
    const adminUser = JSON.parse(localStorage.getItem("adminUser")) || { name: "Admin" }
    userName.textContent = adminUser.name

    // Setup event listeners
    setupEventListeners()

    // Show dashboard by default
    showSection("dashboard")
  }

  function checkAuth() {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn !== "true") {
      // For demo purposes, set as logged in
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("adminUser", JSON.stringify({ name: "Admin" }))
    }
  }

  function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })

    // Sidebar toggle
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.remove("active")
    })

    // Navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Check if it's an external link
        if (link.getAttribute("href").includes(".html")) {
          return // Let the browser handle the navigation
        }

        e.preventDefault()
        const section = link.getAttribute("data-section")
        showSection(section)

        // Update active nav link
        navLinks.forEach((l) => l.classList.remove("active"))
        link.classList.add("active")

        // Close mobile sidebar
        sidebar.classList.remove("active")
      })
    })

    // Logout button
    logoutBtn.addEventListener("click", () => {
      logoutModal.classList.add("show")
    })

    // Logout modal
    cancelLogout.addEventListener("click", () => {
      logoutModal.classList.remove("show")
    })

    confirmLogout.addEventListener("click", () => {
      logout()
    })

    // Close modal when clicking outside
    logoutModal.addEventListener("click", (e) => {
      if (e.target === logoutModal) {
        logoutModal.classList.remove("show")
      }
    })

    // Filter buttons for transactions
    const filterButtons = document.querySelectorAll("[data-filter]")
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"))
        button.classList.add("active")

        const filter = button.getAttribute("data-filter")
        filterTransactions(filter)
      })
    })
  }

  function showSection(sectionName) {
    // Hide all sections
    contentSections.forEach((section) => {
      section.classList.remove("active")
    })

    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`)
    if (targetSection) {
      targetSection.classList.add("active")
    }

    // Update page title
    const titles = {
      dashboard: "Dashboard",
      articles: "Kelola Artikel",
      transactions: "Kelola Transaksi",
    }

    pageTitle.textContent = titles[sectionName] || "Dashboard"
  }

  function filterTransactions(filter) {
    const rows = document.querySelectorAll("#transactionsTableBody tr")

    rows.forEach((row) => {
      const status = row.querySelector(".status").textContent.toLowerCase()

      if (filter === "all" || status.includes(filter)) {
        row.style.display = ""
      } else {
        row.style.display = "none"
      }
    })
  }

  function logout() {
    // Clear authentication data
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("adminUser")

    // Show logout notification
    showNotification("Logout berhasil! Mengalihkan ke halaman login...", "success")

    // For demo purposes, just reload the page
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
      <span>${message}</span>
    `

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "var(--success)" : type === "error" ? "var(--error)" : "var(--info)"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 3000;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      animation: slideInRight 0.3s ease;
      max-width: 300px;
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

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove("active")
      }
    }
  })

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active")
    }
  })
})
