let colors = {
  White: "231%2C238",
  Black: "212",
  Pink: "213",
  Blue: "236%2C211",
  Green: "210",
  Gray: "233%2C235",
  Brown: "234%2C239",
  Orange: "237",
  Purple: "241",
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
  Jeans: "pants/jeans.html",
  Pants: "pants/mknsiim-arvkim.html",
  Dresses: "dresses.html",
  Skirts: "dresses/hcaivt.html",
  Sweaters: "srigim.html",
  Jackets: "coats-jackets.html",
  Shirts: "tops.html",
  Shorts: "pants/mknsi-wvrt.html",
};

function getUrl(gender, category, size, color) {
  let url = "https://www.studiopasha.co.il/";

  if (
    gender == "Men" ||
    categoriesWomen[category] == undefined ||
    colors[color] == undefined ||
    sizes[size] == undefined
  ) {
    return null;
  }

  if (category == "Dresses") {
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
