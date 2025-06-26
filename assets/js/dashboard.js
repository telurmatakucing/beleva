// Dashboard Specific JavaScript
class Dashboard {
  constructor() {
    this.activities = []
    this.init()
  }

  init() {
    this.loadDashboardData()
    this.renderRecentActivities()
    this.initializeCharts()
    this.startRealTimeUpdates()
  }

  loadDashboardData() {
    // Simulate loading dashboard statistics
    const stats = {
      articles: 24,
      products: 12,
      users: 1234,
      transactions: 89,
    }

    // Update stat numbers with animation
    this.animateStatNumbers(stats)
  }

  animateStatNumbers(stats) {
    const statElements = {
      totalArticles: document.getElementById("totalArticles"),
      totalProducts: document.getElementById("totalProducts"),
      totalUsers: document.getElementById("totalUsers"),
      totalTransactions: document.getElementById("totalTransactions"),
    }

    Object.keys(statElements).forEach((key) => {
      const element = statElements[key]
      if (element) {
        const targetValue = stats[key.replace("total", "").toLowerCase()]
        this.animateNumber(element, 0, targetValue, 1500)
      }
    })
  }

  animateNumber(element, start, end, duration) {
    const startTime = performance.now()
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (end - start) * easeOutQuart)

      element.textContent = current.toLocaleString("id-ID")

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }

  renderRecentActivities() {
    const activitiesContainer = document.getElementById("recentActivities")
    if (!activitiesContainer) return

    // Sample activities data
    this.activities = [
      {
        id: 1,
        type: "success",
        icon: "user-plus",
        title: "Pengguna baru terdaftar",
        description: "Sarah Johnson bergabung sebagai customer",
        time: "2 menit yang lalu",
      },
      {
        id: 2,
        type: "info",
        icon: "calendar-check",
        title: "Booking baru",
        description: "Facial Treatment dijadwalkan untuk besok",
        time: "15 menit yang lalu",
      },
      {
        id: 3,
        type: "success",
        icon: "credit-card",
        title: "Pembayaran berhasil",
        description: "Transaksi Rp 500,000 telah dikonfirmasi",
        time: "1 jam yang lalu",
      },
      {
        id: 4,
        type: "warning",
        icon: "exclamation-triangle",
        title: "Stok produk menipis",
        description: "Hair Treatment Oil tersisa 3 unit",
        time: "2 jam yang lalu",
      },
      {
        id: 5,
        type: "info",
        icon: "edit",
        title: "Artikel diperbarui",
        description: "Tips Skincare Musim Hujan telah direvisi",
        time: "3 jam yang lalu",
      },
    ]

    const activitiesHTML = this.activities
      .map(
        (activity) => `
      <div class="activity-item">
        <div class="activity-icon ${activity.type}">
          <i class="fas fa-${activity.icon}"></i>
        </div>
        <div class="activity-content">
          <div class="activity-title">${activity.title}</div>
          <div class="activity-description">${activity.description}</div>
        </div>
        <div class="activity-time">${activity.time}</div>
      </div>
    `,
      )
      .join("")

    activitiesContainer.innerHTML = activitiesHTML
  }

  initializeCharts() {
    // Initialize sales chart
    this.initSalesChart()

    // Initialize services chart
    this.initServicesChart()
  }

  initSalesChart() {
    const salesCanvas = document.getElementById("salesChart")
    if (!salesCanvas) return

    // For now, we'll create a placeholder
    // In a real app, you would use Chart.js or similar library
    const ctx = salesCanvas.getContext("2d")

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(0, "rgba(209, 107, 165, 0.8)")
    gradient.addColorStop(1, "rgba(209, 107, 165, 0.1)")

    // Sample data for demonstration
    const data = [30, 45, 35, 60, 55, 70, 65, 80, 75, 90, 85, 95]
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    this.drawLineChart(ctx, data, labels, gradient)
  }

  initServicesChart() {
    const servicesCanvas = document.getElementById("servicesChart")
    if (!servicesCanvas) return

    const ctx = servicesCanvas.getContext("2d")

    // Sample data for services
    const data = [35, 25, 20, 15, 5] // percentages
    const labels = ["Facial", "Hair Care", "Massage", "Nail Care", "Makeup"]
    const colors = ["#d16ba5", "#ff5c7f", "#4caf50", "#2196f3", "#ff9800"]

    this.drawPieChart(ctx, data, labels, colors)
  }

  drawLineChart(ctx, data, labels, gradient) {
    const canvas = ctx.canvas
    const width = canvas.width
    const height = canvas.height
    const padding = 40

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate dimensions
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const maxValue = Math.max(...data)
    const stepX = chartWidth / (data.length - 1)

    // Draw grid lines
    ctx.strokeStyle = "#e1e5e9"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = "#d16ba5"
    ctx.lineWidth = 3

    data.forEach((value, index) => {
      const x = padding + stepX * index
      const y = padding + chartHeight - (value / maxValue) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw points
    ctx.fillStyle = "#d16ba5"
    data.forEach((value, index) => {
      const x = padding + stepX * index
      const y = padding + chartHeight - (value / maxValue) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  drawPieChart(ctx, data, labels, colors) {
    const canvas = ctx.canvas
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let currentAngle = -Math.PI / 2 // Start from top
    const total = data.reduce((sum, value) => sum + value, 0)

    data.forEach((value, index) => {
      const sliceAngle = (value / total) * Math.PI * 2

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = colors[index]
      ctx.fill()

      // Draw border
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 2
      ctx.stroke()

      currentAngle += sliceAngle
    })

    // Draw legend
    const legendX = 20
    let legendY = 20

    labels.forEach((label, index) => {
      // Color box
      ctx.fillStyle = colors[index]
      ctx.fillRect(legendX, legendY, 12, 12)

      // Label text
      ctx.fillStyle = "#333"
      ctx.font = "12px Poppins"
      ctx.fillText(`${label} (${data[index]}%)`, legendX + 20, legendY + 10)

      legendY += 20
    })
  }

  startRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
      this.updateDashboardStats()
    }, 30000)
  }

  updateDashboardStats() {
    // Simulate random stat updates
    const elements = ["totalArticles", "totalProducts", "totalUsers", "totalTransactions"]
    const randomElement = elements[Math.floor(Math.random() * elements.length)]
    const element = document.getElementById(randomElement)

    if (element) {
      const currentValue = Number.parseInt(element.textContent.replace(/,/g, ""))
      const change = Math.floor(Math.random() * 5) + 1
      const newValue = currentValue + change

      this.animateNumber(element, currentValue, newValue, 1000)

      // Show notification for the update
      const statNames = {
        totalArticles: "artikel",
        totalProducts: "layanan",
        totalUsers: "pengguna",
        totalTransactions: "transaksi",
      }

      window.showNotification(`${statNames[randomElement]} bertambah +${change}`, "info")
    }
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("totalArticles")) {
    window.dashboard = new Dashboard()
  }
})
