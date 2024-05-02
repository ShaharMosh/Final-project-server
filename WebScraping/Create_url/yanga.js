let colors = {
  White: "491_2883",
  Black: "487",
  Pink: "492_495",
  Blue: "489",
  Green: "490",
  Gray: "488",
  Red: "499",
  Brown: "500_1586",
  Orange: "503",
  Yellow: "504",
  Purple: "494",
};

let sizes = {
  34: "10513",
  36: "10530",
  37: "10542",
  38: "10548",
  39: "10559",
  40: "10566",
  41: "10571",
  42: "10575",
  XS: "10408",
  S: "10624",
  M: "10619",
  L: "10618",
  OS: "10622",
};

let categoriesWomen = {
  Jeans: "11344&product_type_level=11345",
  Pants: "11344&product_type_level=11347",
  Dresses: "11337&product_type_level=11338_11339_11340",
  Skirts: "11337&product_type_level=11341_11342_11343",
  Sweaters: "11384&product_type_level=11386",
  Jackets: "11548",
  Shirts: "11330&product_type_level=11331_11332_11334_11335",
  Shoes: "11370",
  Shorts: "11344&product_type_level=11346",
};

function getUrl(gender, category, size, color) {
  if (gender == "Men") {
    return null;
  }

  let url = "https://www.terminalx.com/brands/yanga?category_level=";

  if (
    colors[color] == undefined ||
    sizes[size] == undefined ||
    categoriesWomen[category] == undefined
  ) {
    return null;
  }

  url +=
    categoriesWomen[category] +
    "&color_group=" +
    colors[color] +
    "&size_group=" +
    sizes[size];
  return url;
}

export { getUrl };
