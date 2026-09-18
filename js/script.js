// ==========================================
// FORTUNER 3D INTERACTIVE WEBSITE
// ==========================================

const carModel = document.getElementById("carModel");
const stage = document.getElementById("stage");

const partName = document.getElementById("partName");
const partDescription = document.getElementById("partDescription");


// ==========================================
// CAR PART INFORMATION
// ==========================================

const parts = {

    roof: {
        name: "Roof",
        description:
            "The roof forms the upper body structure of the Fortuner and provides protection for passengers."
    },

    door: {
        name: "Door",
        description:
            "The door provides passenger access and forms an important part of the vehicle body."
    },

    mirror: {
        name: "Side Mirror",
        description:
            "The side mirror helps the driver observe traffic and surroundings beside the vehicle."
    },

    headlight: {
        name: "Headlight",
        description:
            "The headlight provides illumination for driving conditions with low visibility."
    },

    wheel: {
        name: "Wheel",
        description:
            "The wheels support the vehicle and transfer driving forces to the road."
    },

    bumper: {
        name: "Front Bumper",
        description:
            "The bumper is part of the vehicle exterior designed to help protect the front body area."
    },

    grille: {
        name: "Front Grille",
        description:
            "The grille is located at the front of the vehicle and forms part of the front-end design."
    },

    window: {
        name: "Window",
        description:
            "The windows provide visibility and ventilation for passengers."
    }

};


// ==========================================
// HOTSPOT CLICK
// ==========================================

const hotspots = document.querySelectorAll(".hotspot");

hotspots.forEach(function (hotspot) {

    hotspot.addEventListener("click", function (event) {

        event.stopPropagation();

        const part = hotspot.dataset.part;

        if (parts[part]) {

            partName.textContent = parts[part].name;

            partDescription.textContent =
                parts[part].description;

        }

        // Remove active class
        hotspots.forEach(function (item) {
            item.classList.remove("active");
        });

        // Add active class
        hotspot.classList.add("active");

    });

});


// ==========================================
// DRAG ROTATION
// ==========================================

let isDragging = false;

let startX = 0;
let rotation = 0;


function startDrag(x) {

    isDragging = true;

    startX = x;

    stage.classList.add("dragging");

}


function moveDrag(x) {

    if (!isDragging) {
        return;
    }

    const difference = x - startX;

    rotation += difference * 0.25;

    carModel.style.transform =
        `rotateY(${rotation}deg)`;

    startX = x;

}


function stopDrag() {

    isDragging = false;

    stage.classList.remove("dragging");

}


// ==========================================
// MOUSE EVENTS
// ==========================================

stage.addEventListener("mousedown", function (event) {

    // Don't start drag when clicking hotspot
    if (event.target.classList.contains("hotspot")) {
        return;
    }

    startDrag(event.clientX);

});


document.addEventListener("mousemove", function (event) {

    moveDrag(event.clientX);

});


document.addEventListener("mouseup", function () {

    stopDrag();

});


// ==========================================
// TOUCH EVENTS - MOBILE
// ==========================================

stage.addEventListener(
    "touchstart",
    function (event) {

        if (event.target.classList.contains("hotspot")) {
            return;
        }

        startDrag(
            event.touches[0].clientX
        );

    },
    { passive: true }
);


stage.addEventListener(
    "touchmove",
    function (event) {

        if (!isDragging) {
            return;
        }

        moveDrag(
            event.touches[0].clientX
        );

    },
    { passive: true }
);


stage.addEventListener(
    "touchend",
    function () {

        stopDrag();

    }
);


// ==========================================
// INITIAL MESSAGE
// ==========================================

console.log(
    "Fortuner 3D Experience Loaded Successfully!"
);
