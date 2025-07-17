document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseMsg = document.getElementById("formResponse");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    responseMsg.textContent = "Sending...";

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.ok) {
        responseMsg.textContent = "Message sent successfully!";
        form.reset();
      } else {
        responseMsg.textContent = "Error: " + result.error;
      }
    } catch (err) {
      responseMsg.textContent = "Failed to send message. Please try again.";
    }
  });
});