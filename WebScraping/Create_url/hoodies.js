let colors = {
  White: "6323_6331_171931",
  Black: "6324",
  Pink: "6326",
  Azure: "159558_167460_167463",
  Blue: "6322",
  Green: "167454_6329",
  Gray: "6325",
  Red: "6328",
  Brown: "167457_167458_6327",
  Orange: "167453_6335",
  Yellow: "167451_6332",
  Purple: "167456_6330",
};

let categoriesWomen = {
  Pants: "pants/long",
  Sweaters: "sweatshirts",
  Sweatshirts: "hoodies",
  Jackets: "מעילים-וגקטים",
  Shirts: "shirts",
  Dresses: "dresses",
  Shorts: "pants/shorts",
};

let categoriesMen = {
  Pants: "pants/long",
  Sweaters: "sweatshirt",
  Sweatshirts: "hoodies",
  jackets: "מעילים-וזקטים",
  Shirts: "shirts",
  Shorts: "pants/short",
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
  if (colors[color] == undefined || sizes[size] == undefined) {
    return null;
  }

  let url = "https://www.hoodies.co.il/";

  if (gender == "Women") {
    if (categoriesWomen[category] == undefined) {
      return null;
    }

    url += "women/" + categoriesWomen[category];
  } else if (gender == "Men") {
    if (categoriesMen[category] == undefined) {
      return null;
    }

    url += "men/" + categoriesMen[category];
  }

  url += "?color_group=" + colors[color] + "&size=" + sizes[size];

  return [url];
}

export { getUrl };
