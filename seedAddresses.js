import mongoose from "mongoose";
import Address from "./models/addresses.js";
import Store from "./models/store.js";

const addresses = [
  { id: 1, name: "Renuar", address: "האנגר 13 תל אביב" },
  { id: 2, name: "Renuar", address: "דיזנגוף 50 תל אביב" },
  { id: 3, name: "Renuar", address: "דרך מנחם בגין 132 תל אביב" },
  { id: 4, name: "Renuar", address: "ביאליק 76, רמת גן" },
  { id: 5, name: "Renuar", address: "דרך יצחק רבין 53, גבעתיים" },
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
  { id: 27, name: "Renuar", address: "צומת בילו קרית עקרון" },
  { id: 28, name: "Renuar", address: "לב העיר 2 מודיעין" },
  { id: 29, name: "Renuar", address: "שדרות הרצל & שדרות מנחם בגין" },
  { id: 30, name: "Renuar", address: "דרך הרכבת 1 אשדוד" },
  { id: 31, name: "Renuar", address: "הבנאי 6 אריאל" },
  { id: 32, name: "Renuar", address: "שכטמן 10 חדרה" },
  { id: 33, name: "Renuar", address: "רוטשילד 40 חדרה" },
  { id: 34, name: "Renuar", address: "תלמים 5 באר טוביה" },
  { id: 35, name: "Renuar", address: "יגאל אלון 3 בית שמש" },
  { id: 36, name: "Renuar", address: "מועצה אזורית מנשה" },
  { id: 37, name: "Renuar", address:"הנשיא 1 אור עקיבא" },
  { id: 38, name: "Renuar", address: "שדרות החוצבים 2, מבשרת ציון ירושלים"},
  { id: 39, name: 'Renuar', address: 'הנחל 1 אשקלון' },
  { id: 40, name: 'Renuar', address: 'שדרות בן גוריון 1 אשקלון' },
  { id: 41, name: 'Renuar', address: 'יפו 224 ירושלים' },
  { id: 42, name: 'Renuar', address: 'שאול המלך 9 ירושלים' },
 { id: 43, name: 'Renuar', address: "מרכז קניות כיכר פז"},
  { id: 44, name: 'Renuar', address: 'צומת מבקיעים אשקלון' },
 { id: 45, name: 'Renuar', address: 'קינג גורג 20 ירושלים' },
 { id: 46, name: 'Renuar', address: 'אגודת ספורט בית"ר 1 ירושלים' },
  { id: 47, name: 'Renuar', address: 'פייר קניג 26 ירושלים' },
   { id: 48, name: 'Renuar', address: "דרך קדם 5, מעלה אדומים" },
  { id: 49, name: 'Renuar', address: 'סמטת הפלדה 8 שדרות' },
  { id: 50, name: 'Renuar', address: 'שדרות יצחק רבין 18 עפולה' },
  { id: 51, name: 'Renuar', address: 'שדרות שאול עמור 77 מגדל העמק' },
   { id: 52, name: 'Renuar', address: "דרך משה פלימן 4, חיפה" },
  { id: 53, name: 'Renuar', address: 'שדרות בן גוריון 6 חיפה' },
  { id: 54, name: 'Renuar', address: 'החרושת 10 חיפה' },
  { id: 55, name: 'Renuar', address: 'תופיק זיאד 53 נצרת' },
   { id: 56, name: 'Renuar', address: "דרך חיפה 30" },
  { id: 57, name: 'Renuar', address: 'שדרות ההסתדרות 248 חיפה' },
  { id: 58, name: 'Renuar', address: 'העצמאות 37 קרית אתא' },
   { id: 59, name: 'Renuar', address: "דרך עכו 142, קרית מוצקין" },
  { id: 60, name: 'Renuar', address: 'החרושת 2 עכו' },
   { id: 61, name: 'Renuar', address: "שדרות דוד טוביהו 125, באר שבע" },
  { id: 62, name: 'Renuar', address: 'נפחא 25 באר שבע' },
  { id: 63, name: 'Renuar', address: 'צומת אלי כהן באר שבע' },
  { id: 64, name: 'Renuar', address: 'שדרות אליהו נאוי 18 באר שבע' },
 { id: 65, name: 'Renuar', address: "נסים אלקיים 5, באר שבע" },
  { id: 66, name: 'Renuar', address: 'אירית 2 נהריה' },
   { id: 67, name: 'Renuar', address: "ירכא" },
  { id: 68, name: 'Renuar', address: 'שדרות בן צבי 1 נהריה' },

  { id: 69, name: 'Renuar', address: 'יהודה הלוי טבריה' },
  { id: 70, name: 'Renuar', address: 'מעלה כמון 2 כרמיאל' },
   { id: 71, name: 'Renuar', address: 'שלמה שרירא 3, מעלות תרשיחא' },
   { id: 72, name: 'Renuar', address: 'דרך הגליל 46, ראש פינה' },
   { id: 73, name: 'Renuar', address: '6H69+8F קרית שמונה' },
  { id: 74, name: 'Renuar', address: 'הסתת 20 אילת' },
  { id: 75, name: 'Renuar', address: 'קאמפן 8 אילת' },
   { id: 76, name: 'Renuar', address: 'הפלמ"ח 1, אילת' },
   
   { id: 77,  name: "Castro", address: "יהודה הלוי 1, טבריה, ישראל" },
   { id: 78,  name: "Twentyfourseven", address: "האנגר 9, נמל תל אביב,תל אביב" },

];

const castroAddresses = [
  { id: 77,  name: "Castro", address: "יהודה הלוי 1, טבריה" },
  
  // Add more Castro addresses as needed...
];
const seedAddresses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/db_server");

    const db = mongoose.connection;

    db.once("open", async () => {
      console.log("Connected to MongoDB");

      // Check if the adresses collection exists and drop it if it does
      const collections = await db.db.listCollections({ name: "adresses" }).toArray();
      if (collections.length > 0) {
        await db.db.collection("adresses").drop();
        console.log('Adresses collection cleared');
      }

      // Fetch all stores
      const stores = await Store.find({});

      // Map store names to their ObjectIds
      const storeMap = {};
      stores.forEach(store => {
        storeMap[store.name] = store._id;
      });

      // Update addresses with the correct ObjectId
      const updatedAddresses = addresses.map(addr => {
        return {
          id: addr.id,
          name: storeMap[addr.name], // Set the name field to the corresponding ObjectId
          address: addr.address
        };
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