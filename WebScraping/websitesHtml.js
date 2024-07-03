import { scrapeWebsite, getImagesAndColors } from "./scraping.js";
import { getUrl } from "./Create_url/castro.js";

const websitesToScrape = {
  Castro: {
    itemSelector: ".products.list.items.product-items li",
    nameSelector: ".product-category-name.product-name a",
    priceSelector: ".price-wrapper .price:not(:contains('0.00'))",
    imageSelector: ".product-image-photo",
    URLSelector: ".quickview a.product_quickview",
    // colorSelector: ".swatch-option",
    imagesItemSelector: ".slick-track",
    imageItemSelector: ".img_zoom",
    colorsItemSelector: ".swatch-attribute-options.clearfix",
    colorSelector: ".swatch-option.image",
  },
  Renuar: {
    itemSelector:
      ".search-results__products .set-item.product-tile.js-product-tile.h-100",
    nameSelector: ".tile-body h3",
    priceSelector: ".value[content]",
    imageSelector: ".tile-thumbnail img",
    URLSelector: "a",
    // colorSelector: ".swatch[src]",
    imagesItemSelector: ".owl-stage",
    imageItemSelector: ".main-image__carousel-image",
    colorsItemSelector: ".attribute__color-container",
    colorSelector: ".swatch-value",
  },
  Golf: {
    itemSelector: ".product-item",
    nameSelector: ".product-name a",
    priceSelector: ".price:not(:contains('0.00'))",
    imageSelector: ".product-image-wrapper img",
    URLSelector: "a",
    // colorSelector: ".swatch-option.color",
    imagesItemSelector: ".slick-track",
    imageItemSelector: ".img_zoom",
    colorsItemSelector: ".swatch-attribute-options",
    colorSelector: ".swatch-option",
  },
  Studiopasha: {
    itemSelector: ".product-item",
    nameSelector: ".product-item-name a",
    priceSelector: ".price:not(:contains('0.00'))",
    imageSelector: ".product-image-photo",
    URLSelector: "a",
    // colorSelector: ".swatch-option[style*=background]",
    imagesItemSelector: ".fotorama__stage__shaft",
    imageItemSelector: ".fotorama__img",
    colorsItemSelector: ".swatch-attribute-options",
    colorSelector: ".swatch-option",
  },
  Urbanica: {
    itemSelector: ".product",
    nameSelector: ".product-name a",
    priceSelector:
      '.price-wrapper[data-price-amount]:not([data-price-amount=""])',
    imageSelector: ".product-image-photo",
    URLSelector: "a",
    // colorSelector: ".swatch-attribute-options .swatch-option",
    imagesItemSelector: ".slick-track",
    imageItemSelector: ".img_zoom",
    colorsItemSelector: ".swatch-attribute-options",
    colorSelector: ".swatch-option",
  },
  Twentyfourseven: {
    itemSelector: ".product",
    nameSelector: ".product_default_link",
    priceSelector: ".price .value",
    imageSelector: ".tile-image",
    URLSelector: "a",
    // colorSelector: ".swatch-circle",
    imagesItemSelector: ".owl-stage",
    imageItemSelector: ".main-image__carousel-image",
    colorsItemSelector: ".attribute__color-container",
    colorSelector: ".swatch-value",
  },
  Hoodies: {
    itemSelector: ".product",
    nameSelector: ".product-category-name",
    priceSelector: ".price-wrapper .price:not(:contains('0.00'))",
    imageSelector: ".gallery-img",
    URLSelector: "a",
    // colorSelector: ".swatch-option",
    imagesItemSelector: ".slick-track",
    imageItemSelector: ".img_zoom",
    colorsItemSelector: ".swatch-attribute-options",
    colorSelector: ".swatch-option",
  },
  Yanga: {
    itemSelector: ".listing-product_3mjp",
    nameSelector: ".title_3ZxJ",
    priceSelector: ".final-price_8CiX",
    imageSelector: ".image_3k9y",
    URLSelector: ".tx-link-a",
    // colorSelector: ".color-item_1Y2Y",
    imagesItemSelector: "div.thumb_2ID9",
    imageItemSelector: "img",
    colorsItemSelector: ".color_FYIY",
    colorSelector: ".color-item_1Y2Y",
  },
  // "FashionClub":
  //   {
  //     itemSelector: ".product-col",
  //     nameSelector: ".product-detail .product-title a",
  //     priceSelector: ".amount bdi",
  //     imageSelector: ".slide-img-wrap img",
  //     URLSelector: ".product-title a",
  //     colorSelector: ".variable-item-span-color",
  //     imagesItemSelector: ".slick-track",
  //     imageItemSelector: ".hover_zoom",
  //   },
  // "H&O":
  //   {
  //     itemSelector: ".product_addtocart_form",
  //     nameSelector: ".product-item-link",
  //     priceSelector: ".price:not(:contains('0.00'))",
  //     imageSelector: ".product-image-photo",
  //     URLSelector: "a",
  //     colorSelector: ".inline-block",
  //     imagesItemSelector: ".relative",
  //     imageItemSelector: ".absolute",
  //   },
};

// var url = getUrl("Men", "Pants", "32", "Black");
// console.log(url);
// const [website, config] = Object.entries(websitesToScrape)[2];

// const scrapedData = await scrapeWebsite(
//   "https://www.golf-il.co.il/men/pants/long-pants?color_group=2285&size=2773",
//   config,
//   "Men",
//   "Pants",
//   "32",
//   "Black"
// );
// console.log(scrapedData);

// const [website, config] = Object.entries(websitesToScrape)[7];
// const [img, col] = await getImagesAndColors(
//   "https://www.terminalx.com/brands/yanga/w241990021?color=467",
//   config
// );
// console.log(img);
// console.log(col);

const getConfig = (store) => {
  return websitesToScrape[store];
};

// let url = getUrl("women", "dresses", "M", "green");
// console.log(url);

export { getConfig };
