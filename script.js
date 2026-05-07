window.addEventListener("scroll", function () {
      var nav = document.getElementById("mainNav");
      if (nav) {
        if (window.scrollY > 60) { nav.classList.add("scrolled"); }
        else { nav.classList.remove("scrolled"); }
      }
    });

    // ---- 2. ARMOURY: scroll left / right ----
    function scrollArmoury(id, direction) {
      var row = document.getElementById(id);
      if (row) { row.scrollLeft += direction * 520; }
    }

    // ---- 3. ENLIST FORM: validation + localStorage ----
    function deployNow() {
      var name  = document.getElementById("soldierName").value.trim();
      var email = document.getElementById("soldierEmail").value.trim();
      var role  = document.getElementById("soldierRole").value;
      var expEl = document.querySelector('input[name="exp"]:checked');
      var exp   = expEl ? expEl.value : "Beginner";
      var msg   = document.getElementById("enlistMsg");

      if (!name || !email) {
        msg.style.display = "block";
        msg.style.color = "#ff6b6b";
        msg.style.background = "rgba(255,107,107,0.08)";
        msg.style.borderColor = "rgba(255,107,107,0.2)";
        msg.textContent = "⚠ Please fill in all fields before deploying!";
        return;
      }
      if (email.indexOf("@") === -1) {
        msg.style.display = "block";
        msg.style.color = "#ff6b6b";
        msg.textContent = "⚠ Enter a valid email address.";
        return;
      }
      var soldier = { name: name, email: email, role: role, exp: exp, time: new Date().toLocaleString() };
      localStorage.setItem("lastSoldier", JSON.stringify(soldier));
      msg.style.display = "block";
      msg.style.color = "#00ff88";
      msg.style.background = "rgba(0,255,136,0.08)";
      msg.style.borderColor = "rgba(0,255,136,0.2)";
      msg.textContent = "✅ " + name + " deployed as " + role + " (" + exp + ")! Stay sharp, soldier.";
      document.getElementById("soldierName").value = "";
      document.getElementById("soldierEmail").value = "";
    }

    // ---- 4. ACTIVE NAV HIGHLIGHT on scroll ----
    var sections = ["game", "trailer", "modes", "gallery", "armoury", "enlist", "partner"];
    window.addEventListener("scroll", function () {
      var scrollPos = window.scrollY + 100;
      sections.forEach(function (id) {
        var sec  = document.getElementById(id);
        var link = document.querySelector('.nav-link[href="#' + id + '"]');
        if (sec && link) {
          if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            link.classList.add("active-nav");
          } else {
            link.classList.remove("active-nav");
          }
        }
      });
    });

    // ---- 5. SCROLL-TO-TOP BUTTON ----
    var scrollBtn = document.createElement("button");
    scrollBtn.id = "scrollTopBtn";
    scrollBtn.title = "Back to Top";
    scrollBtn.innerHTML = '<i class="fa fa-chevron-up"></i>';
    document.body.appendChild(scrollBtn);
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) { scrollBtn.classList.add("visible"); }
      else { scrollBtn.classList.remove("visible"); }
    });
    scrollBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ---- 6. PLATFORM SELECTION (Play Now Modal) ----
    var selectedPlatform = "";
    function selectPlatform(btn, platform) {
      var allBtns = document.querySelectorAll(".platform-btn");
      for (var i = 0; i < allBtns.length; i++) { allBtns[i].classList.remove("active"); }
      btn.classList.add("active");
      selectedPlatform = platform;
      var tip = document.getElementById("platformSelected");
      if (tip) { tip.style.display = "block"; tip.textContent = "✅ Platform selected: " + platform; }
    }

    function confirmPlay() {
      if (!selectedPlatform) {
        var tip = document.getElementById("platformSelected");
        if (tip) { tip.style.display = "block"; tip.style.color = "#ff6b6b"; tip.textContent = "⚠ Please select a platform first!"; }
        return;
      }
      localStorage.setItem("bfPlatform", selectedPlatform);
      showToast("🚀 Joining Beta on " + selectedPlatform + "! Stand by, soldier.");
      setTimeout(function () {
        var modal = document.getElementById("playModal");
        if (modal) { var bsModal = bootstrap.Modal.getInstance(modal); if (bsModal) bsModal.hide(); }
      }, 1000);
    }

    // ---- 7. LOGIN HANDLER ----
    function handleLogin() {
      var email = document.querySelector("#loginModal input[type='email']");
      var pass  = document.querySelector("#loginModal input[type='password']");
      var msg   = document.getElementById("loginMsg");
      if (!email || !email.value || !pass || !pass.value) {
        if (msg) { msg.style.display = "block"; msg.style.color = "#ff6b6b"; msg.textContent = "⚠ Please enter both email and password."; }
        return;
      }
      localStorage.setItem("bfUser", email.value);
      if (msg) { msg.style.display = "block"; msg.style.color = "#00ff88"; msg.textContent = "✅ Login successful! Welcome, Soldier."; }
      setTimeout(function () {
        var modal = document.getElementById("loginModal");
        if (modal) { var bsModal = bootstrap.Modal.getInstance(modal); if (bsModal) bsModal.hide(); }
        updateReturnTip(email.value);
      }, 1200);
    }

    function updateReturnTip(email) {
      var tip = document.getElementById("returnSoldierTip");
      if (tip) { tip.textContent = "Welcome, " + email.split("@")[0] + "!"; tip.style.display = "inline-block"; }
    }

    // ---- 8. CONTACT FORM ----
    function submitContact() {
      var name  = document.getElementById("contactName");
      var email = document.getElementById("contactEmail");
      var msg   = document.getElementById("contactMsg");
      var suc   = document.getElementById("contactSuccess");
      if (!name || !name.value || !email || !email.value || !msg || !msg.value) {
        if (suc) { suc.style.display = "block"; suc.style.color = "#ff6b6b"; suc.textContent = "⚠ Please fill all fields."; }
        return;
      }
      var ticket = { name: name.value, email: email.value, msg: msg.value, time: new Date().toLocaleString() };
      localStorage.setItem("bfSupportTicket", JSON.stringify(ticket));
      if (suc) { suc.style.display = "block"; suc.style.color = "#00ff88"; suc.textContent = "✅ Message sent! We'll respond within 24 hours, " + name.value + "."; }
      name.value = ""; email.value = ""; msg.value = "";
    }

    // ---- 9. TERMS ACCEPTED ----
    function acceptTerms() {
      localStorage.setItem("bfTermsAccepted", "yes");
      var cb = document.getElementById("agreeTerms");
      if (cb) cb.checked = true;
      showToast("✅ Terms & Conditions accepted.");
    }

    // ---- 10. SUBSCRIBE PLAN ----
    function subscribePlan(plan, price) {
      var sub = { plan: plan, price: price, date: new Date().toLocaleString() };
      localStorage.setItem("bfSubscription", JSON.stringify(sub));
      showToast("🎖 " + plan + " activated! ₹" + price + "/mo. Thank you, soldier.");
    }

    // ---- 11. LANGUAGE CHANGE ----
    function changeLanguage(code) {
      localStorage.setItem("bfLanguage", code);
      var labels = { en: "English", hi: "हिन्दी", fr: "Français", de: "Deutsch", es: "Español" };
      showToast("🌐 Language set to: " + (labels[code] || code));
    }

    // ---- 12. TOAST NOTIFICATION ----
    function showToast(message) {
      var old = document.querySelector(".bf-toast");
      if (old) old.remove();
      var toast = document.createElement("div");
      toast.className = "bf-toast";
      toast.innerHTML = message;
      document.body.appendChild(toast);
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 4000);
    }

    // ---- 13. ON PAGE LOAD: restore from localStorage ----
    window.addEventListener("DOMContentLoaded", function () {
      var lastSoldier = localStorage.getItem("lastSoldier");
      if (lastSoldier) {
        var s = JSON.parse(lastSoldier);
        var tip = document.getElementById("returnSoldierTip");
        if (tip) { tip.textContent = "Welcome back, " + s.name + "!"; tip.style.display = "inline-block"; }
      }
      var bfUser = localStorage.getItem("bfUser");
      if (bfUser && !lastSoldier) { updateReturnTip(bfUser); }
      var termsAccepted = localStorage.getItem("bfTermsAccepted");
      var cb = document.getElementById("agreeTerms");
      if (termsAccepted === "yes" && cb) { cb.checked = true; }
      var lang = localStorage.getItem("bfLanguage");
      if (lang) { var sel = document.querySelector(".language-select"); if (sel) sel.value = lang; }
    });
