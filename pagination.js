document.addEventListener("DOMContentLoaded", function () {
    function setupPagination(containerSelector, itemClass, itemsPerPage) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.warn("Container not found:", containerSelector);
            return; // Exit the function if the container is not found
        }
        const items = Array.from(container.getElementsByClassName(itemClass));
        const paginationControls = container.nextElementSibling; // Assuming pagination controls are right after the container
        const prevButton = paginationControls.querySelector(".prev");
        const nextButton = paginationControls.querySelector(".next");
        const pageNumbers = paginationControls.querySelector(".page-numbers");

        let currentPage = 1;
        let totalPages = Math.ceil(items.length / itemsPerPage);

        function displayItems(page) {
            items.forEach(item => {
                item.style.display = "none";
            });

            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            items.slice(startIndex, endIndex).forEach(item => {
                item.style.display = "block";
            });

            pageNumbers.textContent = `Page ${page} of ${totalPages}`;
            prevButton.style.visibility = page === 1 ? "hidden" : "visible";
            nextButton.style.visibility = page === totalPages ? "hidden" : "visible";
        }

        prevButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayItems(currentPage);
            }
        });

        nextButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayItems(currentPage);
            }
        });

        displayItems(currentPage);
    }

    // Pagination for videos
    setupPagination(".video-container", "video", 4);

    // Pagination for blog posts
    setupPagination(".blog-container", "post", 4); // Assuming 5 blog posts per page
});