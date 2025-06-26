// Products Management JavaScript
class ProductsManager {
  constructor() {
    this.products = []
    this.currentPage = 1
    this.productsPerPage = 6
    this.init()
  }

  init() {
    this.loadSampleData()
    this.setupEventListeners()
    this.renderProducts()
  }

  loadSampleData() {
    this.products = [
      {
        id: "P001",
        name: "Deep Cleansing Facial",
        category: "facial",
        price: 150000,
        duration: 90,
        status: "active",
        image: "../image/faciall.jpg",
        description: "Perawatan wajah mendalam untuk membersihkan pori-pori dan mengangkat sel kulit mati.",
        benefits:
          "Membersihkan pori-pori secara mendalam\nMengangkat sel kulit mati\nMeningkatkan sirkulasi darah\nMembuat kulit lebih cerah dan halus",
        rating: 4.8,
        featured: true,
      },
      {
        id: "P002",
        name: "Hair Spa Treatment",
        category: "hair",
        price: 200000,
        duration: 120,
        status: "active",
        image: "../image/hairspa.jpg",
        description: "Perawatan rambut lengkap dengan masker nutrisi dan pijat kepala yang menenangkan.",
        benefits:
          "Menutrisi rambut dari akar hingga ujung\nMengatasi rambut kering dan rusak\nMerelaksasi otot kepala\nMembuat rambut lebih berkilau",
        rating: 4.9,
        featured: false,
      },
      {
        id: "P003",
        name: "Relaxing Body Massage",
        category: "massage",
        price: 180000,
        duration: 60,
        status: "active",
        image: "../image/spamassage.jpg",
        description: "Pijat tubuh dengan teknik relaksasi untuk menghilangkan stress dan ketegangan otot.",
        benefits:
          "Menghilangkan stress dan ketegangan\nMeningkatkan sirkulasi darah\nMerelaksasi otot-otot tubuh\nMeningkatkan kualitas tidur",
        rating: 4.7,
        featured: false,
      },
      {
        id: "P004",
        name: "Gel Manicure & Pedicure",
        category: "nail",
        price: 120000,
        duration: 75,
        status: "active",
        image: "../image/gelpedicure.jpg",
        description: "Perawatan kuku tangan dan kaki lengkap dengan gel polish yang tahan lama.",
        benefits:
          "Kuku terlihat rapi dan indah\nGel polish tahan hingga 2 minggu\nKulit tangan dan kaki lebih halus\nDesain nail art sesuai keinginan",
        rating: 4.6,
        featured: false,
      },
      {
        id: "P005",
        name: "Bridal Makeup Package",
        category: "makeup",
        price: 500000,
        duration: 180,
        status: "active",
        image: "../image/bridal.jpg",
        description: "Paket makeup pengantin lengkap dengan trial makeup dan touch up di hari H.",
        benefits:
          "Konsultasi dan trial makeup\nMakeup tahan hingga 12 jam\nTouch up gratis di hari H\nFoto dokumentasi makeup",
        rating: 5.0,
        featured: true,
      },
      {
        id: "P006",
        name: "Anti-Aging Facial",
        category: "facial",
        price: 250000,
        duration: 105,
        status: "active",
        image: "../image/antiaging.jpg",
        description: "Perawatan wajah khusus anti-aging dengan serum dan masker premium untuk kulit mature.",
        benefits:
          "Mengurangi tanda-tanda penuaan\nMengencangkan kulit wajah\nMeningkatkan elastisitas kulit\nMembuat kulit tampak lebih muda",
        rating: 4.8,
        featured: false,
      },
      {
        id: "P007",
        name: "Hair Coloring Service",
        category: "hair",
        price: 300000,
        duration: 150,
        status: "inactive",
        image: "../image/haircolor.jpg",
        description: "Layanan pewarnaan rambut profesional dengan produk berkualitas tinggi dan aman.",
        benefits:
          "Warna rambut sesuai keinginan\nProduk pewarna berkualitas tinggi\nTreatment sebelum dan sesudah\nKonsultasi warna gratis",
        rating: 4.5,
        featured: false,
      },
      {
        id: "P008",
        name: "Hot Stone Massage",
        category: "massage",
        price: 220000,
        duration: 90,
        status: "active",
        image: "../image/hotstone.jpg",
        description: "Pijat dengan batu panas vulkanik untuk relaksasi mendalam dan detoksifikasi tubuh.",
        benefits:
          "Detoksifikasi tubuh alami\nMeningkatkan metabolisme\nMenghilangkan racun dalam tubuh\nRelaksasi mendalam",
        rating: 4.9,
        featured: false,
      },
    ]
  }

  setupEventListeners() {
    // Modal controls
    const addProductBtn = document.getElementById("addProductBtn")
    const productModal = document.getElementById("productModal")
    const closeProductModal = document.getElementById("closeProductModal")
    const cancelProductForm = document.getElementById("cancelProductForm")
    const saveProduct = document.getElementById("saveProduct")

    // Search and filters
    const productSearch = document.getElementById("productSearch")
    const productCategoryFilter = document.getElementById("productCategoryFilter")
    const productStatusFilter = document.getElementById("productStatusFilter")

    if (addProductBtn) {
      addProductBtn.addEventListener("click", () => this.openProductModal())
    }

    if (closeProductModal) {
      closeProductModal.addEventListener("click", () => this.closeModal())
    }

    if (cancelProductForm) {
      cancelProductForm.addEventListener("click", () => this.closeModal())
    }

    if (saveProduct) {
      saveProduct.addEventListener("click", () => this.saveProduct())
    }

    if (productSearch) {
      productSearch.addEventListener(
        "input",
        window.adminApp.debounce(() => {
          this.currentPage = 1
          this.renderProducts()
        }, 300),
      )
    }

    if (productCategoryFilter) {
      productCategoryFilter.addEventListener("change", () => {
        this.currentPage = 1
        this.renderProducts()
      })
    }

    if (productStatusFilter) {
      productStatusFilter.addEventListener("change", () => {
        this.currentPage = 1
        this.renderProducts()
      })
    }

    // Close modals when clicking outside
    if (productModal) {
      productModal.addEventListener("click", (e) => {
        if (e.target === productModal) {
          this.closeModal()
        }
      })
    }

    // Pagination
    const prevBtn = document.getElementById("productPrevPage")
    const nextBtn = document.getElementById("productNextPage")

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.previousPage())
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextPage())
    }
  }

  getFilteredProducts() {
    const searchTerm = document.getElementById("productSearch")?.value.toLowerCase() || ""
    const categoryFilter = document.getElementById("productCategoryFilter")?.value || ""
    const statusFilter = document.getElementById("productStatusFilter")?.value || ""

    return this.products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)

      const matchesCategory = !categoryFilter || product.category === categoryFilter
      const matchesStatus = !statusFilter || product.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }

  renderProducts() {
    const grid = document.getElementById("productsGrid")
    if (!grid) return

    const filteredProducts = this.getFilteredProducts()

    // Pagination
    const startIndex = (this.currentPage - 1) * this.productsPerPage
    const endIndex = startIndex + this.productsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    if (paginatedProducts.length === 0) {
      grid.innerHTML = `
        <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--muted);">
          <i class="fas fa-box" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
          <h3>Tidak ada produk ditemukan</h3>
          <p>Coba ubah filter pencarian atau tambah produk baru.</p>
        </div>
      `
    } else {
      grid.innerHTML = paginatedProducts.map((product) => this.createProductCard(product)).join("")
    }

    this.updatePagination(filteredProducts.length)
  }

  createProductCard(product) {
    const formattedPrice = window.formatCurrency(product.price)
    const benefitsList = product.benefits
      .split("\n")
      .slice(0, 3)
      .map((benefit) => `<li>${benefit}</li>`)
      .join("")
    const stars = "★".repeat(Math.floor(product.rating)) + (product.rating % 1 ? "☆" : "")

    return `
      <div class="product-card ${product.featured ? "featured" : ""}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" 
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
               onload="this.nextElementSibling.style.display='none';">
          <div class="image-placeholder" style="display: none;">
            <i class="fas fa-spa"></i>
            <span>${product.name}</span>
          </div>
          <span class="product-status-badge status ${product.status}">${product.status}</span>
          <div class="product-price-badge">${formattedPrice}</div>
        </div>
        <div class="product-content">
          <div class="product-header">
            <span class="product-category ${product.category}">${this.getCategoryName(product.category)}</span>
            <h3 class="product-title">${product.name}</h3>
          </div>
          <p class="product-description">${product.description}</p>
          <div class="product-meta">
            <div class="product-duration">
              <i class="fas fa-clock"></i>
              <span>${product.duration} menit</span>
            </div>
            <div class="product-rating">
              <span class="stars">${stars}</span>
              <span>${product.rating}</span>
            </div>
          </div>
          <div class="product-benefits">
            <h4>Manfaat:</h4>
            <ul>${benefitsList}</ul>
          </div>
          <div class="product-actions">
            <button class="action-btn view-btn" onclick="productsManager.viewProduct('${product.id}')" title="Lihat Detail">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit-btn" onclick="productsManager.editProduct('${product.id}')" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="productsManager.deleteProduct('${product.id}')" title="Hapus">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `
  }

  getCategoryName(category) {
    const categoryNames = {
      facial: "Facial Treatment",
      hair: "Hair Care",
      massage: "Massage",
      nail: "Nail Care",
      makeup: "Makeup Service",
    }
    return categoryNames[category] || category
  }

  updatePagination(totalItems) {
    const startRange = document.getElementById("productStartRange")
    const endRange = document.getElementById("productEndRange")
    const total = document.getElementById("productTotal")
    const prevBtn = document.getElementById("productPrevPage")
    const nextBtn = document.getElementById("productNextPage")

    if (startRange && endRange && total) {
      const startIndex = totalItems > 0 ? (this.currentPage - 1) * this.productsPerPage + 1 : 0
      const endIndex = Math.min(this.currentPage * this.productsPerPage, totalItems)

      startRange.textContent = startIndex
      endRange.textContent = endIndex
      total.textContent = totalItems
    }

    const totalPages = Math.ceil(totalItems / this.productsPerPage)

    if (prevBtn) {
      prevBtn.disabled = this.currentPage <= 1
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentPage >= totalPages
    }

    this.updatePageNumbers(totalPages)
  }

  updatePageNumbers(totalPages) {
    const pageNumbers = document.getElementById("productPageNumbers")
    if (!pageNumbers) return

    let pagesHTML = ""
    const startPage = Math.max(1, this.currentPage - 2)
    const endPage = Math.min(totalPages, this.currentPage + 2)

    for (let i = startPage; i <= endPage; i++) {
      pagesHTML += `
        <button class="btn btn-outline ${i === this.currentPage ? "active" : ""}" 
                onclick="productsManager.goToPage(${i})">${i}</button>
      `
    }

    pageNumbers.innerHTML = pagesHTML
  }

  goToPage(page) {
    this.currentPage = page
    this.renderProducts()
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.renderProducts()
    }
  }

  nextPage() {
    const filteredProducts = this.getFilteredProducts()
    const totalPages = Math.ceil(filteredProducts.length / this.productsPerPage)
    if (this.currentPage < totalPages) {
      this.currentPage++
      this.renderProducts()
    }
  }

  openProductModal(productId = null) {
    const modal = document.getElementById("productModal")
    const title = document.getElementById("productModalTitle")
    const form = document.getElementById("productForm")

    if (productId) {
      const product = this.products.find((p) => p.id === productId)
      if (!product) return

      title.textContent = "Edit Produk"

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
      title.textContent = "Tambah Produk Baru"
      form.reset()
      document.getElementById("productId").value = ""
    }

    modal.classList.add("show")
  }

  closeModal() {
    const modal = document.getElementById("productModal")
    modal.classList.remove("show")
  }

  saveProduct() {
    const form = document.getElementById("productForm")
    const formData = new FormData(form)
    const productId = document.getElementById("productId").value

    // Validation
    if (!formData.get("name") || !formData.get("category") || !formData.get("price") || !formData.get("description")) {
      window.showNotification("Mohon lengkapi semua field yang wajib diisi!", "error")
      return
    }

    const productData = {
      id: productId || window.generateId("P"),
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number.parseInt(formData.get("price")),
      duration: Number.parseInt(formData.get("duration")) || 60,
      status: formData.get("status"),
      image:
        formData.get("image") ||
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=250&fit=crop&crop=center",
      description: formData.get("description"),
      benefits: formData.get("benefits") || "",
      rating: productId ? this.products.find((p) => p.id === productId).rating : 4.5,
      featured: productId ? this.products.find((p) => p.id === productId).featured : false,
    }

    if (productId) {
      // Update existing product
      const index = this.products.findIndex((p) => p.id === productId)
      this.products[index] = productData
      window.showNotification("Produk berhasil diperbarui!", "success")
    } else {
      // Add new product
      this.products.unshift(productData)
      window.showNotification("Produk baru berhasil ditambahkan!", "success")
    }

    this.closeModal()
    this.renderProducts()
  }

  viewProduct(productId) {
    const product = this.products.find((p) => p.id === productId)
    if (!product) return

    const formattedPrice = window.formatCurrency(product.price)
    const benefitsList = product.benefits
      .split("\n")
      .map((benefit) => `<li>${benefit}</li>`)
      .join("")
    const stars = "★".repeat(Math.floor(product.rating)) + (product.rating % 1 ? "☆" : "")

    const productDetails = `
      <div class="product-detail-modal">
        <div class="product-detail-header">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: var(--border-radius); margin-bottom: 1rem;">
          <div class="product-detail-meta" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="status ${product.category}">${this.getCategoryName(product.category)}</span>
            <span class="status ${product.status}">${product.status}</span>
          </div>
          <h2 style="margin-bottom: 1rem; color: var(--foreground);">${product.name}</h2>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div class="product-price" style="font-size: 1.5rem; font-weight: 700; color: var(--pink);">${formattedPrice}</div>
            <div style="display: flex; align-items: center; gap: 1rem; color: var(--muted); font-size: 0.9rem;">
              <span><i class="fas fa-clock"></i> ${product.duration} menit</span>
              <span><i class="fas fa-star" style="color: #ffc107;"></i> ${product.rating}</span>
            </div>
          </div>
        </div>
        <div class="product-detail-content">
          <div style="margin-bottom: 1.5rem;">
            <strong>Deskripsi:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.6;">${product.description}</p>
          </div>
          <div>
            <strong>Manfaat:</strong>
            <ul style="margin-top: 0.5rem; line-height: 1.6;">${benefitsList}</ul>
          </div>
        </div>
      </div>
    `

    this.showCustomModal("Detail Produk", productDetails)
  }

  editProduct(productId) {
    this.openProductModal(productId)
  }

  deleteProduct(productId) {
    const product = this.products.find((p) => p.id === productId)
    if (!product) return

    this.showDeleteConfirmation(`Apakah Anda yakin ingin menghapus produk "${product.name}"?`, () => {
      this.products = this.products.filter((p) => p.id !== productId)
      this.renderProducts()
      window.showNotification("Produk berhasil dihapus!", "success")
    })
  }

  showDeleteConfirmation(message, onConfirm) {
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

  showCustomModal(title, content) {
    const modal = document.createElement("div")
    modal.className = "modal show"
    modal.innerHTML = `
      <div class="modal-content large-modal">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="close-btn" onclick="this.closest('.modal').remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
          ${content}
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Tutup</button>
        </div>
      </div>
    `

    document.body.appendChild(modal)

    // Close when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove()
      }
    })
  }
}

// Initialize products manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.productsManager = new ProductsManager()
})
