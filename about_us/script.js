// About Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
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
        header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.15)"
      } else {
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
      }
    })
  }

  // Animate elements on scroll
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  if (animateElements.length > 0) {
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
    }

    // Add animation class when element is in viewport
    function checkAnimations() {
      animateElements.forEach((element) => {
        if (isInViewport(element) && !element.classList.contains("animated")) {
          element.classList.add("animated")
        }
      })
    }

    // Check animations on scroll
    window.addEventListener("scroll", checkAnimations)

    // Check animations on page load
    checkAnimations()
  }

  // Team Member Hover Effects
  const teamMembers = document.querySelectorAll(".team-member")

  teamMembers.forEach((member) => {
    member.addEventListener("mouseenter", () => {
      teamMembers.forEach((m) => {
        if (m !== member) {
          m.style.opacity = "0.7"
        }
      })
    })

    member.addEventListener("mouseleave", () => {
      teamMembers.forEach((m) => {
        m.style.opacity = "1"
      })
    })
  })

  // Counter Animation for Stats
  const statNumbers = document.querySelectorAll(".stat-number")
  let hasAnimated = false

  function animateCounters() {
    if (hasAnimated) return

    const impactSection = document.querySelector(".community-impact")
    if (!impactSection) return

    const rect = impactSection.getBoundingClientRect()
    if (rect.top <= window.innerHeight * 0.8) {
      hasAnimated = true

      statNumbers.forEach((stat) => {
        const target = Number.parseInt(stat.getAttribute("data-target"))
        let current = 0
        const increment = target / 60
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          stat.textContent = Math.floor(current)
        }, 30)
      })
    }
  }

  window.addEventListener("scroll", animateCounters)
  animateCounters() // Check on page load

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Button hover effects
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-3px)"
      button.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)"
    })

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)"
      button.style.boxShadow = "none"
    })
  })

  // Facility cards hover effect
  const facilityCards = document.querySelectorAll(".facility-card")

  facilityCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      facilityCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.style.opacity = "0.7"
        }
      })
    })

    card.addEventListener("mouseleave", () => {
      facilityCards.forEach((otherCard) => {
        otherCard.style.opacity = "1"
      })
    })
  })

  // Review cards animation on scroll
  const reviewCards = document.querySelectorAll(".review-card")
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const reviewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  }, observerOptions)

  reviewCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    reviewObserver.observe(card)
  })

  // Social links hover effects
  const socialLinks = document.querySelectorAll(".social-link")

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const icon = link.querySelector("i")
      icon.style.transform = "scale(1.2)"
    })

    link.addEventListener("mouseleave", () => {
      const icon = link.querySelector("i")
      icon.style.transform = "scale(1)"
    })
  })

  // Map placeholder click effect
  const mapPlaceholder = document.querySelector(".map-placeholder")
  if (mapPlaceholder) {
    mapPlaceholder.addEventListener("click", () => {
      // In a real implementation, this would open Google Maps
      alert("Membuka Google Maps...")
    })

    mapPlaceholder.style.cursor = "pointer"
  }

  // Scroll to top functionality
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>'
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--pink);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  `

  document.body.appendChild(scrollToTopBtn)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = "1"
      scrollToTopBtn.style.visibility = "visible"
    } else {
      scrollToTopBtn.style.opacity = "0"
      scrollToTopBtn.style.visibility = "hidden"
    }
  })

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Animate rating bars on scroll
  const ratingBars = document.querySelectorAll(".fill")
  hasAnimated = false

  function animateRatingBars() {
    if (hasAnimated) return

    const ratingsSection = document.querySelector(".overall-rating")
    if (!ratingsSection) return

    const rect = ratingsSection.getBoundingClientRect()
    if (rect.top <= window.innerHeight * 0.8) {
      hasAnimated = true

      ratingBars.forEach((bar, index) => {
        const width = bar.style.width
        bar.style.width = "0%"

        setTimeout(() => {
          bar.style.width = width
        }, index * 200)
      })
    }
  }

  window.addEventListener("scroll", animateRatingBars)
  animateRatingBars() // Check on page load

  // Smooth Reveal Animation for Sections
  const revealElements = document.querySelectorAll(
    ".founder-content, .philosophy-content, .values-header, .promise-header, .impact-content, .join-content",
  )

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.2 },
  )

  revealElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    revealObserver.observe(element)
  })

  // Experience Steps Stagger Animation
  const experienceSteps = document.querySelectorAll(".step")
  const stepsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const steps = entry.target.parentElement.querySelectorAll(".step")
          steps.forEach((step, index) => {
            setTimeout(() => {
              step.style.opacity = "1"
              step.style.transform = "translateY(0)"
            }, index * 150)
          })
        }
      })
    },
    { threshold: 0.3 },
  )

  if (experienceSteps.length > 0) {
    experienceSteps.forEach((step) => {
      step.style.opacity = "0"
      step.style.transform = "translateY(30px)"
      step.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    })
    stepsObserver.observe(experienceSteps[0])
  }

  // Founder Image Hover Effect
  const founderImage = document.querySelector(".image-frame img")
  if (founderImage) {
    founderImage.addEventListener("mouseenter", () => {
      founderImage.style.transform = "scale(1.05)"
    })

    founderImage.addEventListener("mouseleave", () => {
      founderImage.style.transform = "scale(1)"
    })
  }

  // Value Cards Interaction
  const valueCards = document.querySelectorAll(".value-card")
  valueCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      valueCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.style.opacity = "0.7"
          otherCard.style.transform = "scale(0.95)"
        }
      })
    })

    card.addEventListener("mouseleave", () => {
      valueCards.forEach((otherCard) => {
        otherCard.style.opacity = "1"
        otherCard.style.transform = "scale(1)"
      })
    })
  })

  // Philosophy Section Parallax
  const philosophyBg = document.querySelector(".philosophy-bg img")
  if (philosophyBg) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      const philosophySection = document.querySelector(".philosophy")
      if (philosophySection) {
        const sectionTop = philosophySection.offsetTop
        const sectionHeight = philosophySection.offsetHeight

        if (scrollPosition >= sectionTop - window.innerHeight && scrollPosition <= sectionTop + sectionHeight) {
          const translateY = (scrollPosition - sectionTop) * 0.3
          philosophyBg.style.transform = `translateY(${translateY}px)`
        }
      }
    })
  }

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.style.opacity = "1"
    document.body.style.transform = "translateY(0)"
  })

  // Initial loading state
  document.body.style.opacity = "0"
  document.body.style.transform = "translateY(20px)"
  document.body.style.transition = "opacity 0.6s ease, transform 0.6s ease"

  // Quote text typing effect
  const quoteText = document.querySelector(".quote-text")
  if (quoteText) {
    const text = quoteText.textContent
    quoteText.textContent = ""
    quoteText.style.opacity = "1"

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        quoteText.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 1000)
  }

  // Review stars animation
  const reviewStars = document.querySelectorAll(".review-stars")

  reviewStars.forEach((stars) => {
    const starElements = stars.querySelectorAll("i")

    stars.addEventListener("mouseenter", () => {
      starElements.forEach((star, index) => {
        setTimeout(() => {
          star.style.transform = "scale(1.2)"
          setTimeout(() => {
            star.style.transform = "scale(1)"
          }, 100)
        }, index * 50)
      })
    })
  })

  // Parallax effect for hero section
  const heroSection = document.querySelector(".about-hero")
  const heroBackground = document.querySelector(".hero-background img")

  if (heroSection && heroBackground) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      const heroHeight = heroSection.offsetHeight

      if (scrollPosition < heroHeight) {
        const translateY = scrollPosition * 0.5
        heroBackground.style.transform = `translateY(${translateY}px)`
      }
    })
  }

  // Gallery image hover effects
  const galleryImages = document.querySelectorAll(".gallery-images img, .main-image img")

  galleryImages.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.05)"
    })

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)"
    })
  })

  // Scroll Indicator Click
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const salonInfoSection = document.querySelector(".salon-info")
      if (salonInfoSection) {
        salonInfoSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  }

  // Timeline Animation on Scroll
  const timelineItems = document.querySelectorAll(".timeline-item")
  const timelineObserverOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  }

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, timelineObserverOptions)

  timelineItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(50px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`
    timelineObserver.observe(item)
  })
})
