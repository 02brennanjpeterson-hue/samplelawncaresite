const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle("is-active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        projectCards.forEach((card) => {
            card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
        });
    });
});

const sizeInput = document.querySelector("#property-size");
const sizeOutput = document.querySelector("#size-output");
const estimatePrice = document.querySelector("#estimate-price");
const careOptions = document.querySelectorAll(".care-option");
const formMessage = document.querySelector("#form-message");
const monthlyRates = {
    essential: [0.096, 0.124],
    signature: [0.16, 0.21],
    complete: [0.26, 0.34]
};

function updateEstimate() {
    const size = Number(sizeInput.value);
    const careLevel = document.querySelector('input[name="care"]:checked').value;
    const [lowRate, highRate] = monthlyRates[careLevel];
    const formatPrice = (value) => `$${Math.round(value / 10) * 10}`;
    const percentage = ((size - Number(sizeInput.min)) / (Number(sizeInput.max) - Number(sizeInput.min))) * 100;

    sizeOutput.value = `${size.toLocaleString()} sq ft`;
    sizeOutput.textContent = sizeOutput.value;
    sizeInput.style.background = `linear-gradient(to right, var(--green) 0%, var(--green) ${percentage}%, #e8eee9 ${percentage}%, #e8eee9 100%)`;
    estimatePrice.innerHTML = `${formatPrice(size * lowRate)} <small>–</small> ${formatPrice(size * highRate)}`;
    formMessage.textContent = "";
}

sizeInput.addEventListener("input", updateEstimate);
careOptions.forEach((option) => {
    option.addEventListener("change", () => {
        careOptions.forEach((item) => item.classList.toggle("is-selected", item.querySelector("input").checked));
        updateEstimate();
    });
});

document.querySelector("#estimate-form").addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = `Your starting estimate is ${estimatePrice.textContent.trim()} per month. Contact us to arrange a personalized consultation.`;
});

updateEstimate();
