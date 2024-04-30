// import { scrapeWebsite, getImages } from "./scraping.js";
// import { getUrl } from "./Create_url/yanga.js";

const websitesToScrape = {
  Castro: {
    itemSelector: ".products.list.items.product-items li",
    nameSelector: ".product-category-name.product-name a",
    priceSelector: ".price-wrapper .price:not(:contains('0.00'))",
    imageSelector: ".product-image-photo",
    URLSelector: ".quickview a.product_quickview",
    colorSelector: ".swatch-option",
    specificItemSelector: ".slick-track",
    imageItemSelector: ".img_zoom",
  },
  Renuar: {
    itemSelector: ".set-item.product-tile.js-product-tile.h-100",
    nameSelector: ".tile-body h3",
    priceSelector: ".value[content]",
    imageSelector: ".tile-thumbnail img",
    URLSelector: "a",
    colorSelector: ".swatch[src]",
    specificItemSelector: ".owl-stage",
    imageItemSelector: ".main-image__carousel-image",
  },
  // "FashionClub":
  //   {
  //     itemSelector: ".product-col",
  //     nameSelector: ".product-detail .product-title a",
  //     priceSelector: ".amount bdi",
  //     imageSelector: ".slide-img-wrap img",
  //     URLSelector: ".product-title a",
  //     colorSelector: ".variable-item-span-color",
  //     specificItemSelector: ".slick-track",
  //     imageItemSelector: ".hover_zoom",
  //   },
  Golf: {
    itemSelector: ".product-item",
    nameSelector: ".product-name a",
    priceSelector: ".price:not(:contains('0.00'))",
    imageSelector: ".product-image-wrapper img",
    URLSelector: "a",
    colorSelector: ".swatch-option.color",
    specificItemSelector: ".slick-track",
    imageItemSelector: ".img_zoom",
  },
  // "H&O":
  //   {
  //     itemSelector: ".product_addtocart_form",
  //     nameSelector: ".product-item-link",
  //     priceSelector: ".price:not(:contains('0.00'))",
  //     imageSelector: ".product-image-photo",
  //     URLSelector: "a",
  //     colorSelector: ".inline-block",
  //     specificItemSelector: ".relative",
  //     imageItemSelector: ".absolute",
  //   },
  Studiopasha: {
    itemSelector: ".product-item",
    nameSelector: ".product-item-name a",
    priceSelector: ".price:not(:contains('0.00'))",
    imageSelector: ".product-image-photo",
    URLSelector: "a",
    colorSelector: ".swatch-option[style*=background]",
    specificItemSelector: ".fotorama__stage__shaft",
    imageItemSelector: ".fotorama__img",
  },
  Urbanica: {
    itemSelector: ".product",
    nameSelector: ".product-name a",
    priceSelector:
      '.price-wrapper[data-price-amount]:not([data-price-amount=""])',
    imageSelector: ".product-image-photo",
    URLSelector: "a",
    colorSelector: ".swatch-attribute-options .swatch-option",
    specificItemSelector: ".slick-track",
    imageItemSelector: ".img_zoom",
  },
  Twentyfourseven: {
    itemSelector: ".product",
    nameSelector: ".product_default_link",
    priceSelector: ".price .value",
    imageSelector: ".tile-image",
    URLSelector: "a",
    colorSelector: ".swatch-circle",
    specificItemSelector: ".owl-stage",
    imageItemSelector: ".main-image__carousel-image",
  },
  Hoodies: {
    itemSelector: ".product",
    nameSelector: ".product-category-name",
    priceSelector: ".price-wrapper .price:not(:contains('0.00'))",
    imageSelector: ".gallery-img",
    URLSelector: "a",
    colorSelector: ".swatch-option",
    specificItemSelector: ".slick-track",
    imageItemSelector: ".img_zoom",
  },
  Yanga: {
    itemSelector: ".listing-product_3mjp",
    nameSelector: ".title_3ZxJ",
    priceSelector: ".final-price_8CiX",
    imageSelector: ".image_3k9y",
    URLSelector: ".tx-link-a",
    colorSelector: ".color-item_1Y2Y",
    specificItemSelector: "div.thumb_2ID9",
    imageItemSelector: "img",
  },
};

// const [website, config] = Object.entries(websitesToScrape)[7];
// var url = getUrl("Women", "Pants", "M", "White");
// console.log(url);
// const scrapedData = await scrapeWebsite(
//   url,
//   config,
//   "Women",
//   "Pants",
//   "M",
//   "White"
// );
// console.log(scrapedData);

// const img = await getImages(
//   "https://www.terminalx.com/brands/yanga/w241760005?color=10",
//   config
// );
// console.log(img);

const getConfig = (store) => {
  return websitesToScrape[store];
};

//   let url = getHoodiesUrl("women", "dresses", "M", "green");
//   console.log(url);

export { getConfig };
