let totalClicks = 0;
let maxClicks = 25;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

// using this array, create a new product for each item
// the name of the product should be the item in the array
// the src of the product should be like so:
// images/PRODUCTNAME.jpg

// array is in discord chat:
const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `images/${productNames[i]}.jpeg`);
}

// use Google to help you
// wrtie a function that returns a random number
// the number will represent an index value for one of the items in the Product.allProducts array

function randomProductIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

// write a function to render our images
// have the images be chosen randomly from our Product.allProducts array
// hint, use randomProductIndex() and bracket notation to access the item in the array
function renderImages() {
  // get three random indexes for my product array
  let index1 = randomProductIndex();
  let index2 = randomProductIndex();
  let index3 = randomProductIndex();

  // make sure none of them are the same
  while (index1 === index2 || index1 === index3 || index2 === index3) {
    index2 = randomProductIndex();
    index3 = randomProductIndex();
  }

  // retrieve our image elements
  let img1 = document.getElementById("img1");
  let img2 = document.getElementById("img2");
  let img3 = document.getElementById("img3");

  // change the src attribute of img1, img2 & img3 to be the src from our random products
  img1.src = Product.allProducts[index1].src;
  img2.src = Product.allProducts[index2].src;
  img3.src = Product.allProducts[index3].src;

  img1.alt = Product.allProducts[index1].name;
  img2.alt = Product.allProducts[index2].name;
  img3.alt = Product.allProducts[index3].name;

  Product.allProducts[index1].views++;
  Product.allProducts[index2].views++;
  Product.allProducts[index3].views++;
}

renderImages();

// increase the clicks on the clicked Product object (for loop and clicks++)(check the event.target.alt)
// make sure the user is clicking on one of the images
function handleClick(event) {
  // check if the thing we clicked on is the container (as aposed to an image)
  if (event.target === imgContainer) {
    alert("Please click one of the images, not inbetween the images.");
    return; // this return stops the function
  }

  // check every single products "name" against the alt tag of the target, and increase the clicks
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (event.target.alt === Product.allProducts[i].name) {
      Product.allProducts[i].clicks++;
      break; // stop the loop, because we found our product
    }
  }
  totalClicks++;
  if (totalClicks === maxClicks) {
    alert("thanks for voting");
    imgContainer.removeEventListener("click", handleClick);
    renderChart();

    return;
  }

  // get three new images
  renderImages();
}
function renderChart() {
  const myChart = document.getElementById("chart");
  let labels = [];
  let viewsData = [];
  let clicksData = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    labels.push(Product.allProducts[i].name);
    viewsData.push(Product.allProducts[i].views);
    clicksData.push(Product.allProducts[i].clicks);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Views",
        data: viewsData,
        borderWidth: 1,
      },
      {
        label: "# of Votes",
        data: clicksData,
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
  };
  new Chart(myChart, config);
}

// render the inital images
renderImages();

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);
