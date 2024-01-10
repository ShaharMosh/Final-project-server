import {
  scrapeWebsite,
  scrapeMultipleWebsites,
} from "./WebScraping/LongShirts/scrapeShirt.js";

// Example usage
const websitesToScrape = [
  {
    url: "https://www.castro.com/women/categories/tops_/_bodysuits/long_shirts",
    config: {
      //   productSelector: ".product-class",
      nameSelector: "#product_category_157204",
      //   priceSelector: ".price-class",
    },
  },
  //   {
  //     url: "https://website2.com",
  //     config: {
  //       productSelector: ".item-class",
  //       nameSelector: ".title-class",
  //       priceSelector: ".cost-class",
  //     },
  //   },
];

scrapeMultipleWebsites(websitesToScrape);
