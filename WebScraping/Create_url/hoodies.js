let colors = {
  white: "6323_6331",
  black: "6324",
  pink: "6326",
  lightBlue: "159558_167460_167463",
  blue: "6322",
  green: "167454_6329",
  gray: "6325",
  red: "6328",
  brown: "167457_167458_6327",
  orange: "167453_6335",
  yellow: "167451_6332",
  purple: "167456_6330",
};

let categoriesWomen = {
  pants: "pants",
  sweaters: "sweatshirts",
  sweatshirts: "hoodies",
  jackets: "מעילים-וגקטים",
  shirts: "shirts",
  dresses: "dresses",
};

let categoriesMen = {
  pants: "pants",
  sweaters: "sweatshirt",
  sweatshirts: "hoodies",
  jackets: "מעילים-וזקטים",
  shirts: "shirts",
};

let sizes = {
  XS: "159519_167654",
  S: "159517_167655",
  M: "159516_167653",
  L: "159518_166026",
  XL: "159515_167792",
  XXL: "170460",
};

function getUrl(gender, category, size, color) {
  let url = "https://www.hoodies.co.il/" + gender + "/";

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

  url += "?color_group=" + colors[color] + "&size=" + sizes[size];

  return url;
}

export { getUrl };
