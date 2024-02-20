let colors = {
  white: "אבן%7Cשמנת%7Cלבן%7Cבז%27",
  black: "שחור+מכובס%7Cשחור%7Cשחור+מודפס%7Cשחור+מט",
  pink: "ורוד+פודרה%7Cורוד%7Cאפרסק%7Cפוקסיה",
  blue: "כחול+ג%27נס%7Cכחול+נייבי%7Cכחול%7Cכחול+רוייאל%7Cכחול+ים+אפור",
  lightBlue: "תכלת+אסיד%7Cתכלת",
  green: "ירוק%7Cירוק+זית%7Cסלדין%7Cירוק+בקבוק",
  gray: "אפור+מלנג%27%7Cאפור+מרינגו%7Cאפור%7Cאפור+עכבר%7Cכסף",
  red: "אדום%7Cבריק",
  brown: "כאמל%7Cמוקה%7Cחום",
  burgundy: "בורדו",
  orange: "קורל%7Cכתום",
  yellow: "חרדל",
  purple: "סגול",
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

function getSizeUrl(arr, num) {
  let url = "prefn" + num + "=size&prefv" + num + "=";

  if (arr.length > 0) {
    url += arr[0];
    for (let i = 1; i < arr.length; i++) {
      url += "%7C" + arr[i];
    }
  }

  return url;
}

function getColorUrl(color, num) {
  return "prefn" + num + "=color&prefv" + num + "=" + colors[color];
}

function getUrl(gender, category, sizes, color) {
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
  }
  if (gender == "men" && category == "sweatshirts") {
    url += "גברים/בגדים/סווטשירטים-וקפוצ%27ונים/?";
  } else {
    url += gender + "/";

    if (category != "shoes") {
      url += cloth;
    }

    url += categoryInUrl + "/?";
  }

  url += getColorUrl(color, 1);
  url += "&" + getSizeUrl(sizes, 2);

  return url;
}

export { getUrl };
