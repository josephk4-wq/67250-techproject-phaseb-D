function addYear() {
    var yearText = document.getElementById("copyYear");
    if (yearText) {
        yearText.innerHTML = "© " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
    }
}

function setGreeting() {
    var greet = document.getElementById("greeting");
    if (!greet) return;

    var hour = new Date().getHours();

    if (hour < 12) {
        greet.innerHTML = "Good morning!";
    } else if (hour < 18) {
        greet.innerHTML = "Good afternoon!";
    } else {
        greet.innerHTML = "Good evening!";
    }
}

function ActiveNav() {
    var links = document.querySelectorAll("nav a");
    links.forEach(function(link) {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
}

function toggleMenu() {
    var nav = document.getElementById("navbar");
    if (!nav) return;

    if (nav.className === "nav_bar") {
        nav.className = "nav_bar responsive";
    } else {
        nav.className = "nav_bar";
    }
}

if (typeof $ !== "undefined") {
    $(document).ready(function () {
        $("#readMore").click(function () {
            $("#longIntro").show();
            $("#readLess").show();
            $("#readMore").hide();
        });

        $("#readLess").click(function () {
            $("#longIntro").hide();
            $("#readLess").hide();
            $("#readMore").show();
        });
    });
}

function showForm(date, type, price) {
    var form = document.getElementById("purchaseForm");
    if (!form) return;

    form.style.display = "block";

    document.getElementById("selectedDate").value = date;
    document.getElementById("selectedType").value = type;
    document.getElementById("selectedPrice").value = price;

    form.scrollIntoView({ behavior: "smooth" });
}

function submitPurchase() {
    var buyerName = document.getElementById("buyerName").value;
    var buyerEmail = document.getElementById("buyerEmail").value;
    var ticketCount = document.getElementById("ticketCount").value;
    var selectedDate = document.getElementById("selectedDate").value;

    if (!buyerName || !buyerEmail || !ticketCount || !selectedDate) {
        alert("Please complete all required ticket fields.");
        return;
    }

    alert("Thanks, " + buyerName + "! Your ticket request for " + selectedDate + " has been submitted.");
}

var slideIndexes = {};

function initSlideshows() {
    var slideshows = document.getElementsByClassName("slideshow");
    for (var i = 0; i < slideshows.length; i++) {
        var id = slideshows[i].id;
        slideIndexes[id] = 1;
        showSlides(id, 1);
    }
}

function plusSlides(slideshowId, n) {
    slideIndexes[slideshowId] += n;
    showSlides(slideshowId, slideIndexes[slideshowId]);
}

function showSlides(slideshowId, n) {
    var slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;

    var slides = slideshow.getElementsByClassName("slide");
    if (slides.length === 0) return;

    if (n > slides.length) {
        slideIndexes[slideshowId] = 1;
    }
    if (n < 1) {
        slideIndexes[slideshowId] = slides.length;
    }

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndexes[slideshowId] - 1].style.display = "block";
}

function initMap() {
    if (document.getElementById("map") && typeof L !== "undefined") {
        var map = L.map("map").setView([40.444, -79.943], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19
        }).addTo(map);

        L.marker([40.444, -79.943]).addTo(map)
            .bindPopup("MonoMuse - Pittsburgh")
            .openPopup();
    }
}

window.onload = function () {
    addYear();
    setGreeting();
    ActiveNav();
    initSlideshows();
    initMap();
};

function calculateTotal() {
    var quantity = document.getElementById("quantity").value;

    var pricePerTicket = 15; // you can change if needed

    var total = quantity * pricePerTicket;

    if (!quantity || quantity <= 0) {
        total = 0;
    }

    document.getElementById("totalPrice").innerText = total;
}

function submitCheckout() {
    var name = document.getElementById("name").value;
    var quantity = document.getElementById("quantity").value;
    var total = document.getElementById("totalPrice").innerText;

    if (!name || !quantity) {
        alert("Please fill out required fields.");
        return;
    }

    document.getElementById("confirmationMessage").innerText =
        "Thank you, " + name + "! Your order for " + quantity +
        " ticket(s) has been placed. Total: $" + total;
}