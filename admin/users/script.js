// User Management JavaScript
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

  // User specific elements
  const addUserBtn = document.getElementById("addUserBtn")
  const userModal = document.getElementById("userModal")
  const closeUserModal = document.getElementById("closeUserModal")
  const cancelUserForm = document.getElementById("cancelUserForm")
  const saveUser = document.getElementById("saveUser")
  const userForm = document.getElementById("userForm")
  const userSearch = document.getElementById("userSearch")
  const userRoleFilter = document.getElementById("userRoleFilter")
  const selectAllUsers = document.getElementById("selectAllUsers")
  const deleteModal = document.getElementById("deleteModal")

  // Sample Users Data with better structure
  let users = [
    {
      id: "U001",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "+62 812-3456-7890",
      role: "customer",
      status: "active",
      address: "Jl. Sudirman No. 123, Surabaya",
      joinDate: "2023-05-01",
    
      lastLogin: "2024-01-15",
    },
    {
      id: "U002",
      name: "Maria Garcia",
      email: "maria@email.com",
      phone: "+62 813-4567-8901",
      role: "customer",
      status: "active",
      address: "Jl. Thamrin No. 456, Surabaya",
      joinDate: "2023-04-28",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      lastLogin: "2024-01-14",
    },
    {
      id: "U003",
      name: "Admin Glow & Grace",
      email: "admin@glowgrace.com",
      phone: "+62 811-2345-6789",
      role: "admin",
      status: "active",
      address: "Jl. Mawar No. 15, Surabaya",
      joinDate: "2023-01-01",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      lastLogin: "2024-01-16",
    },
    {
      id: "U004",
      name: "Lisa Beautician",
      email: "lisa@glowgrace.com",
      phone: "+62 814-5678-9012",
      role: "staff",
      status: "active",
      address: "Jl. Melati No. 789, Surabaya",
      joinDate: "2023-03-15",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      lastLogin: "2024-01-15",
    },
    {
      id: "U005",
      name: "Emma Wilson",
      email: "emma@email.com",
      phone: "+62 815-6789-0123",
      role: "customer",
      status: "inactive",
      address: "Jl. Anggrek No. 321, Surabaya",
      joinDate: "2023-04-10",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      lastLogin: "2023-12-20",
    },
    {
      id: "U006",
      name: "David Chen",
      email: "david@email.com",
      phone: "+62 816-7890-1234",
      role: "customer",
      status: "active",
      address: "Jl. Kenanga No. 654, Surabaya",
      joinDate: "2023-05-20",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      lastLogin: "2024-01-13",
    },
    {
      id: "U007",
      name: "Anna Therapist",
      email: "anna@glowgrace.com",
      phone: "+62 817-8901-2345",
      role: "staff",
      status: "active",
      address: "Jl. Dahlia No. 987, Surabaya",
      joinDate: "2023-06-01",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      lastLogin: "2024-01-16",
    },
    {
      id: "U008",
      name: "Michael Brown",
      email: "michael@email.com",
      phone: "+62 818-9012-3456",
      role: "customer",
      status: "suspended",
      address: "Jl. Tulip No. 321, Surabaya",
      joinDate: "2023-03-25",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      lastLogin: "2023-11-15",
    },
  ]

  // Pagination state
  let currentUserPage = 1
  const itemsPerPage = 10

  // Initialize
  init()

  function init() {
    // Set user name
    const adminUser = JSON.parse(localStorage.getItem("adminUser")) || { name: "Admin" }
    userName.textContent = adminUser.name

    // Setup event listeners
    setupEventListeners()

    // Initialize data
    renderUsers()
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

    // User management
    addUserBtn.addEventListener("click", () => {
      openUserModal()
    })

    closeUserModal.addEventListener("click", () => {
      userModal.classList.remove("show")
    })

    cancelUserForm.addEventListener("click", () => {
      userModal.classList.remove("show")
    })

    saveUser.addEventListener("click", () => {
      saveUserData()
    })

    // Search and filter
    userSearch.addEventListener("input", () => {
      currentUserPage = 1
      renderUsers()
    })

    userRoleFilter.addEventListener("change", () => {
      currentUserPage = 1
      renderUsers()
    })

    // Select all checkbox
    selectAllUsers.addEventListener("change", (e) => {
      const checkboxes = document.querySelectorAll('input[name="userSelect"]')
      checkboxes.forEach((checkbox) => {
        checkbox.checked = e.target.checked
      })
    })

    // Close modal when clicking outside
    userModal.addEventListener("click", (e) => {
      if (e.target === userModal) {
        userModal.classList.remove("show")
      }
    })

    deleteModal.addEventListener("click", (e) => {
      if (e.target === deleteModal) {
        deleteModal.classList.remove("show")
      }
    })

    // Pagination controls
    document.getElementById("userPrevPage").addEventListener("click", () => {
      if (currentUserPage > 1) {
        currentUserPage--
        renderUsers()
      }
    })

    document.getElementById("userNextPage").addEventListener("click", () => {
      const filteredUsers = getFilteredUsers()
      const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
      if (currentUserPage < totalPages) {
        currentUserPage++
        renderUsers()
      }
    })
  }

  // User Management Functions
  function getFilteredUsers() {
    const searchTerm = userSearch.value.toLowerCase()
    const roleFilter = userRoleFilter.value

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.phone.toLowerCase().includes(searchTerm)
      const matchesRole = !roleFilter || user.role === roleFilter
      return matchesSearch && matchesRole
    })
  }

  function renderUsers() {
    const tbody = document.getElementById("usersTableBody")
    const filteredUsers = getFilteredUsers()

    // Pagination
    const startIndex = (currentUserPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    tbody.innerHTML = paginatedUsers
      .map(
        (user) => `
      <tr>
        <td><input type="checkbox" name="userSelect" value="${user.id}"></td>
        <td>${user.id}</td>
        <td>
          <div class="user-avatar-container">
            <img src="${user.avatar}" alt="${user.name}" class="user-avatar-img"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                 onload="this.nextElementSibling.style.display='none';">
            <div class="user-avatar-fallback" style="display: none;">
              ${generateAvatarInitials(user.name)}
            </div>
          </div>
        </td>
        <td>
          <div class="user-info">
            <div class="user-name">${user.name}</div>
            <div class="user-last-login">Last login: ${formatDate(user.lastLogin)}</div>
          </div>
        </td>
        <td>${user.email}</td>
        <td>${user.phone || "-"}</td>
        <td><span class="status ${user.role}">${user.role}</span></td>
        <td>${formatDate(user.joinDate)}</td>
        <td><span class="status ${user.status}">${user.status}</span></td>
        <td>
          <div class="action-buttons">
            <button class="action-btn view-btn" onclick="viewUser('${user.id}')" title="Lihat Detail">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit-btn" onclick="editUser('${user.id}')" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="deleteUser('${user.id}')" title="Hapus">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `,
      )
      .join("")

    // Update pagination info and controls
    updateUserPagination(filteredUsers.length)
  }

  function updateUserPagination(totalItems) {
    const startRange = document.getElementById("userStartRange")
    const endRange = document.getElementById("userEndRange")
    const total = document.getElementById("userTotal")
    const prevBtn = document.getElementById("userPrevPage")
    const nextBtn = document.getElementById("userNextPage")

    const startIndex = totalItems > 0 ? (currentUserPage - 1) * itemsPerPage + 1 : 0
    const endIndex = Math.min(currentUserPage * itemsPerPage, totalItems)
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    startRange.textContent = startIndex
    endRange.textContent = endIndex
    total.textContent = totalItems

    // Update pagination buttons
    prevBtn.disabled = currentUserPage <= 1
    nextBtn.disabled = currentUserPage >= totalPages

    // Update page numbers
    updatePageNumbers(totalPages)
  }

  function updatePageNumbers(totalPages) {
    const pageNumbers = document.getElementById("userPageNumbers")
    let pagesHtml = ""

    const startPage = Math.max(1, currentUserPage - 2)
    const endPage = Math.min(totalPages, currentUserPage + 2)

    for (let i = startPage; i <= endPage; i++) {
      pagesHtml += `
        <button class="btn btn-outline ${i === currentUserPage ? "active" : ""}" 
                onclick="goToPage(${i})">${i}</button>
      `
    }

    pageNumbers.innerHTML = pagesHtml
  }

  function goToPage(page) {
    currentUserPage = page
    renderUsers()
  }

  function openUserModal(userId = null) {
    const modal = document.getElementById("userModal")
    const title = document.getElementById("userModalTitle")
    const form = document.getElementById("userForm")

    if (userId) {
      const user = users.find((u) => u.id === userId)
      title.textContent = "Edit Pengguna"

      // Fill form with user data
      document.getElementById("userId").value = user.id
      document.getElementById("userName").value = user.name
      document.getElementById("userEmail").value = user.email
      document.getElementById("userPhone").value = user.phone || ""
      document.getElementById("userRole").value = user.role
      document.getElementById("userStatus").value = user.status
      document.getElementById("userAddress").value = user.address || ""
      document.getElementById("userPassword").required = false
      document.getElementById("userPassword").placeholder = "Kosongkan jika tidak ingin mengubah password"
    } else {
      title.textContent = "Tambah Pengguna Baru"
      form.reset()
      document.getElementById("userId").value = ""
      document.getElementById("userPassword").required = true
      document.getElementById("userPassword").placeholder = "Masukkan password"
    }

    modal.classList.add("show")
  }

  function viewUser(userId) {
    const user = users.find((u) => u.id === userId)
    if (!user) return

    const userDetails = `
      <div class="user-detail-modal">
        <div class="user-detail-header">
          <div class="user-avatar-large">
            <img src="${user.avatar}" alt="${user.name}" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="user-avatar-fallback-large" style="display: none;">
              ${generateAvatarInitials(user.name)}
            </div>
          </div>
          <div class="user-detail-info">
            <h3>${user.name}</h3>
            <span class="status ${user.role}">${user.role}</span>
            <span class="status ${user.status}">${user.status}</span>
          </div>
        </div>
        <div class="user-detail-content">
          <div class="detail-row">
            <strong>Email:</strong> ${user.email}
          </div>
          <div class="detail-row">
            <strong>Telepon:</strong> ${user.phone || "-"}
          </div>
          <div class="detail-row">
            <strong>Alamat:</strong> ${user.address || "-"}
          </div>
          <div class="detail-row">
            <strong>Tanggal Bergabung:</strong> ${formatDate(user.joinDate)}
          </div>
          <div class="detail-row">
            <strong>Login Terakhir:</strong> ${formatDate(user.lastLogin)}
          </div>
        </div>
      </div>
    `

    showCustomModal("Detail Pengguna", userDetails)
  }

  function saveUserData() {
    const form = document.getElementById("userForm")
    const formData = new FormData(form)
    const userId = document.getElementById("userId").value

    // Validation
    if (!formData.get("name") || !formData.get("email") || !formData.get("role")) {
      showNotification("Mohon lengkapi semua field yang wajib diisi!", "error")
      return
    }

    // Check email uniqueness
    const existingUser = users.find((u) => u.email === formData.get("email") && u.id !== userId)
    if (existingUser) {
      showNotification("Email sudah digunakan oleh pengguna lain!", "error")
      return
    }

    const userData = {
      id: userId || generateId("U"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      role: formData.get("role"),
      status: formData.get("status"),
      address: formData.get("address"),
      avatar: generateRandomAvatar(),
      joinDate: userId ? users.find((u) => u.id === userId).joinDate : new Date().toISOString().split("T")[0],
      lastLogin: userId ? users.find((u) => u.id === userId).lastLogin : new Date().toISOString().split("T")[0],
    }

    if (userId) {
      // Update existing user
      const index = users.findIndex((u) => u.id === userId)
      users[index] = userData
      showNotification("Pengguna berhasil diperbarui!", "success")
    } else {
      // Add new user
      users.push(userData)
      showNotification("Pengguna baru berhasil ditambahkan!", "success")
    }

    document.getElementById("userModal").classList.remove("show")
    renderUsers()
  }

  function deleteUser(userId) {
    const user = users.find((u) => u.id === userId)
    showDeleteConfirmation(`Apakah Anda yakin ingin menghapus pengguna "${user.name}"?`, () => {
      users = users.filter((u) => u.id !== userId)
      renderUsers()
      showNotification("Pengguna berhasil dihapus!", "success")
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

  function showCustomModal(title, content) {
    // Create custom modal
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
        <div class="modal-body">
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

  // Utility Functions
  function generateId(prefix) {
    const timestamp = Date.now().toString().slice(-6)
    return `${prefix}${timestamp}`
  }

  function generateAvatarInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  function generateRandomAvatar() {
    const avatars = [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    ]
    return avatars[Math.floor(Math.random() * avatars.length)]
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
  window.editUser = (userId) => openUserModal(userId)
  window.deleteUser = deleteUser
  window.viewUser = viewUser
  window.goToPage = goToPage

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
