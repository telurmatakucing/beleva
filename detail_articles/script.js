// Data artikel lengkap untuk semua artikel
const articlesData = {
  1: {
    title: "Rahasia Kulit Sehat dan Bercahaya di Segala Usia",
    category: "Skincare",
    date: "12 Mei 2023",
    image: "https://i.pinimg.com/736x/46/8a/2f/468a2f92d35e4a1ab2b92cb18d561931.jpg",
    content: `
            <p class="article-intro">Memiliki kulit yang sehat dan bercahaya adalah impian setiap orang. Artikel ini mengungkap rahasia perawatan kulit yang efektif untuk berbagai usia, dari remaja hingga dewasa.</p>
            <h2>Mengapa Perawatan Kulit Penting?</h2>
            <p>Kulit adalah organ terbesar dalam tubuh kita dan berfungsi sebagai pelindung pertama dari berbagai faktor eksternal. Perawatan kulit yang tepat tidak hanya membuat penampilan lebih menarik, tetapi juga menjaga kesehatan kulit secara keseluruhan.</p>
            <!-- Konten lainnya sama seperti sebelumnya -->
            <h2>Kesimpulan</h2>
            <p>Kulit sehat dan bercahaya dapat dicapai dengan rutinitas perawatan yang konsisten dan sesuai dengan usia serta jenis kulit. Ingatlah bahwa hasil yang optimal membutuhkan waktu dan kesabaran.</p>
        `,
    author: { name: "Dr. Sarah Beauty", title: "Beauty Expert" }
  },
  2: {
    title: "Perawatan Rambut Musim Panas: Melindungi Rambut dari Kerusakan Akibat Sinar Matahari",
    category: "Hair Care",
    date: "5 Mei 2023",
    image: "https://i.pinimg.com/736x/08/40/d7/0840d7c276144d0198c024b0d5cd8c0d.jpg",
    content: `
            <p class="article-intro">Musim panas bisa menjadi tantangan besar untuk kesehatan rambut. Sinar matahari, klorin, dan udara panas dapat merusak struktur rambut dan membuatnya kering serta rapuh.</p>
            <h2>Dampak Musim Panas pada Rambut</h2>
            <p>Paparan sinar UV dapat merusak protein keratin dalam rambut, menyebabkan warna memudar dan tekstur menjadi kasar.</p>
            <!-- Konten lainnya sama seperti sebelumnya -->
            <h2>Kesimpulan</h2>
            <p>Dengan perawatan yang tepat, rambut Anda tetap bisa sehat dan indah meski di musim panas.</p>
        `,
    author: { name: "Rina Hair Expert", title: "Hair Specialist" }
  },
  3: {
    title: "Panduan Lengkap Tren Nail Art Terkini",
    category: "Nail Care",
    date: "28 April 2023",
    image: "https://i.pinimg.com/736x/86/40/39/86403904ca808367b8be780124adfaab.jpg",
    content: `
            <p class="article-intro">Nail art telah menjadi bagian penting dari fashion dan self-expression. Dari desain minimalis hingga yang elaborate, ada banyak tren menarik yang bisa Anda coba di tahun 2023.</p>
            <h2>Mengapa Nail Art Populer?</h2>
            <p>Nail art memberikan kesempatan untuk mengekspresikan kreativitas dan personalitas melalui ujung jari.</p>
            <!-- Konten lainnya sama seperti sebelumnya -->
            <h2>Kesimpulan</h2>
            <p>Nail art adalah cara yang menyenangkan untuk mengekspresikan kreativitas.</p>
        `,
    author: { name: "Lina Nail Artist", title: "Nail Technician" }
  },
  4: {
    title: "5 Langkah Mudah untuk Kuku Sehat dan Kuat",
    category: "Nail Care",
    date: "20 April 2023",
    image: "https://i.pinimg.com/736x/d8/8b/60/d88b6067d5483f79d823a872752e2987.jpg",
    content: `
            <p class="article-intro">Kuku yang sehat adalah fondasi dari nail art yang indah dan tahan lama. Dengan perawatan yang tepat dan konsisten, Anda bisa memiliki kuku yang kuat.</p>
            <h2>Mengapa Kuku Sehat Penting?</h2>
            <p>Kuku yang sehat tidak hanya terlihat indah, tetapi juga mencerminkan kesehatan tubuh secara keseluruhan.</p>
            <!-- Konten lainnya sama seperti sebelumnya -->
            <h2>Kesimpulan</h2>
            <p>Kuku sehat membutuhkan perawatan konsisten dari luar dan dalam.</p>
        `,
    author: { name: "Lina Nail Artist", title: "Nail Technician" }
  }
};

// Fungsi untuk mendapatkan parameter URL
function getUrlParameter(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Fungsi untuk memuat artikel berdasarkan ID
function loadArticle() {
  const articleId = getUrlParameter("id") || "1";
  console.log("Loading article with ID:", articleId);
  const article = articlesData[articleId];

  if (article) {
    document.getElementById("article-title").textContent = article.title;
    document.getElementById("article-category").textContent = article.category;
    document.getElementById("article-date").textContent = article.date;
    document.getElementById("article-image").src = article.image;
    document.getElementById("article-image").alt = article.title;
    document.getElementById("article-body").innerHTML = article.content;
    document.getElementById("breadcrumb-title").textContent = article.title;
    document.title = `${article.title} - Glow & Grace Beauty Salon`;
    document.getElementById("article-author-name").textContent = article.author.name;
    document.getElementById("article-author-title").textContent = article.author.title;
    updateCategoryColor(article.category);
    loadRelatedArticles(articleId);
  } else {
    document.getElementById("article-title").textContent = "Artikel Tidak Ditemukan";
    document.getElementById("article-body").innerHTML = "<p>Maaf, artikel yang Anda cari tidak ditemukan.</p>";
  }
}

// Fungsi untuk mengupdate warna kategori
function updateCategoryColor(category) {
  const categoryElement = document.getElementById("article-category");
  categoryElement.className = "article-category";
  switch (category.toLowerCase()) {
    case "skincare": categoryElement.style.background = "#e91e63"; break;
    case "hair care": categoryElement.style.background = "#2196f3"; break;
    case "nail care": categoryElement.style.background = "#9c27b0"; break;
    case "makeup": categoryElement.style.background = "#ff9800"; break;
    case "wellness": categoryElement.style.background = "#4caf50"; break;
    default: categoryElement.style.background = "#666";
  }
}

// Fungsi untuk memuat artikel terkait
function loadRelatedArticles(currentId) {
  const relatedArticlesContainer = document.getElementById("related-articles");
  const articleIds = ["1", "2", "3", "4"].filter((id) => id !== currentId);
  relatedArticlesContainer.innerHTML = "";

  articleIds.forEach((id) => {
    const article = articlesData[id];
    const articleElement = document.createElement("div");
    articleElement.className = "related-article";
    articleElement.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <div class="related-content">
        <h4>${article.title}</h4>
        <p class="related-date">${article.date}</p>
      </div>
    `;
    relatedArticlesContainer.appendChild(articleElement);
  });

  initRelatedArticlesClickHandlers();
}

// Fungsi untuk menangani klik pada artikel terkait
function initRelatedArticlesClickHandlers() {
  const relatedArticles = document.querySelectorAll(".related-article");

  relatedArticles.forEach((article, index) => {
    article.addEventListener("click", () => {
      const currentId = getUrlParameter("id") || "1";
      const articleIds = ["1", "2", "3", "4"].filter((id) => id !== currentId);

      if (articleIds[index]) {
        window.location.href = `index.html?id=${articleIds[index]}`;
      }
    });

    article.style.cursor = "pointer";
    article.addEventListener("mouseenter", () => {
      article.style.transform = "translateY(-2px)";
      article.style.transition = "transform 0.3s ease";
    });
    article.addEventListener("mouseleave", () => {
      article.style.transform = "translateY(0)";
    });
  });
}

// Fungsi lainnya (mobile menu, newsletter, dll.) tetap sama seperti sebelumnya
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove("active");
      }
    });
  }
}

function initNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (email) {
        const button = this.querySelector("button");
        const originalText = button.textContent;

        button.textContent = "Subscribing...";
        button.disabled = true;

        setTimeout(() => {
          alert("Terima kasih! Anda telah berlangganan newsletter kami.");
          this.querySelector('input[type="email"]').value = "";
          button.textContent = originalText;
          button.disabled = false;
        }, 1500);
      }
    });
  }
}

function initShareButtons() {
  const shareButtons = document.querySelectorAll(".share-btn");

  shareButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const currentUrl = window.location.href;
      const articleTitle = document.getElementById("article-title").textContent;
      const platform = this.classList[1];
      let shareUrl = "";

      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(articleTitle)}`;
          break;
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${encodeURIComponent(articleTitle + " " + currentUrl)}`;
          break;
        case "instagram":
          alert("Silakan copy link artikel ini dan share di Instagram Stories Anda!");
          navigator.clipboard.writeText(currentUrl).then(() => {
            console.log("Link copied to clipboard");
          });
          return;
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank", "width=600,height=400");
      }
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function initReadingProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #d16ba5, #d16ba5);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const article = document.querySelector(".article-content");
    if (article) {
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      const progress = Math.min(Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0), 1);
      progressBar.style.width = progress * 100 + "%";
    }
  });
}

function initCopyLink() {
  const shareSection = document.querySelector(".article-share");
  if (shareSection) {
    const copyBtn = document.createElement("button");
    copyBtn.innerHTML = '<i class="fas fa-link"></i>';
    copyBtn.className = "share-btn copy-link";
    copyBtn.style.background = "#666";
    copyBtn.title = "Copy Link";

    copyBtn.addEventListener("click", () => {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fas fa-check"></i>';
          copyBtn.style.background = "#4caf50";

          setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = "#666";
          }, 2000);
        })
        .catch(() => {
          const textArea = document.createElement("textarea");
          textArea.value = window.location.href;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);

          copyBtn.innerHTML = '<i class="fas fa-check"></i>';
          copyBtn.style.background = "#4caf50";
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-link"></i>';
            copyBtn.style.background = "#666";
          }, 2000);
        });
    });

    shareSection.appendChild(copyBtn);
  }
}



// Initialize semua fungsi saat DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  loadArticle();
  initMobileMenu();
  initNewsletterForm();
  initShareButtons();
  initRelatedArticlesClickHandlers(); // Panggil setelah artikel terkait dimuat
  initSmoothScroll();
  initReadingProgress();
  initCopyLink();
  initPrintArticle();
});

// Handle back button
window.addEventListener("popstate", () => {
  loadArticle();
});

// Handle page visibility change
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    loadArticle();
  }
});