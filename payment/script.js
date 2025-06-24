// Payment Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Load booking data from localStorage or URL params
  loadBookingData()

  // Initialize payment method handlers
  initPaymentMethods()

  // Initialize form handlers
  initFormHandlers()

  // Initialize payment processing
  initPaymentProcessing()
})

// Load booking data
function loadBookingData() {
  // Get booking data from localStorage (set by cart page)
  const bookingData = JSON.parse(localStorage.getItem("currentBooking")) || {}
  const cart = JSON.parse(localStorage.getItem("salonCart")) || []

  console.log("Booking data:", bookingData)
  console.log("Cart:", cart)

  if (cart.length === 0) {
    // Redirect to cart if no items
    window.location.href = "../cart/index.html"
    return
  }

  // Populate booking info
  populateBookingInfo(bookingData)

  // Populate services list
  populateServicesList(cart)

  // Calculate and display totals
  calculateTotals(cart, bookingData.appliedPromo)
}

// Populate booking information
function populateBookingInfo(bookingData) {
  const bookingInfo = document.getElementById("bookingInfo")

  const bookingHTML = `
        <div class="booking-detail">
            <span><strong>Tanggal:</strong></span>
            <span>${formatDate(bookingData.date || "2023-12-25")}</span>
        </div>
        <div class="booking-detail">
            <span><strong>Waktu:</strong></span>
            <span>${bookingData.time || "10:00 AM"}</span>
        </div>
        <div class="booking-detail">
            <span><strong>Customer:</strong></span>
            <span>${bookingData.customerName || "John Doe"}</span>
        </div>
        <div class="booking-detail">
            <span><strong>Telepon:</strong></span>
            <span>${bookingData.customerPhone || "+62 812-3456-7890"}</span>
        </div>
        ${
          bookingData.specialRequests
            ? `
        <div class="booking-detail">
            <span><strong>Catatan:</strong></span>
            <span>${bookingData.specialRequests}</span>
        </div>
        `
            : ""
        }
    `

  bookingInfo.innerHTML = bookingHTML
}

// Populate services list
function populateServicesList(cart) {
  const servicesList = document.getElementById("servicesList")

  const servicesHTML = cart
    .map(
      (service) => `
        <div class="service-item-summary">
            <span class="service-name">${service.name}</span>
            <span class="service-price">Rp ${service.price.toLocaleString("id-ID")}</span>
        </div>
    `,
    )
    .join("")

  servicesList.innerHTML = servicesHTML
}

// Calculate totals
function calculateTotals(cart, appliedPromo = null) {
  const subtotal = cart.reduce((sum, service) => sum + service.price, 0)
  const adminFee = 20000 // Admin fee dalam rupiah

  let discount = 0
  if (appliedPromo) {
    if (appliedPromo.type === "percentage") {
      discount = (subtotal * appliedPromo.discount) / 100
    } else {
      discount = appliedPromo.discount
    }
  }

  const total = subtotal - discount + adminFee

  // Update display
  document.getElementById("subtotalAmount").textContent = `Rp ${subtotal.toLocaleString("id-ID")}`
  document.getElementById("adminFee").textContent = `Rp ${adminFee.toLocaleString("id-ID")}`
  document.getElementById("totalAmount").textContent = `Rp ${total.toLocaleString("id-ID")}`

  // Show/hide discount row
  const discountRow = document.getElementById("discountRow")
  if (discount > 0) {
    discountRow.style.display = "flex"
    document.getElementById("discountAmount").textContent = `-Rp ${discount.toLocaleString("id-ID")}`
  } else {
    discountRow.style.display = "none"
  }

  // Store total for payment processing
  window.paymentTotal = total
}

// Initialize payment methods
function initPaymentMethods() {
  const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]')
  const paymentForms = document.querySelectorAll(".payment-form")

  paymentMethods.forEach((method) => {
    method.addEventListener("change", () => {
      // Hide all forms
      paymentForms.forEach((form) => {
        form.style.display = "none"
      })

      // Show selected form
      const selectedForm = document.getElementById(`${method.value}Form`)
      if (selectedForm) {
        selectedForm.style.display = "block"
      }
    })
  })

  // Show default form (bank transfer)
  document.getElementById("bank_transferForm").style.display = "block"
}

// Initialize form handlers
function initFormHandlers() {
  // Phone number formatting for e-wallet
  const phoneNumber = document.getElementById("phoneNumber")
  if (phoneNumber) {
    phoneNumber.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "")
    })
  }
}

// Initialize payment processing
function initPaymentProcessing() {
  const processPaymentBtn = document.getElementById("processPayment")

  processPaymentBtn.addEventListener("click", () => {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value

    console.log("Selected payment method:", selectedMethod)

    if (validatePaymentForm(selectedMethod)) {
      processPayment(selectedMethod)
    }
  })
}

// Validate payment form
function validatePaymentForm(method) {
  console.log("Validating payment method:", method)

  switch (method) {
    case "bank_transfer":
      return validateBankTransferForm()
    case "e_wallet":
      return validateEWalletForm()
    case "cash":
      return true // No validation needed for cash
    default:
      showNotification("Pilih metode pembayaran", "error")
      return false
  }
}

// Validate bank transfer form
function validateBankTransferForm() {
  const selectedBank = document.querySelector('input[name="bank"]:checked')

  if (!selectedBank) {
    showNotification("Pilih bank untuk transfer", "error")
    return false
  }

  return true
}

// Validate e-wallet form
function validateEWalletForm() {
  const selectedEWallet = document.querySelector('input[name="ewallet"]:checked')
  const phoneNumber = document.getElementById("phoneNumber").value

  if (!selectedEWallet) {
    showNotification("Pilih e-wallet", "error")
    return false
  }

  if (!phoneNumber) {
    showNotification("Masukkan nomor telepon", "error")
    document.getElementById("phoneNumber").focus()
    return false
  }

  if (phoneNumber.length < 10) {
    showNotification("Nomor telepon minimal 10 digit", "error")
    document.getElementById("phoneNumber").focus()
    return false
  }

  // Validate Indonesian phone number format
  if (!phoneNumber.match(/^(08|62|8)\d{8,12}$/)) {
    showNotification("Format nomor telepon: 08xxxxxxxxxx", "error")
    document.getElementById("phoneNumber").focus()
    return false
  }

  return true
}

// Process payment
function processPayment(method) {
  console.log("Processing payment with method:", method)

  // Show processing modal
  document.getElementById("processingModal").style.display = "block"

  // Simulate payment processing
  setTimeout(() => {
    // Hide processing modal
    document.getElementById("processingModal").style.display = "none"

    // Generate payment data
    const paymentData = generatePaymentData(method)

    // Save transaction to history BEFORE showing success modal
    saveTransactionToHistory(paymentData)

    // Show success modal
    showPaymentSuccess(paymentData)

    // Clear cart and booking data
    localStorage.removeItem("salonCart")
    localStorage.removeItem("currentBooking")
  }, 3000) // 3 second delay to simulate processing
}

// Generate payment data
function generatePaymentData(method) {
  const bookingData = JSON.parse(localStorage.getItem("currentBooking")) || {}

  return {
    transactionId: "TXN" + Date.now(),
    bookingReference: bookingData.reference || "GG" + Date.now().toString().slice(-6),
    method: method,
    amount: window.paymentTotal,
    date: new Date().toISOString(),
    status: "success",
  }
}

// Save transaction to history - IMPROVED VERSION
function saveTransactionToHistory(paymentData) {
  console.log("💾 Starting to save transaction to history...")

  const bookingData = JSON.parse(localStorage.getItem("currentBooking")) || {}
  const cart = JSON.parse(localStorage.getItem("salonCart")) || []

  console.log("📋 Booking data for history:", bookingData)
  console.log("🛒 Cart data for history:", cart)

  // Create transaction object for history - EXACT FORMAT MATCH
  const newTransaction = {
    id: paymentData.transactionId,
    bookingReference: paymentData.bookingReference,
    date: new Date().toISOString().split("T")[0],
    appointmentDate: bookingData.date || new Date().toISOString().split("T")[0],
    appointmentTime: bookingData.time || "10:00 AM",
    services: cart.map((service) => ({
      name: service.name,
      price: service.price,
    })),
    customer: {
      name: bookingData.customerName || "Customer",
      phone: bookingData.customerPhone || "+62 812-3456-7890",
      email: bookingData.customerEmail || "",
    },
    paymentMethod: paymentData.method,
    status: "confirmed",
    total: paymentData.amount,
    review: null,
  }

  console.log("🆕 New transaction object:", newTransaction)

  // Get existing transactions from localStorage
  const existingTransactions = JSON.parse(localStorage.getItem("salonTransactions")) || []
  console.log("📚 Existing transactions:", existingTransactions)

  // Add new transaction to the beginning of the array
  existingTransactions.unshift(newTransaction)
  console.log("📝 Updated transactions array:", existingTransactions)

  // Save back to localStorage
  localStorage.setItem("salonTransactions", JSON.stringify(existingTransactions))

  // Verify the save
  const verifyData = localStorage.getItem("salonTransactions")
  console.log("✅ Verification - Data saved to localStorage:", verifyData)

  // Store the new transaction ID for highlighting
  localStorage.setItem("newTransactionId", paymentData.transactionId)

  console.log("✅ Transaction saved to history successfully!")
  showNotification("Transaksi berhasil disimpan!", "success")

  // Additional verification
  setTimeout(() => {
    const checkData = JSON.parse(localStorage.getItem("salonTransactions") || "[]")
    console.log("🔍 Final verification - Transactions in storage:", checkData.length, "items")

    // Show the first transaction for debugging
    if (checkData.length > 0) {
      console.log("🎯 First transaction in storage:", checkData[0])
    }
  }, 100)
}

// Show payment success
function showPaymentSuccess(paymentData) {
  const paymentDetails = document.getElementById("paymentDetails")

  const detailsHTML = `
        <div class="payment-detail-row">
            <span>Transaction ID:</span>
            <span>${paymentData.transactionId}</span>
        </div>
        <div class="payment-detail-row">
            <span>Booking Reference:</span>
            <span>${paymentData.bookingReference}</span>
        </div>
        <div class="payment-detail-row">
            <span>Payment Method:</span>
            <span>${getPaymentMethodName(paymentData.method)}</span>
        </div>
        <div class="payment-detail-row">
            <span>Amount Paid:</span>
            <span>Rp ${paymentData.amount.toLocaleString("id-ID")}</span>
        </div>
    `

  paymentDetails.innerHTML = detailsHTML

  document.getElementById("paymentSuccessModal").style.display = "block"

  // Add event listener to history button after modal is shown
  setTimeout(() => {
    const historyBtn = document.getElementById("viewHistoryBtn")
    if (historyBtn) {
      // Remove existing listeners
      historyBtn.replaceWith(historyBtn.cloneNode(true))

      // Add new listener
      const newHistoryBtn = document.getElementById("viewHistoryBtn")
      newHistoryBtn.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("✅ History button clicked!")
        goToHistory()
      })

      console.log("✅ History button event listener added!")
    }
  }, 100)

  // Store payment data for receipt
  localStorage.setItem("lastPayment", JSON.stringify(paymentData))
}

// Get payment method name
function getPaymentMethodName(method) {
  const names = {
    bank_transfer: "Bank Transfer",
    e_wallet: "E-Wallet",
    cash: "Bayar di Salon",
  }
  return names[method] || method
}

// Download receipt
function downloadReceipt() {
  const paymentData = JSON.parse(localStorage.getItem("lastPayment"))
  const bookingData = JSON.parse(localStorage.getItem("currentBooking")) || {}

  if (!paymentData) {
    showNotification("Data pembayaran tidak ditemukan", "error")
    return
  }

  // Create receipt content
  const receiptContent = `
        GLOW & GRACE BEAUTY SALON
        ========================
        
        RECEIPT
        
        Transaction ID: ${paymentData.transactionId}
        Booking Reference: ${paymentData.bookingReference}
        Date: ${formatDate(paymentData.date)}
        
        Customer: ${bookingData.customerName || "N/A"}
        Phone: ${bookingData.customerPhone || "N/A"}
        
        Appointment Date: ${formatDate(bookingData.date)}
        Appointment Time: ${bookingData.time || "N/A"}
        
        Payment Method: ${getPaymentMethodName(paymentData.method)}
        Amount Paid: Rp ${paymentData.amount.toLocaleString("id-ID")}
        Status: ${paymentData.status.toUpperCase()}
        
        Thank you for choosing Glow & Grace!
        
        Contact: (021) 123-4567
        Address: 123 Beauty Street, Jakarta
    `

  // Create and download file
  const blob = new Blob([receiptContent], { type: "text/plain" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `receipt-${paymentData.transactionId}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)

  showNotification("Receipt berhasil didownload", "success")
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
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

// Initialize event listeners - UPDATE THIS SECTION
document.getElementById("downloadReceipt").addEventListener("click", downloadReceipt)

// Add event listener for history button - MULTIPLE APPROACHES
document.addEventListener("DOMContentLoaded", () => {
  // Method 1: Direct event listener
  const historyBtn = document.getElementById("viewHistoryBtn")
  if (historyBtn) {
    historyBtn.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("History button clicked via event listener!")
      goToHistory()
    })
  }
})

// Method 2: Global function for onclick
function goToHistory() {
  console.log("🔄 Redirecting to history page...")

  // Show loading notification
  showNotification("Mengarahkan ke halaman history...", "info")

  // Small delay to show notification
  setTimeout(() => {
    window.location.href = "../history/index.html?new=true"
  }, 500)
}

// Method 3: Make function globally available
window.goToHistory = goToHistory

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  const processingModal = document.getElementById("processingModal")
  const successModal = document.getElementById("paymentSuccessModal")

  if (e.target === processingModal) {
    // Don't allow closing processing modal
  }
  if (e.target === successModal) {
    successModal.style.display = "none"
    window.location.href = "../index.html"
  }
})

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

// Add event listener for existing history button in HTML
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for history button
  const existingHistoryBtn = document.getElementById("viewHistoryBtn")
  if (existingHistoryBtn) {
    existingHistoryBtn.addEventListener("click", () => {
      console.log("Existing history button clicked!") // Debug log
      window.location.href = "../history/index.html?new=true"
    })
  }
})
