let colors = {
  White: "2291",
  Black: "2285",
  Pink: "2292",
  Blue: "2286",
  Green: "2293",
  Gray: "2287",
  Red: "2294",
  Brown: "2288_2289",
  Orange: "2297",
  Yellow: "2290",
  Purple: "2295",
};

let categoriesWomen = {
  Jeans: "jeans",
  Pants: "pants",
  Dresses: "dresses-and-overalls",
  Skirts: "skirts",
  Sweaters: "sweater-and-knitted-shirts",
  Sweatshirts: "sweatshirts",
  Jackets: "jackets-and-coats",
  Shirts: "shirts-and-tops",
  Shoes: "shoes/shoes-women",
};

let categoriesMen = {
  Jeans: "denim",
  Pants: "pants",
  Sweaters: "sweaters-and-knitted-shirts",
  Sweatshirts: "sweatshirts",
  Jackets: "jackets-and-coats",
  Shirts: "t-shirts",
  Shoes: "shoes",
};

let sizes = {
  28: "2771",
  30: "2772",
  32: "2773",
  34: "2774",
  36: "2775",
  37: "2780",
  38: "2753",
  39: "2781",
  40: "2754",
  41: "2782",
  42: "2755",
  43: "3173",
  44: "2756",
  45: "3174",
  46: "2757",
  XS: "2764",
  S: "2765",
  M: "2766",
  L: "2767",
  XL: "2768",
  XXL: "2769",
};

function getColorUrl(color) {
  return "color_group=" + colors[color];
}

function getSizeUrl(size) {
  return "size=" + sizes[size];
}

function getUrl(gender, category, size, color) {
  let url = "https://www.golf-il.co.il/";

  if (colors[color] == undefined || sizes[size] == undefined) {
    return null;
  }

  if (category != "Shoes") {
    url += gender.toLowerCase() + "/";
  }

  if (gender == "Women") {
    if (categoriesWomen[category] == undefined) {
      return null;
    }

    url += categoriesWomen[category];
  } else if (gender == "Men") {
    if (categoriesMen[category] == undefined) {
      return null;
    }

    url += categoriesMen[category];
  }

  url += "?" + getColorUrl(color) + "&" + getSizeUrl(size);

  return url;
}

export { getUrl };
