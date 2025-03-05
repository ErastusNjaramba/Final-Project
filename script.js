document.addEventListener("DOMContentLoaded", function () {
    const bookButtons = document.querySelectorAll(".book-btn");
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const closeModal = document.querySelector(".close-btn");

    const searchInput = document.getElementById("search");
    const filterSelect = document.getElementById("filter");
    const cards = document.querySelectorAll(".card");

    // Open Modal
    bookButtons.forEach(button => {
        button.addEventListener("click", function () {
            const card = this.closest(".card");
            modalImg.src = card.querySelector("img").src;
            modalTitle.innerText = card.querySelector("h3").innerText;
            modalDescription.innerText = "Explore this destination!";
            modalPrice.innerText = card.getAttribute("data-price");

            modal.style.display = "flex";
        });
    });

    // Close Modal
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Search Functionality
    searchInput.addEventListener("keyup", function () {
        const searchTerm = searchInput.value.toLowerCase();
        cards.forEach(card => {
            const title = card.querySelector("h3").innerText.toLowerCase();
            card.style.display = title.includes(searchTerm) ? "block" : "none";
        });
    });

    // Filter Functionality
    filterSelect.addEventListener("change", function () {
        const category = filterSelect.value;
        cards.forEach(card => {
            const priceCategory = card.getAttribute("data-category");
            card.style.display = (category === "all" || priceCategory === category) ? "block" : "none";
        });
    });
});
