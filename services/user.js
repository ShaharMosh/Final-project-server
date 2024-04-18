import userPassName from '../models/user.js';
import jwt from 'jsonwebtoken';
import Item from '../models/item.js';


const getDetails = async (authorization) => {
    try {
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return null;
        }

        const token = authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);

        if (!decodedToken || !decodedToken.userId) {
            return null;
        }

        jwt.verify(token, process.env.KEY);
        const user = await userPassName.findById(decodedToken.userId);

        if (user) {
            const profile = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            };
            return profile;
        }
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const updateUserWishlist = async (req, authorization) => {
    try {
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return { success: false, message: 'Invalid token' };
        }

        const token = authorization.split(' ')[1];
        const itemId = req.body.itemId;
        const action = req.body.action;
        const decodedToken = jwt.decode(token);

        if (!decodedToken || !decodedToken.userId) {
            return { success: false, message: 'Invalid token' };
        }

        jwt.verify(token, process.env.KEY);
        const user = await userPassName.findById(decodedToken.userId);

        if (user) {
            switch (action) {
                case 'add':
                    if (!user.wishlist.includes(itemId)) {
                        user.wishlist.push(itemId);
                    }
                    break;
                case 'remove':
                    if (user.wishlist) {
                        const indexToRemove = user.wishlist ? user.wishlist.findIndex(id => id.toString() === itemId.toString()) : -1;

                        if (indexToRemove !== -1) {
                            user.wishlist.splice(indexToRemove, 1);
                        }
                    }
                    break;
                default:
                    return { success: false, message: 'Invalid action' };
            }

            await user.save();
            return { success: true, wishlist: user.wishlist };
        }

        return { success: false, message: 'User not found' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }
};

const getUserWishlist = async (authorization) => {
    try {
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return { success: false, message: 'Invalid token' };
        }

        const token = authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);

        if (!decodedToken || !decodedToken.userId) {
            return { success: false, message: 'Invalid token' };
        }

        jwt.verify(token, process.env.KEY);

        const user = await userPassName.findById(decodedToken.userId);
        if (user) {
            const wishlistItems = user.wishlist;
            return { success: true, wishlist: wishlistItems };
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        return { success: false, message: 'Internal server error' };
    }
};


const wishlistPage = async (authorization) => {
    console.log("in");
    try {
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return { success: false, message: 'Invalid token' };
        }

        const token = authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);

        if (!decodedToken || !decodedToken.userId) {
            return { success: false, message: 'Invalid token' };
        }

        jwt.verify(token, process.env.KEY);

        const user = await userPassName.findById(decodedToken.userId);
        
        if (user) {
            const wishlistItems = user.wishlist;

            // Assuming 'Item' is your mongoose model for items
            const itemList = await Item.find({ _id: { $in: wishlistItems } }).populate("store");

            console.log("itemList", itemList)

            const items = itemList.map(item => ({
                id: item.id,
                image: item.image,
                price: item.price,
                company: item.store.name,
                name: item.name
            }));


            return { success: true, items: items };
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        return { success: false, message: 'Internal server error' };
    }
};

export default {
    getDetails,
    updateUserWishlist,
    getUserWishlist,
    wishlistPage
};
