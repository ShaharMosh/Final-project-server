let colors = {
  White: "אבן%7Cשמנת%7Cלבן%7Cבז%27%7Cקרם%7Cפסים+שחור+לבן%7Cשחור+%2B+לבן",
  Black: "שחור+מכובס%7Cשחור%7Cשחור+מודפס%7Cשחור+מט",
  Pink: "פסים+ורוד%7Cורוד%7Cאפרסק%7Cפוקסיה%7Cורוד++מעושן%7Cורוד+בהיר%7Cורוד+פודרה%7Cורוד+עתיק",
  Blue: "כחול+ג%27נס%7Cכחול+נייבי%7Cכחול%7Cכחול+רוייאל%7Cכחול+ים+אפור",
  Azure: "תכלת+אסיד%7Cתכלת%7Cטורקיז",
  Green:
    "ירוק%7Cירוק+זית%7Cסלדין%7Cירוק+בקבוק%7Cירוק+בהיר%7Cירוק+דשא%7Cירוק+תפוח",
  Gray: "אפור+מלנג%27%7Cאפור+מרינגו%7Cאפור%7Cאפור+עכבר%7Cכסף%7Cאפור+בהיר%7Cאפור+כהה%7Cאקווה+מרין%7Cסלדין",
  Red: "אדום%7Cבריק",
  Brown: "חום+כהה%7Cחאקי%7Cכאמל%7Cמוקה%7Cחום%7Cקפה%7Cגוף",
  Burgundy: "בורדו",
  Orange: "קורל%7Cכתום%7Cחמרה",
  Yellow: "צהוב%7Cחרדל",
  Purple: "אבןחציל%7Cסגול%7Cסגול+לילה",
};

let categoriesWomen = {
  Jeans: "jeans",
  Pants: "pants",
  Dresses: "dresses",
  Skirts: "skirts",
  Sweaters: "knitwear",
  Sweatshirts: "sweatshirts-and-hoodies",
  Jackets: "jackets",
  Shirts: "shirts",
  Shoes: "shoes",
  Shorts: "short-jeans",
  Buttonshirts: "buttonshirts",
};

let categoriesMen = {
  Jeans: "ג%27ינסים",
  Pants: "מכנסיים",
  Jackets: "ז%27קטים-ווסטים",
  Sweatshirts: "קפוצ%27ונים-סווטשירטים",
  Sweaters: "סריגים-סוודרים",
  Shirts: "טישירטים",
  Shoes: "נעליים",
  Shorts: "ברמודות",
  Buttonshirts: "חולצות_מכופתרות",
};

function getUrl(gender, category, size, color) {
  let urls = [];
  let url = "https://www.twentyfourseven.co.il/";

  if (colors[color] == undefined) {
    return null;
  }

  let rest =
    "/?prefn1=color&prefv1=" + colors[color] + "&prefn2=size&prefv2=" + size;

  if (gender == "Women") {
    if (categoriesWomen[category] == undefined) {
      return null;
    }

    url += "women/";
    if (category != "Shoes") {
      url += "clothing/";
    }

    url += categoriesWomen[category];
  } else if (gender == "Men") {
    if (categoriesMen[category] == undefined) {
      return null;
    }

    if (category == "Buttonshirts") {
      url += "בגדים/גברים";
    } else {
      url += "גברים/";
      if (category != "Shoes") {
        url += "כל-הקולקציה";
      }
    }

    url += "/" + categoriesMen[category];
  }

  if (urls.length === 0) {
    urls = [url + rest];
  }

  return urls;
}

export { getUrl };
