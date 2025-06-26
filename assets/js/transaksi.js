// Transactions Management JavaScript
class TransactionsManager {
  constructor() {
    this.transactions = []
    this.customers = []
    this.services = []
    this.currentPage = 1
    this.transactionsPerPage = 10
    this.init()
  }

  init() {
    this.loadSampleData()
    this.setupEventListeners()
    this.renderTransactions()
    this.updateStats()
  }

  loadSampleData() {
    // Load customers data
    this.customers = [
      {
        id: "U001",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
      
      },
      {
        id: "U004",
        name: "Lisa Chen",
        email: "lisa.chen@email.com",
   
      },
      {
        id: "U006",
        name: "Emma Thompson",
        email: "emma.thompson@email.com",
     
      },
      { id: "U007", name: "Michael Brown", email: "michael.brown@email.com", avatar: "" },
      {
        id: "U008",
        name: "Anna Rodriguez",
        email: "anna.rodriguez@email.com",
    
      },
    ]

    // Load services data
    this.services = [
      { id: "P001", name: "Deep Cleansing Facial", category: "facial", price: 150000 },
      { id: "P002", name: "Hair Spa Treatment", category: "hair", price: 200000 },
      { id: "P003", name: "Relaxing Body Massage", category: "massage", price: 180000 },
      { id: "P004", name: "Gel Manicure & Pedicure", category: "nail", price: 120000 },
      { id: "P005", name: "Bridal Makeup Package", category: "makeup", price: 500000 },
      { id: "P006", name: "Anti-Aging Facial", category: "facial", price: 250000 },
      { id: "P008", name: "Hot Stone Massage", category: "massage", price: 220000 },
    ]

    // Load transactions data
    this.transactions = [
      {
        id: "TRX001",
        customerId: "U001",
        customerName: "Sarah Johnson",
     
        services: [
          { id: "P001", name: "Deep Cleansing Facial", price: 150000 },
          { id: "P003", name: "Relaxing Body Massage", price: 180000 },
        ],
        subtotal: 330000,
        discount: 10,
        tax: 10,
        total: 326700,
        paymentMethod: "transfer",
        status: "completed",
        date: "2024-01-20T10:30:00",
        notes: "Customer VIP, pelayanan excellent",
      },
      {
        id: "TRX002",
        customerId: "U004",
        customerName: "Lisa Chen",
      
        services: [{ id: "P002", name: "Hair Spa Treatment", price: 200000 }],
        subtotal: 200000,
        discount: 0,
        tax: 10,
        total: 220000,
        paymentMethod: "cash",
        status: "completed",
        date: "2024-01-20T14:15:00",
        notes: "Pembayaran cash",
      },
      {
        id: "TRX003",
        customerId: "U006",
        customerName: "Emma Thompson",
     
        services: [{ id: "P005", name: "Bridal Makeup Package", price: 500000 }],
        subtotal: 500000,
        discount: 15,
        tax: 10,
        total: 467500,
        paymentMethod: "credit_card",
        status: "pending",
        date: "2024-01-21T09:00:00",
        notes: "Booking untuk wedding tanggal 25 Januari",
      },
      {
        id: "TRX004",
        customerId: "U007",
        customerName: "Michael Brown",
     
        services: [{ id: "P004", name: "Gel Manicure & Pedicure", price: 120000 }],
        subtotal: 120000,
        discount: 0,
        tax: 10,
        total: 132000,
        paymentMethod: "e_wallet",
        status: "completed",
        date: "2024-01-19T16:45:00",
        notes: "Customer baru, puas dengan pelayanan",
      },
      {
        id: "TRX005",
        customerId: "U001",
        customerName: "Sarah Johnson",
    
        services: [
          { id: "P006", name: "Anti-Aging Facial", price: 250000 },
          { id: "P008", name: "Hot Stone Massage", price: 220000 },
        ],
        subtotal: 470000,
        discount: 20,
        tax: 10,
        total: 414400,
        paymentMethod: "transfer",
        status: "completed",
        date: "2024-01-18T11:30:00",
        notes: "Package VIP member",
      },
      {
        id: "TRX006",
        customerId: "U008",
        customerName: "Anna Rodriguez",

        services: [{ id: "P001", name: "Deep Cleansing Facial", price: 150000 }],
        subtotal: 150000,
        discount: 0,
        tax: 10,
        total: 165000,
        paymentMethod: "cash",
        status: "cancelled",
        date: "2024-01-17T13:20:00",
        notes: "Customer cancel mendadak",
      },
      {
        id: "TRX007",
        customerId: "U004",
        customerName: "Lisa Chen",
   
        services: [
          { id: "P003", name: "Relaxing Body Massage", price: 180000 },
          { id: "P004", name: "Gel Manicure & Pedicure", price: 120000 },
        ],
        subtotal: 300000,
        discount: 5,
        tax: 10,
        total: 313500,
        paymentMethod: "transfer",
        status: "refunded",
        date: "2024-01-16T15:00:00",
        notes: "Refund karena tidak puas dengan hasil",
      },
      {
        id: "TRX008",
        customerId: "U007",
        customerName: "Michael Brown",

        services: [{ id: "P002", name: "Hair Spa Treatment", price: 200000 }],
        subtotal: 200000,
        discount: 0,
        tax: 10,
        total: 220000,
        paymentMethod: "e_wallet",
        status: "pending",
        date: "2024-01-21T10:15:00",
        notes: "Menunggu konfirmasi pembayaran",
      },
    ]
  }

  setupEventListeners() {
    // Modal controls
    const addTransactionBtn = document.getElementById("addTransactionBtn")
    const transactionModal = document.getElementById("transactionModal")
    const closeTransactionModal = document.getElementById("closeTransactionModal")
    const cancelTransactionForm = document.getElementById("cancelTransactionForm")
    const saveTransaction = document.getElementById("saveTransaction")

    // Search and filters
    const transactionSearch = document.getElementById("transactionSearch")
    const transactionStatusFilter = document.getElementById("transactionStatusFilter")
    const transactionMethodFilter = document.getElementById("transactionMethodFilter")
    const transactionDateFilter = document.getElementById("transactionDateFilter")

    // Form elements for calculation
    const discountInput = document.getElementById("transactionDiscount")
    const taxInput = document.getElementById("transactionTax")

    if (addTransactionBtn) {
      addTransactionBtn.addEventListener("click", () => this.openTransactionModal())
    }

    if (closeTransactionModal) {
      closeTransactionModal.addEventListener("click", () => this.closeModal())
    }

    if (cancelTransactionForm) {
      cancelTransactionForm.addEventListener("click", () => this.closeModal())
    }

    if (saveTransaction) {
      saveTransaction.addEventListener("click", () => this.saveTransaction())
    }

    if (transactionSearch) {
      transactionSearch.addEventListener(
        "input",
        window.adminApp.debounce(() => {
          this.currentPage = 1
          this.renderTransactions()
        }, 300),
      )
    }

    if (transactionStatusFilter) {
      transactionStatusFilter.addEventListener("change", () => {
        this.currentPage = 1
        this.renderTransactions()
      })
    }

    if (transactionMethodFilter) {
      transactionMethodFilter.addEventListener("change", () => {
        this.currentPage = 1
        this.renderTransactions()
      })
    }

    if (transactionDateFilter) {
      transactionDateFilter.addEventListener("change", () => {
        this.currentPage = 1
        this.renderTransactions()
      })
    }

    if (discountInput) {
      discountInput.addEventListener("input", () => this.calculateTotal())
    }

    if (taxInput) {
      taxInput.addEventListener("input", () => this.calculateTotal())
    }

    // Close modals when clicking outside
    if (transactionModal) {
      transactionModal.addEventListener("click", (e) => {
        if (e.target === transactionModal) {
          this.closeModal()
        }
      })
    }

    // Pagination
    const prevBtn = document.getElementById("transactionPrevPage")
    const nextBtn = document.getElementById("transactionNextPage")

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.previousPage())
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextPage())
    }
  }

  getFilteredTransactions() {
    const searchTerm = document.getElementById("transactionSearch")?.value.toLowerCase() || ""
    const statusFilter = document.getElementById("transactionStatusFilter")?.value || ""
    const methodFilter = document.getElementById("transactionMethodFilter")?.value || ""
    const dateFilter = document.getElementById("transactionDateFilter")?.value || ""

    return this.transactions.filter((transaction) => {
      const matchesSearch =
        transaction.id.toLowerCase().includes(searchTerm) ||
        transaction.customerName.toLowerCase().includes(searchTerm) ||
        transaction.services.some((service) => service.name.toLowerCase().includes(searchTerm))

      const matchesStatus = !statusFilter || transaction.status === statusFilter
      const matchesMethod = !methodFilter || transaction.paymentMethod === methodFilter

      let matchesDate = true
      if (dateFilter) {
        const transactionDate = new Date(transaction.date).toISOString().split("T")[0]
        matchesDate = transactionDate === dateFilter
      }

      return matchesSearch && matchesStatus && matchesMethod && matchesDate
    })
  }

  renderTransactions() {
    const tbody = document.getElementById("transactionsTableBody")
    if (!tbody) return

    const filteredTransactions = this.getFilteredTransactions()

    // Pagination
    const startIndex = (this.currentPage - 1) * this.transactionsPerPage
    const endIndex = startIndex + this.transactionsPerPage
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex)

    if (paginatedTransactions.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">
            <i class="fas fa-receipt"></i>
            <h3>Tidak ada transaksi ditemukan</h3>
            <p>Coba ubah filter pencarian atau tambah transaksi baru.</p>
          </td>
        </tr>
      `
    } else {
      tbody.innerHTML = paginatedTransactions.map((transaction) => this.createTransactionRow(transaction)).join("")
    }

    this.updatePagination(filteredTransactions.length)
  }

  createTransactionRow(transaction) {
    const formattedDate = this.formatTransactionDate(transaction.date)
    const formattedTotal = window.formatCurrency(transaction.total)
    const avatarDisplay = transaction.customerAvatar
      ? `<img src="${transaction.customerAvatar}" alt="${transaction.customerName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
      : ""
    const avatarFallback = transaction.customerName.charAt(0).toUpperCase()

    const servicesHTML = transaction.services
      .map(
        (service) => `
      <div class="service-item">
        <span class="service-name">${service.name}</span>
        <span class="service-price">${window.formatCurrency(service.price)}</span>
      </div>
    `,
      )
      .join("")

    return `
      <tr>
        <td><span class="transaction-id">${transaction.id}</span></td>
        <td>
          <div class="customer-info">
            <div class="customer-avatar">
              ${avatarDisplay}
              <span style="${transaction.customerAvatar ? "display: none;" : ""}">${avatarFallback}</span>
            </div>
            <div class="customer-details">
              <h4>${transaction.customerName}</h4>
              <p>${transaction.services.length} layanan</p>
            </div>
          </div>
        </td>
        <td>
          <div class="services-list">
            ${servicesHTML}
          </div>
        </td>
        <td><span class="amount large">${formattedTotal}</span></td>
        <td><span class="payment-method ${transaction.paymentMethod}">${this.getPaymentMethodName(transaction.paymentMethod)}</span></td>
        <td><span class="status ${transaction.status}">${transaction.status}</span></td>
        <td>
          <div class="transaction-date">
            ${formattedDate}
          </div>
        </td>
        <td>
          <div class="table-actions">
            <button class="action-btn view-btn" onclick="transactionsManager.viewTransaction('${transaction.id}')" title="Lihat Detail">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit-btn" onclick="transactionsManager.editTransaction('${transaction.id}')" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn print-btn" onclick="transactionsManager.printTransaction('${transaction.id}')" title="Print">
              <i class="fas fa-print"></i>
            </button>
            <button class="action-btn delete-btn" onclick="transactionsManager.deleteTransaction('${transaction.id}')" title="Hapus">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `
  }

  formatTransactionDate(dateString) {
    const date = new Date(dateString)
    const dateStr = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    const timeStr = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })

    return `
      <span class="date">${dateStr}</span>
      <span class="time">${timeStr}</span>
    `
  }

  getPaymentMethodName(method) {
    const methodNames = {
      cash: "Cash",
      transfer: "Transfer",
      credit_card: "Credit Card",
      e_wallet: "E-Wallet",
    }
    return methodNames[method] || method
  }

  updatePagination(totalItems) {
    const startRange = document.getElementById("transactionStartRange")
    const endRange = document.getElementById("transactionEndRange")
    const total = document.getElementById("transactionTotal")
    const prevBtn = document.getElementById("transactionPrevPage")
    const nextBtn = document.getElementById("transactionNextPage")

    if (startRange && endRange && total) {
      const startIndex = totalItems > 0 ? (this.currentPage - 1) * this.transactionsPerPage + 1 : 0
      const endIndex = Math.min(this.currentPage * this.transactionsPerPage, totalItems)

      startRange.textContent = startIndex
      endRange.textContent = endIndex
      total.textContent = totalItems
    }

    const totalPages = Math.ceil(totalItems / this.transactionsPerPage)

    if (prevBtn) {
      prevBtn.disabled = this.currentPage <= 1
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentPage >= totalPages
    }

    this.updatePageNumbers(totalPages)
  }

  updatePageNumbers(totalPages) {
    const pageNumbers = document.getElementById("transactionPageNumbers")
    if (!pageNumbers) return

    let pagesHTML = ""
    const startPage = Math.max(1, this.currentPage - 2)
    const endPage = Math.min(totalPages, this.currentPage + 2)

    for (let i = startPage; i <= endPage; i++) {
      pagesHTML += `
        <button class="btn btn-outline ${i === this.currentPage ? "active" : ""}" 
                onclick="transactionsManager.goToPage(${i})">${i}</button>
      `
    }

    pageNumbers.innerHTML = pagesHTML
  }

  goToPage(page) {
    this.currentPage = page
    this.renderTransactions()
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.renderTransactions()
    }
  }

  nextPage() {
    const filteredTransactions = this.getFilteredTransactions()
    const totalPages = Math.ceil(filteredTransactions.length / this.transactionsPerPage)
    if (this.currentPage < totalPages) {
      this.currentPage++
      this.renderTransactions()
    }
  }

  updateStats() {
    const completedTransactions = this.transactions.filter((t) => t.status === "completed")
    const pendingTransactions = this.transactions.filter((t) => t.status === "pending")

    const totalRevenue = completedTransactions.reduce((sum, t) => sum + t.total, 0)
    const avgTransaction = completedTransactions.length > 0 ? totalRevenue / completedTransactions.length : 0

    // Update stat displays
    const totalRevenueEl = document.getElementById("totalRevenue")
    const totalTransactionsEl = document.getElementById("totalTransactions")
    const pendingTransactionsEl = document.getElementById("pendingTransactions")
    const avgTransactionEl = document.getElementById("avgTransaction")

    if (totalRevenueEl) {
      totalRevenueEl.textContent = window.formatCurrency(totalRevenue)
    }
    if (totalTransactionsEl) {
      totalTransactionsEl.textContent = this.transactions.length
    }
    if (pendingTransactionsEl) {
      pendingTransactionsEl.textContent = pendingTransactions.length
    }
    if (avgTransactionEl) {
      avgTransactionEl.textContent = window.formatCurrency(avgTransaction)
    }
  }

  openTransactionModal(transactionId = null) {
    const modal = document.getElementById("transactionModal")
    const title = document.getElementById("transactionModalTitle")
    const form = document.getElementById("transactionForm")

    // Populate customers dropdown
    this.populateCustomersDropdown()

    // Populate services selection
    this.populateServicesSelection()

    if (transactionId) {
      const transaction = this.transactions.find((t) => t.id === transactionId)
      if (!transaction) return

      title.textContent = "Edit Transaksi"

      // Fill form with transaction data
      document.getElementById("transactionId").value = transaction.id
      document.getElementById("transactionCustomer").value = transaction.customerId
      document.getElementById("transactionDate").value = transaction.date.slice(0, 16) // Remove seconds
      document.getElementById("transactionMethod").value = transaction.paymentMethod
      document.getElementById("transactionStatus").value = transaction.status
      document.getElementById("transactionDiscount").value = transaction.discount
      document.getElementById("transactionTax").value = transaction.tax
      document.getElementById("transactionNotes").value = transaction.notes

      // Select services
      transaction.services.forEach((service) => {
        const checkbox = document.querySelector(`input[value="${service.id}"]`)
        if (checkbox) {
          checkbox.checked = true
          checkbox.closest(".service-option").classList.add("selected")
        }
      })
    } else {
      title.textContent = "Tambah Transaksi Baru"
      form.reset()
      document.getElementById("transactionId").value = ""

      // Set default date to now
      const now = new Date()
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
      document.getElementById("transactionDate").value = now.toISOString().slice(0, 16)

      // Clear service selections
      document.querySelectorAll(".service-option").forEach((option) => {
        option.classList.remove("selected")
        const checkbox = option.querySelector('input[type="checkbox"]')
        if (checkbox) checkbox.checked = false
      })
    }

    this.calculateTotal()
    modal.classList.add("show")
  }

  populateCustomersDropdown() {
    const customerSelect = document.getElementById("transactionCustomer")
    if (!customerSelect) return

    const customersHTML = this.customers
      .map((customer) => `<option value="${customer.id}">${customer.name} (${customer.email})</option>`)
      .join("")

    customerSelect.innerHTML = `
      <option value="">Pilih Customer</option>
      ${customersHTML}
    `
  }

  populateServicesSelection() {
    const servicesContainer = document.getElementById("servicesSelection")
    if (!servicesContainer) return

    const servicesHTML = this.services
      .map(
        (service) => `
      <div class="service-option" onclick="transactionsManager.toggleService('${service.id}')">
        <input type="checkbox" value="${service.id}" onchange="transactionsManager.toggleService('${service.id}')">
        <div class="service-option-info">
          <div class="service-option-name">${service.name}</div>
          <div class="service-option-category">${service.category}</div>
        </div>
        <div class="service-option-price">${window.formatCurrency(service.price)}</div>
      </div>
    `,
      )
      .join("")

    servicesContainer.innerHTML = servicesHTML
  }

  toggleService(serviceId) {
    const checkbox = document.querySelector(`input[value="${serviceId}"]`)
    const serviceOption = checkbox.closest(".service-option")

    if (checkbox.checked) {
      serviceOption.classList.add("selected")
    } else {
      serviceOption.classList.remove("selected")
    }

    this.calculateTotal()
  }

  calculateTotal() {
    const selectedServices = document.querySelectorAll('#servicesSelection input[type="checkbox"]:checked')
    const discountPercent = Number.parseFloat(document.getElementById("transactionDiscount")?.value || 0)
    const taxPercent = Number.parseFloat(document.getElementById("transactionTax")?.value || 0)

    let subtotal = 0
    selectedServices.forEach((checkbox) => {
      const service = this.services.find((s) => s.id === checkbox.value)
      if (service) {
        subtotal += service.price
      }
    })

    const discountAmount = (subtotal * discountPercent) / 100
    const taxableAmount = subtotal - discountAmount
    const taxAmount = (taxableAmount * taxPercent) / 100
    const total = taxableAmount + taxAmount

    // Update display
    document.getElementById("subtotalAmount").textContent = window.formatCurrency(subtotal)
    document.getElementById("discountAmount").textContent = window.formatCurrency(discountAmount)
    document.getElementById("taxAmount").textContent = window.formatCurrency(taxAmount)
    document.getElementById("totalAmount").textContent = window.formatCurrency(total)
  }

  closeModal() {
    const modal = document.getElementById("transactionModal")
    modal.classList.remove("show")
  }

  saveTransaction() {
    const form = document.getElementById("transactionForm")
    const formData = new FormData(form)
    const transactionId = document.getElementById("transactionId").value

    // Get selected services
    const selectedServices = []
    const selectedCheckboxes = document.querySelectorAll('#servicesSelection input[type="checkbox"]:checked')
    selectedCheckboxes.forEach((checkbox) => {
      const service = this.services.find((s) => s.id === checkbox.value)
      if (service) {
        selectedServices.push({
          id: service.id,
          name: service.name,
          price: service.price,
        })
      }
    })

    // Validation
    if (
      !formData.get("customer") ||
      !formData.get("date") ||
      !formData.get("method") ||
      selectedServices.length === 0
    ) {
      window.showNotification("Mohon lengkapi semua field yang wajib diisi!", "error")
      return
    }

    // Get customer info
    const customer = this.customers.find((c) => c.id === formData.get("customer"))
    if (!customer) {
      window.showNotification("Customer tidak ditemukan!", "error")
      return
    }

    // Calculate totals
    const subtotal = selectedServices.reduce((sum, service) => sum + service.price, 0)
    const discountPercent = Number.parseFloat(formData.get("discount") || 0)
    const taxPercent = Number.parseFloat(formData.get("tax") || 0)
    const discountAmount = (subtotal * discountPercent) / 100
    const taxableAmount = subtotal - discountAmount
    const taxAmount = (taxableAmount * taxPercent) / 100
    const total = taxableAmount + taxAmount

    const transactionData = {
      id: transactionId || window.generateId("TRX"),
      customerId: customer.id,
      customerName: customer.name,
      customerAvatar: customer.avatar || "",
      services: selectedServices,
      subtotal: subtotal,
      discount: discountPercent,
      tax: taxPercent,
      total: total,
      paymentMethod: formData.get("method"),
      status: formData.get("status"),
      date: formData.get("date"),
      notes: formData.get("notes") || "",
    }

    if (transactionId) {
      // Update existing transaction
      const index = this.transactions.findIndex((t) => t.id === transactionId)
      this.transactions[index] = transactionData
      window.showNotification("Transaksi berhasil diperbarui!", "success")
    } else {
      // Add new transaction
      this.transactions.unshift(transactionData)
      window.showNotification("Transaksi baru berhasil ditambahkan!", "success")
    }

    this.closeModal()
    this.renderTransactions()
    this.updateStats()
  }

  viewTransaction(transactionId) {
    const transaction = this.transactions.find((t) => t.id === transactionId)
    if (!transaction) return

    const formattedDate = this.formatTransactionDate(transaction.date)
    const servicesHTML = transaction.services
      .map(
        (service) => `
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span>${service.name}</span>
        <span style="font-weight: 600; color: var(--pink);">${window.formatCurrency(service.price)}</span>
      </div>
    `,
      )
      .join("")

    const discountAmount = (transaction.subtotal * transaction.discount) / 100
    const taxAmount = ((transaction.subtotal - discountAmount) * transaction.tax) / 100

    const transactionDetails = `
      <div class="transaction-detail-modal">
        <div class="transaction-detail-header" style="text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #e1e5e9;">
          <h2 style="margin-bottom: 0.5rem; color: var(--foreground);">Transaksi ${transaction.id}</h2>
          <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
            <span class="payment-method ${transaction.paymentMethod}">${this.getPaymentMethodName(transaction.paymentMethod)}</span>
            <span class="status ${transaction.status}">${transaction.status}</span>
          </div>
          <div style="color: var(--muted); font-size: 0.9rem;">${formattedDate}</div>
        </div>
        
        <div class="transaction-detail-content" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem;">
          <div>
            <strong>Informasi Customer:</strong>
            <div style="margin-top: 0.5rem; display: flex; align-items: center; gap: 1rem;">
              <div class="customer-avatar" style="width: 50px; height: 50px;">
                ${
                  transaction.customerAvatar
                    ? `<img src="${transaction.customerAvatar}" alt="${transaction.customerName}" style="width: 100%; height: 100%; object-fit: cover;">`
                    : transaction.customerName.charAt(0).toUpperCase()
                }
              </div>
              <div>
                <div style="font-weight: 600; color: var(--foreground);">${transaction.customerName}</div>
                <div style="font-size: 0.9rem; color: var(--muted);">Customer ID: ${transaction.customerId}</div>
              </div>
            </div>
          </div>
          
          <div>
            <strong>Detail Pembayaran:</strong>
            <div style="margin-top: 0.5rem; line-height: 1.6;">
              <div style="display: flex; justify-content: space-between;">
                <span>Subtotal:</span>
                <span>${window.formatCurrency(transaction.subtotal)}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Diskon (${transaction.discount}%):</span>
                <span>-${window.formatCurrency(discountAmount)}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Pajak (${transaction.tax}%):</span>
                <span>${window.formatCurrency(taxAmount)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.1rem; color: var(--pink); border-top: 1px solid #e1e5e9; padding-top: 0.5rem; margin-top: 0.5rem;">
                <span>Total:</span>
                <span>${window.formatCurrency(transaction.total)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <strong>Layanan yang Dipilih:</strong>
          <div style="margin-top: 0.5rem; background: var(--cream-light); padding: 1rem; border-radius: var(--border-radius);">
            ${servicesHTML}
          </div>
        </div>
        
        ${
          transaction.notes
            ? `
          <div>
            <strong>Catatan:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.6; background: var(--cream-light); padding: 1rem; border-radius: var(--border-radius);">
              ${transaction.notes}
            </p>
          </div>
        `
            : ""
        }
      </div>
    `

    this.showCustomModal("Detail Transaksi", transactionDetails)
  }

  editTransaction(transactionId) {
    this.openTransactionModal(transactionId)
  }

  printTransaction(transactionId) {
    const transaction = this.transactions.find((t) => t.id === transactionId)
    if (!transaction) return

    // Create a simple print window
    const printWindow = window.open("", "_blank")
    const formattedDate = new Date(transaction.date).toLocaleDateString("id-ID")
    const servicesHTML = transaction.services
      .map(
        (service) => `
      <tr>
        <td>${service.name}</td>
        <td style="text-align: right;">${window.formatCurrency(service.price)}</td>
      </tr>
    `,
      )
      .join("")

    const discountAmount = (transaction.subtotal * transaction.discount) / 100
    const taxAmount = ((transaction.subtotal - discountAmount) * transaction.tax) / 100

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${transaction.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { padding: 10px; border-bottom: 1px solid #ddd; }
            th { background-color: #f5f5f5; }
            .total-row { font-weight: bold; }
            .text-right { text-align: right; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Glow & Grace</h1>
            <h2>Invoice ${transaction.id}</h2>
          </div>
          
          <div class="invoice-details">
            <p><strong>Customer:</strong> ${transaction.customerName}</p>
            <p><strong>Tanggal:</strong> ${formattedDate}</p>
            <p><strong>Metode Pembayaran:</strong> ${this.getPaymentMethodName(transaction.paymentMethod)}</p>
            <p><strong>Status:</strong> ${transaction.status}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Layanan</th>
                <th style="text-align: right;">Harga</th>
              </tr>
            </thead>
            <tbody>
              ${servicesHTML}
              <tr>
                <td><strong>Subtotal</strong></td>
                <td class="text-right"><strong>${window.formatCurrency(transaction.subtotal)}</strong></td>
              </tr>
              <tr>
                <td>Diskon (${transaction.discount}%)</td>
                <td class="text-right">-${window.formatCurrency(discountAmount)}</td>
              </tr>
              <tr>
                <td>Pajak (${transaction.tax}%)</td>
                <td class="text-right">${window.formatCurrency(taxAmount)}</td>
              </tr>
              <tr class="total-row">
                <td><strong>TOTAL</strong></td>
                <td class="text-right"><strong>${window.formatCurrency(transaction.total)}</strong></td>
              </tr>
            </tbody>
          </table>
          
          ${transaction.notes ? `<p><strong>Catatan:</strong> ${transaction.notes}</p>` : ""}
          
          <div style="margin-top: 40px; text-align: center; color: #666;">
            <p>Terima kasih atas kepercayaan Anda!</p>
          </div>
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.print()
  }

  deleteTransaction(transactionId) {
    const transaction = this.transactions.find((t) => t.id === transactionId)
    if (!transaction) return

    this.showDeleteConfirmation(`Apakah Anda yakin ingin menghapus transaksi "${transaction.id}"?`, () => {
      this.transactions = this.transactions.filter((t) => t.id !== transactionId)
      this.renderTransactions()
      this.updateStats()
      window.showNotification("Transaksi berhasil dihapus!", "success")
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

// Initialize transactions manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.transactionsManager = new TransactionsManager()
})
