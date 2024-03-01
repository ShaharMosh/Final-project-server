let colors = {
  white: "231%2C238",
  black: "212",
  pink: "213",
  blue: "236%2C211",
  green: "210",
  gray: "233%2C235",
  brown: "234%2C239",
  orange: "237",
  purple: "241",
};

let sizes = {
  32: "7",
  34: "8",
  36: "9",
  38: "10",
  40: "191",
  42: "556",
  XS: "8",
  S: "9",
  M: "10",
  L: "191",
  XL: "556",
};

let categoriesWomen = {
  jeans: "pants/jeans.html",
  pants: "pants/mknsiim-arvkim.html",
  dresses: "dresses.html",
  skirts: "dresses/hcaivt.html",
  sweaters: "srigim.html",
  jackets: "coats-jackets.html",
  shirts: "tops.html",
};

function getUrl(gender, category, size, color) {
  if (gender == "men") {
    return null;
  }

  let url = "https://www.studiopasha.co.il/";

  if (
    categoriesWomen[category] == undefined ||
    colors[color] == undefined ||
    sizes[size] == undefined
  ) {
    return null;
  }

  if (category == "dresses") {
    let rest = "?parent_color=" + colors[color] + "&size=" + sizes[size];
    return [
      url + "dresses/dresses-short-dresses.html" + rest,
      url + "dresses/dresses-maxi-midi-dresses.html" + rest,
      url + "dresses/dresses-evening-dresses.html" + rest,
    ];
  }

  url +=
    categoriesWomen[category] +
    "?parent_color=" +
    colors[color] +
    "&size=" +
    sizes[size];

  return url;
}

export { getUrl };
