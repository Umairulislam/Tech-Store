const products = [
  {
    name: "Sony Playstation 5",
    url: "images/playstation_5.png",
    category: "games",
    price: 499.99,
  },
  {
    name: "Samsung Galaxy",
    url: "images/samsung_galaxy.png",
    category: "smartphones",
    price: 399.99,
  },
  {
    name: "Cannon EOS Camera",
    url: "images/cannon_eos_camera.png",
    category: "cameras",
    price: 749.99,
  },
  {
    name: "Sony A7 Camera",
    url: "images/sony_a7_camera.png",
    category: "cameras",
    price: 1999.99,
  },
  {
    name: "LG TV",
    url: "images/lg_tv.png",
    category: "televisions",
    price: 799.99,
  },
  {
    name: "Nintendo Switch",
    url: "images/nintendo_switch.png",
    category: "games",
    price: 299.99,
  },
  {
    name: "Xbox Series X",
    url: "images/xbox_series_x.png",
    category: "games",
    price: 499.99,
  },
  {
    name: "Samsung TV",
    url: "images/samsung_tv.png",
    category: "televisions",
    price: 1099.99,
  },
  {
    name: "Google Pixel",
    url: "images/google_pixel.png",
    category: "smartphones",
    price: 499.99,
  },
  {
    name: "Sony ZV1F Camera",
    url: "images/sony_zv1f_camera.png",
    category: "cameras",
    price: 799.99,
  },
  {
    name: "Toshiba TV",
    url: "images/toshiba_tv.png",
    category: "televisions",
    price: 499.99,
  },
  {
    name: "iPhone 14",
    url: "images/iphone_14.png",
    category: "smartphones",
    price: 999.99,
  },
]

// Select DOM elements
const productsWrapper = document.getElementById("products-wrapper")
const checkboxes = document.querySelectorAll(".check")
const filtersContainer = document.getElementById("filters-container")
const searchInput = document.getElementById("search")
const cartCount = document.getElementById("cart-count")
const navbar = document.querySelector("nav")

// Init cart item count
let cartItemCount = 0

// Init product elements array
let productElements = []

// Loop through products and create product elements
products.forEach((product) => {
  const productElement = createProductElement(product)
  productElements.push(productElement)
  productsWrapper.appendChild(productElement)
})

// Create product element
function createProductElement(product) {
  const productElement = document.createElement("div")
  productElement.className = "item space-y-2"

  productElement.innerHTML = `
    <div
    class="bg-zinc-100 flex justify-center relative rounded-xl overflow-hidden group cursor-pointer shadow-lg shadow-zinc-950"
  >
    <img
      src="${product.url}"
      alt="${product.category}"
      class="w-full h-full object-cover"
    />
    <button
      class="status bg-zinc-950 text-white absolute bottom-0 left-0 right-0 py-2 text-xs md:text-base w-full f translate-y-full transition duration-300 group-hover:translate-y-0"
    >
      Add To Cart
    </button>
    </div>
    <p class="text-sm md:text-lg">${product.name}</p>
    <strong>$${product.price.toLocaleString()}</strong>
    `
  productElement.querySelector(".status").addEventListener("click", updateCart)
  return productElement
}

// Add or remove product from cart
function updateCart(e) {
  const statusElement = e.target

  if (statusElement.classList.contains("added")) {
    // Remove from cart
    statusElement.classList.remove("added")
    statusElement.innerText = "Add To Cart"
    statusElement.classList.remove("bg-red-600")
    statusElement.classList.add("bg-zinc-950")
    cartItemCount--
    console.log(cartItemCount)
  } else {
    // Add to cart
    statusElement.classList.add("added")
    statusElement.innerText = "Remove From Cart"
    statusElement.classList.remove("bg-zinc-950")
    statusElement.classList.add("bg-red-600")
    cartItemCount++
    console.log(cartItemCount)
  }
  cartCount.innerText = cartItemCount
}

//Filter products based on checkboxes and search input
function filterProducts() {
  // Get Search input value
  const searchValue = searchInput.value.trim().toLowerCase()

  // Get IDs of checked checkboxes
  const checkedCategories = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id)

  // Loop through each productelement
  productElements.forEach((productElement, index) => {
    // Get product from products array
    const product = products[index]

    // Check if product name includes the search value
    const searchMatches = product.name.toLowerCase().includes(searchValue)

    // Check if product category is in the checked categories
    const categoryMatches =
      checkedCategories.includes(product.category) ||
      checkedCategories.length === 0

    // Show or hide product based on search and category matches
    if (searchMatches && categoryMatches) {
      productElement.classList.remove("hidden")
    } else {
      productElement.classList.add("hidden")
    }
  })
}

function scrollEvent() {
  if (window.scrollY > 50) {
    navbar.classList.add("opacity-95")
  } else {
    navbar.classList.remove("opacity-95")
  }
}

// Event listeners for checkboxes and search input
filtersContainer.addEventListener("change", filterProducts)
searchInput.addEventListener("input", filterProducts)
window.addEventListener("scroll", scrollEvent)
