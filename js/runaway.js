(function() {
    var noBtn = document.getElementById('noBtn');
    var yesBtn = document.getElementById('yesBtn');
    if (!noBtn) return;

    var messages = [
        "No",
        "Are you sure?",
        "Really Sure?",
        "Think again!",
        "Please don't 🥺",
        "My heart... 💔",
        "Give me a chance! 💖",
        "Pretty please? 🙏",
        "I'll be so sad 😢",
        "You can't catch me!"
    ];
    var count = 0;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
    }

    function ensureFixed() {
        if (noBtn.style.position !== 'fixed') {
            var rect = noBtn.getBoundingClientRect();
            noBtn.style.position = 'fixed';
            noBtn.style.margin = '0';
            noBtn.style.zIndex = '9999';
            noBtn.style.left = rect.left + 'px';
            noBtn.style.top = rect.top + 'px';
        }
    }

    function moveTo(x,y) {
        ensureFixed();
        var pad = 12;
        var rect = noBtn.getBoundingClientRect();
        var maxX = Math.max(0, window.innerWidth - rect.width - pad);
        var maxY = Math.max(0, window.innerHeight - rect.height - pad);
        noBtn.style.left = clamp(x, pad, maxX) + 'px';
        noBtn.style.top = clamp(y, pad, maxY) + 'px';
    }

    function randomSpot() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        };
    }
    
    function flee() {

        count++;
        noBtn.textContent = messages[Math.min(count, messages.length - 1)];
        if (yesBtn) {
            yesBtn.style.transform = 'scale(' + Math.min(1 + count * 0.88, 1.8) + ')';
        }
        
        noBtn.style.transition = 'left 0.15s ease, top 0.15s ease';
        var spot = randomSpot();
        moveTo(spot.x, spot.y);
    }

    // function wander() {
    //     noBtn.style.transition = 'left 0.12s ease-in-out, top 1.2s ease-in-out';
    //     var spot = randomSpot();
    //     moveTo(spot.x, spot.y);
    // }

    // setInterval(wander, 1500);

    noBtn.addEventListener('mouseenter', flee);
    noBtn.addEventListener('mouseover', flee);
    noBtn.addEventListener('mousedown', function(e) {
        e.preventDefault();
        flee();
    });
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        flee();
    });
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        flee();
    },
    { passive: false });

    document.addEventListener('mousemove', function(e) {
        var rect = noBtn.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));
        if (dist < 110) {
            flee();
        }
    });

    window.addEventListener('resize', function() {
        if (noBtn.style.position === 'fixed') {
            moveTo(parseFloat(noBtn.style.left) || 0, parseFloat(noBtn.style.top) || 0);
        }
    });
})();
