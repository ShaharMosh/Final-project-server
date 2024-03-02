let colors = {
  white: "1789_2226_1785",
  black: "1768",
  pink: "1776",
  blue: "1772",
  green: "1773",
  gray: "1778_1794",
  red: "1790",
  brown: "1777_1782",
  burgundy: "1797",
  orange: "1787",
  yellow: "1771",
  purple: "1781",
};

let sizes = {
  26: "4875",
  28: "4876",
  30: "4878",
  31: "4879",
  32: "4864",
  33: "4880",
  34: "4832",
  35: "4903",
  36: "4833",
  37: "4865",
  38: "4834",
  39: "4895",
  40: "4835",
  41: "4896",
  42: "4836",
  43: "4897",
  44: "4837",
  45: "4898",
  46: "4857",
  48: "4858",
  XS: "4841",
  S: "4838",
  M: "4839",
  L: "4840",
  XL: "4842",
  XXL: "4863",
};

let categoriesWomen = {
  jeans: "jeans",
  pants: "pants",
  dresses: "dresses",
  skirts: "skirts",
  sweaters: "jumpers_/_knits",
  jackets: "jackets__/_coats",
  shirts: "tops_/_bodysuits",
  shoes: "shoes",
};

let categoriesMen = {
  jeans: "jeans",
  pants: "pants",
  sweaters: "jumpers_knits",
  jackets: "jackets_coats",
  shirts: "teeshirt",
  shoes: "shoes",
};

function getColorUrl(color) {
  return "color_group=" + colors[color];
}

function getSizeUrl(size) {
  return "size=" + sizes[size];
}

function getUrl(gender, category, size, color) {
  let url = "https://www.castro.com/" + gender + "/categories/";

  if (colors[color] == undefined || sizes[size] == undefined) {
    return null;
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
