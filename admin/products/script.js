// Product Management JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  checkAuth()

  // DOM Elements
  const sidebar = document.getElementById("sidebar")
  const menuToggle = document.getElementById("menuToggle")
  const sidebarToggle = document.getElementById("sidebarToggle")
  const userName = document.getElementById("userName")
  const logoutBtn = document.getElementById("logoutBtn")
  const logoutModal = document.getElementById("logoutModal")
  const cancelLogout = document.getElementById("cancelLogout")
  const confirmLogout = document.getElementById("confirmLogout")

  // Product specific elements
  const addProductBtn = document.getElementById("addProductBtn")
  const productModal = document.getElementById("productModal")
  const closeProductModal = document.getElementById("closeProductModal")
  const cancelProductForm = document.getElementById("cancelProductForm")
  const saveProduct = document.getElementById("saveProduct")
  const productForm = document.getElementById("productForm")
  const productSearch = document.getElementById("productSearch")
  const productCategoryFilter = document.getElementById("productCategoryFilter")
  const deleteModal = document.getElementById("deleteModal")

  // Sample Products Data
  let products = [
    {
      id: "P001",
      name: "Classic Facial Treatment",
      category: "facial",
      price: 500000,
      duration: 60,
      status: "active",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=200&fit=crop&crop=center",
      description:
        "Perawatan wajah klasik yang menyegarkan dengan pembersihan mendalam, eksfoliasi, dan masker sesuai jenis kulit.",
      benefits: "Membersihkan pori-pori, Mengangkat sel kulit mati, Melembabkan kulit, Mencerahkan wajah",
    },
    {
      id: "P002",
      name: "Anti-Aging Facial",
      category: "facial",
      price: 750000,
      duration: 90,
      status: "active",
      image: "https://i.pinimg.com/736x/86/97/a5/8697a593d327b4a2c01f1d77ec378152.jpg",
      description:
        "Perawatan anti-aging dengan teknologi terdepan untuk mengurangi tanda-tanda penuaan dan meningkatkan elastisitas kulit.",
      benefits: "Mengurangi kerutan, Mengencangkan kulit, Meningkatkan kolagen, Mencerahkan flek hitam",
    },
    {
      id: "P003",
      name: "Hair Cut & Styling",
      category: "hair",
      price: 300000,
      duration: 45,
      status: "active",
      image: "https://i.pinimg.com/736x/80/2c/9d/802c9d211bfb8e95903b600bef380308.jpg",
      description:
        "Potong rambut profesional dengan konsultasi gaya yang sesuai dengan bentuk wajah dan gaya hidup Anda.",
      benefits: "Konsultasi gratis, Styling sesuai wajah, Produk premium, Perawatan rambut",
    },
    {
      id: "P004",
      name: "Hair Coloring Premium",
      category: "hair",
      price: 800000,
      duration: 120,
      status: "active",
      image: "https://i.pinimg.com/736x/d6/b6/dc/d6b6dc74c8b21b6b1e7a8fd3157c040b.jpg",
      description:
        "Pewarnaan rambut dengan produk premium yang aman dan tahan lama. Tersedia berbagai pilihan warna trendy.",
      benefits: "Warna tahan lama, Produk berkualitas, Tidak merusak rambut, Hasil natural",
    },
    {
      id: "P005",
      name: "Manicure & Pedicure",
      category: "nail",
      price: 400000,
      duration: 60,
      status: "active",
      image: "https://i.pinimg.com/736x/1b/d4/49/1bd449cf9847fada0ee8f885f19e6df5.jpg",
      description: "Perawatan kuku tangan dan kaki lengkap dengan nail art sesuai keinginan Anda.",
      benefits: "Kuku sehat, Nail art custom, Produk berkualitas, Relaksasi",
    },
    {
      id: "P006",
      name: "Relaxation Massage",
      category: "massage",
      price: 600000,
      duration: 90,
      status: "active",
      image: "https://i.pinimg.com/736x/0f/fd/7a/0ffd7a0f026f7e81ac0b61af0c682f60.jpg",
      description: "Pijat relaksasi untuk menghilangkan stress dan ketegangan otot dengan teknik profesional.",
      benefits: "Mengurangi stress, Relaksasi otot, Meningkatkan sirkulasi, Tidur lebih nyenyak",
    },
  ]

  // Pagination state
  const currentProductPage = 1
  const productsPerPage = 8

  // Initialize
  init()

  function init() {
    // Set user name
    const adminUser = JSON.parse(localStorage.getItem("adminUser")) || { name: "Admin" }
    userName.textContent = adminUser.name

    // Setup event listeners
    setupEventListeners()

    // Initialize data
    renderProducts()
  }

  function checkAuth() {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn !== "true") {
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

    // Logout functionality
    logoutBtn.addEventListener("click", () => {
      logoutModal.classList.add("show")
    })

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

    // Product management
    addProductBtn.addEventListener("click", () => {
      openProductModal()
    })

    closeProductModal.addEventListener("click", () => {
      productModal.classList.remove("show")
    })

    cancelProductForm.addEventListener("click", () => {
      productModal.classList.remove("show")
    })

    saveProduct.addEventListener("click", () => {
      saveProductData()
    })

    // Search and filter
    productSearch.addEventListener("input", () => {
      renderProducts()
    })

    productCategoryFilter.addEventListener("change", () => {
      renderProducts()
    })

    // Close modal when clicking outside
    productModal.addEventListener("click", (e) => {
      if (e.target === productModal) {
        productModal.classList.remove("show")
      }
    })

    deleteModal.addEventListener("click", (e) => {
      if (e.target === deleteModal) {
        deleteModal.classList.remove("show")
      }
    })
  }

  // Product Management Functions
  function renderProducts() {
    const grid = document.getElementById("productsGrid")
    const searchTerm = productSearch.value.toLowerCase()
    const categoryFilter = productCategoryFilter.value

    const filteredProducts = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
      const matchesCategory = !categoryFilter || product.category === categoryFilter
      return matchesSearch && matchesCategory
    })

    // Pagination
    const startIndex = (currentProductPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    grid.innerHTML = paginatedProducts
      .map(
        (product) => `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" 
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
               onload="this.nextElementSibling.style.display='none';">
          <div class="image-placeholder" style="display: none; height: 200px; background: linear-gradient(135deg, var(--pink-light), var(--cream)); align-items: center; justify-content: center; flex-direction: column; color: var(--muted);">
            <i class="fas fa-image" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
            <span style="font-size: 0.9rem;">${product.name}</span>
          </div>
          <span class="product-status-badge status ${product.status}">${product.status}</span>
        </div>
        <div class="product-content">
          <div class="product-header">
            <div>
              <h3 class="product-title">${product.name}</h3>
              <p class="product-category">${product.category}</p>
            </div>
            <div class="product-price">Rp ${product.price.toLocaleString("id-ID")}</div>
          </div>
          <p class="product-description">${product.description}</p>
          <div class="product-meta">
            <span><i class="fas fa-clock"></i> ${product.duration} menit</span>
            <span><i class="fas fa-tag"></i> ${product.category}</span>
          </div>
          <div class="product-actions">
            <button class="action-btn edit-btn" onclick="editProduct('${product.id}')">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="deleteProduct('${product.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `,
      )
      .join("")

    // Update pagination info
    updateProductPagination(filteredProducts.length)
  }

  function updateProductPagination(totalItems) {
    const startRange = document.getElementById("productStartRange")
    const endRange = document.getElementById("productEndRange")
    const total = document.getElementById("productTotal")

    const startIndex = (currentProductPage - 1) * productsPerPage + 1
    const endIndex = Math.min(currentProductPage * productsPerPage, totalItems)

    startRange.textContent = totalItems > 0 ? startIndex : 0
    endRange.textContent = endIndex
    total.textContent = totalItems
  }

  function openProductModal(productId = null) {
    const modal = document.getElementById("productModal")
    const title = document.getElementById("productModalTitle")
    const form = document.getElementById("productForm")

    if (productId) {
      const product = products.find((p) => p.id === productId)
      title.textContent = "Edit Layanan"

      // Fill form with product data
      document.getElementById("productId").value = product.id
      document.getElementById("productName").value = product.name
      document.getElementById("productCategory").value = product.category
      document.getElementById("productPrice").value = product.price
      document.getElementById("productDuration").value = product.duration
      document.getElementById("productStatus").value = product.status
      document.getElementById("productImage").value = product.image
      document.getElementById("productDescription").value = product.description
      document.getElementById("productBenefits").value = product.benefits
    } else {
      title.textContent = "Tambah Layanan Baru"
      form.reset()
      document.getElementById("productId").value = ""
    }

    modal.classList.add("show")
  }

  function saveProductData() {
    const form = document.getElementById("productForm")
    const formData = new FormData(form)
    const productId = document.getElementById("productId").value

    const productData = {
      id: productId || generateId("P"),
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number.parseInt(formData.get("price")),
      duration: Number.parseInt(formData.get("duration")),
      status: formData.get("status"),
      image:
        formData.get("image") ||
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=200&fit=crop&crop=center",
      description: formData.get("description"),
      benefits: formData.get("benefits"),
    }

    if (productId) {
      // Update existing product
      const index = products.findIndex((p) => p.id === productId)
      products[index] = productData
      showNotification("Layanan berhasil diperbarui!", "success")
    } else {
      // Add new product
      products.push(productData)
      showNotification("Layanan baru berhasil ditambahkan!", "success")
    }

    document.getElementById("productModal").classList.remove("show")
    renderProducts()
  }

  function deleteProduct(productId) {
    showDeleteConfirmation("Apakah Anda yakin ingin menghapus layanan ini?", () => {
      products = products.filter((p) => p.id !== productId)
      renderProducts()
      showNotification("Layanan berhasil dihapus!", "success")
    })
  }

  function showDeleteConfirmation(message, onConfirm) {
    const modal = document.getElementById("deleteModal")
    const messageEl = document.getElementById("deleteMessage")
    const confirmBtn = document.getElementById("confirmDelete")
    const cancelBtn = document.getElementById("cancelDelete")

    messageEl.textContent = message
    modal.classList.add("show")

    // Remove existing listeners
    const newConfirmBtn = confirmBtn.cloneNode(true)
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn)

    const newCancelBtn = cancelBtn.cloneNode(true)
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn)

    // Add new listeners
    newConfirmBtn.addEventListener("click", () => {
      onConfirm()
      modal.classList.remove("show")
    })

    newCancelBtn.addEventListener("click", () => {
      modal.classList.remove("show")
    })
  }

  // Utility Functions
  function generateId(prefix) {
    const timestamp = Date.now().toString().slice(-6)
    return `${prefix}${timestamp}`
  }

  function logout() {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("adminUser")
    showNotification("Logout berhasil! Mengalihkan ke halaman login...", "success")
    setTimeout(() => {
      window.location.href = "../index.html"
    }, 1500)
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
      <span>${message}</span>
    `

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

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  // Make functions globally available
  window.editProduct = (productId) => openProductModal(productId)
  window.deleteProduct = deleteProduct

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
