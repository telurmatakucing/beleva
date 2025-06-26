// Sample services data (in real app, this would come from your services page)
const servicesData = {
  "male-haircut": {
    id: "male-haircut",
    name: "Male Haircut",
    price: 850000,
    duration: 60,
    image: "../image/men.jpg", // Sesuai dengan gambar yang ada
    description:
      "Professional male haircut with modern styling techniques tailored to your face shape.",
    category: "hair",
  },
  "anti-aging-facial": {
    id: "anti-aging-facial",
    name: "Anti-Aging Facial",
    price: 1100000,
    duration: 75,
    image: "../image/facial.jpg", // Menggunakan facial.jpg
    description:
      "Targets fine lines and wrinkles with specialized serums and techniques to promote collagen production.",
    category: "facial",
  },
  "haircut-styling": {
    id: "haircut-styling",
    name: "Haircut & Styling",
    price: 650000,
    duration: 45,
    image: "../image/haircare.jpg", // Menggunakan haircare.jpg
    description: "Professional haircut and styling tailored to your face shape and personal style preferences.",
    category: "hair",
  },
  "hair-coloring": {
    id: "hair-coloring",
    name: "Hair Coloring",
    price: 1200000,
    duration: 120,
    image: "../image/colorman.jpg", // Menggunakan colorman.jpg
    description: "Full hair coloring service using premium products for vibrant, long-lasting results.",
    category: "hair",
  },
  "classic-manicure": {
    id: "classic-manicure",
    name: "Classic Manicure",
    price: 400000,
    duration: 45,
    image: "../image/manicure.jpg", // Menggunakan manicure.jpg
    description: "Nail shaping, cuticle care, hand massage, and polish application for beautifully groomed hands.",
    category: "nail",
  },
  "luxury-pedicure": {
    id: "luxury-pedicure",
    name: "Luxury Pedicure",
    price: 550000,
    duration: 60,
    image: "../image/pedicure.jpg", // Menggunakan pedicure.jpg
    description: "Indulgent foot treatment including exfoliation, massage, and polish for perfectly pampered feet.",
    category: "nail",
  },
  "special-makeup": {
    id: "special-makeup",
    name: "Special Occasion Makeup",
    price: 900000,
    duration: 60,
    image: "../image/makeup.jpg", // Menggunakan makeup.jpg
    description: "Professional makeup application for weddings, parties, and special events using premium products.",
    category: "makeup",
  },
  "relaxation-massage": {
    id: "relaxation-massage",
    name: "Relaxation Massage",
    price: 950000,
    duration: 60,
    image: "../image/massage.jpg", // Menggunakan massage.jpg
    description: "Gentle massage techniques to promote relaxation, reduce stress, and improve overall wellbeing.",
    category: "massage",
  },
}
// Cart management
let cart = JSON.parse(localStorage.getItem("salonCart")) || []

// Promo codes
const promoCodes = {
  WELCOME10: { discount: 10, type: "percentage", description: "Welcome discount 10%" },
  NEWCLIENT: { discount: 15, type: "percentage", description: "New client discount 15%" },
  SAVE20: { discount: 20, type: "fixed", description: "Save $20 on your booking" },
}

let appliedPromo = null

// DOM Elements
const cartCount = document.getElementById("cartCount")
const emptyCart = document.getElementById("emptyCart")
const cartItems = document.getElementById("cartItems")
const cartSummary = document.getElementById("cartSummary")
const continueShopping = document.getElementById("continueShopping")
const totalServices = document.getElementById("totalServices")
const totalDuration = document.getElementById("totalDuration")
const totalPrice = document.getElementById("totalPrice")
const bookingDate = document.getElementById("bookingDate")
const bookingTime = document.getElementById("bookingTime")
const specialRequests = document.getElementById("specialRequests")
const proceedBooking = document.getElementById("proceedBooking")
const clearCart = document.getElementById("clearCart")
const promoCode = document.getElementById("promoCode")
const applyPromo = document.getElementById("applyPromo")
const promoMessage = document.getElementById("promoMessage")

// Modal elements
const bookingModal = document.getElementById("bookingModal")
const closeBookingModal = document.getElementById("closeBookingModal")
const bookingDetails = document.getElementById("bookingDetails")
const customerForm = document.getElementById("customerForm")
const cancelBooking = document.getElementById("cancelBooking")
const confirmBooking = document.getElementById("confirmBooking")
const successModal = document.getElementById("successModal")
const closeSuccessModal = document.getElementById("closeSuccessModal")
const bookingReference = document.getElementById("bookingReference")

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0]
  bookingDate.min = today

  // Load cart from URL parameters (if coming from services page)
  loadCartFromURL()

  // Render cart
  renderCart()

  // Initialize event listeners
  initEventListeners()
})

// Load cart from URL parameters
function loadCartFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  const serviceId = urlParams.get("add")

  if (serviceId && servicesData[serviceId]) {
    addToCart(serviceId)
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname)
  }
}

// Add service to cart
function addToCart(serviceId) {
  const service = servicesData[serviceId]
  if (!service) return

  // Check if service already in cart
  const existingItem = cart.find((item) => item.id === serviceId)
  if (existingItem) {
    showNotification("Service sudah ada di keranjang!", "warning")
    return
  }

  cart.push({
    id: serviceId,
    ...service,
    addedAt: new Date().toISOString(),
  })

  saveCart()
  renderCart()
  showNotification("Service berhasil ditambahkan ke keranjang!", "success")
}

// Remove service from cart
function removeFromCart(serviceId) {
  cart = cart.filter((item) => item.id !== serviceId)
  saveCart()
  renderCart()
  showNotification("Service dihapus dari keranjang", "info")
}

// Clear entire cart
function clearCartItems() {
  if (cart.length === 0) return

  if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
    cart = []
    appliedPromo = null
    saveCart()
    renderCart()
    showNotification("Keranjang berhasil dikosongkan", "info")
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("salonCart", JSON.stringify(cart))
}

// Calculate totals
function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0)
  const totalDur = cart.reduce((sum, item) => sum + item.duration, 0)

  let discount = 0
  if (appliedPromo) {
    if (appliedPromo.type === "percentage") {
      discount = (subtotal * appliedPromo.discount) / 100
    } else {
      discount = appliedPromo.discount
    }
  }

  const total = Math.max(0, subtotal - discount)

  return {
    subtotal,
    discount,
    total,
    totalDuration: totalDur,
    serviceCount: cart.length,
  }
}

// Render cart
function renderCart() {
  const totals = calculateTotals()

  // Update cart count
  cartCount.textContent = cart.length

  if (cart.length === 0) {
    // Show empty cart
    emptyCart.style.display = "block"
    cartItems.style.display = "none"
    cartSummary.style.display = "none"
    continueShopping.style.display = "none"
  } else {
    // Show cart items
    emptyCart.style.display = "none"
    cartItems.style.display = "block"
    cartSummary.style.display = "block"
    continueShopping.style.display = "block"

    // Render cart items
    cartItems.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item" data-id="${item.id}">
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="item-details">
          <h3 class="item-title">${item.name}</h3>
          <div class="item-meta">
            <span><i class="far fa-clock"></i> ${item.duration} menit</span>
            <span><i class="fas fa-tag"></i> ${item.category}</span>
          </div>
          <p class="item-description">${item.description}</p>
          <div class="item-actions">
            <span class="item-price">Rp ${item.price.toLocaleString("id-ID")}</span>
            <button class="remove-item" onclick="removeFromCart('${item.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `,
      )
      .join("")

    // Update summary
    totalServices.textContent = totals.serviceCount
    totalDuration.textContent = `${totals.totalDuration} menit`
    totalPrice.textContent = `Rp ${totals.total.toLocaleString("id-ID")}`

    // Show discount if applied
    if (appliedPromo) {
      const discountRow = document.querySelector(".discount-row")
      if (!discountRow) {
        const summaryDetails = document.querySelector(".summary-details")
        const totalRow = document.querySelector(".total-row")

        const discountHTML = `
          <div class="summary-row discount-row">
            <span>Diskon (${appliedPromo.description}):</span>
            <span style="color: #4caf50;">-$${totals.discount.toFixed(2)}</span>
          </div>
        `
        totalRow.insertAdjacentHTML("beforebegin", discountHTML)
      }
    }
  }
}

// Apply promo code
function applyPromoCode() {
  const code = promoCode.value.trim().toUpperCase()

  if (!code) {
    showPromoMessage("Masukkan kode promo", "error")
    return
  }

  if (promoCodes[code]) {
    appliedPromo = promoCodes[code]
    showPromoMessage(`Kode promo berhasil diterapkan! ${appliedPromo.description}`, "success")
    promoCode.value = ""
    renderCart()
  } else {
    showPromoMessage("Kode promo tidak valid", "error")
  }
}

// Show promo message
function showPromoMessage(message, type) {
  promoMessage.textContent = message
  promoMessage.className = `promo-message ${type}`

  setTimeout(() => {
    promoMessage.textContent = ""
    promoMessage.className = "promo-message"
  }, 3000)
}

// Proceed to booking
function proceedToBooking() {
  if (cart.length === 0) {
    showNotification("Keranjang kosong!", "error")
    return
  }

  if (!bookingDate.value || !bookingTime.value) {
    showNotification("Pilih tanggal dan waktu appointment!", "error")
    return
  }

  // Show booking modal
  showBookingModal()
}

// Show booking modal
function showBookingModal() {
  const totals = calculateTotals()

  // Populate booking details
  bookingDetails.innerHTML = `
    <div class="booking-detail-item">
      <span><strong>Tanggal:</strong></span>
      <span>${formatDate(bookingDate.value)}</span>
    </div>
    <div class="booking-detail-item">
      <span><strong>Waktu:</strong></span>
      <span>${bookingTime.value}</span>
    </div>
    <div class="booking-detail-item">
      <span><strong>Total Durasi:</strong></span>
      <span>${totals.totalDuration} menit</span>
    </div>
    <div class="booking-detail-item">
      <span><strong>Layanan:</strong></span>
      <span>${cart.map((item) => item.name).join(", ")}</span>
    </div>
    <div class="booking-detail-item">
      <span><strong>Total Harga:</strong></span>
      <span style="color: #e91e63; font-weight: 600;">$${totals.total}</span>
    </div>
    ${
      specialRequests.value
        ? `
    <div class="booking-detail-item">
      <span><strong>Catatan:</strong></span>
      <span>${specialRequests.value}</span>
    </div>
    `
        : ""
    }
  `

  bookingModal.style.display = "block"
}

// Confirm booking - Updated to redirect to payment page
function confirmBookingSubmission() {
  const customerName = document.getElementById("customerName").value.trim()
  const customerPhone = document.getElementById("customerPhone").value.trim()
  const customerEmail = document.getElementById("customerEmail").value.trim()

  if (!customerName || !customerPhone) {
    showNotification("Nama dan nomor telepon wajib diisi!", "error")
    return
  }

  // Generate booking reference
  const reference = "GG" + Date.now().toString().slice(-6)

  // Prepare booking data for payment page
  const bookingData = {
    reference,
    customer: {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
    },
    services: cart,
    date: bookingDate.value,
    time: bookingTime.value,
    specialRequests: specialRequests.value,
    total: calculateTotals().total,
    appliedPromo,
    createdAt: new Date().toISOString(),
    customerName: customerName,
    customerPhone: customerPhone,
    customerEmail: customerEmail,
  }

  // Store booking data for payment page
  localStorage.setItem("currentBooking", JSON.stringify(bookingData))

  // Redirect to payment page
  window.location.href = "../payment/index.html"
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
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
    <span>${message}</span>
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
  `

  document.body.appendChild(notification)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
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

  // Cart actions
  if (proceedBooking) {
    proceedBooking.addEventListener("click", proceedToBooking)
  }

  if (clearCart) {
    clearCart.addEventListener("click", clearCartItems)
  }

  // Promo code
  if (applyPromo) {
    applyPromo.addEventListener("click", applyPromoCode)
  }

  if (promoCode) {
    promoCode.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        applyPromoCode()
      }
    })
  }

  // Modal events
  if (closeBookingModal) {
    closeBookingModal.addEventListener("click", () => {
      bookingModal.style.display = "none"
    })
  }

  if (cancelBooking) {
    cancelBooking.addEventListener("click", () => {
      bookingModal.style.display = "none"
    })
  }

  if (confirmBooking) {
    confirmBooking.addEventListener("click", confirmBookingSubmission)
  }

  if (closeSuccessModal) {
    closeSuccessModal.addEventListener("click", () => {
      successModal.style.display = "none"
    })
  }

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === bookingModal) {
      bookingModal.style.display = "none"
    }
    if (e.target === successModal) {
      successModal.style.display = "none"
    }
  })
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

// Expose functions globally for onclick handlers
window.removeFromCart = removeFromCart
window.addToCart = addToCart
