// Adds the current year automatically to the footer copyright text
function addYear() {
    var yearText = document.getElementById("copyYear");
    if (yearText) {
        yearText.innerHTML = "© " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
    }
}

// Sets a greeting message on the homepage based on the current time of day
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

// Highlights the current page link in the navigation bar
function ActiveNav() {
    var links = document.querySelectorAll("nav a");
    links.forEach(function(link) {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
}

// Toggles the mobile navigation menu on smaller screens
function toggleMenu() {
    var nav = document.getElementById("navbar");
    if (!nav) return;

    if (nav.className === "nav_bar") {
        nav.className = "nav_bar responsive";
    } else {
        nav.className = "nav_bar";
    }
}

// Runs jQuery only if the library is successfully loaded
if (typeof $ !== "undefined") {
    $(document).ready(function () {

        // Shows the longer introduction text and swaps button visibility
        $("#readMore").click(function () {
            $("#longIntro").show();
            $("#readLess").show();
            $("#readMore").hide();
        });

        // Hides the longer introduction text and restores original button visibility
        $("#readLess").click(function () {
            $("#longIntro").hide();
            $("#readLess").hide();
            $("#readMore").show();
        });
    });
}

// Displays the hidden purchase form and fills in the selected ticket details
function showForm(date, type, price) {
    var form = document.getElementById("purchaseForm");
    if (!form) return;

    form.style.display = "block";

    document.getElementById("selectedDate").value = date;
    document.getElementById("selectedType").value = type;
    document.getElementById("selectedPrice").value = price;

    // Smoothly scrolls the user down to the form
    form.scrollIntoView({ behavior: "smooth" });
}

// Validates required ticket purchase fields and shows a confirmation alert
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

// Stores the current slide number for each slideshow on the site
var slideIndexes = {};

// Initializes all slideshows by setting each one to start at slide 1
function initSlideshows() {
    var slideshows = document.getElementsByClassName("slideshow");
    for (var i = 0; i < slideshows.length; i++) {
        var id = slideshows[i].id;
        slideIndexes[id] = 1;
        showSlides(id, 1);
    }
}

// Moves forward or backward through a slideshow
function plusSlides(slideshowId, n) {
    slideIndexes[slideshowId] += n;
    showSlides(slideshowId, slideIndexes[slideshowId]);
}

// Displays the correct slide and hides all others
function showSlides(slideshowId, n) {
    var slideshow = document.getElementById(slideshowId);
    if (!slideshow) return;

    var slides = slideshow.getElementsByClassName("slide");
    if (slides.length === 0) return;

    // Loops back to first slide if user goes past the end
    if (n > slides.length) {
        slideIndexes[slideshowId] = 1;
    }

    // Loops to last slide if user goes before the first slide
    if (n < 1) {
        slideIndexes[slideshowId] = slides.length;
    }

    // Hide all slides
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Show only the active slide
    slides[slideIndexes[slideshowId] - 1].style.display = "block";
}

// Initializes the Leaflet map on the homepage if the map container exists
function initMap() {
    if (document.getElementById("map") && typeof L !== "undefined") {
        var map = L.map("map").setView([40.444, -79.943], 13);

        // Adds OpenStreetMap tiles as the map background
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19
        }).addTo(map);

        // Adds a marker for the MonoMuse location in Pittsburgh
        L.marker([40.444, -79.943]).addTo(map)
            .bindPopup("MonoMuse - Pittsburgh")
            .openPopup();
    }
}

// Runs key page setup functions once the window fully loads
window.onload = function () {
    addYear();
    setGreeting();
    ActiveNav();
    initSlideshows();
    initMap();
};

// Calculates total checkout price based on ticket quantity
function calculateTotal() {
    var quantity = document.getElementById("quantity").value;

    var pricePerTicket = 15; // you can change if needed

    var total = quantity * pricePerTicket;

    // Prevents invalid totals when quantity is empty or zero
    if (!quantity || quantity <= 0) {
        total = 0;
    }

    document.getElementById("totalPrice").innerText = total;
}

// Validates checkout form fields and displays a confirmation message
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