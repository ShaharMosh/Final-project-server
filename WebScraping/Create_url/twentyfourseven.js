let colors = {
  white: "אבן%7Cשמנת%7Cלבן%7Cבז%27",
  black: "שחור+מכובס%7Cשחור%7Cשחור+מודפס%7Cשחור+מט",
  pink: "ורוד%7Cאפרסק%7Cפוקסיה%7Cורוד++מעושן%7Cורוד+בהיר%7Cורוד+פודרה",
  blue: "כחול+ג%27נס%7Cכחול+נייבי%7Cכחול%7Cכחול+רוייאל%7Cכחול+ים+אפור",
  lightBlue: "תכלת+אסיד%7Cתכלת%7Cטורקיז",
  green: "ירוק%7Cירוק+זית%7Cסלדין%7Cירוק+בקבוק",
  gray: "אפור+מלנג%27%7Cאפור+מרינגו%7Cאפור%7Cאפור+עכבר%7Cכסף%7Cאפור+בהיר%7Cאפור+כהה",
  red: "אדום%7Cבריק",
  brown: "חום+כהה%7Cחאקי%7Cכאמל%7Cמוקה%7Cחום%7Cקפה%7Cגוף",
  burgundy: "בורדו",
  orange: "קורל%7Cכתום",
  yellow: "צהוב%7Cחרדל",
  purple: "אבןחציל%7Cסגול%7Cסגול+לילה",
};

let sizes = {
  28: "",
  30: "",
  32: "",
  34: "",
  35: "",
  36: "",
  37: "",
  38: "",
  39: "",
  40: "",
  41: "",
  42: "",
  43: "",
  44: "",
  45: "",
  46: "",
  XS: "",
  S: "",
  M: "",
  L: "",
  XL: "",
};

let categoriesWomen = {
  jeans: "jeans",
  pants: "pants",
  dresses: "dresses",
  skirts: "skirts",
  sweaters: "knitwear",
  sweatshirts: "sweatshirts-and-hoodies",
  jackets: "jackets",
  shirts: "shirts",
  shoes: "",
};

let categoriesMen = {
  jeans: "",
  pants: "",
  jackets: "",
  sweatshirts: "",
  shirts: "",
  shoes: "",
};

function getUrl(gender, category, size, color) {
  let url = "https://www.twentyfourseven.co.il/" + gender + "/";

  if (
    categoriesWomen[category] == undefined ||
    colors[color] == undefined ||
    sizes[size] == undefined
  ) {
    return null;
  }

  if (category == "shoes") {
    url += "shoes/";
  } else {
    url += "clothing/";
  }

  if (gender == "women") {
    url += categoriesWomen[category];
  } else if (gender == "men") {
    url += categoriesMen[category];
  }

  url +=
    "/?prefn1=color&prefv1=" +
    colors[color] +
    "&prefn2=size&prefv2=" +
    sizes[size];

  return url;
}

export { getUrl };
