let colors = {
  white: "2291",
  black: "2285",
  pink: "2292",
  blue: "2286",
  green: "2293",
  gray: "2287",
  red: "2294",
  brown: "2288_2289",
  orange: "2297",
  yellow: "2290",
  purple: "2295",
};

let categoriesWomen = {
  jeans: "jeans",
  pants: "pants",
  dresses: "dresses-and-overalls",
  skirts: "skirts",
  sweaters: "sweater-and-knitted-shirts",
  sweatshirts: "sweatshirts",
  jackets: "jackets-and-coats",
  shirts: "shirts-and-tops",
  shoes: "shoes/shoes-women",
};

let categoriesMen = {
  jeans: "denim",
  pants: "pants",
  sweaters: "sweaters-and-knitted-shirts",
  sweatshirts: "sweatshirts",
  jackets: "jackets-and-coats",
  shirts: "t-shirts",
  shoes: "shoes",
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

  if (category != "shoes") {
    url += gender + "/";
  }

  if (gender == "women") {
    if (categoriesWomen[category] == undefined) {
      return null;
    }

    url += categoriesWomen[category];
  } else if (gender == "men") {
    if (categoriesMen[category] == undefined) {
      return null;
    }

    url += categoriesMen[category];
  }

  url += "?" + getColorUrl(color) + "&" + getSizeUrl(size);

  return url;
}

export { getUrl };
