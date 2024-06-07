import Store from "../models/store.js";
import Size from "../models/size.js";
import Color from "../models/color.js";
import Category from "../models/category.js";
import PopularSearches from "../models/popularSearcheSchema.js";
import Gender from "../models/gender.js";


const createPopularSearches = async () => {
    try {

        // Check if the PopularSearches collection is empty
        const popularSearchesCount = await PopularSearches.countDocuments();
        if (popularSearchesCount > 0) {
            return;
        }

        const genderMen = await Gender.findOne({ name: "Men" });
        const genderWomen = await Gender.findOne({ name: "Women" });

        const colorBlack = await Color.findOne({ name: "Black" });

        const categoryShirts = await Category.findOne({ name: "Shirts" });
        const categoryPants = await Category.findOne({ name: "Pants" });
        const categoryJeans = await Category.findOne({ name: "Jeans" });
        const categoryShorts = await Category.findOne({ name: "Shorts" });
        const categoryDresses = await Category.findOne({ name: "Dresses" });
        const categoryShoes = await Category.findOne({ name: "Shoes" });

        const stores = await Promise.all([
            Store.findOne({ name: "Castro" }),
            Store.findOne({ name: "Renuar" }),
            Store.findOne({ name: "Golf" }),
            Store.findOne({ name: "Studiopasha" }),
            Store.findOne({ name: "Urbanica" }),
            Store.findOne({ name: "Twentyfourseven" }),
            Store.findOne({ name: "Hoodies" }),
            Store.findOne({ name: "Yanga" })
        ]);

        const men_stores = await Promise.all([
            Store.findOne({ name: "Castro" }),
            Store.findOne({ name: "Renuar" }),
            Store.findOne({ name: "Golf" }),
            Store.findOne({ name: "Urbanica" }),
            Store.findOne({ name: "Twentyfourseven" }),
            Store.findOne({ name: "Hoodies" }),
        ]);

        // Fetch sizes
        const shirt_dressesSizes = await Promise.all([
            Size.findOne({ name: "S" }),
            Size.findOne({ name: "M" }),
            Size.findOne({ name: "L" }),
        ]);

        const women_pants_sizes = await Promise.all([
            Size.findOne({ name: "S" }),
            Size.findOne({ name: "M" }),
            Size.findOne({ name: "L" }),
            Size.findOne({ name: "34" }),
            Size.findOne({ name: "36" }),
            Size.findOne({ name: "38" }),
        ]);

        const men_pants_sizes = await Promise.all([
            Size.findOne({ name: "S" }),
            Size.findOne({ name: "M" }),
            Size.findOne({ name: "L" }),
            Size.findOne({ name: "28" }),
            Size.findOne({ name: "30" }),
            Size.findOne({ name: "32" }),
        ]);

        const shoes_women_sizes = await Promise.all([
            Size.findOne({ name: "37" }),
            Size.findOne({ name: "38" }),
            Size.findOne({ name: "39" }),
        ]);

        const shoes_men_sizes = await Promise.all([
            Size.findOne({ name: "41" }),
            Size.findOne({ name: "42" }),
            Size.findOne({ name: "43" })
        ]);


        // Fetch colors
        const black_white = await Promise.all([
            Color.findOne({ name: "Black" }),
            Color.findOne({ name: "White" }),
        ]);
        const black_blue = await Promise.all([
            Color.findOne({ name: "Black" }),
            Color.findOne({ name: "Blue" }),
        ]);

        // Create searches for black and white shirts for women.
        for (const store of stores) {
            for (const size of shirt_dressesSizes) {
                for (const color of black_white) {
                    if (store && genderWomen && size && color && categoryShirts) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderWomen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryShirts._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }

        // Create searches for black and white shirts for men.
        for (const store of men_stores) {
            for (const size of shirt_dressesSizes) {
                for (const color of black_white) {
                    if (store && genderMen && size && color && categoryShirts) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderMen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryShirts._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }

        // Create searches for black and white dresses for women.
        for (const store of stores) {
            for (const size of shirt_dressesSizes) {
                for (const color of black_white) {
                    if (store && genderWomen && size && color && categoryDresses) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderWomen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryDresses._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }

        const stores_not_urbanica = await Store.find({ name: { $ne: "Urbanica" } });

        // Create searches for black and blue shorts for women.
        for (const store of stores_not_urbanica) {
            for (const size of women_pants_sizes) {
                for (const color of black_blue) {
                    if (store && genderWomen && size && color && categoryShorts) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderWomen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryShorts._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }

        const shorts_men_stores = await Store.find({ name: { $nin: [ "Yanga", "Studiopasha"] } });

        // Create searches for black and blue shorts for men.
        for (const store of shorts_men_stores) {
            for (const size of men_pants_sizes) {
                for (const color of black_blue) {
                    if (store && genderMen && size && color && categoryShorts) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderMen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryShorts._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }

        const pants_women_stores = await Store.find({ name: { $nin: [ "Urbanica", "Hoodies"] } });

        // Create searches for black pants for women in all sizes execpt Urbanica and Hoodies.
        for (const store of pants_women_stores) {
            for (const size of women_pants_sizes) {
                if (store && genderWomen && size && colorBlack && categoryPants) {
                    const popularSearch = new PopularSearches({
                        store: store._id,
                        gender: genderWomen._id,
                        size: size._id,
                        color: colorBlack._id,
                        category: categoryPants._id
                    });
                    await popularSearch.save();
                }
            }
        }

        const urbanica_hoodies = await Promise.all([
            Store.findOne({ name: "Urbanica" }),
            Store.findOne({ name: "Hoodies" }),
        ]);

        // Create searches for black pants for women only in sizes S M l for Urbanica and Hoodies.
        for (const store of urbanica_hoodies) {
            for (const size of shirt_dressesSizes) {
                if (store && genderWomen && size && colorBlack && categoryPants) {
                    const popularSearch = new PopularSearches({
                        store: store._id,
                        gender: genderWomen._id,
                        size: size._id,
                        color: colorBlack._id,
                        category: categoryPants._id
                    });
                    await popularSearch.save();
                }
            }
        }

        // Create searches for black pants for men.
        for (const store of men_stores) {
            for (const size of men_pants_sizes) {
                if (store && genderMen && size && colorBlack && categoryPants) {
                    const popularSearch = new PopularSearches({
                        store: store._id,
                        gender: genderMen._id,
                        size: size._id,
                        color: colorBlack._id,
                        category: categoryPants._id
                    });
                    await popularSearch.save();
                }
            }
        }

        const stores_jeans = await Store.find({ name: { $nin: ["Hoodies", "Urbanica", "Studiopasha", "Golf"] } });

        // Create searches for black and blue jeans for women exeprt some stores.
        for (const store of stores_jeans) {
            for (const size of women_pants_sizes) {
                for (const color of black_blue) {
                    if (store && genderWomen && size && color && categoryJeans) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderWomen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryJeans._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }

        const jeans_no_all_sizes_women_stores = await Promise.all([
            Store.findOne({ name: "Golf" }),
            Store.findOne({ name: "Urbanica" }),
            Store.findOne({ name: "Studiopasha" }),
        ]);

        const women_jeans_sizes = await Promise.all([
            Size.findOne({ name: "34" }),
            Size.findOne({ name: "36" }),
            Size.findOne({ name: "37" }),
        ]);


        // Create searches for black and blue jeans for women golf, studiopasha, urbanica.
        for (const store of jeans_no_all_sizes_women_stores) {
            for (const size of women_jeans_sizes) {
                for (const color of black_blue) {
                    if (store && genderWomen && size && color && categoryJeans) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderWomen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryJeans._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }


        const jeans_men_stores = await Store.find({ name: { $nin: ["Hoodies", "Yanga", "Studiopasha", "Golf", "Twentyfourseven"] } });

        // Create searches for black and blue jeans for men all stores execpt golf and twentyforseven.
        for (const store of jeans_men_stores) {
            for (const size of men_pants_sizes) {
                for (const color of black_blue) {
                    if (store && genderMen && size && color && categoryJeans) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderMen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryJeans._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }

        const jeans_no_all_sizes_men_stores = await Promise.all([
            Store.findOne({ name: "Golf" }),
            Store.findOne({ name: "Twentyfourseven" }),
        ]);

        const men_jeans_sizes = await Promise.all([
            Size.findOne({ name: "28" }),
            Size.findOne({ name: "30" }),
            Size.findOne({ name: "32" }),
        ]);


        // Create searches for black and blue jeans for men, stores golf and twentyforseven.
        for (const store of jeans_no_all_sizes_men_stores) {
            for (const size of men_jeans_sizes) {
                for (const color of black_blue) {
                    if (store && genderMen && size && color && categoryJeans) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderMen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryJeans._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }

        const shoes_women_stores = await Store.find({ name: { $nin: ["Hoodies", "Studiopasha"] } });

        // Create searches for black and white shoes for women.
        for (const store of shoes_women_stores) {
            for (const size of shoes_women_sizes) {
                for (const color of black_white) {
                    if (store && genderWomen && size && color && categoryShoes) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderWomen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryShoes._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }

        const shoes_men_stores = await Store.find({ name: { $nin: ["Hoodies", "Yanga", "Studiopasha"] } });

        // Create searches for black and white shoes for men.
        for (const store of shoes_men_stores) {
            for (const size of shoes_men_sizes) {
                for (const color of black_white) {
                    if (store && genderMen && size && color && categoryShoes) {
                        const popularSearch = new PopularSearches({
                            store: store._id,
                            gender: genderMen._id,
                            size: size._id,
                            color: color._id,
                            category: categoryShoes._id
                        });
                        await popularSearch.save();
                    }
                }
            }
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default {
    createPopularSearches,
};