// Users Management JavaScript
class UsersManager {
  constructor() {
    this.users = []
    this.currentPage = 1
    this.usersPerPage = 10
    this.selectedUsers = new Set()
    this.init()
  }

  init() {
    this.loadSampleData()
    this.setupEventListeners()
    this.renderUsers()
  }

  loadSampleData() {
    this.users = [
      {
        id: "U001",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+62 812-3456-7890",
        role: "customer",
        status: "active",
        gender: "female",
        birthDate: "1992-05-15",
        address: "Jl. Sudirman No. 123, Jakarta Selatan",
     
        joinDate: "2024-01-15",
        lastLogin: "2024-01-20T10:30:00",
        notes: "Customer VIP, sering booking treatment premium",
      },
      {
        id: "U002",
        name: "Maria Garcia",
        email: "maria.garcia@email.com",
        phone: "+62 813-9876-5432",
        role: "staff",
        status: "active",
        gender: "female",
        birthDate: "1988-08-22",
        address: "Jl. Thamrin No. 456, Jakarta Pusat",
       
        joinDate: "2023-06-10",
        lastLogin: "2024-01-20T09:15:00",
        notes: "Therapist berpengalaman, spesialis facial treatment",
      },
      {
        id: "U003",
        name: "Admin User",
        email: "admin@glowgrace.com",
        phone: "+62 811-1111-1111",
        role: "admin",
        status: "active",
        gender: "female",
        birthDate: "1985-12-01",
        address: "Jl. Kemang No. 789, Jakarta Selatan",
     
        joinDate: "2023-01-01",
        lastLogin: "2024-01-20T11:45:00",
        notes: "Administrator sistem",
      },
      {
        id: "U004",
        name: "Lisa Chen",
        email: "lisa.chen@email.com",
        phone: "+62 814-5555-6666",
        role: "customer",
        status: "active",
        gender: "female",
        birthDate: "1995-03-10",
        address: "Jl. Senopati No. 321, Jakarta Selatan",

        joinDate: "2024-01-10",
        lastLogin: "2024-01-19T14:20:00",
        notes: "Suka treatment hair care",
      },
      {
        id: "U005",
        name: "David Wilson",
        email: "david.wilson@email.com",
        phone: "+62 815-7777-8888",
        role: "staff",
        status: "inactive",
        gender: "male",
        birthDate: "1990-07-18",
        address: "Jl. Menteng No. 654, Jakarta Pusat",

        joinDate: "2023-09-15",
        lastLogin: "2024-01-15T16:30:00",
        notes: "Massage therapist, sedang cuti",
      },
      {
        id: "U006",
        name: "Emma Thompson",
        email: "emma.thompson@email.com",
        phone: "+62 816-9999-0000",
        role: "customer",
        status: "suspended",
        gender: "female",
        birthDate: "1993-11-25",
        address: "Jl. Kuningan No. 987, Jakarta Selatan",
   
        joinDate: "2023-12-20",
        lastLogin: "2024-01-10T08:45:00",
        notes: "Suspended karena pembayaran bermasalah",
      },
      {
        id: "U007",
        name: "Michael Brown",
        email: "michael.brown@email.com",
        phone: "+62 817-1234-5678",
        role: "customer",
        status: "active",
        gender: "male",
        birthDate: "1987-04-12",
        address: "Jl. Pondok Indah No. 147, Jakarta Selatan",
        
        joinDate: "2024-01-05",
        lastLogin: "2024-01-18T12:15:00",
        notes: "Customer baru, tertarik dengan package grooming",
      },
      {
        id: "U008",
        name: "Anna Rodriguez",
        email: "anna.rodriguez@email.com",
        phone: "+62 818-8888-9999",
        role: "staff",
        status: "active",
        gender: "female",
        birthDate: "1991-09-30",
        address: "Jl. Fatmawati No. 258, Jakarta Selatan",

        joinDate: "2023-08-01",
        lastLogin: "2024-01-20T07:30:00",
        notes: "Makeup artist profesional",
      },
    ]
  }

  setupEventListeners() {
    // Modal controls
    const addUserBtn = document.getElementById("addUserBtn")
    const userModal = document.getElementById("userModal")
    const closeUserModal = document.getElementById("closeUserModal")
    const cancelUserForm = document.getElementById("cancelUserForm")
    const saveUser = document.getElementById("saveUser")

    // Search and filters
    const userSearch = document.getElementById("userSearch")
    const userRoleFilter = document.getElementById("userRoleFilter")
    const userStatusFilter = document.getElementById("userStatusFilter")

    // Select all checkbox
    const selectAll = document.getElementById("selectAll")

    if (addUserBtn) {
      addUserBtn.addEventListener("click", () => this.openUserModal())
    }

    if (closeUserModal) {
      closeUserModal.addEventListener("click", () => this.closeModal())
    }

    if (cancelUserForm) {
      cancelUserForm.addEventListener("click", () => this.closeModal())
    }

    if (saveUser) {
      saveUser.addEventListener("click", () => this.saveUser())
    }

    if (userSearch) {
      userSearch.addEventListener(
        "input",
        window.adminApp.debounce(() => {
          this.currentPage = 1
          this.renderUsers()
        }, 300),
      )
    }

    if (userRoleFilter) {
      userRoleFilter.addEventListener("change", () => {
        this.currentPage = 1
        this.renderUsers()
      })
    }

    if (userStatusFilter) {
      userStatusFilter.addEventListener("change", () => {
        this.currentPage = 1
        this.renderUsers()
      })
    }

    if (selectAll) {
      selectAll.addEventListener("change", (e) => {
        this.toggleSelectAll(e.target.checked)
      })
    }

    // Close modals when clicking outside
    if (userModal) {
      userModal.addEventListener("click", (e) => {
        if (e.target === userModal) {
          this.closeModal()
        }
      })
    }

    // Pagination
    const prevBtn = document.getElementById("userPrevPage")
    const nextBtn = document.getElementById("userNextPage")

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.previousPage())
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextPage())
    }
  }

  getFilteredUsers() {
    const searchTerm = document.getElementById("userSearch")?.value.toLowerCase() || ""
    const roleFilter = document.getElementById("userRoleFilter")?.value || ""
    const statusFilter = document.getElementById("userStatusFilter")?.value || ""

    return this.users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.phone.toLowerCase().includes(searchTerm)

      const matchesRole = !roleFilter || user.role === roleFilter
      const matchesStatus = !statusFilter || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }

  renderUsers() {
    const tbody = document.getElementById("usersTableBody")
    if (!tbody) return

    const filteredUsers = this.getFilteredUsers()

    // Pagination
    const startIndex = (this.currentPage - 1) * this.usersPerPage
    const endIndex = startIndex + this.usersPerPage
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    if (paginatedUsers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">
            <i class="fas fa-users"></i>
            <h3>Tidak ada pengguna ditemukan</h3>
            <p>Coba ubah filter pencarian atau tambah pengguna baru.</p>
          </td>
        </tr>
      `
    } else {
      tbody.innerHTML = paginatedUsers.map((user) => this.createUserRow(user)).join("")
    }

    this.updatePagination(filteredUsers.length)
    this.updateSelectAllState()
  }

  createUserRow(user) {
    const joinDate = window.formatDate(user.joinDate)
    const lastLogin = this.formatLastLogin(user.lastLogin)
    const avatarDisplay = user.avatar
      ? `<img src="${user.avatar}" alt="${user.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
      : ""
    const avatarFallback = user.name.charAt(0).toUpperCase()

    return `
      <tr class="${this.selectedUsers.has(user.id) ? "selected" : ""}">
        <td>
          <input type="checkbox" class="user-checkbox" value="${user.id}" 
                 ${this.selectedUsers.has(user.id) ? "checked" : ""}
                 onchange="usersManager.toggleUserSelection('${user.id}', this.checked)">
        </td>
        <td>
          <div class="user-info">
            <div class="user-avatar">
              ${avatarDisplay}
              <span style="${user.avatar ? "display: none;" : ""}">${avatarFallback}</span>
            </div>
            <div class="user-details">
              <h4>${user.name}</h4>
              <p>${user.phone || "No phone"}</p>
            </div>
          </div>
        </td>
        <td>${user.email}</td>
        <td><span class="role-badge ${user.role}">${user.role}</span></td>
        <td><span class="status ${user.status}">${user.status}</span></td>
        <td>
          <div class="date-display">
            <span class="date">${joinDate}</span>
          </div>
        </td>
        <td>
          <div class="date-display">
            ${lastLogin}
          </div>
        </td>
        <td>
          <div class="table-actions">
            <button class="action-btn view-btn" onclick="usersManager.viewUser('${user.id}')" title="Lihat Detail">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit-btn" onclick="usersManager.editUser('${user.id}')" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="usersManager.deleteUser('${user.id}')" title="Hapus">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `
  }

  formatLastLogin(lastLogin) {
    if (!lastLogin) {
      return '<span class="login-status never">Belum pernah login</span>'
    }

    const loginDate = new Date(lastLogin)
    const now = new Date()
    const diffHours = Math.floor((now - loginDate) / (1000 * 60 * 60))

    let statusClass = "recent"
    let statusText = ""

    if (diffHours < 24) {
      statusClass = "recent"
      statusText = `${diffHours} jam yang lalu`
    } else if (diffHours < 168) {
      // 7 days
      statusClass = "recent"
      statusText = `${Math.floor(diffHours / 24)} hari yang lalu`
    } else {
      statusClass = "old"
      statusText = window.formatDate(lastLogin.split("T")[0])
    }

    return `<span class="login-status ${statusClass}">${statusText}</span>`
  }

  toggleUserSelection(userId, checked) {
    if (checked) {
      this.selectedUsers.add(userId)
    } else {
      this.selectedUsers.delete(userId)
    }
    this.updateSelectAllState()
    this.updateBulkActions()
  }

  toggleSelectAll(checked) {
    const checkboxes = document.querySelectorAll(".user-checkbox")
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked
      this.toggleUserSelection(checkbox.value, checked)
    })
  }

  updateSelectAllState() {
    const selectAll = document.getElementById("selectAll")
    const checkboxes = document.querySelectorAll(".user-checkbox")
    const checkedBoxes = document.querySelectorAll(".user-checkbox:checked")

    if (selectAll) {
      selectAll.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < checkboxes.length
      selectAll.checked = checkboxes.length > 0 && checkedBoxes.length === checkboxes.length
    }
  }

  updateBulkActions() {
    // Implementation for bulk actions UI
    // This would show/hide bulk action buttons based on selection
  }

  updatePagination(totalItems) {
    const startRange = document.getElementById("userStartRange")
    const endRange = document.getElementById("userEndRange")
    const total = document.getElementById("userTotal")
    const prevBtn = document.getElementById("userPrevPage")
    const nextBtn = document.getElementById("userNextPage")

    if (startRange && endRange && total) {
      const startIndex = totalItems > 0 ? (this.currentPage - 1) * this.usersPerPage + 1 : 0
      const endIndex = Math.min(this.currentPage * this.usersPerPage, totalItems)

      startRange.textContent = startIndex
      endRange.textContent = endIndex
      total.textContent = totalItems
    }

    const totalPages = Math.ceil(totalItems / this.usersPerPage)

    if (prevBtn) {
      prevBtn.disabled = this.currentPage <= 1
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentPage >= totalPages
    }

    this.updatePageNumbers(totalPages)
  }

  updatePageNumbers(totalPages) {
    const pageNumbers = document.getElementById("userPageNumbers")
    if (!pageNumbers) return

    let pagesHTML = ""
    const startPage = Math.max(1, this.currentPage - 2)
    const endPage = Math.min(totalPages, this.currentPage + 2)

    for (let i = startPage; i <= endPage; i++) {
      pagesHTML += `
        <button class="btn btn-outline ${i === this.currentPage ? "active" : ""}" 
                onclick="usersManager.goToPage(${i})">${i}</button>
      `
    }

    pageNumbers.innerHTML = pagesHTML
  }

  goToPage(page) {
    this.currentPage = page
    this.renderUsers()
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.renderUsers()
    }
  }

  nextPage() {
    const filteredUsers = this.getFilteredUsers()
    const totalPages = Math.ceil(filteredUsers.length / this.usersPerPage)
    if (this.currentPage < totalPages) {
      this.currentPage++
      this.renderUsers()
    }
  }

  openUserModal(userId = null) {
    const modal = document.getElementById("userModal")
    const title = document.getElementById("userModalTitle")
    const form = document.getElementById("userForm")

    if (userId) {
      const user = this.users.find((u) => u.id === userId)
      if (!user) return

      title.textContent = "Edit Pengguna"

      // Fill form with user data
      document.getElementById("userId").value = user.id
      document.getElementById("userName").value = user.name
      document.getElementById("userEmail").value = user.email
      document.getElementById("userPhone").value = user.phone || ""
      document.getElementById("userRole").value = user.role
      document.getElementById("userStatus").value = user.status
      document.getElementById("userGender").value = user.gender || ""
      document.getElementById("userBirthDate").value = user.birthDate || ""
      document.getElementById("userAvatar").value = user.avatar || ""
      document.getElementById("userAddress").value = user.address || ""
      document.getElementById("userNotes").value = user.notes || ""
    } else {
      title.textContent = "Tambah Pengguna Baru"
      form.reset()
      document.getElementById("userId").value = ""
    }

    modal.classList.add("show")
  }

  closeModal() {
    const modal = document.getElementById("userModal")
    modal.classList.remove("show")
  }

  saveUser() {
    const form = document.getElementById("userForm")
    const formData = new FormData(form)
    const userId = document.getElementById("userId").value

    // Validation
    if (!formData.get("name") || !formData.get("email") || !formData.get("role")) {
      window.showNotification("Mohon lengkapi semua field yang wajib diisi!", "error")
      return
    }

    const userData = {
      id: userId || window.generateId("U"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      role: formData.get("role"),
      status: formData.get("status"),
      gender: formData.get("gender") || "",
      birthDate: formData.get("birthDate") || "",
      avatar: formData.get("avatar") || "",
      address: formData.get("address") || "",
      notes: formData.get("notes") || "",
      joinDate: userId ? this.users.find((u) => u.id === userId).joinDate : new Date().toISOString().split("T")[0],
      lastLogin: userId ? this.users.find((u) => u.id === userId).lastLogin : null,
    }

    if (userId) {
      // Update existing user
      const index = this.users.findIndex((u) => u.id === userId)
      this.users[index] = userData
      window.showNotification("Pengguna berhasil diperbarui!", "success")
    } else {
      // Add new user
      this.users.unshift(userData)
      window.showNotification("Pengguna baru berhasil ditambahkan!", "success")
    }

    this.closeModal()
    this.renderUsers()
  }

  viewUser(userId) {
    const user = this.users.find((u) => u.id === userId)
    if (!user) return

    const joinDate = window.formatDate(user.joinDate)
    const lastLogin = this.formatLastLogin(user.lastLogin)
    const birthDate = user.birthDate ? window.formatDate(user.birthDate) : "Tidak diisi"

    const userDetails = `
      <div class="user-detail-modal">
        <div class="user-detail-header" style="text-align: center; margin-bottom: 2rem;">
          <div class="user-avatar" style="width: 80px; height: 80px; margin: 0 auto 1rem; font-size: 2rem;">
            ${
              user.avatar
                ? `<img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover;">`
                : user.name.charAt(0).toUpperCase()
            }
          </div>
          <h2 style="margin-bottom: 0.5rem; color: var(--foreground);">${user.name}</h2>
          <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
            <span class="role-badge ${user.role}">${user.role}</span>
            <span class="status ${user.status}">${user.status}</span>
          </div>
        </div>
        <div class="user-detail-content" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
          <div>
            <strong>Informasi Kontak:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.6;">
              <i class="fas fa-envelope"></i> ${user.email}<br>
              <i class="fas fa-phone"></i> ${user.phone || "Tidak diisi"}<br>
              <i class="fas fa-map-marker-alt"></i> ${user.address || "Tidak diisi"}
            </p>
          </div>
          <div>
            <strong>Informasi Personal:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.6;">
              <i class="fas fa-venus-mars"></i> ${user.gender || "Tidak diisi"}<br>
              <i class="fas fa-birthday-cake"></i> ${birthDate}<br>
              <i class="fas fa-calendar-plus"></i> Bergabung: ${joinDate}
            </p>
          </div>
          <div>
            <strong>Status Login:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.6;">
              ${lastLogin}
            </p>
          </div>
          <div>
            <strong>Catatan:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.6;">
              ${user.notes || "Tidak ada catatan"}
            </p>
          </div>
        </div>
      </div>
    `

    this.showCustomModal("Detail Pengguna", userDetails)
  }

  editUser(userId) {
    this.openUserModal(userId)
  }

  deleteUser(userId) {
    const user = this.users.find((u) => u.id === userId)
    if (!user) return

    this.showDeleteConfirmation(`Apakah Anda yakin ingin menghapus pengguna "${user.name}"?`, () => {
      this.users = this.users.filter((u) => u.id !== userId)
      this.selectedUsers.delete(userId)
      this.renderUsers()
      window.showNotification("Pengguna berhasil dihapus!", "success")
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

// Initialize users manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.usersManager = new UsersManager()
})
