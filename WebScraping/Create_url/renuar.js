let colors = {
  White: "אבן%7Cשמנת%7Cלבן%7Cבז%27",
  Black: "שחור+מכובס%7Cשחור%7Cשחור+מודפס%7Cשחור+מט",
  Pink: "ורוד%7Cאפרסק%7Cפוקסיה%7Cורוד++מעושן%7Cורוד+בהיר%7Cורוד+פודרה",
  Blue: "כחול+ג%27נס%7Cכחול+נייבי%7Cכחול%7Cכחול+רוייאל%7Cכחול+ים+אפור",
  LightBlue: "תכלת+אסיד%7Cתכלת",
  Green: "ירוק%7Cירוק+זית%7Cסלדין%7Cירוק+בקבוק",
  Gray: "אפור+מלנג%27%7Cאפור+מרינגו%7Cאפור%7Cאפור+עכבר%7Cכסף%7Cאפור+בהיר%7Cאפור+כהה",
  Red: "אדום%7Cבריק",
  Brown: "חום+כהה%7Cחאקי%7Cכאמל%7Cמוקה%7Cחום%7Cקפה",
  Burgundy: "בורדו",
  Orange: "קורל%7Cכתום",
  Yellow: "צהוב%7Cחרדל",
  Purple: "אבןחציל%7Cסגול%7Cסגול+לילה",
};

let categoriesWomen = {
  Jeans: "jeans",
  Pants: "pants",
  Dresses: "dresses",
  Skirts: "skirts",
  Sweaters: "srigim",
  Jackets: "jackets-women",
  Sweatshirts: "sweatshirts_and_hoodies",
  Shirts: "shirts",
  Shoes: "shoes",
};

let categoriesMen = {
  Jeans: "jeans",
  Pants: "pants",
  Sweaters: "knitwear_and_cardigans",
  Jackets: "coats_and_jackets",
  Shirts: "shirts",
  Shoes: "shoes",
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

  if (colors[color] == undefined) {
    return null;
  }

  if (gender == "Women") {
    if (categoriesWomen[category] == undefined) {
      return null;
    }

    cloth = "clothing/";
    categoryInUrl = categoriesWomen[category];
  } else if (gender == "Men") {
    if (categoriesMen[category] == undefined) {
      return null;
    }

    cloth = "clothes/";
    categoryInUrl = categoriesMen[category];
  }

  if (gender == "Women" && (category == "Shirts" || category == "Shorts")) {
    url += "נשים/בגדים/";

    if (category == "Shirts") {
      url += "חולצות";
    } else if (category == "Shorts") {
      url += "שורטים-וברמודות";
    }

    url += "/?";
  } else if (gender == "Men" && category == "Sweatshirts") {
    url += "גברים/בגדים/סווטשירטים-וקפוצ%27ונים/?";
  } else {
    url += gender.toLowerCase() + "/";

    if (category != "Shoes") {
      url += cloth;
    }

    url += categoryInUrl + "/?";
  }

  url += getColorUrl(color, 1);
  url += "&" + getSizeUrl(size, 2);

  return url;
}

export { getUrl };
