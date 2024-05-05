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
  Suits: "",
};

function getUrl(gender, category, size, color) {
  if (
    gender == "Men" ||
    categoriesWomen[category] == undefined ||
    colors[color] == undefined ||
    sizes[size] == undefined
  ) {
    return null;
  }

  let url = "https://www.studiopasha.co.il/";
  let urls = [];
  let rest = "?parent_color=" + colors[color] + "&size=" + sizes[size];

  if (category == "Dresses") {
    return [
      url + "dresses/dresses-short-dresses.html" + rest,
      url + "dresses/dresses-maxi-midi-dresses.html" + rest,
      url + "dresses/dresses-evening-dresses.html" + rest,
    ];
  } else if (category == "Suits") {
    return [url + "suits.html" + rest, url + "overall.html" + rest];
  } else {
    url += categoriesWomen[category] + rest;
  }

  if (urls.length === 0) {
    urls = [url];
  }

  return urls;
}

export { getUrl };
