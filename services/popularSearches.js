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
    const colorBlue = await Color.findOne({ name: "Blue" });

    const storeUrbanica = await Store.findOne({ name: "Urbanica" });
    const storeGolf = await Store.findOne({ name: "Golf" });
    const storeRenuar = await Store.findOne({ name: "Renuar" });
    const storeYanga = await Store.findOne({ name: "Yanga" });
    const storeHoodies = await Store.findOne({ name: "Hoodies" });
    const storeTwentyfourseven = await Store.findOne({ name: "Twentyfourseven" });




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
      Store.findOne({ name: "Yanga" }),
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

    const women_pants_sizes_nums = await Promise.all([
      Size.findOne({ name: "34" }),
      Size.findOne({ name: "36" }),
      Size.findOne({ name: "38" }),
    ]);

    const women_pants_sizes_letters = await Promise.all([
      Size.findOne({ name: "S" }),
      Size.findOne({ name: "M" }),
      Size.findOne({ name: "L" }),
    ]);

    const men_pants_sizes = await Promise.all([
      Size.findOne({ name: "S" }),
      Size.findOne({ name: "M" }),
      Size.findOne({ name: "L" }),
      Size.findOne({ name: "28" }),
      Size.findOne({ name: "30" }),
      Size.findOne({ name: "32" }),
    ]);

    const men_pants_sizes_letters = await Promise.all([
      Size.findOne({ name: "S" }),
      Size.findOne({ name: "M" }),
      Size.findOne({ name: "L" }),
    ]);

    const shoes_women_sizes = await Promise.all([
      Size.findOne({ name: "37" }),
      Size.findOne({ name: "38" }),
      Size.findOne({ name: "39" }),
    ]);

    const shoes_men_sizes = await Promise.all([
      Size.findOne({ name: "41" }),
      Size.findOne({ name: "42" }),
      Size.findOne({ name: "43" }),
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

    const Renuar_Golf = await Promise.all([
      Store.findOne({ name: "Golf" }),
      Store.findOne({ name: "Renuar" }),
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
              category: categoryShirts._id,
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
              category: categoryShirts._id,
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
              category: categoryDresses._id,
            });
            await popularSearch.save();
          }
        }
      }
    }

    const stores_not_urbanica_golf = await Store.find({ name: { $nin: ["Golf", "Urbanica", "Renuar", "Yanga", "Hoodies", "Twentyfourseven"] } });

    // Create searches for black and blue shorts for women.
    for (const store of stores_not_urbanica_golf) {
      for (const size of women_pants_sizes) {
        for (const color of black_blue) {
          if (store && genderWomen && size && color && categoryShorts) {
            const popularSearch = new PopularSearches({
              store: store._id,
              gender: genderWomen._id,
              size: size._id,
              color: color._id,
              category: categoryShorts._id,
            });
            await popularSearch.save();
          }
        }
      }
    }



    // Create searches for black and blue shorts for women only in num sizes in golf, renuar.
    for (const store of Renuar_Golf) {
      for (const size of women_pants_sizes_nums) {
        for (const color of black_blue) {
          if (store && genderWomen && size && color && categoryShorts) {
            const popularSearch = new PopularSearches({
              store: store._id,
              gender: genderWomen._id,
              size: size._id,
              color: color._id,
              category: categoryShorts._id,
            });
            await popularSearch.save();
          }
        }
      }
    }

    // Create searches for black shorts for women only in num sizes in yanga.
    for (const size of women_pants_sizes_letters) {
      if (storeYanga && genderWomen && size && colorBlack && categoryShorts) {
        const popularSearch = new PopularSearches({
          store: storeYanga._id,
          gender: genderWomen._id,
          size: size._id,
          color: colorBlack._id,
          category: categoryShorts._id,
        });
        await popularSearch.save();
      }
    }

    // Create searches for blue shorts for women only in num sizes in twenty for seven.
    for (const size of women_pants_sizes_letters) {
      if (storeTwentyfourseven && genderWomen && size && colorBlue && categoryShorts) {
        const popularSearch = new PopularSearches({
          store: storeTwentyfourseven._id,
          gender: genderWomen._id,
          size: size._id,
          color: colorBlue._id,
          category: categoryShorts._id,
        });
        await popularSearch.save();
      }
    }

    // Create searches for black shorts for women only in all sizes in twenty for seven.
    for (const size of women_pants_sizes_letters) {
      if (storeTwentyfourseven && genderWomen && size && colorBlack && categoryShorts) {
        const popularSearch = new PopularSearches({
          store: storeTwentyfourseven._id,
          gender: genderWomen._id,
          size: size._id,
          color: colorBlack._id,
          category: categoryShorts._id,
        });
        await popularSearch.save();
      }
    }

    // Create searches for blue shorts for women only in all sizes in yanga.
    for (const size of women_pants_sizes) {
      if (storeYanga && genderWomen && size && colorBlue && categoryShorts) {
        const popularSearch = new PopularSearches({
          store: storeYanga._id,
          gender: genderWomen._id,
          size: size._id,
          color: colorBlue._id,
          category: categoryShorts._id,
        });
        await popularSearch.save();
      }
    }

    // Create searches for black shorts for women only in all sizes in hoodies.
    for (const size of women_pants_sizes) {
      if (storeHoodies && genderWomen && size && colorBlack && categoryShorts) {
        const popularSearch = new PopularSearches({
          store: storeHoodies._id,
          gender: genderWomen._id,
          size: size._id,
          color: colorBlack._id,
          category: categoryShorts._id,
        });
        await popularSearch.save();
      }
    }

    const shorts_men_stores = await Store.find({
      name: { $nin: ["Yanga", "Studiopasha", "Urbanica", "Renuar", "Hoodies", "Twentyfourseven"] },
    });

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
              category: categoryShorts._id,
            });
            await popularSearch.save();
          }
        }
      }
    }

    // Create searches for black and blue shorts for men only in urbanica and hoodies (only letters sizes_.
    for (const store of urbanica_hoodies) {
      for (const size of men_pants_sizes_letters) {
        for (const color of black_blue) {
          if (storeUrbanica && genderMen && size && color && categoryShorts) {
            const popularSearch = new PopularSearches({
              store: storeUrbanica._id,
              gender: genderMen._id,
              size: size._id,
              color: color._id,
              category: categoryShorts._id,
            });
            await popularSearch.save();
          }
        }
      }
    }

    // Create searches for blue shorts for men only in renuar (only nums sizes).
    for (const size of men_pants_sizes_nums) {
      if (storeRenuar && genderMen && size && colorBlue && categoryShorts) {
        const popularSearch = new PopularSearches({
          store: storeRenuar._id,
          gender: genderMen._id,
          size: size._id,
          color: colorBlue._id,
          category: categoryShorts._id,
        });
        await popularSearch.save();
      }
    }


    // Create searches for black shorts for men in all sizes only in renuar.
    for (const size of men_pants_sizes) {
      if (storeRenuar && genderMen && size && colorBlack && categoryShorts) {
        const popularSearch = new PopularSearches({
          store: storeRenuar._id,
          gender: genderMen._id,
          size: size._id,
          color: colorBlack._id,
          category: categoryShorts._id,
        });
        await popularSearch.save();
      }
    }

    const pants_women_stores = await Store.find({
      name: { $nin: ["Urbanica", "Hoodies", "Yanga", "Golf", "Renuar"] },
    });

    // Create searches for black pants for women in all sizes in some stores.
    for (const store of pants_women_stores) {
      for (const size of women_pants_sizes) {
        if (store && genderWomen && size && colorBlack && categoryPants) {
          const popularSearch = new PopularSearches({
            store: store._id,
            gender: genderWomen._id,
            size: size._id,
            color: colorBlack._id,
            category: categoryPants._id,
          });
          await popularSearch.save();
        }
      }
    }

    const urbanica_hoodies = await Promise.all([
      Store.findOne({ name: "Urbanica" }),
      Store.findOne({ name: "Hoodies" }),
      Store.findOne({ name: "Yanga" }),
    ]);

    // Create searches for black pants for women only in sizes S M l for Urbanica and Hoodies and yanga.
    for (const store of urbanica_hoodies) {
      for (const size of shirt_dressesSizes) {
        if (store && genderWomen && size && colorBlack && categoryPants) {
          const popularSearch = new PopularSearches({
            store: store._id,
            gender: genderWomen._id,
            size: size._id,
            color: colorBlack._id,
            category: categoryPants._id,
          });
          await popularSearch.save();
        }
      }
    }

    // Create searches for black pants for women only in num sizes for Golf and Renuar.
    for (const store of Renuar_Golf) {
      for (const size of women_pants_sizes_nums) {
        if (storeGolf && genderWomen && size && colorBlack && categoryPants) {
          const popularSearch = new PopularSearches({
            store: storeGolf._id,
            gender: genderWomen._id,
            size: size._id,
            color: colorBlack._id,
            category: categoryPants._id,
          });
          await popularSearch.save();
        }
      }
    }

    // Create searches for blue pants for women only in num sizes in Renuar.
    for (const size of women_pants_sizes_nums) {
      if (storeRenuar && genderWomen && size && colorBlue && categoryPants) {
        const popularSearch = new PopularSearches({
          store: storeRenuar._id,
          gender: genderWomen._id,
          size: size._id,
          color: colorBlue._id,
          category: categoryPants._id,
        });
        await popularSearch.save();
      }
    }

    // Create searches for blue pants for women only in all sizes in yanga.
    for (const size of women_pants_sizes) {
      if (storeYanga && genderWomen && size && colorBlue && categoryPants) {
        const popularSearch = new PopularSearches({
          store: storeYanga._id,
          gender: genderWomen._id,
          size: size._id,
          color: colorBlue._id,
          category: categoryPants._id,
        });
        await popularSearch.save();
      }
    }

    // Create searches for black pants for women only in all sizes for Golf.
    for (const size of women_pants_sizes) {
      if (storeGolf && genderWomen && size && colorBlue && categoryPants) {
        const popularSearch = new PopularSearches({
          store: storeGolf._id,
          gender: genderWomen._id,
          size: size._id,
          color: colorBlue._id,
          category: categoryPants._id,
        });
        await popularSearch.save();
      }
    }


    const men_stores_pants = await Store.find({
      name: { $nin: ["Urbanica", "Golf", "Renuar", "Hoodies", "Twentyfourseven"] },
    });

    // Create searches for black pants for men in all sizes execpt urbanica, golf, renuar, hoodies.
    for (const store of men_stores_pants) {
      for (const size of men_pants_sizes) {
        if (store && genderMen && size && colorBlack && categoryPants) {
          const popularSearch = new PopularSearches({
            store: store._id,
            gender: genderMen._id,
            size: size._id,
            color: colorBlack._id,
            category: categoryPants._id,
          });
          await popularSearch.save();
        }
      }
    }

    const pants_letters_sizes_men_stores = await Promise.all([
      Store.findOne({ name: "Urbanica" }),
      Store.findOne({ name: "Hoodies" }),
      Store.findOne({ name: "Renuar" }),
    ]);

    // Create searches for black pants for men in letters sizes in urbanica, hoodies, renuar.
    for (const store of pants_letters_sizes_men_stores) {
      for (const size of men_pants_sizes_letters) {
        if (store && genderMen && size && colorBlack && categoryPants) {
          const popularSearch = new PopularSearches({
            store: store._id,
            gender: genderMen._id,
            size: size._id,
            color: colorBlack._id,
            category: categoryPants._id,
          });
          await popularSearch.save();
        }
      }
    }

    // Create searches for blue pants for men in letters sizes in hoodies.
    for (const size of men_pants_sizes_letters) {
      if (storeHoodies && genderMen && size && colorBlue && categoryPants) {
        const popularSearch = new PopularSearches({
          store: storeHoodies._id,
          gender: genderMen._id,
          size: size._id,
          color: colorBlue._id,
          category: categoryPants._id,
        });
        await popularSearch.save();
      }
    }


    // Create searches for blue pants for men in all sizes in urbanica.
    for (const size of men_pants_sizes) {
      if (storeUrbanica && genderMen && size && colorBlue && categoryPants) {
        const popularSearch = new PopularSearches({
          store: storeUrbanica._id,
          gender: genderMen._id,
          size: size._id,
          color: colorBlack._id,
          category: categoryPants._id,
        });
        await popularSearch.save();
      }
    }

    const men_pants_sizes_nums = await Promise.all([
      Size.findOne({ name: "28" }),
      Size.findOne({ name: "30" }),
      Size.findOne({ name: "32" }),
    ]);

    // Create searches for black pants for men in nums sizes in golf.
    for (const size of men_pants_sizes_nums) {
      if (storeGolf && genderMen && size && colorBlack && categoryPants) {
        const popularSearch = new PopularSearches({
          store: storeGolf._id,
          gender: genderMen._id,
          size: size._id,
          color: colorBlack._id,
          category: categoryPants._id,
        });
        await popularSearch.save();
      }
    }

    const golf_renuar = await Promise.all([
      Store.findOne({ name: "Golf" }),
      Store.findOne({ name: "Renuar" }),
    ]);

    // Create searches for blue pants for men in all sizes in golf and renuar.
    for (const store of golf_renuar) {
      for (const size of men_pants_sizes) {
        if (store && genderMen && size && colorBlue && categoryPants) {
          const popularSearch = new PopularSearches({
            store: store._id,
            gender: genderMen._id,
            size: size._id,
            color: colorBlue._id,
            category: categoryPants._id,
          });
          await popularSearch.save();
        }
      }
    }

    // Create searches for black pants for men in letters sizes in renuar.
    for (const size of men_pants_sizes_letters) {
      if (storeRenuar && genderMen && size && colorBlack && categoryPants) {
        const popularSearch = new PopularSearches({
          store: storeRenuar._id,
          gender: genderMen._id,
          size: size._id,
          color: colorBlack._id,
          category: categoryPants._id,
        });
        await popularSearch.save();
      }
    }



    const stores_jeans = await Store.find({
      name: { $nin: ["Hoodies", "Urbanica", "Studiopasha", "Golf", "Castro"] },
    });

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
              category: categoryJeans._id,
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
      Store.findOne({ name: "Castro" }),
    ]);

    const women_jeans_sizes = await Promise.all([
      Size.findOne({ name: "34" }),
      Size.findOne({ name: "36" }),
      Size.findOne({ name: "38" }),
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
              category: categoryJeans._id,
            });
            await popularSearch.save();
          }
        }
      }
    }

    const jeans_men_stores = await Store.find({
      name: {
        $nin: ["Hoodies", "Yanga", "Studiopasha", "Golf", "Twentyfourseven"],
      },
    });

    // Create searches for black and blue jeans for men all stores execpt some.
    for (const store of jeans_men_stores) {
      for (const size of men_pants_sizes) {
        for (const color of black_blue) {
          if (store && genderMen && size && color && categoryJeans) {
            const popularSearch = new PopularSearches({
              store: store._id,
              gender: genderMen._id,
              size: size._id,
              color: color._id,
              category: categoryJeans._id,
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
              category: categoryJeans._id,
            });
            await popularSearch.save();
          }
        }
      }
    }

    const shoes_women_stores = await Store.find({
      name: { $nin: ["Hoodies", "Studiopasha"] },
    });

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
              category: categoryShoes._id,
            });
            await popularSearch.save();
          }
        }
      }
    }

    const shoes_men_stores = await Store.find({
      name: { $nin: ["Hoodies", "Yanga", "Studiopasha"] },
    });

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
              category: categoryShoes._id,
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