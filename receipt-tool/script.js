async function generateHash() {
  const message = document.getElementById('messageInput').value.trim();
  const link = document.getElementById('linkInput').value.trim();
  const previousTx = document.getElementById('previousTxInput').value.trim();

  if (!message) {
    alert("Please enter a message.");
    return;
  }

  const fullText = `Message:\n${message}\n\nAttached Link:\n${link}\n\nPrevious/Master TxID:\n${previousTx}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(fullText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  localStorage.setItem("receipt_data", JSON.stringify({
    creator: "AnonymousUser123",
    timestamp: new Date().toISOString(),
    message,
    link,
    previousTx,
    hash: hashHex
  }));

  document.body.innerHTML = "<h2>⏳ Generating certificate...</h2>";
  setTimeout(() => {
    window.location.href = "template.html";
  }, 3000);
}
