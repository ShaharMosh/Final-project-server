let colors = {
  white: "אבן%7Cשמנת%7Cלבן%7Cבז%27%7Cקרם%7Cפסים+שחור+לבן%7Cשחור+%2B+לבן",
  black: "שחור+מכובס%7Cשחור%7Cשחור+מודפס%7Cשחור+מט",
  pink: "ורוד%7Cאפרסק%7Cפוקסיה%7Cורוד++מעושן%7Cורוד+בהיר%7Cורוד+פודרה%7Cורוד+עתיק",
  blue: "כחול+ג%27נס%7Cכחול+נייבי%7Cכחול%7Cכחול+רוייאל%7Cכחול+ים+אפור",
  lightBlue: "תכלת+אסיד%7Cתכלת%7Cטורקיז",
  green:
    "ירוק%7Cירוק+זית%7Cסלדין%7Cירוק+בקבוק%7Cירוק+בהיר%7Cירוק+דשא%7Cירוק+תפוח",
  gray: "אפור+מלנג%27%7Cאפור+מרינגו%7Cאפור%7Cאפור+עכבר%7Cכסף%7Cאפור+בהיר%7Cאפור+כהה%7Cאקווה+מרין%7Cסלדין",
  red: "אדום%7Cבריק",
  brown: "חום+כהה%7Cחאקי%7Cכאמל%7Cמוקה%7Cחום%7Cקפה%7Cגוף",
  burgundy: "בורדו",
  orange: "קורל%7Cכתום%7Cחמרה",
  yellow: "צהוב%7Cחרדל",
  purple: "אבןחציל%7Cסגול%7Cסגול+לילה",
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
  shoes: "shoes",
};

let categoriesMen = {
  jeans: "ג%27ינסים",
  pants: "מכנסיים",
  jackets: "מעילים-ז%27קטים-ווסטים",
  sweatshirts: "קפוצ%27ונים-סווטשירטים",
  sweaters: "סריגים-סוודרים",
  shirts: "חולצות",
  shoes: "נעליים",
};

function getUrl(gender, category, size, color) {
  let url = "https://www.twentyfourseven.co.il/";

  if (colors[color] == undefined) {
    return null;
  }

  if (gender == "women") {
    if (categoriesWomen[category] == undefined) {
      return null;
    }

    url += gender + "/";
    if (category != "shoes") {
      url += "clothing/";
    }
    url += categoriesWomen[category];
  } else if (gender == "men") {
    if (categoriesMen[category] == undefined) {
      return null;
    }

    url += "גברים/";
    if (category != "shoes") {
      url += "כל-הקולקציה";
    }
    url += "/" + categoriesMen[category];
  }

  url +=
    "/?prefn1=color&prefv1=" + colors[color] + "&prefn2=size&prefv2=" + size;

  return url;
}

export { getUrl };
