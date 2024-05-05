let colors = {
  White: "אבן%7Cשמנת%7Cלבן%7Cבז%27",
  Black: "שחור+מכובס%7Cשחור%7Cשחור+מודפס%7Cשחור+מט",
  Pink: "ורוד%7Cאפרסק%7Cפוקסיה%7Cורוד++מעושן%7Cורוד+בהיר%7Cורוד+פודרה",
  Blue: "כחול+ג%27נס%7Cכחול+נייבי%7Cכחול%7Cכחול+רוייאל%7Cכחול+ים+אפור",
  Azure: "תכלת+אסיד%7Cתכלת",
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
  Shirts: "חולצות",
  Shoes: "shoes",
  Shorts: "שורטים-וברמודות",
  Buttonshirts: "חולצות-מכופתרות",
  Suits: "",
};

let categoriesMen = {
  Jeans: "jeans",
  Pants: "pants",
  Sweaters: "knitwear_and_cardigans",
  Jackets: "coats_and_jackets",
  Shirts: "shirts",
  Shoes: "shoes",
  Sweatshirts: "סווטשירטים-וקפוצ%27ונים",
  Shorts: "bermuda",
  Buttonshirts: "",
};

function getUrl(gender, category, size, color) {
  let urls = [];
  let url = "https://www.renuar.co.il/";

  if (colors[color] == undefined) {
    return null;
  }

  let rest =
    "prefn1=color&prefv1=" + colors[color] + "&prefn2=size&prefv2=" + size;

  if (gender == "Women") {
    if (categoriesWomen[category] == undefined) {
      return null;
    }

    if (category == "Suits") {
      urls = [
        url + "women/clothing/sets/?" + rest,
        url + "נשים/בגדים/אוברולים/?" + rest,
      ];
    } else {
      if (category == "Shirts" || category == "Shorts") {
        url += "נשים/בגדים/";
      } else {
        url += "women/";

        if (category != "Shoes") {
          url += "clothing/";
        }
      }

      url += categoriesWomen[category] + "/?";
    }
  } else if (gender == "Men") {
    if (categoriesMen[category] == undefined) {
      return null;
    }

    if (category == "Sweatshirts") {
      url += "גברים/בגדים/";
    } else {
      url += "men/";

      if (category != "Shoes") {
        url += "clothes/";
      }
    }

    if (category == "Buttonshirts") {
      urls = [
        url + "polo_shirts/?" + rest,
        url + "button_down_shirts/?" + rest,
      ];
    } else {
      url += categoriesMen[category] + "/?";
    }
  }

  if (urls.length === 0) {
    urls = [url + rest];
  }

  return urls;
}

export { getUrl };
