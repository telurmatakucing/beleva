// Sample transaction data (in real app, this would come from API)
const sampleTransactions = [
  {
    id: "TXN1703123456789",
    bookingReference: "GG123456",
    date: "2023-12-20",
    appointmentDate: "2023-12-25",
    appointmentTime: "10:00 AM",
    services: [
      { name: "Classic Facial", price: 850000 },
      { name: "Hair Styling", price: 650000 },
    ],
    customer: {
      name: "Sarah Johnson",
      phone: "+62 812-3456-7890",
      email: "sarah@email.com",
    },
    paymentMethod: "bank_transfer",
    status: "completed",
    total: 1520000,
    review: null,
  },
  {
    id: "TXN1703023456789",
    bookingReference: "GG123457",
    date: "2023-12-18",
    appointmentDate: "2023-12-22",
    appointmentTime: "02:00 PM",
    services: [{ name: "Anti-Aging Facial", price: 1100000 }],
    customer: {
      name: "Sarah Johnson",
      phone: "+62 812-3456-7890",
      email: "sarah@email.com",
    },
    paymentMethod: "e_wallet",
    status: "confirmed",
    total: 1120000,
    review: null,
  },
]

// Global variables
let allTransactions = [...sampleTransactions]
let filteredTransactions = [...sampleTransactions]
let currentView = "list"
let currentPage = 1
const itemsPerPage = 10

// DOM Elements
const statusFilter = document.getElementById("statusFilter")
const paymentFilter = document.getElementById("paymentFilter")
const dateFilter = document.getElementById("dateFilter")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const clearFiltersBtn = document.getElementById("clearFilters")
const transactionsList = document.getElementById("transactionsList")
const transactionsGrid = document.getElementById("transactionsGrid")
const emptyState = document.getElementById("emptyState")
const loadMoreSection = document.getElementById("loadMoreSection")
const loadMoreBtn = document.getElementById("loadMoreBtn")

// Statistics elements
const totalBookings = document.getElementById("totalBookings")
const totalSpent = document.getElementById("totalSpent")
const completedBookings = document.getElementById("completedBookings")
const upcomingBookings = document.getElementById("upcomingBookings")

// Modal elements
const transactionModal = document.getElementById("transactionModal")
const closeTransactionModal = document.getElementById("closeTransactionModal")
const transactionDetail = document.getElementById("transactionDetail")
const downloadReceiptBtn = document.getElementById("downloadReceiptBtn")
const rebookBtn = document.getElementById("rebookBtn")

const reviewModal = document.getElementById("reviewModal")
const closeReviewModal = document.getElementById("closeReviewModal")
const starRating = document.getElementById("starRating")
const reviewText = document.getElementById("reviewText")
const cancelReview = document.getElementById("cancelReview")
const submitReview = document.getElementById("submitReview")

let currentTransactionId = null
let currentRating = 0

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 History page loading...")

  // Load transactions from localStorage if available
  loadTransactionsFromStorage()

  // Initialize event listeners
  initEventListeners()

  // Initial render
  updateStatistics()
  renderTransactions()

  // Check for new transaction parameter
  checkForNewTransaction()
})

// Check for new transaction from payment
function checkForNewTransaction() {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get("new") === "true") {
    console.log("🎉 New transaction detected from payment!")
    showNotification("Transaksi baru berhasil ditambahkan!", "success")

    // Remove the parameter from URL
    window.history.replaceState({}, document.title, window.location.pathname)

    // Highlight the newest transaction
    setTimeout(() => {
      highlightNewestTransaction()
    }, 1000)
  }
}

// Highlight newest transaction
function highlightNewestTransaction() {
  const firstTransaction = document.querySelector(".transaction-item, .transaction-card")
  if (firstTransaction) {
    firstTransaction.style.border = "2px solid #4caf50"
    firstTransaction.style.backgroundColor = "#f8fff8"

    // Remove highlight after 3 seconds
    setTimeout(() => {
      firstTransaction.style.border = ""
      firstTransaction.style.backgroundColor = ""
    }, 3000)
  }
}

// Load transactions from localStorage
function loadTransactionsFromStorage() {
  console.log("🔍 Loading transactions from localStorage...")

  const storedTransactions = localStorage.getItem("salonTransactions")
  console.log("📦 Raw stored data:", storedTransactions)

  if (storedTransactions) {
    try {
      const parsed = JSON.parse(storedTransactions)
      console.log("✅ Parsed transactions:", parsed)

      // Combine stored transactions with sample transactions
      allTransactions = [...parsed, ...sampleTransactions]
      filteredTransactions = [...allTransactions]

      console.log("📋 Final allTransactions:", allTransactions.length, "items")
      console.log("🔍 First transaction:", allTransactions[0])
    } catch (error) {
      console.error("❌ Error loading transactions from storage:", error)
      allTransactions = [...sampleTransactions]
      filteredTransactions = [...allTransactions]
    }
  } else {
    console.log("ℹ️ No stored transactions found, using sample data")
    allTransactions = [...sampleTransactions]
    filteredTransactions = [...allTransactions]
  }
}

// Save transactions to localStorage
function saveTransactionsToStorage() {
  try {
    const userTransactions = allTransactions.filter((t) => !sampleTransactions.find((s) => s.id === t.id))
    localStorage.setItem("salonTransactions", JSON.stringify(userTransactions))
    console.log("💾 Saved", userTransactions.length, "user transactions to storage")
  } catch (error) {
    console.error("❌ Error saving transactions to storage:", error)
  }
}

// Initialize event listeners
function initEventListeners() {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle")
  const mobileNav = document.getElementById("mobileNav")

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active")
    })
  }

  // Filter event listeners
  if (statusFilter) statusFilter.addEventListener("change", applyFilters)
  if (paymentFilter) paymentFilter.addEventListener("change", applyFilters)
  if (dateFilter) dateFilter.addEventListener("change", applyFilters)
  if (searchBtn) searchBtn.addEventListener("click", applyFilters)
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        applyFilters()
      }
    })
  }
  if (clearFiltersBtn) clearFiltersBtn.addEventListener("click", clearFilters)

  // View toggle
  const toggleBtns = document.querySelectorAll(".toggle-btn")
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      currentView = btn.getAttribute("data-view")
      renderTransactions()
    })
  })

  // Load more
  if (loadMoreBtn) loadMoreBtn.addEventListener("click", loadMoreTransactions)

  // Modal event listeners
  if (closeTransactionModal) {
    closeTransactionModal.addEventListener("click", () => {
      transactionModal.style.display = "none"
    })
  }

  if (closeReviewModal) {
    closeReviewModal.addEventListener("click", () => {
      reviewModal.style.display = "none"
    })
  }

  if (cancelReview) {
    cancelReview.addEventListener("click", () => {
      reviewModal.style.display = "none"
    })
  }

  if (downloadReceiptBtn) downloadReceiptBtn.addEventListener("click", downloadReceipt)
  if (rebookBtn) rebookBtn.addEventListener("click", rebookService)
  if (submitReview) submitReview.addEventListener("click", submitReviewHandler)

  // Star rating
  if (starRating) {
    const stars = starRating.querySelectorAll("i")
    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        currentRating = index + 1
        updateStarRating()
      })

      star.addEventListener("mouseenter", () => {
        highlightStars(index + 1)
      })
    })

    starRating.addEventListener("mouseleave", () => {
      updateStarRating()
    })
  }

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === transactionModal) {
      transactionModal.style.display = "none"
    }
    if (e.target === reviewModal) {
      reviewModal.style.display = "none"
    }
  })
}

// Apply filters
function applyFilters() {
  const statusValue = statusFilter ? statusFilter.value : "all"
  const paymentValue = paymentFilter ? paymentFilter.value : "all"
  const dateValue = dateFilter ? dateFilter.value : "all"
  const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : ""

  filteredTransactions = allTransactions.filter((transaction) => {
    // Status filter
    if (statusValue !== "all" && transaction.status !== statusValue) {
      return false
    }

    // Payment method filter
    if (paymentValue !== "all" && transaction.paymentMethod !== paymentValue) {
      return false
    }

    // Date filter
    if (dateValue !== "all") {
      const transactionDate = new Date(transaction.date)
      const now = new Date()

      switch (dateValue) {
        case "today":
          if (transactionDate.toDateString() !== now.toDateString()) {
            return false
          }
          break
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          if (transactionDate < weekAgo) {
            return false
          }
          break
        case "month":
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
          if (transactionDate < monthAgo) {
            return false
          }
          break
        case "3months":
          const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
          if (transactionDate < threeMonthsAgo) {
            return false
          }
          break
      }
    }

    // Search filter
    if (searchValue) {
      const searchableText = [
        transaction.bookingReference,
        transaction.id,
        ...transaction.services.map((s) => s.name),
        transaction.customer.name,
      ]
        .join(" ")
        .toLowerCase()

      if (!searchableText.includes(searchValue)) {
        return false
      }
    }

    return true
  })

  currentPage = 1
  renderTransactions()
}

// Clear filters
function clearFilters() {
  if (statusFilter) statusFilter.value = "all"
  if (paymentFilter) paymentFilter.value = "all"
  if (dateFilter) dateFilter.value = "all"
  if (searchInput) searchInput.value = ""

  filteredTransactions = [...allTransactions]
  currentPage = 1
  renderTransactions()
}

// Update statistics
function updateStatistics() {
  const total = allTransactions.length
  const spent = allTransactions.reduce((sum, t) => sum + t.total, 0)
  const completed = allTransactions.filter((t) => t.status === "completed").length
  const upcoming = allTransactions.filter((t) => t.status === "confirmed" || t.status === "pending").length

  if (totalBookings) totalBookings.textContent = total
  if (totalSpent) totalSpent.textContent = `Rp ${spent.toLocaleString("id-ID")}`
  if (completedBookings) completedBookings.textContent = completed
  if (upcomingBookings) upcomingBookings.textContent = upcoming
}

// Render transactions
function renderTransactions() {
  const startIndex = 0
  const endIndex = currentPage * itemsPerPage
  const transactionsToShow = filteredTransactions.slice(startIndex, endIndex)

  console.log("🎨 Rendering", transactionsToShow.length, "transactions")

  if (filteredTransactions.length === 0) {
    showEmptyState()
    return
  }

  hideEmptyState()

  if (currentView === "list") {
    renderListView(transactionsToShow)
    if (transactionsList) {
      transactionsList.style.display = "block"
    }
    if (transactionsGrid) {
      transactionsGrid.style.display = "none"
    }
  } else {
    renderGridView(transactionsToShow)
    if (transactionsList) {
      transactionsList.style.display = "none"
    }
    if (transactionsGrid) {
      transactionsGrid.style.display = "grid"
    }
  }

  // Show/hide load more button
  if (loadMoreSection) {
    if (endIndex < filteredTransactions.length) {
      loadMoreSection.style.display = "block"
    } else {
      loadMoreSection.style.display = "none"
    }
  }
}

// Render list view
function renderListView(transactions) {
  if (!transactionsList) {
    console.error("❌ transactionsList element not found")
    return
  }

  transactionsList.innerHTML = transactions
    .map(
      (transaction) => `
    <div class="transaction-item" onclick="showTransactionDetail('${transaction.id}')">
      <div class="transaction-icon ${transaction.status}">
        <i class="fas fa-${getStatusIcon(transaction.status)}"></i>
      </div>
      <div class="transaction-info">
        <div class="transaction-header">
          <span class="transaction-id">${transaction.bookingReference}</span>
          <span class="transaction-date">${formatDate(transaction.date)}</span>
        </div>
        <div class="transaction-services">
          ${transaction.services.map((s) => s.name).join(", ")}
        </div>
        <div class="transaction-footer">
          <span class="transaction-status ${transaction.status}">
            ${getStatusText(transaction.status)}
          </span>
          <span class="transaction-amount">Rp ${transaction.total.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  `,
    )
    .join("")

  console.log("✅ List view rendered with", transactions.length, "items")
}

// Render grid view
function renderGridView(transactions) {
  if (!transactionsGrid) {
    console.error("❌ transactionsGrid element not found")
    return
  }

  transactionsGrid.innerHTML = transactions
    .map(
      (transaction) => `
    <div class="transaction-card" onclick="showTransactionDetail('${transaction.id}')">
      <div class="transaction-header">
        <span class="transaction-id">${transaction.bookingReference}</span>
        <span class="transaction-date">${formatDate(transaction.date)}</span>
      </div>
      <div class="transaction-services">
        ${transaction.services.map((s) => s.name).join(", ")}
      </div>
      <div class="transaction-footer">
        <span class="transaction-status ${transaction.status}">
          ${getStatusText(transaction.status)}
        </span>
        <span class="transaction-amount">Rp ${transaction.total.toLocaleString("id-ID")}</span>
      </div>
    </div>
  `,
    )
    .join("")

  console.log("✅ Grid view rendered with", transactions.length, "items")
}

// Show/hide empty state
function showEmptyState() {
  if (emptyState) {
    emptyState.style.display = "block"
  }
  if (transactionsList) {
    transactionsList.style.display = "none"
  }
  if (transactionsGrid) {
    transactionsGrid.style.display = "none"
  }
  if (loadMoreSection) {
    loadMoreSection.style.display = "none"
  }
}

function hideEmptyState() {
  if (emptyState) {
    emptyState.style.display = "none"
  }
}

// Load more transactions
function loadMoreTransactions() {
  currentPage++
  renderTransactions()
}

// Show transaction detail modal
function showTransactionDetail(transactionId) {
  const transaction = allTransactions.find((t) => t.id === transactionId)
  if (!transaction) return

  currentTransactionId = transactionId

  const detailHTML = `
    <div class="detail-section">
      <h4>Informasi Booking</h4>
      <div class="detail-row">
        <span>Booking Reference:</span>
        <span><strong>${transaction.bookingReference}</strong></span>
      </div>
      <div class="detail-row">
        <span>Transaction ID:</span>
        <span>${transaction.id}</span>
      </div>
      <div class="detail-row">
        <span>Tanggal Booking:</span>
        <span>${formatDate(transaction.date)}</span>
      </div>
      <div class="detail-row">
        <span>Tanggal Appointment:</span>
        <span>${formatDate(transaction.appointmentDate)}</span>
      </div>
      <div class="detail-row">
        <span>Waktu:</span>
        <span>${transaction.appointmentTime}</span>
      </div>
      <div class="detail-row">
        <span>Status:</span>
        <span class="transaction-status ${transaction.status}">
          ${getStatusText(transaction.status)}
        </span>
      </div>
    </div>

    <div class="detail-section">
      <h4>Layanan</h4>
      ${transaction.services
        .map(
          (service) => `
        <div class="detail-row">
          <span>${service.name}</span>
          <span><strong>Rp ${service.price.toLocaleString("id-ID")}</strong></span>
        </div>
      `,
        )
        .join("")}
      <div class="detail-row" style="border-top: 1px solid #ddd; padding-top: 0.5rem; margin-top: 0.5rem;">
        <span><strong>Total:</strong></span>
        <span><strong>Rp ${transaction.total.toLocaleString("id-ID")}</strong></span>
      </div>
    </div>

    <div class="detail-section">
      <h4>Informasi Customer</h4>
      <div class="detail-row">
        <span>Nama:</span>
        <span>${transaction.customer.name}</span>
      </div>
      <div class="detail-row">
        <span>Telepon:</span>
        <span>${transaction.customer.phone}</span>
      </div>
      <div class="detail-row">
        <span>Email:</span>
        <span>${transaction.customer.email || "-"}</span>
      </div>
    </div>

    <div class="detail-section">
      <h4>Pembayaran</h4>
      <div class="detail-row">
        <span>Metode:</span>
        <span>${getPaymentMethodText(transaction.paymentMethod)}</span>
      </div>
      <div class="detail-row">
        <span>Total Bayar:</span>
        <span><strong>Rp ${transaction.total.toLocaleString("id-ID")}</strong></span>
      </div>
    </div>

    ${
      transaction.review
        ? `
      <div class="detail-section">
        <h4>Review Anda</h4>
        <div class="detail-row">
          <span>Rating:</span>
          <span>${"★".repeat(transaction.review.rating)}${"☆".repeat(5 - transaction.review.rating)}</span>
        </div>
        <div class="detail-row">
          <span>Komentar:</span>
          <span>${transaction.review.text}</span>
        </div>
      </div>
    `
        : ""
    }
  `

  if (transactionDetail) {
    transactionDetail.innerHTML = detailHTML
  }

  // Update modal buttons based on status
  updateModalButtons(transaction)

  if (transactionModal) {
    transactionModal.style.display = "block"
  }
}

// Update modal buttons
function updateModalButtons(transaction) {
  if (!rebookBtn) return

  // Show review button only for completed transactions without review
  if (transaction.status === "completed" && !transaction.review) {
    rebookBtn.innerHTML = '<i class="fas fa-star"></i> Beri Review'
    rebookBtn.onclick = () => showReviewModal(transaction.id)
  } else {
    rebookBtn.innerHTML = '<i class="fas fa-redo"></i> Book Lagi'
    rebookBtn.onclick = rebookService
  }
}

// Show review modal
function showReviewModal(transactionId) {
  currentTransactionId = transactionId
  currentRating = 0
  if (reviewText) reviewText.value = ""
  updateStarRating()

  if (transactionModal) transactionModal.style.display = "none"
  if (reviewModal) reviewModal.style.display = "block"
}

// Update star rating display
function updateStarRating() {
  if (!starRating) return

  const stars = starRating.querySelectorAll("i")
  stars.forEach((star, index) => {
    if (index < currentRating) {
      star.classList.add("active")
    } else {
      star.classList.remove("active")
    }
  })
}

// Highlight stars on hover
function highlightStars(rating) {
  if (!starRating) return

  const stars = starRating.querySelectorAll("i")
  stars.forEach((star, index) => {
    if (index < rating) {
      star.style.color = "#ffc107"
    } else {
      star.style.color = "#ddd"
    }
  })
}

// Submit review
function submitReviewHandler() {
  if (currentRating === 0) {
    showNotification("Pilih rating terlebih dahulu", "error")
    return
  }

  if (!reviewText || !reviewText.value.trim()) {
    showNotification("Tulis review Anda", "error")
    return
  }

  const transaction = allTransactions.find((t) => t.id === currentTransactionId)
  if (transaction) {
    transaction.review = {
      rating: currentRating,
      text: reviewText.value.trim(),
      date: new Date().toISOString(),
    }

    saveTransactionsToStorage()
    showNotification("Review berhasil dikirim!", "success")
    if (reviewModal) reviewModal.style.display = "none"

    // Refresh the detail modal if it's open
    if (transactionModal && transactionModal.style.display === "block") {
      showTransactionDetail(currentTransactionId)
    }
  }
}

// Download receipt
function downloadReceipt() {
  const transaction = allTransactions.find((t) => t.id === currentTransactionId)
  if (!transaction) return

  const receiptContent = `
GLOW & GRACE BEAUTY SALON
========================

RECEIPT

Transaction ID: ${transaction.id}
Booking Reference: ${transaction.bookingReference}
Date: ${formatDate(transaction.date)}

Customer: ${transaction.customer.name}
Phone: ${transaction.customer.phone}
Email: ${transaction.customer.email || "N/A"}

Appointment Date: ${formatDate(transaction.appointmentDate)}
Appointment Time: ${transaction.appointmentTime}

Services:
${transaction.services.map((s) => `- ${s.name}: Rp ${s.price.toLocaleString("id-ID")}`).join("\n")}

Payment Method: ${getPaymentMethodText(transaction.paymentMethod)}
Total Amount: Rp ${transaction.total.toLocaleString("id-ID")}
Status: ${getStatusText(transaction.status).toUpperCase()}

Thank you for choosing Glow & Grace!

Contact: (021) 123-4567
Address: 123 Beauty Street, Jakarta
  `

  const blob = new Blob([receiptContent], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `receipt-${transaction.bookingReference}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)

  showNotification("Receipt berhasil didownload", "success")
}

// Rebook service
function rebookService() {
  const transaction = allTransactions.find((t) => t.id === currentTransactionId)
  if (!transaction) return

  // Store services for rebooking
  const servicesToRebook = transaction.services.map((service) => ({
    id: service.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, ""),
    name: service.name,
    price: service.price,
    duration: 60, // Default duration
    image: "https://placehold.co/600x400/FFF0D9/FF85A2?text=" + encodeURIComponent(service.name),
    description: `Professional ${service.name.toLowerCase()} service`,
    category: "rebooking",
  }))

  // Clear current cart and add rebook services
  localStorage.setItem("salonCart", JSON.stringify(servicesToRebook))

  showNotification("Layanan ditambahkan ke keranjang!", "success")

  // Redirect to cart page
  setTimeout(() => {
    window.location.href = "../cart/index.html"
  }, 1500)
}

// Utility functions
function getStatusIcon(status) {
  const icons = {
    completed: "check",
    confirmed: "clock",
    pending: "hourglass-half",
    cancelled: "times",
  }
  return icons[status] || "question"
}

function getStatusText(status) {
  const texts = {
    completed: "Selesai",
    confirmed: "Dikonfirmasi",
    pending: "Menunggu",
    cancelled: "Dibatalkan",
  }
  return texts[status] || status
}

function getPaymentMethodText(method) {
  const texts = {
    bank_transfer: "Bank Transfer",
    e_wallet: "E-Wallet",
    cash: "Bayar di Salon",
  }
  return texts[method] || method
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Show notification
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : type === "warning" ? "exclamation-triangle" : "info-circle"}"></i>
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#4caf50" : type === "error" ? "#f44336" : type === "warning" ? "#ff9800" : "#2196f3"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 3000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: slideInRight 0.3s ease;
    max-width: 350px;
  `

  // Add close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: auto;
    padding: 0;
  `

  closeBtn.addEventListener("click", () => {
    notification.remove()
  })

  document.body.appendChild(notification)

  // Auto remove after 4 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 300)
    }
  }, 4000)
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

// Add transaction from payment success (called from payment page)
function addTransaction(transactionData) {
  const newTransaction = {
    id: transactionData.transactionId,
    bookingReference: transactionData.bookingReference,
    date: new Date().toISOString().split("T")[0],
    appointmentDate: transactionData.appointmentDate,
    appointmentTime: transactionData.appointmentTime,
    services: transactionData.services,
    customer: transactionData.customer,
    paymentMethod: transactionData.method,
    status: "confirmed",
    total: transactionData.amount,
    review: null,
  }

  allTransactions.unshift(newTransaction)
  filteredTransactions = [...allTransactions]
  saveTransactionsToStorage()
  updateStatistics()
  renderTransactions()
}

// Expose function globally for other pages to use
window.addTransaction = addTransaction

// Debug function to check localStorage
function debugLocalStorage() {
  console.log("🔍 Debug localStorage:")
  console.log("salonTransactions:", localStorage.getItem("salonTransactions"))
  console.log("newTransactionId:", localStorage.getItem("newTransactionId"))
  console.log("lastPayment:", localStorage.getItem("lastPayment"))
}

// Make debug function available globally
window.debugLocalStorage = debugLocalStorage

// Auto-debug on page load
setTimeout(() => {
  debugLocalStorage()
}, 1000)
