// Services Page JavaScript with Cart Integration
document.addEventListener("DOMContentLoaded", () => {
  // Initialize cart count on page load
  updateCartCount()

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle")
  const mobileNav = document.getElementById("mobileNav")

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active")

      // Change icon based on menu state
      const icon = menuToggle.querySelector("i")
      if (mobileNav.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (mobileNav && mobileNav.classList.contains("active")) {
      if (!mobileNav.contains(event.target) && event.target !== menuToggle && !menuToggle.contains(event.target)) {
        mobileNav.classList.remove("active")

        // Reset icon
        const icon = menuToggle.querySelector("i")
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    }
  })

  // Sticky Header Shadow
  const header = document.querySelector(".header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)"
      } else {
        header.style.boxShadow = "none"
      }
    })
  }

  // Service Category Filtering
  const categoryButtons = document.querySelectorAll(".category-btn")
  const serviceItems = document.querySelectorAll(".service-item")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get category value
      const category = this.getAttribute("data-category")

      // Filter services
      serviceItems.forEach((item) => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Service Details Modal
  const modal = document.getElementById("serviceDetailsModal")
  const detailButtons = document.querySelectorAll(".service-details-btn")
  const closeModal = document.querySelector(".close-modal")

  // Service details data
  const serviceDetails = {
    "Classic Facial": {
      duration: "60 minutes",
      price: "$85",
      description:
        "A deep cleansing facial that includes exfoliation, extraction, and a customized mask to rejuvenate your skin.",
      includes: [
        "Skin analysis and consultation",
        "Deep cleansing and exfoliation",
        "Steam treatment",
        "Gentle extraction if needed",
        "Customized facial mask",
        "Moisturizer and SPF application",
      ],
      benefits: [
        "Removes impurities and unclogs pores",
        "Improves skin texture and tone",
        "Hydrates and nourishes the skin",
        "Promotes relaxation and reduces stress",
        "Helps prevent future breakouts",
      ],
    },
    "Anti-Aging Facial": {
      duration: "75 minutes",
      price: "$110",
      description:
        "Targets fine lines and wrinkles with specialized serums and techniques to promote collagen production.",
      includes: [
        "Skin analysis and consultation",
        "Deep cleansing and exfoliation",
        "Anti-aging serum application",
        "Collagen-boosting mask",
        "Face, neck, and décolleté massage",
        "Moisturizer and SPF application",
      ],
      benefits: [
        "Reduces the appearance of fine lines and wrinkles",
        "Stimulates collagen production",
        "Improves skin elasticity and firmness",
        "Brightens and evens skin tone",
        "Provides deep hydration",
      ],
    },
    "Haircut & Styling": {
      duration: "45 minutes",
      price: "$65",
      description: "Professional haircut and styling tailored to your face shape and personal style preferences.",
      includes: [
        "Consultation with stylist",
        "Shampoo and conditioning treatment",
        "Precision haircut",
        "Blow dry and styling",
        "Style recommendations and tips",
      ],
      benefits: [
        "Fresh, updated look",
        "Removes split ends and damaged hair",
        "Enhances your natural features",
        "Personalized style advice",
        "Easier daily maintenance",
      ],
    },
    "Hair Coloring": {
      duration: "120 minutes",
      price: "$120+",
      description: "Full hair coloring service using premium products for vibrant, long-lasting results.",
      includes: [
        "Color consultation",
        "Strand test if needed",
        "Premium color application",
        "Processing time",
        "Shampoo and conditioning treatment",
        "Blow dry and styling",
      ],
      benefits: [
        "Vibrant, long-lasting color",
        "Covers gray hair",
        "Enhances natural hair color",
        "Adds dimension and depth",
        "Includes hair-protecting treatments",
      ],
    },
    "Classic Manicure": {
      duration: "45 minutes",
      price: "$40",
      description: "Nail shaping, cuticle care, hand massage, and polish application for beautifully groomed hands.",
      includes: [
        "Nail shaping and filing",
        "Cuticle treatment and care",
        "Hand exfoliation",
        "Relaxing hand massage",
        "Polish application",
        "Quick-dry top coat",
      ],
      benefits: [
        "Neat, well-groomed nails",
        "Softens and conditions cuticles",
        "Exfoliates dry skin",
        "Moisturizes and nourishes hands",
        "Long-lasting polish finish",
      ],
    },
    "Luxury Pedicure": {
      duration: "60 minutes",
      price: "$55",
      description: "Indulgent foot treatment including exfoliation, massage, and polish for perfectly pampered feet.",
      includes: [
        "Foot soak in aromatic bath",
        "Nail shaping and filing",
        "Cuticle treatment",
        "Callus removal",
        "Foot exfoliation",
        "Relaxing foot and leg massage",
        "Polish application",
      ],
      benefits: [
        "Removes dead skin and calluses",
        "Improves circulation",
        "Relieves tension and foot pain",
        "Moisturizes dry skin",
        "Leaves feet soft and smooth",
      ],
    },
    "Special Occasion Makeup": {
      duration: "60 minutes",
      price: "$90",
      description: "Professional makeup application for weddings, parties, and special events using premium products.",
      includes: [
        "Skin preparation and primer",
        "Foundation matching and application",
        "Eye makeup with optional false lashes",
        "Contouring and highlighting",
        "Lip color application",
        "Setting spray for long-lasting wear",
      ],
      benefits: [
        "Professional, flawless finish",
        "Makeup tailored to your features",
        "Long-lasting, photo-ready results",
        "Premium products used",
        "Enhances natural beauty",
      ],
    },
    "Relaxation Massage": {
      duration: "60 minutes",
      price: "$95",
      description: "Gentle massage techniques to promote relaxation, reduce stress, and improve overall wellbeing.",
      includes: [
        "Consultation to address concerns",
        "Aromatherapy options",
        "Gentle to medium pressure techniques",
        "Focus on areas of tension",
        "Scalp massage",
        "Relaxing environment with soothing music",
      ],
      benefits: [
        "Reduces stress and anxiety",
        "Relieves muscle tension",
        "Improves circulation",
        "Promotes better sleep",
        "Enhances overall wellbeing",
      ],
    },
  }

  // Open modal with service details
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const serviceItem = this.closest(".service-item")
      const serviceTitle = serviceItem.querySelector("h3").textContent
      const serviceDuration = serviceItem.querySelector(".service-duration").textContent
      const servicePrice = serviceItem.querySelector(".service-price").textContent

      // Populate modal with service details
      document.getElementById("modalServiceTitle").textContent = serviceTitle
      document.getElementById("modalServiceDuration").innerHTML =
        `<i class="far fa-clock"></i> ${serviceDuration.replace('<i class="far fa-clock"></i> ', "")}`
      document.getElementById("modalServicePrice").innerHTML =
        `<i class="fas fa-tag"></i> ${servicePrice.replace('<i class="fas fa-tag"></i> ', "")}`

      // Get additional details from serviceDetails object
      if (serviceDetails[serviceTitle]) {
        document.getElementById("modalServiceDescription").textContent = serviceDetails[serviceTitle].description

        // Populate includes list
        const includesList = document.getElementById("modalServiceIncludes")
        includesList.innerHTML = ""
        serviceDetails[serviceTitle].includes.forEach((item) => {
          const li = document.createElement("li")
          li.textContent = item
          includesList.appendChild(li)
        })

        // Populate benefits list
        const benefitsList = document.getElementById("modalServiceBenefits")
        benefitsList.innerHTML = ""
        serviceDetails[serviceTitle].benefits.forEach((item) => {
          const li = document.createElement("li")
          li.textContent = item
          benefitsList.appendChild(li)
        })
      }

      // Show modal
      modal.style.display = "block"
      document.body.style.overflow = "hidden" // Prevent scrolling
    })
  })

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
      document.body.style.overflow = "auto" // Enable scrolling
    })
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto" // Enable scrolling
    }
  })

  // ===== CART INTEGRATION =====

  // Service data for cart (mapping service names to IDs and details)
  const servicesData = {
    "Classic Facial": {
      id: "classic-facial",
      name: "Classic Facial",
      price: 850000,
      duration: 60,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "A deep cleansing facial that includes exfoliation, extraction, and a customized mask to rejuvenate your skin.",
      category: "facial",
    },
    "Anti-Aging Facial": {
      id: "anti-aging-facial",
      name: "Anti-Aging Facial",
      price: 1100000,
      duration: 75,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Targets fine lines and wrinkles with specialized serums and techniques to promote collagen production.",
      category: "facial",
    },
    "Haircut & Styling": {
      id: "haircut-styling",
      name: "Haircut & Styling",
      price: 650000,
      duration: 45,
      image: "/placeholder.svg?height=200&width=300",
      description: "Professional haircut and styling tailored to your face shape and personal style preferences.",
      category: "hair",
    },
    "Hair Coloring": {
      id: "hair-coloring",
      name: "Hair Coloring",
      price: 1200000,
      duration: 120,
      image: "/placeholder.svg?height=200&width=300",
      description: "Full hair coloring service using premium products for vibrant, long-lasting results.",
      category: "hair",
    },
    "Classic Manicure": {
      id: "classic-manicure",
      name: "Classic Manicure",
      price: 400000,
      duration: 45,
      image: "/placeholder.svg?height=200&width=300",
      description: "Nail shaping, cuticle care, hand massage, and polish application for beautifully groomed hands.",
      category: "nail",
    },
    "Luxury Pedicure": {
      id: "luxury-pedicure",
      name: "Luxury Pedicure",
      price: 550000,
      duration: 60,
      image: "/placeholder.svg?height=200&width=300",
      description: "Indulgent foot treatment including exfoliation, massage, and polish for perfectly pampered feet.",
      category: "nail",
    },
    "Special Occasion Makeup": {
      id: "special-makeup",
      name: "Special Occasion Makeup",
      price: 900000,
      duration: 60,
      image: "/placeholder.svg?height=200&width=300",
      description: "Professional makeup application for weddings, parties, and special events using premium products.",
      category: "makeup",
    },
    "Relaxation Massage": {
      id: "relaxation-massage",
      name: "Relaxation Massage",
      price: 950000,
      duration: 60,
      image: "/placeholder.svg?height=200&width=300",
      description: "Gentle massage techniques to promote relaxation, reduce stress, and improve overall wellbeing.",
      category: "massage",
    },
  }

  // Add service to cart function
  function addServiceToCart(serviceName) {
    const service = servicesData[serviceName]
    if (!service) {
      console.error("Service not found:", serviceName)
      return
    }

    // Get existing cart
    const cart = JSON.parse(localStorage.getItem("salonCart")) || []

    // Check if service already in cart
    const existingItem = cart.find((item) => item.id === service.id)
    if (existingItem) {
      showNotification("Service sudah ada di keranjang!", "warning")
      return
    }

    // Add to cart
    cart.push({
      id: service.id,
      ...service,
      addedAt: new Date().toISOString(),
    })

    // Save to localStorage
    localStorage.setItem("salonCart", JSON.stringify(cart))

    // Update cart count
    updateCartCount()

    // Show success notification
    showNotification(`${service.name} berhasil ditambahkan ke keranjang!`, "success")
  }

  // Update cart count in header
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("salonCart")) || []
    const cartCountElement = document.getElementById("cartCount")
    if (cartCountElement) {
      cartCountElement.textContent = cart.length

      // Show/hide cart count badge
      if (cart.length > 0) {
        cartCountElement.style.display = "flex"
      } else {
        cartCountElement.style.display = "none"
      }
    }
  }

  // Show notification function
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
            max-width: 300px;
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

  // Book Service Button - Updated to add to cart
  const bookServiceBtns = document.querySelectorAll(".book-service-btn")

  bookServiceBtns.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      const serviceItem = this.closest(".service-item")
      const serviceName = serviceItem.querySelector("h3").textContent

      // Add to cart instead of showing alert
      addServiceToCart(serviceName)
    })
  })

  // Modal Book Button - Updated to add to cart
  const modalBookBtn = document.getElementById("modalBookBtn")

  if (modalBookBtn) {
    modalBookBtn.addEventListener("click", (e) => {
      e.preventDefault()

      const serviceName = document.getElementById("modalServiceTitle").textContent

      // Add to cart and close modal
      addServiceToCart(serviceName)

      // Close modal
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    })
  }

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value

      if (email) {
        // Simulate form submission
        const submitButton = this.querySelector("button")
        const originalText = submitButton.textContent

        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...'

        setTimeout(() => {
          submitButton.textContent = "Subscribed!"
          emailInput.value = ""

          setTimeout(() => {
            submitButton.textContent = originalText
          }, 2000)
        }, 1500)
      }
    })
  }

  // Add CSS animations for notifications
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

        .notification-close:hover {
            opacity: 0.7;
        }

        #cartCount {
            display: none;
        }
    `
  document.head.appendChild(style)
})
