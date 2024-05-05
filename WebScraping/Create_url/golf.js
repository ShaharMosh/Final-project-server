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
  Dresses: "",
  Skirts: "skirts",
  Sweaters: "sweater-and-knitted-shirts",
  Sweatshirts: "sweatshirts",
  Jackets: "",
  Shirts: "shirts-and-tops",
  Shoes: "shoes/shoes-women",
  Shorts: "short-pants",
  Suits: "",
};

let categoriesMen = {
  Jeans: "denim",
  Pants: "pants/long-pants",
  Sweaters: "sweaters-and-knitted-shirts",
  Sweatshirts: "sweatshirts",
  Jackets: "jackets-and-coats",
  Shirts: "t-shirts",
  Shoes: "shoes",
  Shorts: "pants/short-pants",
  Buttonshirts: "",
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

function getUrl(gender, category, size, color) {
  if (colors[color] == undefined || sizes[size] == undefined) {
    return null;
  }

  let url = "https://www.golf-il.co.il/";
  let urls = [];
  let rest = "?color_group=" + colors[color] + "&size=" + sizes[size];

  if (category != "Shoes") {
    url += gender.toLowerCase() + "/";
  }

  if (gender == "Women") {
    if (categoriesWomen[category] == undefined) {
      return null;
    }

    if (category == "Jackets") {
      urls = [url + "cardigans" + rest, url + "jackets-and-coats" + rest];
    } else if (category == "Suits") {
      urls = [
        url + "dresses-and-overalls/knitted-dresses" + rest,
        url + "sets" + rest,
      ];
    } else if (category == "Dresses") {
      urls = [
        url + "dresses-and-overalls/maxi-dresses" + rest,
        url + "dresses-and-overalls/midi-dresses" + rest,
        url + "dresses-and-overalls/mini-dresses" + rest,
      ];
    } else {
      url += categoriesWomen[category] + rest;
    }
  } else if (gender == "Men") {
    if (categoriesMen[category] == undefined) {
      return null;
    }

    if (category == "Buttonshirts") {
      urls = [url + "button-up-shirts" + rest, url + "polo-shirts" + rest];
    } else {
      url += categoriesMen[category] + rest;
    }
  }

  if (urls.length === 0) {
    urls = [url];
  }

  return urls;
}

export { getUrl };
