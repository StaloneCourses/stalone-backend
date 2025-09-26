document.addEventListener("DOMContentLoaded", () => {
  // Consultation Form Submit
const consultationForm = document.getElementById("consultationForm");

if (consultationForm) {
  consultationForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      email: document.getElementById("email").value,
      course: document.getElementById("course").value,
      location: document.getElementById("location").value,
      communication: document.getElementById("communication").value,
      message: document.getElementById("message").value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        document.getElementById("thankYouMessage").style.display = "block";
        // Optional: clear or disable form fields after success
        consultationForm.reset();
        // Or disable all fields if you want:
        // [...consultationForm.elements].forEach(el => el.disabled = true);
      } else {
        const result = await res.json();
        alert("❌ Something went wrong: " + (result.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Consultation Error:", err);
      alert("⚠️ Server error. Please try again later.");
    }
  });
}

  // Course Enroll Buttons
  const enrollButtons = document.querySelectorAll(".enroll-btn");

  enrollButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();

      const course = button.getAttribute("data-course-name");
      const name = prompt("Enter your name:");
      const email = prompt("Enter your email:");
      const phone = prompt("Enter your phone:");
      const message = prompt("Any message?");

      if (!name || !email || !phone || !course) {
        alert("❌ All fields are required!");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/enrollments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, course, message }),
        });

        const result = await response.json();

        if (response.ok) {
          const msg = document.createElement("span");
          msg.textContent = " ✅ Enrolled successfully!";
          msg.style.color = "limegreen";
          msg.style.marginLeft = "10px";
          button.parentElement.appendChild(msg);
          setTimeout(() => msg.remove(), 3000);
        } else {
          alert("❌ Failed: " + (result.message || "Unknown error"));
        }
      } catch (err) {
        console.error("Enrollment Error:", err);
        alert("⚠️ Something went wrong!");
      }
    });
  });

  // Testimonials Slider Functionality
  let currentSlide = 0;
  const slide = document.getElementById("testimonialSlide");
  const items = slide ? slide.querySelectorAll(".testimonial-item") : [];

  function showSlide(index) {
    if (!slide) return;
    currentSlide = (index + items.length) % items.length;
    slide.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  window.moveSlide = function (n) {
    showSlide(currentSlide + n);
  };

  if (slide) showSlide(0);
});
