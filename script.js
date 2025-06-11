const funnyMessages = [
  "Using my PhD in Googling...",
  "Consulting the Oracle of Search...",
  "Typing it for you, genius...",
  "Because you couldn't do it yourself...",
  "Ako na nagsearch para sayo..teka."
];

function startSearch(query, autoRedirect = false) {
  query = query.trim();
  if (!query) return;

  const queryInput = document.getElementById("query");
  const messageBox = document.getElementById("message");
  const shareable = document.getElementById("shareable");
  const copyBtn = document.getElementById("copy-btn");

  messageBox.innerText = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  shareable.innerHTML = "";
  copyBtn.style.display = "none";
  queryInput.value = "";

  let i = 0;

  function typeChar() {
    if (i < query.length) {
      queryInput.value += query[i];
      i++;
      setTimeout(typeChar, 100);
    } else {
      if (autoRedirect) {
        // Redirect to Google search after animation finishes
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        setTimeout(() => {
          window.location.href = googleUrl;
        }, 500); // small delay after typing ends before redirect
      } else {
        // Show shareable link on your site + copy button
        const siteUrl = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(query)}`;
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        shareable.innerHTML = `
          Share this search link to the genius: 
          <a href="${siteUrl}" target="_blank" rel="noopener">${siteUrl}</a><br><br>
          Or go directly to Google: 
          <a href="${googleUrl}" target="_blank" rel="noopener">${googleUrl}</a>
        `;
        copyBtn.setAttribute("data-link", siteUrl);
        copyBtn.style.display = "inline-block";
      }
    }
  }

  typeChar();
}

function copyLink() {
  const btn = document.getElementById("copy-btn");
  const link = btn.getAttribute("data-link");

  navigator.clipboard.writeText(link)
    .then(() => {
      btn.innerText = "✅ Copied!";
      setTimeout(() => {
        btn.innerText = "📋 Copy Link";
      }, 2000);
    })
    .catch(() => {
      btn.innerText = "❌ Failed to copy";
    });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// On page load, check if query param 'q' exists
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");
  if (query) {
    startSearch(query, true); // true means auto redirect after animation
  }
};

// Enter key triggers search without redirect
document.getElementById("query").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    startSearch(this.value, false);
  }
});
