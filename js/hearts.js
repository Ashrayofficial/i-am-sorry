(function() {
    // Heart animation logic
    var container = document.createElement("div");
    container.className = "hearts-container";
    document.body.appendChild(container);

    var emojis = ["💖", "💞", "💗", "💓", "💞", "🌸", "💘", "🌷"];

    function spawn() {
        var heart = document.createElement("span");
        heart.className = "heart";
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 22 + 14 + "px";
        heart.style.animationDuration = Math.random() * 5 + 6 + "s";
        container.appendChild(heart);
        setTimeout(function() {
            heart.remove();
        }, 11000);
    }

    setInterval(spawn, 480);
})();
