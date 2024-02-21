let colors = {
  white: "אבן%7Cשמנת%7Cלבן%7Cבז%27",
  black: "שחור+מכובס%7Cשחור%7Cשחור+מודפס%7Cשחור+מט",
  pink: "ורוד%7Cאפרסק%7Cפוקסיה%7Cורוד++מעושן%7Cורוד+בהיר%7Cורוד+פודרה",
  blue: "כחול+ג%27נס%7Cכחול+נייבי%7Cכחול%7Cכחול+רוייאל%7Cכחול+ים+אפור",
  lightBlue: "תכלת+אסיד%7Cתכלת",
  green: "ירוק%7Cירוק+זית%7Cסלדין%7Cירוק+בקבוק",
  gray: "אפור+מלנג%27%7Cאפור+מרינגו%7Cאפור%7Cאפור+עכבר%7Cכסף%7Cאפור+בהיר%7Cאפור+כהה",
  red: "אדום%7Cבריק",
  brown: "חום+כהה%7Cחאקי%7Cכאמל%7Cמוקה%7Cחום%7Cקפה",
  burgundy: "בורדו",
  orange: "קורל%7Cכתום",
  yellow: "צהוב%7Cחרדל",
  purple: "אבןחציל%7Cסגול%7Cסגול+לילה",
};

let categoriesWomen = {
  jeans: "jeans",
  pants: "pants",
  dresses: "dresses",
  skirts: "skirts",
  sweaters: "srigim",
  jackets: "jackets-women",
  sweatshirts: "sweatshirts_and_hoodies",
  shirts: "shirts",
  shoes: "shoes",
};

let categoriesMen = {
  jeans: "jeans",
  pants: "pants",
  sweaters: "knitwear_and_cardigans",
  jackets: "coats_and_jackets",
  shirts: "shirts",
  shoes: "shoes",
};

function getSizeUrl(size, num) {
  return "prefn" + num + "=size&prefv" + num + "=" + size;
}

function getColorUrl(color, num) {
  return "prefn" + num + "=color&prefv" + num + "=" + colors[color];
}

function getUrl(gender, category, size, color) {
  let url = "https://www.renuar.co.il/";
  let cloth, categoryInUrl;

  if (gender == "women") {
    cloth = "clothing/";
    categoryInUrl = categoriesWomen[category];
  } else if (gender == "men") {
    cloth = "clothes/";
    categoryInUrl = categoriesMen[category];
  }

  if (gender == "women" && (category == "shirts" || category == "shorts")) {
    url += "נשים/בגדים/";

    if (category == "shirts") {
      url += "חולצות";
    } else if (category == "shorts") {
      url += "שורטים-וברמודות";
    }

    url += "/?";
  } else if (gender == "men" && category == "sweatshirts") {
    url += "גברים/בגדים/סווטשירטים-וקפוצ%27ונים/?";
  } else {
    url += gender + "/";

    if (category != "shoes") {
      url += cloth;
    }

    url += categoryInUrl + "/?";
  }

  url += getColorUrl(color, 1);
  url += "&" + getSizeUrl(size, 2);

  return url;
}

export { getUrl };
