// Selecting elements
const popupOverlay = document.querySelector(".popup-overlay");
const popupBox = document.querySelector(".popup-box");
const addPopupButton = document.getElementById("add-popup-button");
const cancelPopup = document.getElementById("cancel-popup");
const addBookButton = document.getElementById("add-book");
const container = document.querySelector(".container");
const bookTitleInput = document.getElementById("book-title-input");
const bookAuthorInput = document.getElementById("book-author-input");
const bookDescriptionInput = document.getElementById("book-description-input");
const bookImageInput = document.getElementById("book-image-input"); // New image input

// Event listener to show popup
addPopupButton.addEventListener("click", () => {
    popupOverlay.style.display = "block";
    popupBox.style.display = "block";
});

// Event listener to hide popup on cancel
cancelPopup.addEventListener("click", (event) => {
    event.preventDefault();
    popupOverlay.style.display = "none";
    popupBox.style.display = "none";
});

// Function to delete a book
function deletestory(event) {
    event.target.parentElement.remove();
    savedatabook();
}

// Function to save books to localStorage
function savedatabook() {
    localStorage.setItem("bookdata", container.innerHTML);
}

// Function to load books from localStorage
function showtaskbook() {
    container.innerHTML = localStorage.getItem("bookdata") || "";
    // Add event listeners to existing delete buttons
    const deleteButtons = document.querySelectorAll(".book-container button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", deletestory);
    });
}

// Add book event
addBookButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    // Validate inputs
    if (
        !bookTitleInput.value.trim() ||
        !bookAuthorInput.value.trim() ||
        !bookDescriptionInput.value.trim() ||
        !bookImageInput.value.trim()
    ) {
        alert("Please fill in all fields.");
        return;
    }

    if (!isValidUrl(bookImageInput.value.trim())) {
        alert("Please enter a valid image URL.");
        return;
    }

    // Create book container
    const div = document.createElement("div");
    div.setAttribute("class", "book-container");
    div.innerHTML = `
    <h2>${bookTitleInput.value}</h2>
    <h5>~ ${bookAuthorInput.value}</h5>
    <img src="${bookImageInput.value}" alt="${bookTitleInput.value} Image" onerror="this.src='https://via.placeholder.com/150'">
        <p>${bookDescriptionInput.value}</p>
        <button>Delete</button>
    `;
    container.appendChild(div);

    // Add event listener to the new delete button
    const newDeleteButton = div.querySelector("button");
    newDeleteButton.addEventListener("click", deletestory);

    // Hide the popup
    popupOverlay.style.display = "none";
    popupBox.style.display = "none";

    // Clear input fields
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookDescriptionInput.value = "";
    bookImageInput.value = "";

    // Save to localStorage
    savedatabook();
});

// Function to validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Initial load
showtaskbook();
