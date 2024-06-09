let colors = {
  White: "1789_2226_1785",
  Black: "1768",
  Pink: "1776",
  Blue: "1772",
  Green: "1773",
  Gray: "1778_1794",
  Red: "1790",
  Brown: "1777_1782",
  Burgundy: "1797",
  Orange: "1787",
  Yellow: "1771",
  Purple: "1781",
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
  Jeans: "jeans",
  Pants: "pants/long_pants",
  Dresses: "dresses_/_jumpsuits",
  Skirts: "skirts",
  Sweaters: "jumpers_/_knits/knits",
  Sweatshirts: "jumpers_/_knits/jumpers",
  Jackets: "jackets__/_coats",
  Shirts: "tops_/_bodysuits",
  Shoes: "shoes",
  Shorts: "pants/shorts",
  Suits: "",
};

let categoriesMen = {
  Jeans: "jeans",
  Pants: "pants",
  Sweaters: "jumpers_knits/knits",
  Sweatshirts: "jumpers_knits/junpers",
  Jackets: "jackets_coats",
  Shirts: "teeshirt",
  Shoes: "shoes",
  Shorts: "short_jeans",
  Buttonshirts: "",
};

function getUrl(gender, category, size, color) {
  if (colors[color] == undefined || sizes[size] == undefined) {
    return null;
  }

  let begin = "https://www.castro.com/" + gender.toLowerCase() + "/";
  let url = begin + "categories/";
  let urls = [];
  let rest = "?color_group=" + colors[color] + "&size=" + sizes[size];

  if (gender == "Women") {
    if (categoriesWomen[category] == undefined) {
      return null;
    }

    if (category == "Suits") {
      urls = [
        begin + "our_favorites/suits" + rest,
        url + categoriesWomen["Dresses"] + "/jumpsuits" + rest,
      ];
    } else if (category == "Dresses") {
      urls = [
        url + categoriesWomen["Dresses"] + "/maxi_dresses" + rest,
        url + categoriesWomen["Dresses"] + "/midi_dresses" + rest,
        url + categoriesWomen["Dresses"] + "/mini_dresses" + rest,
      ];
    } else {
      url += categoriesWomen[category] + rest;
    }
  } else if (gender == "Men") {
    if (categoriesMen[category] == undefined) {
      return null;
    }

    if (category == "Buttonshirts") {
      urls = [url + "polomen" + rest, url + "tops" + rest];
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
