import mongoose from "mongoose";
import Address from "./models/addresses.js";
import Store from "./models/store.js";

const addresses = [
  { id: 1, name: "Renuar", address: "האנגר 13 תל אביב" },
  { id: 2, name: "Renuar", address: "דיזנגוף 50 תל אביב" },
  { id: 3, name: "Renuar", address: "דרך מנחם בגין 132 תל אביב" },
  { id: 4, name: "Renuar", address: "ביאליק 76, רמת גן" },
  { id: 5, name: "Renuar", address: "דרך יצחק רבין 53 גבעתיים", latitude:  32.06680358869321, longitude: 34.810106989825094 },
  { id: 6, name: "Renuar", address: "היהודים 85 הרצליה" },
  { id: 7, name: "Renuar", address: "שדרות שבעת הכוכבים 8, הרצליה" },
  { id: 8, name: "Renuar", address: "יוספטל 92 בת ים" },
  { id: 9, name: "Renuar", address: "גולדה מאיר 7 חולון" },
  { id: 10, name: "Renuar", address: "72 ז'בוטינסקי פתח תקווה" },
  { id: 11, name: "Renuar", address: "שלמה המלך 37 קרית אונו" },
  { id: 12, name: "Renuar", address: "אליהו סעדון 120 אור יהודה" },
  { id: 13, name: "Renuar", address: "סחרוב 21 ראשון לציון" },
  { id: 14, name: "Renuar", address: "הרקון 2 הוד השרון" },
  { id: 15, name: "Renuar", address: "המלאכה 2 רעננה" },
  { id: 16, name: "Renuar", address: "כצנלסון 14 כפר סבא" },
  { id: 17, name: "Renuar", address: "אלטלף 4 יהוד מונוסון" },
  { id: 18, name: "Renuar", address: "רוטשילד 45 ראשון לציון" },
  { id: 19, name: "Renuar", address: "ויצמן 301 כפר סבא" },
  { id: 20, name: "Renuar", address: "וייצמן 301 כפר סבא" },
  { id: 21, name: "Renuar", address: "אריה שנקר 13 ראשון לציון" },
  { id: 22, name: "Renuar", address: "שדרות נים 2 ראשון לציון" },
  { id: 23, name: "Renuar", address: "בני ברמן נתניה" },
  { id: 24, name: "Renuar", address: "שדרות דוד רזיאל 1 רמלה" },
  { id: 25, name: "Renuar", address: "בילו 2 רחובות," },
  { id: 26, name: "Renuar", address: "הרצל 60 נתניה" },
  { id: 27, name: "Renuar", address: "עופר בילו סנטר", latitude: 31.86587263500758, longitude:34.81701681773782},
  { id: 28, name: "Renuar", address: "לב העיר 2 מודיעין" },
  { id: 29, name: "Renuar", address: "שדרות הרצל & שדרות מנחם בגין" },
  { id: 30, name: "Renuar", address: "דרך הרכבת 1 אשדוד" },
  { id: 31, name: "Renuar", address: "הבנאי 6 אריאל" },
  { id: 32, name: "Renuar", address: "שכטמן 10 חדרה" },
  { id: 33, name: "Renuar", address: "רוטשילד 40 חדרה" },
  { id: 34, name: "Renuar", address: "תלמים 5 באר טוביה" },
  { id: 35, name: "Renuar", address: "יגאל אלון 3 בית שמש" },
  { id: 36, name: "Renuar", address: "מועצה אזורית מנשה" },
  { id: 37, name: "Renuar", address: "הנשיא 1 אור עקיבא" },
  { id: 38, name: "Renuar", address: "שדרות החוצבים 2, מבשרת ציון ירושלים" },
  { id: 39, name: "Renuar", address: "הנחל 1 אשקלון" },
  { id: 40, name: "Renuar", address: "שדרות בן גוריון 1 אשקלון" },
  { id: 41, name: "Renuar", address: "יפו 224 ירושלים" },
  { id: 42, name: "Renuar", address: "שאול המלך 9 ירושלים" },
  { id: 43, name: "Renuar", address: "כיכר פז, 3, קרית גת", latitude: 31.609819286302834, longitude: 34.77333503808594},///////
  { id: 44, name: "Renuar", address: "צומת מבקיעים אשקלון" },
 
  { id: 46, name: "Renuar", address: 'אגודת ספורט בית"ר 1 ירושלים' },
  { id: 47, name: "Renuar", address: "פייר קניג 26 ירושלים" },
  { id: 48, name: "Renuar", address: "קניון ביגפאשן אאוטלט ,ירכא", latitude: 32.95680719671314, longitude: 35.183297415342885 },////////

  { id: 49, name: "Renuar", address: "סמטת הפלדה 8 שדרות" },
  { id: 50, name: "Renuar", address: "שדרות יצחק רבין 18 עפולה" },
  { id: 51, name: "Renuar", address: "שדרות שאול עמור 77 מגדל העמק" },
  { id: 52, name: "Renuar", address: "קניון עזריאלי-חיפה" },
  { id: 53, name: "Renuar", address: "שדרות בן גוריון 6 חיפה" },
  { id: 54, name: "Renuar", address: "החרושת 10 חיפה" },
  { id: 55, name: "Renuar", address: "תופיק זיאד 53 נצרת" },
  { id: 56, name: "Renuar", address: "קניון שער הצפון", latitude: 32.80865259220321, longitude: 35.0771708 },////

  { id: 57, name: "Renuar", address: "שדרות ההסתדרות 248 חיפה" },
  { id: 58, name: "Renuar", address: "העצמאות 37 קרית אתא" },


  { id: 60, name: "Renuar", address: "החרושת 2 עכו" },
  { id: 61, name: "Renuar", address: "שדרות דוד טוביהו 125, באר שבע" },
  { id: 62, name: "Renuar", address: "נפחא 25 באר שבע" },
  { id: 63, name: "Renuar", address: "צומת אלי כהן באר שבע" },
  { id: 64, name: "Renuar", address: "שדרות אליהו נאוי 18 באר שבע" },
  { id: 65, name: "Renuar", address: "נסים אלקיים 5, באר שבע", latitude: 31.225133123372224, longitude: 34.801232923285596 },////
  { id: 66, name: "Renuar", address: "אירית 2 נהריה" },

  { id: 68, name: "Renuar", address: "שדרות בן צבי 1 נהריה" },
  { id: 69, name: "Renuar", address: "יהודה הלוי טבריה" },
  { id: 70, name: "Renuar", address: "מעלה כמון 2 כרמיאל" },
  { id: 71, name: "Renuar", address: "שלמה שרירא 3, מעלות תרשיחא" },

  { id: 73, name: "Renuar", address: "טשרניחובסקי 4, קרית שמונה, 1103131" },
  { id: 74, name: "Renuar", address: "הסתת 20 אילת" },
  { id: 75, name: "Renuar", address: "קאמפן 8 אילת" },
  { id: 76, name: "Renuar", address: 'קניון מול הים' },
  { id: 77, name: "Renuar", address: "המלך ג'ורג' 16, ירושלים" },


  
  { id: 78, name: "Castro", address: "קאמפן 7, אילת" },
  {
    id: 79,
    name: "Castro",
    address:"איירפורט סיטי",
  },
  { id: 80, name: "Castro", address: "שדרות בן צבי 1, נהריה" },
  { id: 81, name: "Castro", address: "שדרות דוד בן גוריון 21, אשקלון" },
  { id: 82, name: "Castro", address: "הסתת 20, אילת" },
  { id: 83, name: "Castro", address: "דרך חברון 21, באר שבע" },
  { id: 84, name: "Castro", address: "הרצל 91, רמלה" },

  { id: 85, name: "Castro", address: "שדרות דוד רזיאל 1, רמלה" },
  { id: 86, name: "Castro", address: "שדרות המלאכות, מודיעין מכבים רעות" },
  { id: 87, name: "Castro", address: "האירוסים 53, נס ציונה" },
  { id: 88, name: "Castro", address: "לב העיר 2, מודיעין" },
  { id: 89, name: "Castro", address: "בילו 2, רחובות" },

  { id: 90, name: "Castro", address: "צומת ביל'ו, קרית עקרון" },
  { id: 91, name: "Castro", address: "המרכבה 38, חולון" },

  { id: 92, name: "Castro", address: "דוד סחרוב 21, ראשון לציון" },

  { id: 93, name: "Castro", address: "שלמה המלך 37, קרית אונו" },
  { id: 94, name: "Castro", address: "ילדי טהרן 5, ראשון לציון" },
  { id: 95, name: "Castro", address: "גולדה מאיר 7, חולון" },
  { id: 96, name: "Castro", address: "אלעזר פרידמן 9, פתח תקווה" },

  { id: 97, name: "Castro", address: "קניון גבעתיים", latitude: 32.06752540347502, longitude: 34.80977805397136},////
  { id: 98, name: "Castro", address: "יוספטל 92, בת ים" },
  { id: 99, name: "Castro", address: "עופר הקניון הגדול פתח תקווה", latitude: 32.093444352697986, longitude: 34.865938924593095},///
  {
    id: 100,
    name: "Castro",
    address: "יגאל אלון 22, ראש העין",
  },

  
  { id: 101, name: "Castro", address: "שלבים 2, תל אביב-יפו" },
  
  { id: 103, name: "Castro", address: "הקישון 7, יבנה" },
  {
    id: 104,
    name: "Castro",
    address: "מנחם בגין 132, תל אביב-יפו",
  },
  
  
  {
    id: 105,
    name: "Castro",
    address: "אבן גבירול 71, תל אביב-יפו",
  },
  { id: 106, name: "Castro", address: "דיזנגוף 50, תל אביב-יפו" },
  
  
  { id: 107, name: "Castro", address: "רזיאל 29, תל אביב-יפו" },


  { id: 108, name: "Castro", address: "אבא הילל 301, רמת גן" },
  { id: 109, name: "Castro", address: "שדרות יגאל אלון 3, בית שמש" },


  { id: 110, name: "Castro", address: "ז'בוטינסקי 3, הוד השרון" },


  { id: 111, name: "Castro", address: "המלאכה 2, רעננה" },
  { id: 112, name: "Castro", address: "ביג פאשן אשדוד" },
  { id: 114, name: "Castro", address: "בית''ר 1, ירושלים" },
  
  { id: 115, name: "Castro", address: "בן יהודה 1, ירושלים" },


  { id: 116, name: "Castro", address: "המלך ג'ורג' 16, ירושלים" },
  { id: 117, name: "Castro", address: "בני ברמן 2, נתניה" },

  { id: 118, name: "Castro", address: "המחקר 3, נתניה" },

  { id: 119, name: "Castro", address: "דרך הדרום 3, קרית גת", latitude: 31.603438074188677, longitude: 34.771493306073474},//
  { id: 120, name: "Castro", address: "קדם 5, מעלה אדומים" },
  
  { id: 121, name: "Castro", address: "הרצל 60 נתניה, נתניה" },


  { id: 122, name: "Castro", address: "שדרות יצחק רבין 18, עפולה" },
  { id: 123, name: "Castro", address: "אקליפטוס 3, רמת ישי" },
  { id: 124, name: "Castro", address: "תופיק זיאד 53, נצרת" },
  { id: 125, name: "Castro", address: "קסטרו נצרת דודג', נוף הגליל ", latitude: 32.69775356689909, longitude: 35.30408079999776},///
  { id: 126, name: "Castro", address: "גולן שמחה 54, חיפה" },
  { id: 127, name: "Castro", address: "פלימן משה 4, חיפה" },


  { id: 128, name: "Castro", address: "חוצות המפרץ אאוטלט" ,latitude: 32.810035519979145, longitude: 35.05660437895163},

  { id: 129, name: "Castro", address: "שפרעם" },
  { id: 130, name: "Castro", address: "עכו 192, קרית ביאליק" },
  { id: 131, name: "Castro", address: "החרושת 2, עכו" },

  { id: 132, name: "Castro", address: "יהודה הלוי 2, טבריה" },

  { id: 133, name: "Castro", address: "מעלה כמון 2, כרמיאל" },
  { id: 134, name: "Castro", address: "ביג רגבה" ,latitude: 32.97518443646635, longitude: 35.094773069314236},///
  { id: 135, name: "Castro", address: "שלמה שרירא 3, מעלות תרשיחא" },
  { id: 136, name: "Castro", address: "קניון הגליל העליון" },

  { id: 137, name: "Castro", address: "קאמפן 8, אילת" },

  { id: 138, name: "Castro", address: "קניון מול הים" },
 


  { id: 139, name: "Twentyfourseven", address: "האנגר 9, נמל תל אביב תל אביב" },
  { id: 140, name: "Twentyfourseven", address: "דרך מנחם בגין 132 תל אביב" },
  { id: 141, name: "Twentyfourseven", address: "דרך אבא הלל 301 רמת גן" },
  { id: 142, name: "Twentyfourseven", address: "דרך יצחק רבין 53 גבעתיים", latitude:  32.06680358869321, longitude: 34.810106989825094 },

  { id: 143, name: "Twentyfourseven", address: "מדינת היהודים 85 הרצליה" },
  { id: 144, name: "Twentyfourseven", address: "עופר הקניון הגדול פתח תקווה", latitude: 32.093444352697986, longitude: 34.865938924593095},
  { id: 145, name: "Twentyfourseven", address: "יוספטל 92 בת ים" },
  { id: 146, name: "Twentyfourseven", address: "גולדה מאיר 7 חולון" },
  { id: 147, name: "Twentyfourseven", address: "שלמה המלך 37 קרית אונו" },
  { id: 148, name: "Twentyfourseven", address: "סחרוב דוד 21 ראשון לציון" },
  { id: 149, name: "Twentyfourseven", address: "ילדי טהרן 3 ראשון לציון" },
  { id: 150, name: "Twentyfourseven", address: "אלטלף 4 יהוד מונוסון" },
  { id: 151, name: "Twentyfourseven", address: "רוטשילד 45 ראשון לציון" },
  { id: 152, name: "Twentyfourseven", address: "וייצמן 301 כפר סבא" },
  { id: 153, name: "Twentyfourseven", address: "שדרות נים 2 ראשון לציון" },
  { id: 154, name: "Twentyfourseven", address: "בני ברמן 2 נתניה" },
  { id: 155, name: "Twentyfourseven", address: "קניון עופר אדומים" , latitude: 31.771703989621777, longitude: 35.29856274602865},//
  { id: 156, name: "Twentyfourseven", address: "שדרות דוד רזיאל 1 רמלה" },
  { id: 157, name: "Twentyfourseven", address: 'ביל"ו 2 רחובות' },
  { id: 158, name: "Twentyfourseven", address: "הרצל 60 נתניה" },
  { id: 159, name: "Twentyfourseven", address: "עופר בילו סנטר", latitude: 31.86587263500758, longitude:34.81701681773782},
  { id: 160, name: "Twentyfourseven", address: "לב העיר 2 מודיעין" },
  { id: 161, name: "Twentyfourseven", address: "הגדוד העברי 6 אשדוד" },
  { id: 162, name: "Twentyfourseven", address: "דרך הרכבת 1 אשדוד" },
  { id: 163, name: "Twentyfourseven", address: "שכטמן 10 חדרה" },
  { id: 164, name: "Twentyfourseven", address: "רוטשילד 40 חדרה" },
  { id: 165, name: "Twentyfourseven", address: "שדרות יגאל אלון 3 בית שמש" },
  { id: 166, name: "Twentyfourseven", address: "אלון עין שמר Fashion" , latitude: 32.465777426775865, longitude: 34.99198597892381 },//
  { id: 167, name: "Twentyfourseven", address: "שדרות החוצבים 10 מבשרת ציון" },
  { id: 168, name: "Twentyfourseven", address: "שדרות בן גוריון 1 אשקלון" },
  { id: 169, name: "Twentyfourseven", address: "מתחם קניות גלובוס סנטר אשקלון" , latitude: 31.62718745870106, longitude: 34.58373807820439 },//
  { id: 170, name: "Twentyfourseven", address: 'אגודת ספורט בית"ר 1 ירושלים' },
  { id: 171, name: "Twentyfourseven", address: "שלמה המלך 9 ירושלים," },
  { id: 172, name: "Twentyfourseven", address: "שדרות יצחק רבין 18 עפולה," },
  { id: 173, name: "Twentyfourseven", address: "ניצנים 39 מגדל העמק" },
  { id: 174, name: "Twentyfourseven", address: "בעלי המלאכה 5 נתיבות" },
  { id: 175, name: "Twentyfourseven", address: "משה פלימן 4 חיפה" },
  { id: 176, name: "Twentyfourseven", address: "עופר גרנד קניון-חיפה" , latitude: 32.78939499665484, longitude: 35.00800749999999},///
  { id: 177, name: "Twentyfourseven", address: "שדרות ההסתדרות 55 חיפה" },
  { id: 178, name: "Twentyfourseven", address: "טופיק זיאד 53 נצרת" },
  { id: 179, name: "Twentyfourseven", address: "קניון שער הצפון", latitude: 32.80865259220321, longitude: 35.0771708 },////
  { id: 180, name: "Twentyfourseven", address: "שד' ההסתדרות 248 חיפה" },
  { id: 181, name: "Twentyfourseven", address: "דרך עכו 192 קרית ביאליק", latitude: 32.84417511936682, longitude: 35.08985864930669 },////
  { id: 182, name: "Twentyfourseven", address: "החרושת 2 עכו" },
  { id: 183, name: "Twentyfourseven", address: "שדרות דוד טוביהו 125 באר שבע" },
  { id: 184, name: "Twentyfourseven", address: "יצחק נפחא 25 באר שבע" },
  { id: 185, name: "Twentyfourseven", address: "צומת אלי כהן באר שבע" },
  { id: 186, name: "Twentyfourseven", address: "סמטת הפלדה 8 שדרות" },
  { id: 187, name: "Twentyfourseven", address: "ברוך קטינקא 2 באר שבע", latitude: 31.225059726352633, longitude: 34.80136166931424 },///
  { id: 189, name: "Twentyfourseven", address: "שדרות בן צבי 1 נהריה" },
  { id: 190, name: "Twentyfourseven", address: "יהודה הלוי 1 טבריה" },
  { id: 191, name: "Twentyfourseven", address: "מעלה כמון 2 כרמיאל" },
  { id: 192, name: "Twentyfourseven", address: "שלמה שרירא 3 מעלות" },
  { id: 194, name: "Twentyfourseven", address: "מעלה גיא אוני 1 ראש פינה" },
  { id: 195, name: "Twentyfourseven", address: "טשרניחובסקי 4 קרית שמונה" },
  { id: 196, name: "Twentyfourseven", address: "קאמפן 8 אילת" },
  { id: 197, name: "Twentyfourseven", address: "הסתת 20 אילת" },
  { id: 198, name: "Twentyfourseven", address: "קניון מול הים" },


{ id: 200, name: "Golf", address: "דרך יצחק רבין 2, בית שמש" ,latitude:  31.74781922646179, longitude: 34.99306195150403 },///////
{ id: 201, name: "Golf", address: "יד חרוצים 18, ירושלים" },

{ id: 203, name: "Golf", address: "האורגים 6, אשדוד" },
{ id: 204, name: "Golf", address: "יצחק נפחא 25, באר שבע" },
{ id: 205, name: "Golf", address: "אלעזר פרידמן 9, פתח תקוה" },

{ id: 207, name: "Golf", address: "יפו 42, חיפה" },
{ id: 208, name: "Golf", address: "הסתת 20, אילת" },
{ id: 209, name: "Golf", address: "דרך חברון 21, באר שבע" },
{ id: 210, name: "Golf", address: "שדרות יצחק רבין 9, יוקנעם" },
{ id: 211, name: "Golf", address: "מעלה כמון 2, כרמיאל" },
{ id: 212, name: "Golf", address: "תופיק זאיד 53, נצרת" },
{ id: 213, name: "Golf", address: "דרך הרכבת 1, אשדוד" },
{ id: 215, name: "Golf", address: "דרך הדרום 3, קרית גת", latitude: 31.603687384865097, longitude: 34.77173807116428 },

{ id: 217, name: "Golf", address: "צומת ביל'ו, קרית עקרון" },
{ id: 218, name: "Golf", address: "דרך מנחם בגין 116, תל אביב-יפו" },
{ id: 219, name: "Golf", address: "בן יהודה 23, ירושלים" },
{ id: 220, name: "Golf", address: "בעלי המלאכה 5, נתיבות" },
{ id: 221, name: "Golf", address: "גולן שמחה 54, חיפה" },
{ id: 222, name: "Golf", address: "דיזנגוף 50, תל אביב-יפו" },
{ id: 224, name: "Golf", address: "שדרות הנשיא בן צבי 1, נהריה" },
{ id: 225, name: "Golf", address: "גנרל פייר קניג 26, ירושלים" , latitude: 31.75365014493537, longitude: 35.21393373993599 },
{ id: 226, name: "Golf", address: "לישנסקי 9, ראשון לציון" },
{ id: 227, name: "Golf", address: "החרושת 10, חיפה" },
{ id: 228, name: "Golf", address: "שחם 17, פתח תקוה" },
{ id: 229, name: "Golf", address: "שדרות משה דיין 106, פסגת זאב" },
{ id: 230, name: "Golf", address: "פארק מסחרי, גן שמואל" ,latitude: 32.44818118422129, longitude: 34.9537771},
{ id: 231, name: "Golf", address: "דרך בר יהודה 147, נשר" },
{ id: 232, name: "Golf", address: "אחד העם 9, תל אביב-יפו" },

{ id: 234, name: "Golf", address: "יצחק רבין 18, עפולה" },
{ id: 235, name: "Golf", address: "שדרות המלאכות, מודיעין מכבים רעות" },
{ id: 236, name: "Golf", address: "אלון עין שמר Fashion" , latitude: 32.466146301629855, longitude: 34.991771907942706},
{ id: 237, name: "Golf", address: "זבוטינסקי 30, באר שבע" },
{ id: 238, name: "Golf", address: "נתנזון 25, חיפה" },
{ id: 239, name: "Golf", address: "אקליפטוס 3, רמת ישי" },
{ id: 240, name: "Golf", address: "ההסתדרות 55, חיפה" },
{ id: 241, name: "Golf", address: "המרכבה 38, חולון" },
{ id: 242, name: "Golf", address: "יד חרוצים 18, ירושלים" },
{ id: 243, name: "Golf", address: "דרך אבא הילל סילבר 301, רמת גן" },
{ id: 244, name: "Golf", address: "קניון M הדרך" , latitude: 32.3840818437618, longitude: 34.86749456931424},
{ id: 245, name: "Golf", address: "יוספטל 92, בת ים" },
{ id: 246, name: "Golf", address: "יצחק רבין 53, גבעתיים" },
{ id: 247, name: "Golf", address: "מתחם קניות גלובוס סנטר אשקלון" , latitude: 31.62718745870106, longitude: 34.58373807820439 },
{ id: 248, name: "Golf", address: "אבן גבירול 71, תל אביב-יפו" },
{ id: 249, name: "Golf", address: "דוד סחרוב 21, ראשון לציון" },
{ id: 250, name: "Golf", address: "הראל 1, מבשרת ציון" },
{ id: 251, name: "Golf", address: "הרצל 60, נתניה" },
{ id: 252, name: "Golf", address: "חוצות שפיים" , latitude: 32.22104203519816, longitude: 34.82839767817443},
{ id: 253, name: "Golf", address: "לב העיר 2, מודיעין" },
{ id: 254, name: "Golf", address: 'אגודת ספורט בית"ר 1 ירושלים' },
{ id: 255, name: "Golf", address: "קדם 5, מעלה אדומים" },
{ id: 256, name: "Golf", address: "ז'בוטינסקי 45, אשדוד" },
{ id: 257, name: "Golf", address: "קניון סכנין, סכנין", latitude:32.86163533915335, longitude:35.31018428465712},
{ id: 258, name: "Golf", address: "פלימן משה 4, חיפה" },
{ id: 259, name: "Golf", address: "דוד אלעזר, כפר סבא" },
{ id: 260, name: "Golf", address: "שלמה המלך 37, קרית אונו" },
{ id: 261, name: "Golf", address: "רוטשילד 45, ראשון לציון" },
{ id: 262, name: "Golf", address: "בילו 2, רחובות" },
{ id: 263, name: "Golf", address: "שדרות גולדה מאיר 255, ירושלים" },
{ id: 264, name: "Golf", address: "המלאכה 2, רעננה" },
{ id: 265, name: "Golf", address: "שדרות שבעת הכוכבים 8, הרצליה" },
{ id: 266, name: "Golf", address: "האירוסים 53, נס ציונה" },
{ id: 267, name: "Golf", address: "הנשיא וייצמן 14, עפולה" },
{ id: 268, name: "Golf", address: "יפו 226, ירושלים" },


{ id: 269, name: "Hoodies", address: "ויצמן 301,כפר סבא" },
{ id: 270, name: "Hoodies", address: "ילדי טהרן 3 ראשון לציון" },/////
{ id: 271, name: "Hoodies", address: "מדינת היהודים 85,הרצליה" },
{ id: 272, name: "Hoodies", address: "גולדה מאיר 20,דימונה" },
{ id: 273, name: "Hoodies", address: "שדרות יצחק רבין 18, עפולה" },////
{ id: 274, name: "Hoodies", address: "התמר 2,יקנעם" },
{ id: 275, name: "Hoodies", address: "חוצות המפרץ אאוטלט" ,latitude: 32.810035519979145, longitude: 35.05660437895163},
{ id: 276, name: "Hoodies", address: "אליהו סעדון 120,אור יהודה" },
{ id: 277, name: "Hoodies", address: "הנשיא 1,אור עקיבא" },
{ id: 278, name: "Hoodies", address: "ויצמן 14,תל אביב" },
{ id: 279, name: "Hoodies", address: "הסתת 20,אילת" },
{ id: 280, name: "Hoodies", address: "ביג פאשן אשדוד" },////
{ id: 281, name: "Hoodies", address: "דרך חברון 21,באר שבע" },
{ id: 282, name: "Hoodies", address: "יגאל אלון 1,בית שמש" },
{ id: 283, name: "Hoodies", address: "יהודה הלוי 1,טבריה" },
{ id: 284, name: "Hoodies", address: "מעלה כמון 2,כרמיאל" },
{ id: 285, name: "Hoodies", address: "עופר בילו סנטר", latitude: 31.86587263500758, longitude:34.81701681773782},
{ id: 286, name: "Hoodies", address: "שדרות דוד טוביהו 125, באר שבע" },///
{ id: 287, name: "Hoodies", address: "עופר גרנד קניון-חיפה" , latitude: 32.78939499665484, longitude: 35.00800749999999},///

{ id: 288, name: "Hoodies", address: 'נתב"ג' },
{ id: 289, name: "Hoodies", address: "דיזינגוף 50,תל אביב" },
{ id: 290, name: "Hoodies", address: "פייר קניג תלפיות 26,ירושלים" },
{ id: 291, name: "Hoodies", address: "זבוטינסקי 72,פתח תקווה" },
{ id: 292, name: "Hoodies", address: "טיילת רימונים,אילת", latitude: 29.551223660958062, longitude: 34.957047711642794},///
{ id: 293, name: "Hoodies", address: "הקישון 9,יבנה" },
{ id: 294, name: "Hoodies", address: "המלאכה 121,מודיעין" },
{ id: 295, name: "Hoodies", address: "בן יהודה 3,ירושלים" },
{ id: 296, name: "Hoodies", address: "לב העיר 2,מודיעין" },
{ id: 297, name: "Hoodies", address: "שכטמן 10,חדרה" },
{ id: 298, name: "Hoodies", address: "אהרון בקר 8,תל אביב" },
{ id: 299, name: "Hoodies", address: "יעל רום 8,פתח תקווה" },
{ id: 300, name: "Hoodies", address: "יגאל אלון 22,ראש העין" },
{ id: 301, name: "Hoodies", address: "שדרות בן צבי,נהריה" },
{ id: 302, name: "Hoodies", address: "אקליפטוס 3, רמת ישי" },///////
{ id: 304, name: "Hoodies", address: "ביאליק 36,רמת גן" },
{ id: 305, name: "Hoodies", address: "צומת, פרדס חנה כרכור" },///////
{ id: 306, name: "Hoodies", address: "בני ברמן 2,נתניה" },
{ id: 307, name: "Hoodies", address: "אייסמול אילת" , latitude: 29.555997033441894, longitude: 34.96569763719905},//////

{ id: 308, name: "Hoodies", address: "בעלי המלאכה 3,נתיבות" },
{ id: 309, name: "Hoodies", address: "דרך אבא הלל 301,רמת גן" },
{ id: 310, name: "Hoodies", address: "קניון ביגפאשן אאוטלט ,ירכא", latitude: 32.95680719671314, longitude: 35.183297415342885 },////////
{ id: 311, name: "Hoodies", address: "קניון בת ים" , latitude: 32.01526813766009, longitude: 34.75631265970814},/////
{ id: 312, name: "Hoodies", address: "דרך יצחק רבין 53 גבעתיים", latitude:  32.06680358869321, longitude: 34.810106989825094 },
{ id: 313, name: "Hoodies", address: "בן גוריון 21,אשקלון" },
{ id: 314, name: "Hoodies", address: "סחרוב 21,ראשון לציון" },
{ id: 315, name: "Hoodies", address: "צומת אלי כהן,באר שבע" },
{ id: 316, name: "Hoodies", address: "הרצל 60,נתניה" },
{ id: 317, name: "Hoodies", address: "גולדה מאיר 7,חולון" },
{ id: 318, name: "Hoodies", address: "קניון עזריאלי-חיפה" },////
{ id: 319, name: "Hoodies", address: "העצמאות 65,פתח תקווה" },
{ id: 320, name: "Hoodies", address: "קניון מול הים,אילת" },
{ id: 321, name: "Hoodies", address: "ביתר 11,ירושלים" },
{ id: 322, name: "Hoodies", address: "קדם 5, מעלה אדומים" },///
{ id: 323, name: "Hoodies", address: "ז'בוטינסקי 3, הוד השרון" },///
{ id: 324, name: "Hoodies", address: "קניון עופר מרום" , latitude: 32.071623924842726, longitude:34.82825947440718},///
{ id: 325, name: "Hoodies", address: "הגדוד העברי 6,אשדוד" },
{ id: 326, name: "Hoodies", address: "אלעזר פרידמן 9,פתח תקווה" },
{ id: 327, name: "Hoodies", address: "מנחם בגין 132,תל אביב" },
{ id: 328, name: "Hoodies", address: "שדרות נים 2,ראשון לציון" },
{ id: 329, name: "Hoodies", address: "שמשון הגיבור 16,רמלה" },
{ id: 330, name: "Hoodies", address: "שלמה המלך 37,קריית אונו" },
{ id: 331, name: "Hoodies", address: "טשרניחובסקי 4 קרית שמונה" },//////
{ id: 332, name: "Hoodies", address: "רוטשילד 45,ראשון לציון" },
{ id: 333, name: "Hoodies", address: "בילו 2,רחובות" },
{ id: 334, name: "Hoodies", address: "המלאכה 2,רעננה" },
{ id: 335, name: "Hoodies", address: "שדרות שבעת הכוכבים 8, הרצליה" },//////
{ id: 336, name: "Hoodies", address: "קניון שער הצפון", latitude: 32.80865259220321, longitude: 35.0771708 },////
{ id: 337, name: "Hoodies", address: "דרך עכו 192, קריית ביאליק", latitude: 32.844350914988425, longitude: 35.09113537562933},///////


{ id: 338, name: "Urbanica", address: "ויצמן 207,כפר סבא" },
{ id: 339, name: "Urbanica", address: "בעלי המלאכה 203,נתיבות" },
{ id: 340, name: "Urbanica", address: "גולדה מאיר 20,דימונה" },///
{ id: 341, name: "Urbanica", address: "אקליפטוס 3,רמת ישי" },
{ id: 342, name: "Urbanica", address: "ילדי טהרן 3,ראשון לציון" },
{ id: 343, name: "Urbanica", address: "טשרניחובסקי 4,קרית שמונה" },
{ id: 344, name: "Urbanica", address: "זאב ז'בוטינסקי 72,פתח תקווה" },
{ id: 345, name: "Urbanica", address: "שדרות בן צבי 1 נהריה" },///
{ id: 346, name: "Urbanica", address: "בן גוריון 21,אשקלון" },
{ id: 347, name: "Urbanica", address: "מעלה כמון 5,כרמיאל" },
{ id: 348, name: "Urbanica", address: "שכטמן 10,חדרה" },
{ id: 349, name: "Urbanica", address: 'קניון מול הים' },////
{ id: 350, name: "Urbanica", address: 'אגודת ספורט בית"ר 1 ירושלים' },//
{ id: 351, name: "Urbanica", address: 'ביל"ו 2,רחובות' },
{ id: 352, name: "Urbanica", address: "צומת אלי כהן,באר שבע" },
{ id: 353, name: "Urbanica", address: "פלימן משה 4, חיפה" },////
{ id: 354, name: "Urbanica", address: "דרך מנחם בגין 132,תל אביב" },
{ id: 355, name: "Urbanica", address: "בני ברמן 2,נתניה" },
{ id: 356, name: "Urbanica", address: "החרושת 10,חיפה" },
{ id: 357, name: "Urbanica", address: "ביג פאשן אשדוד" },
{ id: 358, name: "Urbanica", address: "תאופיק זיאד 53,נצרת" },
{ id: 359, name: "Urbanica", address: "בילו סנטר,קרית עקרון" },
{ id: 360, name: "Urbanica", address: "דוד טוביהו 125,באר שבע" },
{ id: 161, name: "Urbanica", address: "דרך עכו 192 קרית ביאליק", latitude: 32.84417511936682, longitude: 35.08985864930669 },{ id: 362, name: "Urbanica", address: "יוסף ברזילי 5,עפולה" },


{ id: 362, name: "Studiopasha", address: "אליהו סעדון 120, אור יהודה" },
{ id: 363, name: "Studiopasha", address: "בעלי המלאכה 203, נתיבות" },
{ id: 364, name: "Studiopasha", address: "הגדוד העברי 6, אשדוד " },
{ id: 365, name: "Studiopasha", address: "דרך הרכבת 1, אשדוד" },
{ id: 366, name: "Studiopasha", address: "דוד טוביהו 125, באר שבע" },
{ id: 367, name: "Studiopasha", address: "יצחק רגר 2, באר שבע" },
{ id: 368, name: "Studiopasha", address: "יוספטל 92, בת ים" },
{ id: 369, name: "Studiopasha", address: "יוני נתניהו 29, גבעת שמואל" },
{ id: 370, name: "Studiopasha", address: "דרך יצחק רבין 53 גבעתיים", latitude:  32.06680358869321, longitude: 34.810106989825094 },
{ id: 371, name: "Studiopasha", address: "ז'בוטינסקי 3, הוד השרון" },
{ id: 372, name: "Studiopasha", address: "שדרות שבעת הכוכבים 8, הרצליה" },
{ id: 373, name: "Studiopasha", address: "גולדה מאיר 7, חולון" },
{ id: 374, name: "Studiopasha", address: "קניון עזריאלי-חיפה" },
{ id: 375, name: "Studiopasha", address: "החרושת 10 חיפה" },

{ id: 376, name: "Studiopasha", address: "יהודה הלוי 1, טבריה" },
{ id: 377, name: "Studiopasha", address: "ויצמן 207, כפר סבא" },
{ id: 378, name: "Studiopasha", address: "לב העיר 2, מודיעין" },
{ id: 379, name: "Studiopasha", address: "שדרות בן צבי 2, נהריה " },
{ id: 380, name: "Studiopasha", address: "הרצל 60, נתניה" },
{ id: 381, name: "Studiopasha", address: "החרושת 2, עכו" },
{ id: 382, name: "Studiopasha", address: "שלמה המלך 37, קרית אונו" },
{ id: 383, name: "Studiopasha", address: "קניון שער הצפון", latitude: 32.80865259220321, longitude: 35.0771708 },////
{ id: 384, name: "Studiopasha", address: "דרך עכו 192 קרית ביאליק", latitude: 32.84417511936682, longitude: 35.08985864930669 },////
{ id: 385, name: "Studiopasha", address: "עופר בילו סנטר", latitude: 31.86587263500758, longitude:34.81701681773782},
{ id: 386, name: "Studiopasha", address: "סחרוב 21, ראשון לציון" },
{ id: 387, name: "Studiopasha", address: "שדרות נים 2, ראשון לציון" },
{ id: 388, name: "Studiopasha", address: "שדרות דוד רזיאל 1, רמלה" },
{ id: 389, name: "Studiopasha", address: "ביאליק 39, רמת גן" },
{ id: 390, name: "Studiopasha", address: "דרך אבא הלל 301, רמת גן" },
{ id: 391, name: "Studiopasha", address: "המלאכה 2, רעננה" },
{ id: 392, name: "Studiopasha", address: "דיזינגוף 236,תל אביב יפו" },
{ id: 393, name: "Studiopasha", address: "לוינסקי 4, תל אביב" },
{ id: 394, name: "Studiopasha", address: "קרליבך 4, תל אביב יפו" },


{ id: 396, name: "Yanga", address: "ביג פאשן אשדוד" },
{ id: 397, name: "Yanga", address: "עופר בילו סנטר", latitude: 31.86587263500758, longitude:34.81701681773782},
{ id: 398, name: "Yanga", address: "לב העיר 2 מודיעין" },
{ id: 399, name: "Yanga", address: "קניון מול זכרון" , latitude: 32.5699935455491, longitude: 34.933333019795896},
{ id: 400, name: "Yanga", address: "חוצות המפרץ אאוטלט" ,latitude: 32.810035519979145, longitude: 35.05660437895163},
{ id: 401, name: "Yanga", address: "שכטמן 10 חדרה" },
{ id: 402, name: "Yanga", address: "קניון ממילא, ירושלים", latitude: 31.778517960214316, longitude:35.22378706763178},
{ id: 403, name: "Yanga", address: "עופר גרנד קניון-חיפה" , latitude: 32.78939499665484, longitude: 35.00800749999999},///
{ id: 404, name: "Yanga", address: "עופר הקניון הגדול פתח תקווה", latitude: 32.093444352697986, longitude: 34.865938924593095},///
{ id: 405, name: "Yanga", address: "שדרות נים 2, ראשון לציון" },
{ id: 406, name: "Yanga", address: "דיזנגוף 50 תל אביב" },
{ id: 407, name: "Yanga", address: "קרליבך 4, תל אביב יפו" },
{ id: 408, name: "Yanga", address: "קניון ביגפאשן אאוטלט ,ירכא", latitude: 32.95680719671314, longitude: 35.183297415342885 },////////
{ id: 409, name: "Yanga", address: 'אגודת ספורט בית"ר 1 ירושלים' },

];


const seedAddresses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/db_server");

    const db = mongoose.connection;

    db.once("open", async () => {
      console.log("Connected to MongoDB");

      // Check if the adresses collection exists and drop it if it does
      const collections = await db.db
        .listCollections({ name: "adresses" })
        .toArray();
      if (collections.length > 0) {
        await db.db.collection("adresses").drop();
        console.log("Adresses collection cleared");
      }

      // Fetch all stores
      const stores = await Store.find({});

      // Map store names to their ObjectIds
      const storeMap = {};
      stores.forEach((store) => {
        storeMap[store.name] = store._id;
      });

      // Update addresses with the correct ObjectId and include latitude and longitude if provided
      const updatedAddresses = addresses.map((addr) => {
        const updatedAddr = {
          id: addr.id,
          name: storeMap[addr.name], // Set the name field to the corresponding ObjectId
          address: addr.address,
        };
        if (addr.latitude && addr.longitude) {
          updatedAddr.latitude = addr.latitude;
          updatedAddr.longitude = addr.longitude;
        }
        return updatedAddr;
      });

      // Insert updated addresses into the Address collection
      await Address.insertMany(updatedAddresses);
      console.log("Addresses seeded successfully");

      mongoose.connection.close();
    });
  } catch (error) {
    console.error("Error seeding addresses", error);
    mongoose.connection.close();
  }
};

seedAddresses();