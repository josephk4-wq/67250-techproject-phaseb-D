// Part 2

// numbers
var x = 5;
var y = 7;
var z = x + y;
console.log(z);

// strings
var A = "Hello ";
var B = "world!";
var C = A + B;
console.log(C);

// function
function sumnPrint(x1, x2) {
    console.log(x1 + x2);
}

sumnPrint(x, y);
sumnPrint(A, B);

// condition
if (C.length > z) {
    console.log(C);
} else if (C.length < z) {
    console.log(z);
} else {
    console.log("good job!");
}

var L1 = ["Watermelon","Pineapple","Pear","Banana"];
var L2 = ["Apple","Banana","Kiwi","Orange"];

function findTheBanana(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "Banana") {
            alert("Banana found!");
        }
    }
}

// findTheBanana(L1);
// findTheBanana(L2);

var now = new Date();
var hour = now.getHours();

function greeting(h) {
    var greet = document.getElementById("greeting");

    if (greet) {
        if (h < 5 || h >= 20) {
            greet.innerHTML = "Good night";
        } else if (h < 12) {
            greet.innerHTML = "Good morning";
        } else if (h < 18) {
            greet.innerHTML = "Good afternoon";
        } else {
            greet.innerHTML = "Good evening";
        }
    }
}

greeting(hour);

function addYear() {
    var year = new Date().getFullYear();
    var element = document.getElementById("copyYear");

    if (element) {
        element.innerHTML = "© " + year + " MonoMuse. All rights reserved.";
    }
}