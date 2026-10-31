// ===== EDIT THIS FILE to update the website =====
// Only confirmed information is used. Leave a value empty ('') until it is confirmed.

export const SITE = {
  name: 'New Sunlight Hotel & Party Palace',
  rating: '4.2',
  reviewCount: 138,
  addressLines: ['Near Khaireni, Mahendra Highway,', 'Devdaha Municipality 32900, Nepal.'],
  // Used for the map and directions until the owner supplies the exact Google Maps link.
  mapsQuery: 'New Sunlight Hotel & Party Palace, Khaireni, Mahendra Highway, Devdaha 32900, Nepal',
  googleListingUrl: '', // paste the verified Google Maps listing link here
  contact: {
    phone: '',       // confirmed number only
    whatsapp: '',    // digits only, with country code
    email: '',
    // Connect the form: create a form at formspree.io (or similar) and paste its URL here.
    formEndpoint: '',
  },
};

export const NAV = [
  ['Home', 'home'], ['About Us', 'about'], ['Rooms', 'rooms'], ['Restaurant', 'restaurant'],
  ['Party Palace', 'party'], ['Gallery', 'gallery'], ['Contact', 'contact'],
];

// Placeholder rooms. Replace with confirmed categories, amenities and prices.
// image: '/images/room-1.jpg' (put files in /public/images)
export const ROOMS = [
  { id: 1, category: 'Room category 1', desc: 'Placeholder. Add a confirmed description of this room.', amenities: [], price: '', image: null },
  { id: 2, category: 'Room category 2', desc: 'Placeholder. Add a confirmed description of this room.', amenities: [], price: '', image: null },
  { id: 3, category: 'Room category 3', desc: 'Placeholder. Add a confirmed description of this room.', amenities: [], price: '', image: null },
];

export const EVENT_TYPES = ['Weddings', 'Birthday celebrations', 'Family gatherings', 'Anniversaries', 'Social events', 'Other private functions'];

export const GALLERY_CATEGORIES = ['All', 'Hotel Exterior', 'Rooms', 'Restaurant and Food', 'Party Palace', 'Events'];
// Replace src: null with real photo paths when supplied.
export const GALLERY = [
  { id: 1, cat: 'Hotel Exterior', src: null, alt: 'Hotel exterior' },
  { id: 2, cat: 'Rooms', src: null, alt: 'Guest room' },
  { id: 3, cat: 'Restaurant and Food', src: null, alt: 'Nepali Thakali Thali' },
  { id: 4, cat: 'Party Palace', src: null, alt: 'Party palace' },
  { id: 5, cat: 'Events', src: null, alt: 'Celebration' },
  { id: 6, cat: 'Restaurant and Food', src: null, alt: 'Dining area' },
];

export const REVIEWS = [
  { name: 'Amrit Bhattrai', text: 'One of the best hotel options near Butwal for clean rooms, a peaceful environment, and very helpful staff. The rooms were neat and well-managed, the food was tasty, and parking was convenient.' },
  { name: 'Narayan Bhatt', text: 'The food is very good, the place is beautiful, and the staff is also good. Pandey ji takes very good care of the customers.' },
  { name: 'Roshan Yadav', text: 'Wonderful hotel near Butwal. Peaceful location, tasty Thakali Thali, and great hospitality.' },
];

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;
export const listingUrl = SITE.googleListingUrl || mapsSearchUrl;
