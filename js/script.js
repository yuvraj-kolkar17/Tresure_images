const imageWrapper = document.querySelector(".images");
const searchInput = document.querySelector(".search input");
const loadMoreBtn = document.querySelector(".gallery .load-more");
const lightbox = document.querySelector(".lightbox");
const downloadImgBtn = lightbox.querySelector(".uil-import");
const closeImgBtn = lightbox.querySelector(".close-icon");
const menu = document.querySelector('.menu');
const menuToggle = document.querySelector('.menu-toggle');
const categorySelect = document.querySelector(".category-select");

const apiKey = "Db7lo1Bu6oYUfBeGql3fSQW30hfOecVSuSoE0l3T2Xqmc8tZRAgXdV7z"; 
const perPage = 20;
let currentPage = 1;
let searchTerm = "";
let selectedCategory = "";
let currentApiUrl = "";

const downloadImage = async (imgUrl) => {
    try {
        const response = await fetch(imgUrl);
        if (!response.ok) {
            throw new Error('Failed to download image');
        }
        const blob = await response.blob();
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        a.click();
    } catch (error) {
        console.error(error.message);
        alert("Failed to download image!");
    }
}

const showLightbox = (name, img) => {
    lightbox.querySelector("img").src = img;
    lightbox.querySelector("span").innerText = name;
    downloadImgBtn.dataset.img = img;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

const hideLightbox = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}

const generateImageHTML = (img) => {
    return `<li class="card">
                <img src="${img.src.large2x}" alt="${img.photographer}">
                <div class="details">
                    <div class="photographer">
                        <i class="uil uil-camera"></i>
                        <span>${img.photographer}</span>
                    </div>
                    <button class="download-btn" data-src="${img.src.large2x}">
                        <i class="uil uil-import"></i>
                    </button>
                </div>
            </li>`;
}

const appendImagesToGallery = (images) => {
    const html = images.map(generateImageHTML).join('');
    imageWrapper.insertAdjacentHTML('beforeEnd', html);
}

const fetchImages = async (url) => {
    try {
        const response = await fetch(url, {
            headers: { Authorization: apiKey }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        appendImagesToGallery(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    } catch (error) {
        console.error(error.message);
        alert("Failed to load images!");
    }
}

const loadMoreImages = () => {
    currentPage++;
    const apiUrl = currentApiUrl + `&page=${currentPage}`;
    fetchImages(apiUrl);
}

const searchImages = (e) => {
    
    if (e.key=== "Enter") {
        
        searchTerm = e.target.value.trim();
        currentPage = 1;
        imageWrapper.innerHTML = "";
        const apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=${perPage}` : `https://api.pexels.com/v1/curated?per_page=${perPage}`;
        currentApiUrl = apiUrl;
        fetchImages(apiUrl);
    }
}

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
});

loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", searchImages);
closeImgBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", () => downloadImage(downloadImgBtn.dataset.img));

categorySelect.addEventListener("change", () => {
    selectedCategory = categorySelect.value;
    currentPage = 1;
    searchTerm = selectedCategory;
    imageWrapper.innerHTML = "";
    const apiUrl = `https://api.pexels.com/v1/search?query=${selectedCategory}&per_page=${perPage}`;
    currentApiUrl = apiUrl;
    fetchImages(apiUrl);
});

// Initial load
const initialApiUrl = `https://api.pexels.com/v1/curated?per_page=${perPage}`;
currentApiUrl = initialApiUrl;
fetchImages(initialApiUrl);




