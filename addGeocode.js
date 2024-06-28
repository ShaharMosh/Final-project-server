import axios from 'axios';
import mongoose from 'mongoose';
import Address from './models/addresses.js'; // Ensure this path is correct

const geocodeAddress = async (address) => {
  const response = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
      q: address,
      format: 'json',
      addressdetails: 1,
      limit: 1,
    },
  });

  if (response.data.length > 0) {
    const location = response.data[0];
    return { lat: location.lat, lng: location.lon };
  } else {
    throw new Error('Geocoding API error: No results found');
  }
};

mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const geocodeAndUpdateAddresses = async () => {
  try {
    const addresses = await Address.find({});
    for (const addressData of addresses) {
      try {
        if (addressData.latitude && addressData.longitude) {
          console.log(`Skipping: ${addressData.name} already has latitude and longitude`);
          continue; // Skip geocoding if latitude and longitude are already set
        }
        
        const location = await geocodeAddress(addressData.address);
        addressData.latitude = location.lat;
        addressData.longitude = location.lng;
        await addressData.save();
        console.log(`Updated: ${addressData.name} at ${addressData.latitude}, ${addressData.longitude}`);
      } catch (err) {
        console.error(`Error updating address for ID ${addressData.id}: ${err.message}`);
      }
    }
  } catch (error) {
    console.error('Error fetching addresses from database', error);
  } finally {
    mongoose.connection.close();
  }
};

geocodeAndUpdateAddresses();
