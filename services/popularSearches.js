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


        // Fetch genders
        const genders = await Promise.all([
            Gender.findOne({ name: "Men" }),
            Gender.findOne({ name: "Women" })
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

        // Create searches for black and white shirts for men and women.
        for (const store of stores) {
            for (const gender of genders) {
                for (const size of shirt_dressesSizes) {
                    for (const color of black_white) {
                        if (store && gender && size && color && categoryShirts) {
                            const popularSearch = new PopularSearches({
                                store: store._id,
                                gender: gender._id,
                                size: size._id,
                                color: color._id,
                                category: categoryShirts._id
                            });
                            await popularSearch.save();
                        }
                    }
                }
            }
        }

        // Create searches for black and white dresses for women.
        for (const store of stores) {
            for (const gender of genders) {
                for (const size of shirt_dressesSizes) {
                    for (const color of black_white) {
                        if (store && gender && size && color && categoryDresses) {
                            const popularSearch = new PopularSearches({
                                store: store._id,
                                gender: gender._id,
                                size: size._id,
                                color: color._id,
                                category: categoryDresses._id
                            });
                            await popularSearch.save();
                        }
                    }
                }
            }
        }

        // Fetch all stores except the Urbanica 
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

        // Create searches for black and blue shorts for men.
        for (const store of stores_not_urbanica) {
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

        // Create searches for black pants for women.
        for (const store of stores) {
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

        // Create searches for black pants for men.
        for (const store of stores) {
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

        // Fetch all stores except the Hoodies 
        const stores_not_hoodies = await Store.find({ name: { $ne: "Hoodies" } });

        // Create searches for black and blue jeans for women.
        for (const store of stores_not_hoodies) {
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

        // Create searches for black and blue jeans for men.
        for (const store of stores_not_hoodies) {
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

        // Create searches for black and white shoes for women.
        for (const store of stores) {
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

        // Create searches for black and white shoes for men.
        for (const store of stores) {
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