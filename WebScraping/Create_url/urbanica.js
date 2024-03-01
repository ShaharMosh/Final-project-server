let colors = {
  white: "921_929",
  black: "919",
  pink: "928_931",
  blue: "918",
  green: "922",
  gray: "927_940",
  brown: "926_934_932",
  orange: "925",
  yellow: "924",
  purple: "923",
  red: "920",
};

let sizes = {
  28: "1074_1082_979",
  30: "1069_975",
  32: "1073_1086_978",
  34: "1071_1089_976",
  35: "1060",
  36: "1068_1087_977",
  37: "1057",
  38: "980",
  39: "1058",
  40: "1059",
  41: "1051",
  42: "1052",
  43: "1053",
  44: "1054",
  45: "1055",
  46: "1056",
  XS: "973_999",
  S: "1000_1064_999",
  M: "1000_972_998",
  L: "1001_1065_998",
  XL: "1001_974",
};

let categoriesWomen = {
  jeans: "גינסים",
  pants: "pants",
  dresses: "שמלות",
  skirts: "שמלות",
  sweaters: "sweaters",
  sweatshirts: "sweatshirts",
  jackets: "jackets-and-coats",
  shirts: "חולצות",
  shoes: "נעליים",
};

let categoriesMen = {
  jeans: "גינסים",
  pants: "pants_men",
  jackets: "jackets-and-coats",
  sweatshirts: "sweatshirts",
  shirts: "חולצות",
  shoes: "shoes",
};

function getUrl(gender, category, size, color) {
  let url = "https://www.urbanica-wh.com/" + gender + "/";

  if (
    categoriesWomen[category] == undefined ||
    colors[color] == undefined ||
    sizes[size] == undefined
  ) {
    return null;
  }

  if (gender == "women") {
    url += categoriesWomen[category];
  } else if (gender == "men") {
    url += categoriesMen[category];
  }

  url += "?color_group=" + colors[color] + "&size_group=" + sizes[size];

  if (category == "dresses") {
    url += "&product_type=2778";
  } else if (category == "skirts") {
    url += "&product_type=3309";
  }

  return url;
}

export { getUrl };
