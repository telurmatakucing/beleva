// Articles Management JavaScript
class ArticlesManager {
  constructor() {
    this.articles = []
    this.currentPage = 1
    this.articlesPerPage = 6
    this.init()
  }

  init() {
    this.loadSampleData()
    this.setupEventListeners()
    this.renderArticles()
  }
loadSampleData() {
  this.articles = [
    {
      id: "A001",
      title: "10 Skincare Tips for Glowing Skin",
      category: "skincare",
      author: "Dr. Sarah Beauty",
      status: "published",
      image: "/image/skincare.jpg", // Path lokal
      excerpt:
        "Dapatkan kulit glowing dengan 10 tips skincare yang mudah diterapkan sehari-hari. Mulai dari pembersihan hingga pelembab yang tepat.",
      content:
        "Kulit glowing adalah impian setiap orang. Berikut adalah 10 tips skincare yang dapat membantu Anda mendapatkan kulit yang sehat dan bercahaya...",
      tags: ["skincare", "tips", "glowing", "beauty"],
      publishDate: "2024-01-15",
      readTime: "5 menit",
    },
    {
      id: "A002",
      title: "Summer Hair Care Guide",
      category: "haircare",
      author: "Lisa Hair Expert",
      status: "published",
      image: "/image/haircare.jpg", // Path lokal
      excerpt:
        "Lindungi rambut Anda dari kerusakan musim panas dengan panduan perawatan rambut yang komprehensif ini.",
      content:
        "Musim panas dapat merusak rambut karena paparan sinar UV dan kelembaban tinggi. Berikut cara melindungi rambut Anda...",
      tags: ["haircare", "summer", "protection", "tips"],
      publishDate: "2024-01-12",
      readTime: "7 menit",
    },
    {
      id: "A003",
      title: "Makeup Trends 2024",
      category: "makeup",
      author: "Anna Makeup Artist",
      status: "draft",
      image: "/image/makeuptrend.jpg", // Path lokal
      excerpt: "Temukan tren makeup terbaru untuk tahun 2024 yang akan membuat penampilan Anda semakin memukau.",
      content:
        "Tahun 2024 membawa tren makeup yang fresh dan natural. Mari kita explore tren-tren yang akan populer...",
      tags: ["makeup", "trends", "2024", "beauty"],
      publishDate: "2024-01-10",
      readTime: "6 menit",
    },
    {
      id: "A004",
      title: "Wellness and Self-Care Routine",
      category: "wellness",
      author: "Dr. Maria Wellness",
      status: "published",
      image: "/image/selfcare.jpg", // Path lokal
      excerpt: "Bangun rutinitas self-care yang efektif untuk kesehatan mental dan fisik yang optimal.",
      content:
        "Self-care bukan hanya tentang perawatan kecantikan, tetapi juga tentang kesehatan mental dan fisik secara keseluruhan...",
      tags: ["wellness", "selfcare", "mental health", "routine"],
      publishDate: "2024-01-08",
      readTime: "8 menit",
    },
    {
      id: "A005",
      title: "DIY Face Mask Recipes",
      category: "tips",
      author: "Beauty Guru",
      status: "published",
      image: "/image/diymask.jpg", // Path lokal
      excerpt: "Buat masker wajah alami di rumah dengan bahan-bahan yang mudah ditemukan di dapur Anda.",
      content: "Masker wajah alami dapat memberikan nutrisi yang dibutuhkan kulit tanpa bahan kimia berbahaya...",
      tags: ["diy", "face mask", "natural", "skincare"],
      publishDate: "2024-01-05",
      readTime: "4 menit",
    },
    {
      id: "A006",
      title: "Hair Coloring Safety Tips",
      category: "haircare",
      author: "Color Specialist",
      status: "archived",
      image: "/image/haircolorsafety.jpg", // Path lokal (menggunakan yang sama jika belum ada gambar lain)
      excerpt: "Panduan lengkap untuk mewarnai rambut dengan aman dan mendapatkan hasil yang optimal.",
      content:
        "Mewarnai rambut membutuhkan perhatian khusus untuk menghindari kerusakan. Berikut tips keamanan yang perlu diperhatikan...",
      tags: ["hair coloring", "safety", "tips", "professional"],
      publishDate: "2024-01-03",
      readTime: "6 menit",
    },
  ]
}

  setupEventListeners() {
    // Modal controls
    const addArticleBtn = document.getElementById("addArticleBtn")
    const articleModal = document.getElementById("articleModal")
    const closeArticleModal = document.getElementById("closeArticleModal")
    const cancelArticleForm = document.getElementById("cancelArticleForm")
    const saveArticle = document.getElementById("saveArticle")

    // Search and filters
    const articleSearch = document.getElementById("articleSearch")
    const articleCategoryFilter = document.getElementById("articleCategoryFilter")
    const articleStatusFilter = document.getElementById("articleStatusFilter")

    // Delete modal
    const deleteModal = document.getElementById("deleteModal")

    if (addArticleBtn) {
      addArticleBtn.addEventListener("click", () => this.openArticleModal())
    }

    if (closeArticleModal) {
      closeArticleModal.addEventListener("click", () => this.closeModal())
    }

    if (cancelArticleForm) {
      cancelArticleForm.addEventListener("click", () => this.closeModal())
    }

    if (saveArticle) {
      saveArticle.addEventListener("click", () => this.saveArticle())
    }

    if (articleSearch) {
      articleSearch.addEventListener(
        "input",
        window.adminApp.debounce(() => {
          this.currentPage = 1
          this.renderArticles()
        }, 300),
      )
    }

    if (articleCategoryFilter) {
      articleCategoryFilter.addEventListener("change", () => {
        this.currentPage = 1
        this.renderArticles()
      })
    }

    if (articleStatusFilter) {
      articleStatusFilter.addEventListener("change", () => {
        this.currentPage = 1
        this.renderArticles()
      })
    }

    // Close modals when clicking outside
    if (articleModal) {
      articleModal.addEventListener("click", (e) => {
        if (e.target === articleModal) {
          this.closeModal()
        }
      })
    }

    if (deleteModal) {
      deleteModal.addEventListener("click", (e) => {
        if (e.target === deleteModal) {
          deleteModal.classList.remove("show")
        }
      })
    }

    // Pagination
    const prevBtn = document.getElementById("articlePrevPage")
    const nextBtn = document.getElementById("articleNextPage")

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.previousPage())
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextPage())
    }
  }

  getFilteredArticles() {
    const searchTerm = document.getElementById("articleSearch")?.value.toLowerCase() || ""
    const categoryFilter = document.getElementById("articleCategoryFilter")?.value || ""
    const statusFilter = document.getElementById("articleStatusFilter")?.value || ""

    return this.articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.author.toLowerCase().includes(searchTerm) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm))

      const matchesCategory = !categoryFilter || article.category === categoryFilter
      const matchesStatus = !statusFilter || article.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }

  renderArticles() {
    const grid = document.getElementById("articlesGrid")
    if (!grid) return

    const filteredArticles = this.getFilteredArticles()

    // Pagination
    const startIndex = (this.currentPage - 1) * this.articlesPerPage
    const endIndex = startIndex + this.articlesPerPage
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

    if (paginatedArticles.length === 0) {
      grid.innerHTML = `
        <div class="no-articles" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--muted);">
          <i class="fas fa-newspaper" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
          <h3>Tidak ada artikel ditemukan</h3>
          <p>Coba ubah filter pencarian atau tambah artikel baru.</p>
        </div>
      `
    } else {
      grid.innerHTML = paginatedArticles.map((article) => this.createArticleCard(article)).join("")
    }

    this.updatePagination(filteredArticles.length)
  }

  createArticleCard(article) {
    const formattedDate = window.formatDate(article.publishDate)
    const tagsHTML = article.tags.map((tag) => `<span class="article-tag">${tag}</span>`).join("")

    return `
      <div class="article-card">
        <div class="article-image">
          <img src="${article.image}" alt="${article.title}" 
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
               onload="this.nextElementSibling.style.display='none';">
          <div class="image-placeholder" style="display: none;">
            <i class="fas fa-newspaper"></i>
            <span>${article.title}</span>
          </div>
          <span class="article-status-badge status ${article.status}">${article.status}</span>
        </div>
        <div class="article-content">
          <div class="article-header">
            <span class="article-category status ${article.category}">${article.category}</span>
            <h3 class="article-title">${article.title}</h3>
          </div>
          <p class="article-excerpt">${article.excerpt}</p>
          <div class="article-meta">
            <div class="article-author">
              <i class="fas fa-user"></i>
              <span>${article.author}</span>
            </div>
            <div class="article-date">
              <i class="fas fa-calendar"></i>
              <span>${formattedDate}</span>
            </div>
          </div>
          <div class="article-tags">
            ${tagsHTML}
          </div>
          <div class="article-actions">
            <button class="action-btn view-btn" onclick="articlesManager.viewArticle('${article.id}')" title="Lihat Detail">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit-btn" onclick="articlesManager.editArticle('${article.id}')" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="articlesManager.deleteArticle('${article.id}')" title="Hapus">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `
  }

  updatePagination(totalItems) {
    const startRange = document.getElementById("articleStartRange")
    const endRange = document.getElementById("articleEndRange")
    const total = document.getElementById("articleTotal")
    const prevBtn = document.getElementById("articlePrevPage")
    const nextBtn = document.getElementById("articleNextPage")

    if (startRange && endRange && total) {
      const startIndex = totalItems > 0 ? (this.currentPage - 1) * this.articlesPerPage + 1 : 0
      const endIndex = Math.min(this.currentPage * this.articlesPerPage, totalItems)

      startRange.textContent = startIndex
      endRange.textContent = endIndex
      total.textContent = totalItems
    }

    const totalPages = Math.ceil(totalItems / this.articlesPerPage)

    if (prevBtn) {
      prevBtn.disabled = this.currentPage <= 1
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentPage >= totalPages
    }

    this.updatePageNumbers(totalPages)
  }

  updatePageNumbers(totalPages) {
    const pageNumbers = document.getElementById("articlePageNumbers")
    if (!pageNumbers) return

    let pagesHTML = ""
    const startPage = Math.max(1, this.currentPage - 2)
    const endPage = Math.min(totalPages, this.currentPage + 2)

    for (let i = startPage; i <= endPage; i++) {
      pagesHTML += `
        <button class="btn btn-outline ${i === this.currentPage ? "active" : ""}" 
                onclick="articlesManager.goToPage(${i})">${i}</button>
      `
    }

    pageNumbers.innerHTML = pagesHTML
  }

  goToPage(page) {
    this.currentPage = page
    this.renderArticles()
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.renderArticles()
    }
  }

  nextPage() {
    const filteredArticles = this.getFilteredArticles()
    const totalPages = Math.ceil(filteredArticles.length / this.articlesPerPage)
    if (this.currentPage < totalPages) {
      this.currentPage++
      this.renderArticles()
    }
  }

  openArticleModal(articleId = null) {
    const modal = document.getElementById("articleModal")
    const title = document.getElementById("articleModalTitle")
    const form = document.getElementById("articleForm")

    if (articleId) {
      const article = this.articles.find((a) => a.id === articleId)
      if (!article) return

      title.textContent = "Edit Artikel"

      // Fill form with article data
      document.getElementById("articleId").value = article.id
      document.getElementById("articleTitle").value = article.title
      document.getElementById("articleCategory").value = article.category
      document.getElementById("articleAuthor").value = article.author
      document.getElementById("articleStatus").value = article.status
      document.getElementById("articleImage").value = article.image
      document.getElementById("articleTags").value = article.tags.join(", ")
      document.getElementById("articleExcerpt").value = article.excerpt
      document.getElementById("articleContent").value = article.content
    } else {
      title.textContent = "Tambah Artikel Baru"
      form.reset()
      document.getElementById("articleId").value = ""
      document.getElementById("articleAuthor").value = "Admin"
    }

    modal.classList.add("show")
  }

  closeModal() {
    const modal = document.getElementById("articleModal")
    modal.classList.remove("show")
  }

  saveArticle() {
    const form = document.getElementById("articleForm")
    const formData = new FormData(form)
    const articleId = document.getElementById("articleId").value

    // Validation
    if (!formData.get("title") || !formData.get("category") || !formData.get("excerpt") || !formData.get("content")) {
      window.showNotification("Mohon lengkapi semua field yang wajib diisi!", "error")
      return
    }

    const tags = formData.get("tags")
      ? formData
          .get("tags")
          .split(",")
          .map((tag) => tag.trim())
      : []

    const articleData = {
      id: articleId || window.generateId("A"),
      title: formData.get("title"),
      category: formData.get("category"),
      author: formData.get("author") || "Admin",
      status: formData.get("status"),
      image:
        formData.get("image") ||
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=250&fit=crop&crop=center",
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      tags: tags,
      publishDate: articleId
        ? this.articles.find((a) => a.id === articleId).publishDate
        : new Date().toISOString().split("T")[0],
      readTime: this.calculateReadTime(formData.get("content")),
    }

    if (articleId) {
      // Update existing article
      const index = this.articles.findIndex((a) => a.id === articleId)
      this.articles[index] = articleData
      window.showNotification("Artikel berhasil diperbarui!", "success")
    } else {
      // Add new article
      this.articles.unshift(articleData)
      window.showNotification("Artikel baru berhasil ditambahkan!", "success")
    }

    this.closeModal()
    this.renderArticles()
  }

  calculateReadTime(content) {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} menit`
  }

  viewArticle(articleId) {
    const article = this.articles.find((a) => a.id === articleId)
    if (!article) return

    const tagsHTML = article.tags.map((tag) => `<span class="article-tag">${tag}</span>`).join("")
    const formattedDate = window.formatDate(article.publishDate)

    const articleDetails = `
      <div class="article-detail-modal">
        <div class="article-detail-header">
          <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--border-radius); margin-bottom: 1rem;">
          <div class="article-detail-meta" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="status ${article.category}">${article.category}</span>
            <span class="status ${article.status}">${article.status}</span>
          </div>
          <h2 style="margin-bottom: 1rem; color: var(--foreground);">${article.title}</h2>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; color: var(--muted); font-size: 0.9rem;">
            <span><i class="fas fa-user"></i> ${article.author}</span>
            <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
            <span><i class="fas fa-clock"></i> ${article.readTime}</span>
          </div>
        </div>
        <div class="article-detail-content">
          <div style="margin-bottom: 1rem;">
            <strong>Ringkasan:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.6;">${article.excerpt}</p>
          </div>
          <div style="margin-bottom: 1rem;">
            <strong>Konten:</strong>
            <div style="margin-top: 0.5rem; line-height: 1.6; white-space: pre-wrap;">${article.content}</div>
          </div>
          <div>
            <strong>Tags:</strong>
            <div style="margin-top: 0.5rem;">${tagsHTML}</div>
          </div>
        </div>
      </div>
    `

    this.showCustomModal("Detail Artikel", articleDetails)
  }

  editArticle(articleId) {
    this.openArticleModal(articleId)
  }

  deleteArticle(articleId) {
    const article = this.articles.find((a) => a.id === articleId)
    if (!article) return

    this.showDeleteConfirmation(`Apakah Anda yakin ingin menghapus artikel "${article.title}"?`, () => {
      this.articles = this.articles.filter((a) => a.id !== articleId)
      this.renderArticles()
      window.showNotification("Artikel berhasil dihapus!", "success")
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

// Initialize articles manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.articlesManager = new ArticlesManager()
})
