/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, MenuItem, Order } from '../types.ts';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    nameAr: 'السندويشات',
    description: 'Freshly prepared Kuwaiti breakfast sandwiches in Samoon, Kubus, or Saj bread.',
    countBadge: '12 Items'
  },
  {
    id: 'club_sandwiches',
    name: 'Club Sandwiches',
    nameAr: 'كلوب ساندويش',
    description: 'Triple-decker toasted gourmet club sandwiches served with crisps.',
    countBadge: '9 Items'
  },
  {
    id: 'arabic_breakfast_select',
    name: 'Arabic Breakfast Select',
    nameAr: 'مختارات الفطور العربي',
    description: 'Individual freshly cooked mezze boxes, egg specialties, cheese, and sides.',
    countBadge: '23 Items'
  },
  {
    id: 'arabic_breakfast_packages',
    name: 'Arabic Breakfast Packages',
    nameAr: 'باقات الفطور العربي',
    description: 'Complete feast sets for KNPC shift teams with live removal discounts.',
    countBadge: '2 Packages'
  }
];

// Helper bread lists
const standardSandwichBreads = (sajPriceDelta: number = 0.050) => [
  { id: 'samoon', name: 'Kuwaiti Samoon', nameAr: 'صمون كويتي', priceDelta: 0.000 },
  { id: 'brown_kubus', name: 'Brown Kubus', nameAr: 'خبز أسمر', priceDelta: 0.000 },
  { id: 'saj_bread', name: 'Saj Bread', nameAr: 'خبز صاج', priceDelta: sajPriceDelta }
];

const clubSandwichBreads = [
  { id: 'white_toast', name: 'White Toast', nameAr: 'توست أبيض', priceDelta: 0.000 },
  { id: 'brown_toast', name: 'Brown Toast', nameAr: 'توست أسمر', priceDelta: 0.000 }
];

// Reusable package add-ons
const packageExtras = [
  { id: 'ex_falafel', name: 'Falafel BOX', price: 0.500 },
  { id: 'ex_eggplant', name: 'Eggplant BOX', price: 0.500 },
  { id: 'ex_cauliflower', name: 'Cauliflower BOX', price: 0.500 },
  { id: 'ex_chips', name: 'Potato Chips BOX', price: 0.500 },
  { id: 'ex_halloumi', name: 'Halloumi BOX', price: 0.750 },
  { id: 'ex_hamsa_halloumi', name: 'Hamsa Halloumi BOX', price: 0.750 },
  { id: 'ex_boiled_egg', name: 'Boiled Egg BOX', price: 0.500 },
  { id: 'ex_boiled_egg_ch', name: 'Boiled Egg BOX (+Cheese)', price: 0.600 },
  { id: 'ex_fried_egg', name: 'Fried Egg BOX', price: 0.500 },
  { id: 'ex_fried_egg_ch', name: 'Fried Egg BOX (+Cheese)', price: 0.600 },
  { id: 'ex_omelette', name: 'Omelette BOX', price: 0.500 },
  { id: 'ex_omelette_ch', name: 'Omelette BOX (+Cheese)', price: 0.600 },
  { id: 'ex_shakshuka', name: 'Shakshuka BOX', price: 0.600 },
  { id: 'ex_shakshuka_ch', name: 'Shakshuka BOX (+Cheese)', price: 0.700 },
  { id: 'ex_hotdog', name: 'Hotdog BOX', price: 0.750 },
  { id: 'ex_foul', name: 'Foul Mudammas BOX', price: 0.500 },
  { id: 'ex_salad', name: 'Salad BOX', price: 0.500 },
  { id: 'ex_hummus', name: 'Hummus BOX', price: 0.600 },
  { id: 'ex_mix_cheese', name: 'Mix Cheese BOX', price: 0.600 },
  { id: 'ex_white_cheese', name: 'White Cheese BOX', price: 0.600 },
  { id: 'ex_labane', name: 'Labane & Zathar BOX', price: 0.600 },
  { id: 'ex_jam_cream', name: 'Jam-Cream BOX', price: 0.750 },
  { id: 'ex_honey_cream', name: 'Honey-Cream BOX', price: 1.250 },
  { id: 'ex_turkey', name: 'Smoked Turkey BOX', price: 0.750 },
  { id: 'ex_mortadella', name: 'Mortadella BOX', price: 0.750 },
  { id: 'ex_white_kobus', name: 'White Kobus (Bread)', price: 0.050 },
  { id: 'ex_brown_kobus', name: 'Brown Kobus (Bread)', price: 0.075 },
  { id: 'ex_daqoos', name: 'Spicy Kuwaiti Daqoos (Sauce)', price: 0.250 }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // ================= CATEGORY 1: SANDWICHES (12 items) =================
  {
    id: 'sw_falafel',
    categoryId: 'sandwiches',
    name: 'Falafel Sandwich',
    nameAr: 'سندويش فلافل',
    description: 'Crisp golden Kuwaiti falafel, fresh herbs, with creamy tahina dressing.',
    basePrice: 0.100,
    image: '/src/assets/images/Sandwichs.jpg',
    availableBreads: standardSandwichBreads(0.050),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'cauliflower', name: 'Fried Cauliflower', price: 0.000 },
      { id: 'extra_tahina', name: 'Extra Creamy Tahina', price: 0.000 }
    ],
    removals: [
      { id: 'no_potato', name: 'No Potato', discount: 0 },
      { id: 'no_salad', name: 'No Salad', discount: 0 },
      { id: 'no_tahina', name: 'No Creamy Tahina', discount: 0 }
    ]
  },
  {
    id: 'sw_vegetable',
    categoryId: 'sandwiches',
    name: 'Vegetable Sandwich',
    nameAr: 'سندويش خضار مشكل',
    description: 'Fresh seasonal vegetables, fried aubergine, crisp cauliflower, and seasonings.',
    basePrice: 0.100,
    image: '/src/assets/images/Sandwichs.jpg',
    availableBreads: standardSandwichBreads(0.050),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'extra_tahina', name: 'Extra Creamy Tahina', price: 0.000 }
    ],
    removals: [
      { id: 'no_potato', name: 'No Potato', discount: 0 },
      { id: 'no_salad', name: 'No Salad', discount: 0 },
      { id: 'no_eggplant', name: 'No Eggplant', discount: 0 },
      { id: 'no_cauliflower', name: 'No Cauliflower', discount: 0 },
      { id: 'no_tahina', name: 'No Creamy Tahina', discount: 0 }
    ]
  },
  {
    id: 'sw_mix_vegetable',
    categoryId: 'sandwiches',
    name: 'Mix Vegetable Sandwich',
    nameAr: 'سندويش خضار مشكل خاص',
    description: 'Golden mixed veggies tossed with aromatic spices and smooth tahina.',
    basePrice: 0.100,
    availableBreads: standardSandwichBreads(0.050),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'extra_tahina', name: 'Extra Creamy Tahina', price: 0.000 }
    ],
    removals: [
      { id: 'no_potato', name: 'No Potato', discount: 0 },
      { id: 'no_salad', name: 'No Salad', discount: 0 },
      { id: 'no_eggplant', name: 'No Eggplant', discount: 0 },
      { id: 'no_cauliflower', name: 'No Cauliflower', discount: 0 },
      { id: 'no_tahina', name: 'No Creamy Tahina', discount: 0 }
    ]
  },
  {
    id: 'sw_omelette',
    categoryId: 'sandwiches',
    name: 'Omelette Sandwich',
    nameAr: 'سندويش أومليت بيض',
    description: 'Freshly pan-fried fluffy egg omelette with Kuwaiti spices and herbs.',
    basePrice: 0.120,
    availableBreads: standardSandwichBreads(0.030),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'plain_omelette', name: 'Plain Omelette', price: 0.000 },
      { id: 'salad', name: 'Salad', price: 0.000 },
      { id: 'mayo', name: 'Mayonnaise', price: 0.000 },
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 }
    ]
  },
  {
    id: 'sw_boiled_egg',
    categoryId: 'sandwiches',
    name: 'Boiled Egg Sandwich',
    nameAr: 'سندويش بيض مسلوق',
    description: 'Sliced farm-fresh boiled eggs with ripe tomato, crisp greens and seasonings.',
    basePrice: 0.120,
    availableBreads: standardSandwichBreads(0.030),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'tomato', name: 'Fresh Tomato', price: 0.000 },
      { id: 'salad', name: 'Salad', price: 0.000 },
      { id: 'mayo', name: 'Mayonnaise', price: 0.000 },
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_salad', name: 'No Salad', discount: 0 },
      { id: 'no_yellow', name: 'No Yellow', discount: 0 },
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 }
    ]
  },
  {
    id: 'sw_shakshuka',
    categoryId: 'sandwiches',
    name: 'Shakshuka Sandwich',
    nameAr: 'سندويش شكشوكة كويتية',
    description: 'Traditional slow-simmered spiced tomato and egg shakshuka in warm bread.',
    basePrice: 0.120,
    availableBreads: standardSandwichBreads(0.030),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'potato', name: 'Fried Potato', price: 0.000 },
      { id: 'mayo', name: 'Mayonnaise', price: 0.000 },
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 }
    ]
  },
  {
    id: 'sw_fried_egg',
    categoryId: 'sandwiches',
    name: 'Fried Egg Sandwich',
    nameAr: 'سندويش بيض مقلي',
    description: 'Sunny or well-done fried eggs with crisp edges and fresh seasoning.',
    basePrice: 0.120,
    availableBreads: standardSandwichBreads(0.030),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'potato', name: 'Fried Potato', price: 0.000 },
      { id: 'mayo', name: 'Mayonnaise', price: 0.000 },
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 }
    ]
  },
  {
    id: 'sw_halloumi',
    categoryId: 'sandwiches',
    name: 'Halloumi Sandwich',
    nameAr: 'سندويش حلوم مشوي',
    description: 'Pan-seared squeaky Halloumi cheese with sliced tomatoes and olives.',
    basePrice: 0.150,
    availableBreads: standardSandwichBreads(0.050),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 }
    ],
    removals: [
      { id: 'no_tomato', name: 'No Tomato', discount: 0 },
      { id: 'no_zathar', name: 'No Zathar', discount: 0 },
      { id: 'no_olives', name: 'No Olives', discount: 0 }
    ]
  },
  {
    id: 'sw_labane_zathar',
    categoryId: 'sandwiches',
    name: 'Labane & Zathar Sandwich',
    nameAr: 'سندويش لبنة وزعتر',
    description: 'Creamy strained labneh infused with aromatic thyme zathar and virgin olive oil.',
    basePrice: 0.100,
    availableBreads: standardSandwichBreads(0.050),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'tomato', name: 'Fresh Tomato', price: 0.000 },
      { id: 'olives', name: 'Olives', price: 0.000 },
      { id: 'olive_oil', name: 'Extra Olive Oil', price: 0.000 }
    ],
    removals: [
      { id: 'no_zathar', name: 'No Zathar', discount: 0 }
    ]
  },
  {
    id: 'sw_hotdog',
    categoryId: 'sandwiches',
    name: 'Hotdog Sandwich',
    nameAr: 'سندويش هوت دوج مشوي',
    description: 'Grilled premium sausage with fresh tomato, olives, and savory olive oil.',
    basePrice: 0.150,
    availableBreads: standardSandwichBreads(0.050),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'mayo', name: 'Mayonnaise', price: 0.000 },
      { id: 'ketchup', name: 'Ketchup', price: 0.000 },
      { id: 'potato', name: 'Potato', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_potato', name: 'No Potato', discount: 0 },
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 },
      { id: 'no_ketchup', name: 'No Ketchup', discount: 0 }
    ]
  },
  {
    id: 'sw_mortadella',
    categoryId: 'sandwiches',
    name: 'Mortadella Sandwich',
    nameAr: 'سندويش مورتديلا',
    description: 'Thinly sliced fine beef mortadella with potatoes, mayo, and condiments.',
    basePrice: 0.150,
    availableBreads: standardSandwichBreads(0.050),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'potato', name: 'Fried Potato', price: 0.000 },
      { id: 'mayo', name: 'Mayonnaise', price: 0.000 },
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_potato', name: 'No Potato', discount: 0 },
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 },
      { id: 'no_salad', name: 'No Salad', discount: 0 }
    ]
  },
  {
    id: 'sw_smoked_turkey',
    categoryId: 'sandwiches',
    name: 'Smoked Turkey Sandwich',
    nameAr: 'سندويش تركي مدخن',
    description: 'Lean smoked turkey breast slices layered with potatoes, condiments, and sauce.',
    basePrice: 0.150,
    availableBreads: standardSandwichBreads(0.050),
    defaultBreadId: 'samoon',
    extras: [
      { id: 'potato', name: 'Fried Potato', price: 0.000 },
      { id: 'mayo', name: 'Mayonnaise', price: 0.000 },
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_potato', name: 'No Potato', discount: 0 },
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 },
    ]
  },

  // ================= CATEGORY 2: CLUB SANDWICHES (9 items) =================
  {
    id: 'club_halloumi',
    categoryId: 'club_sandwiches',
    name: 'Halloumi Club Sandwich',
    nameAr: 'كلوب ساندويش حلومي',
    description: 'Triple-decker toasted bread filled with seared halloumi, tomato, olives, and potato chips.',
    basePrice: 1.250,
    image: '/src/assets/images/Club.jpg',
    availableBreads: clubSandwichBreads,
    defaultBreadId: 'white_toast',
    extras: [
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 }
    ],
    removals: [
      { id: 'no_tomato', name: 'No Tomato', discount: 0 },
      { id: 'no_zathar', name: 'No Zathar', discount: 0 },
      { id: 'no_olives', name: 'No Olives', discount: 0 },
      { id: 'no_potato', name: 'No Potato', discount: 0.250 }
    ]
  },
  {
    id: 'club_boiled_egg',
    categoryId: 'club_sandwiches',
    name: 'Boiled Egg Club Sandwich',
    nameAr: 'كلوب ساندويش بيض مسلوق',
    description: 'Hard-boiled egg layers with crisp turkey, garden salad, mayonnaise, and potato chips.',
    basePrice: 1.000,
    image: '/src/assets/images/Club.jpg',
    availableBreads: clubSandwichBreads,
    defaultBreadId: 'white_toast',
    extras: [
      { id: 'tomato', name: 'Tomato', price: 0.000 },
      { id: 'turkey', name: 'Turkey', price: 0.000 },
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_salad', name: 'No Salad', discount: 0 },
      { id: 'no_yellow', name: 'No Yellow', discount: 0 },
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 },
      { id: 'no_turkey', name: 'No Turkey', discount: 0 },
      { id: 'no_tomato', name: 'No Tomato', discount: 0 },
      { id: 'no_potato', name: 'No Potato', discount: 0.250 }
    ]
  },
  {
    id: 'club_omelette',
    categoryId: 'club_sandwiches',
    name: 'Omelette Club Sandwich',
    nameAr: 'كلوب ساندويش أومليت',
    description: 'Fluffy golden omelette, sliced turkey, fresh salad, mayonnaise, and crisp potato chips.',
    basePrice: 1.000,
    availableBreads: clubSandwichBreads,
    defaultBreadId: 'white_toast',
    extras: [
      { id: 'plain_omelette', name: 'Plain Omelette', price: 0.000 },
      { id: 'turkey', name: 'Turkey', price: 0.000 },
      { id: 'salad', name: 'Salad', price: 0.000 },
      { id: 'mayo', name: 'Mayonnaise', price: 0.000 },
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 },
      { id: 'no_turkey', name: 'No Turkey', discount: 0 },
      { id: 'no_potato', name: 'No Potato', discount: 0.250 }
    ]
  },
  {
    id: 'club_fried_egg',
    categoryId: 'club_sandwiches',
    name: 'Fried Egg Club Sandwich',
    nameAr: 'كلوب ساندويش بيض مقلي',
    description: 'Fried eggs layered with savoury turkey, creamy mayo, seasonings, and potato chips.',
    basePrice: 1.000,
    availableBreads: clubSandwichBreads,
    defaultBreadId: 'white_toast',
    extras: [
      { id: 'turkey', name: 'Turkey', price: 0.000 },
      { id: 'mayo', name: 'Mayonnaise', price: 0.000 },
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 },
      { id: 'no_turkey', name: 'No Turkey', discount: 0 },
      { id: 'no_potato', name: 'No Potato', discount: 0.250 }
    ]
  },
  {
    id: 'club_shakshuka',
    categoryId: 'club_sandwiches',
    name: 'Shakshuka Club Sandwich',
    nameAr: 'كلوب ساندويش شكشوكة',
    description: 'Traditional spiced tomato-egg shakshuka, turkey, potatoes, and mayo between toasted bread.',
    basePrice: 1.000,
    availableBreads: clubSandwichBreads,
    defaultBreadId: 'white_toast',
    extras: [
      { id: 'potato', name: 'Potato', price: 0.000 },
      { id: 'turkey', name: 'Turkey', price: 0.000 },
      { id: 'mayo', name: 'Mayonnaise', price: 0.000 },
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'kraft_cheese', name: 'Kraft Cheese', price: 0.030 }
    ],
    removals: [
      { id: 'no_mayo', name: 'No Mayonnaise', discount: 0 },
      { id: 'no_turkey', name: 'No Turkey', discount: 0 },
      { id: 'no_potato', name: 'No Potato', discount: 0.250 }
    ]
  },
  {
    id: 'club_vegetable',
    categoryId: 'club_sandwiches',
    name: 'Vegetable Club Sandwich',
    nameAr: 'كلوب ساندويش خضار',
    description: 'Fried eggplant, cauliflower, fresh greens, creamy tahina, and potato chips.',
    basePrice: 1.000,
    availableBreads: clubSandwichBreads,
    defaultBreadId: 'white_toast',
    extras: [
      { id: 'extra_tahina', name: 'Extra Creamy Tahina', price: 0.000 }
    ],
    removals: [
      { id: 'no_salad', name: 'No Salad', discount: 0 },
      { id: 'no_eggplant', name: 'No Eggplant', discount: 0 },
      { id: 'no_cauliflower', name: 'No Cauliflower', discount: 0 },
      { id: 'no_tahina', name: 'No Creamy Tahina', discount: 0 },
      { id: 'no_potato', name: 'No Potato', discount: 0.250 }
    ]
  },
  {
    id: 'club_falafel',
    categoryId: 'club_sandwiches',
    name: 'Falafel Club Sandwich',
    nameAr: 'كلوب ساندويش فلافل',
    description: 'Crunchy falafel, eggplant, cauliflower, creamy tahina, and seasoned potato chips.',
    basePrice: 1.000,
    availableBreads: clubSandwichBreads,
    defaultBreadId: 'white_toast',
    extras: [
      { id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 },
      { id: 'eggplant', name: 'Eggplant', price: 0.000 },
      { id: 'cauliflower', name: 'Cauliflower', price: 0.000 },
      { id: 'extra_tahina', name: 'Extra Creamy Tahina', price: 0.000 }
    ],
    removals: [
      { id: 'no_salad', name: 'No Salad', discount: 0 },
      { id: 'no_tahina', name: 'No Creamy Tahina', discount: 0 },
      { id: 'no_potato', name: 'No Potato', discount: 0.250 }
    ]
  },
  {
    id: 'club_mix_vegetable',
    categoryId: 'club_sandwiches',
    name: 'Mix Vegetable Club Sandwich',
    nameAr: 'كلوب ساندويش مشكل خضار',
    description: 'Gourmet medley of fried eggplant, cauliflower, crispy potatoes, and rich tahina.',
    basePrice: 1.000,
    availableBreads: clubSandwichBreads,
    defaultBreadId: 'white_toast',
    extras: [
      { id: 'extra_tahina', name: 'Extra Creamy Tahina', price: 0.000 }
    ],
    removals: [
      { id: 'no_salad', name: 'No Salad', discount: 0 },
      { id: 'no_eggplant', name: 'No Eggplant', discount: 0 },
      { id: 'no_cauliflower', name: 'No Cauliflower', discount: 0 },
      { id: 'no_tahina', name: 'No Creamy Tahina', discount: 0 },
      { id: 'no_potato', name: 'No Potato', discount: 0.250 }
    ]
  },
  {
    id: 'club_labane_zathar',
    categoryId: 'club_sandwiches',
    name: 'Labane & Zathar Club Sandwich',
    nameAr: 'كلوب ساندويش لبنة وزعتر',
    description: 'Rich Mediterranean labaneh with fragrant zathar, sliced tomato, olives, and potato chips.',
    basePrice: 1.000,
    availableBreads: clubSandwichBreads,
    defaultBreadId: 'white_toast',
    extras: [
      { id: 'tomato', name: 'Tomato', price: 0.000 },
      { id: 'olives', name: 'Olives', price: 0.000 },
      { id: 'olive_oil', name: 'Olive Oil', price: 0.000 }
    ],
    removals: [
      { id: 'no_zathar', name: 'No Zathar', discount: 0 },
      { id: 'no_potato', name: 'No Potato', discount: 0.250 }
    ]
  },

  // ================= CATEGORY 3: ARABIC BREAKFAST SELECT (23 items) =================
  {
    id: 'box_falafel',
    categoryId: 'arabic_breakfast_select',
    name: 'Falafel BOX',
    nameAr: 'بوكس فلافل مقرمشة',
    description: 'Freshly fried hot falafel patties with pickles and tahina.',
    basePrice: 0.500
  },
  {
    id: 'box_eggplant',
    categoryId: 'arabic_breakfast_select',
    name: 'Eggplant BOX',
    nameAr: 'بوكس باذنجان مقلي',
    description: 'Golden fried eggplant rounds with light sea salt and lemon sprinkle.',
    basePrice: 0.500
  },
  {
    id: 'box_cauliflower',
    categoryId: 'arabic_breakfast_select',
    name: 'Cauliflower BOX',
    nameAr: 'بوكس زهرة (قرنبيط) مقلية',
    description: 'Crisp fried cauliflower florets served with tahina.',
    basePrice: 0.500
  },
  {
    id: 'box_potato_chips',
    categoryId: 'arabic_breakfast_select',
    name: 'Potato Chips BOX',
    nameAr: 'بوكس بطاطا شيبس مقلية',
    description: 'Freshly fried hot and crispy potato wedges and chips.',
    basePrice: 0.500
  },
  {
    id: 'box_halloumi',
    categoryId: 'arabic_breakfast_select',
    name: 'Halloumi BOX',
    nameAr: 'بوكس جبنة حلوم مشوية',
    description: 'Tender grilled Cypriot halloumi cheese slices with mint garnish.',
    basePrice: 0.750
  },
  {
    id: 'box_hamsa_halloumi',
    categoryId: 'arabic_breakfast_select',
    name: 'Hamsa Halloumi BOX',
    nameAr: 'بوكس حمسة حلوم كويتية',
    description: 'Kuwaiti style sauteed halloumi with cherry tomatoes, onions, and spices.',
    basePrice: 0.750
  },
  {
    id: 'box_boiled_egg',
    categoryId: 'arabic_breakfast_select',
    name: 'Boiled Egg BOX',
    nameAr: 'بوكس بيض مسلوق',
    description: 'Fresh hard boiled eggs seasoned with black pepper and cumin.',
    basePrice: 0.500,
    extras: [
      { id: 'with_cheese', name: 'With Kraft Cheese', price: 0.100 }
    ]
  },
  {
    id: 'box_fried_egg',
    categoryId: 'arabic_breakfast_select',
    name: 'Fried Egg BOX',
    nameAr: 'بوكس بيض عيون مقلي',
    description: 'Fresh farm eggs fried in clarified butter or olive oil.',
    basePrice: 0.500,
    extras: [
      { id: 'with_cheese', name: 'With Kraft Cheese', price: 0.100 }
    ]
  },
  {
    id: 'box_omelette',
    categoryId: 'arabic_breakfast_select',
    name: 'Omelette BOX',
    nameAr: 'بوكس أومليت بيض بالخضار',
    description: 'Savory fluffy omelette seasoned with onions, parsley, and herbs.',
    basePrice: 0.500,
    extras: [
      { id: 'with_cheese', name: 'With Kraft Cheese', price: 0.100 }
    ]
  },
  {
    id: 'box_shakshuka',
    categoryId: 'arabic_breakfast_select',
    name: 'Shakshuka BOX',
    nameAr: 'بوكس شكشوكة كويتية أصلية',
    description: 'Simmered tomato, sweet pepper, and poached egg stew.',
    basePrice: 0.600,
    extras: [
      { id: 'with_cheese', name: 'With Kraft Cheese', price: 0.100 }
    ]
  },
  {
    id: 'box_hotdog',
    categoryId: 'arabic_breakfast_select',
    name: 'Hotdog BOX',
    nameAr: 'بوكس هوت دوج مشوي',
    description: 'Sliced grilled beef franks sauteed with bell peppers and onions.',
    basePrice: 0.750
  },
  {
    id: 'box_foul',
    categoryId: 'arabic_breakfast_select',
    name: 'Foul Mudammas BOX',
    nameAr: 'بوكس فول مدمس بالزيت والكمون',
    description: 'Slow-simmered fava beans with garlic, cumin, lemon, and extra virgin olive oil.',
    basePrice: 0.500
  },
  {
    id: 'box_salad',
    categoryId: 'arabic_breakfast_select',
    name: 'Salad BOX',
    nameAr: 'بوكس سلطة خضراء طازجة',
    description: 'Crisp diced cucumber, tomato, mint, lettuce, and lemon dressing.',
    basePrice: 0.500
  },
  {
    id: 'box_hummus',
    categoryId: 'arabic_breakfast_select',
    name: 'Hummus BOX',
    nameAr: 'بوكس حمص ناعم بالطحينة',
    description: 'Smooth blended chickpeas, sesame tahina, lemon juice, and olive oil drizzle.',
    basePrice: 0.600
  },
  {
    id: 'box_mix_cheese',
    categoryId: 'arabic_breakfast_select',
    name: 'Mix Cheese BOX',
    nameAr: 'بوكس أجبان مشكلة',
    description: 'Assorted white, yellow, and cheddar cheese cubes with black seeds.',
    basePrice: 0.600
  },
  {
    id: 'box_white_cheese',
    categoryId: 'arabic_breakfast_select',
    name: 'White Cheese BOX',
    nameAr: 'بوكس جبنة بيضاء نابلسية',
    description: 'Traditional brined white cheese with fresh mint and olive oil.',
    basePrice: 0.600
  },
  {
    id: 'box_labane_zathar',
    categoryId: 'arabic_breakfast_select',
    name: 'Labane & Zathar BOX',
    nameAr: 'بوكس لبنة بلدية بالزعتر',
    description: 'Creamy artisanal labneh swirled with thyme herbs and virgin olive oil.',
    basePrice: 0.600
  },
  {
    id: 'box_jam_cream',
    categoryId: 'arabic_breakfast_select',
    name: 'Jam-Cream BOX',
    nameAr: 'بوكس قيمر ومربى',
    description: 'Thick Arabic clotted cream (Geymar) with sweet strawberry fruit jam.',
    basePrice: 0.750
  },
  {
    id: 'box_honey_cream',
    categoryId: 'arabic_breakfast_select',
    name: 'Honey-Cream BOX',
    nameAr: 'بوكس قيمر وعسل سدر',
    description: 'Rich thick clotted cream drizzled with pure golden honey.',
    basePrice: 1.250
  },
  {
    id: 'box_smoked_turkey',
    categoryId: 'arabic_breakfast_select',
    name: 'Smoked Turkey BOX',
    nameAr: 'بوكس تركي مدخن مقطع',
    description: 'Sliced delicate smoked turkey breast portions.',
    basePrice: 0.750
  },
  {
    id: 'box_mortadella',
    categoryId: 'arabic_breakfast_select',
    name: 'Mortadella BOX',
    nameAr: 'بوكس مورتديلا بقري فاخرة',
    description: 'Fine seasoned beef mortadella cold cuts.',
    basePrice: 0.750
  },
  {
    id: 'bread_white_kobus',
    categoryId: 'arabic_breakfast_select',
    name: 'White Kobus (Bread Pack)',
    nameAr: 'خبز كويت أبيض طازج',
    description: 'Freshly baked traditional white Kuwaiti flatbreads (pack of 5).',
    basePrice: 0.050
  },
  {
    id: 'bread_brown_kobus',
    categoryId: 'arabic_breakfast_select',
    name: 'Brown Kobus (Bread Pack)',
    nameAr: 'خبز كويت أسمر نخالة',
    description: 'Healthy whole wheat baked Kuwaiti flatbreads (pack of 5).',
    basePrice: 0.075
  },

  // ================= CATEGORY 4: ARABIC BREAKFAST PACKAGES (2 items) =================
  {
    id: 'pkg_arabic_7500',
    categoryId: 'arabic_breakfast_packages',
    name: 'Arabic Breakfast 7.500 KD Package',
    nameAr: 'باقة الفطور العربي 7.500 د.ك (14 صنف)',
    description: 'Hearty refinery shift feast with 14 included items. Any removed item is dynamically discounted!',
    basePrice: 7.500,
    image: '/src/assets/images/Maoun.jpg',
    isPackage: true,
    packageItemCount: 14,
    extras: packageExtras,
    removals: [
      { id: 'rem_falafel', name: 'Falafel BOX', discount: 0.500 },
      { id: 'rem_eggplant', name: 'Eggplant BOX', discount: 0.500 },
      { id: 'rem_cauliflower', name: 'Cauliflower BOX', discount: 0.500 },
      { id: 'rem_chips', name: 'Potato Chips BOX', discount: 0.500 },
      { id: 'rem_boiled_egg', name: 'Boiled Egg BOX', discount: 0.500 },
      { id: 'rem_omelette', name: 'Omelette BOX', discount: 0.500 },
      { id: 'rem_foul', name: 'Foul Mudammas BOX', discount: 0.500 },
      { id: 'rem_salad', name: 'Salad BOX', discount: 0.500 },
      { id: 'rem_hummus', name: 'Hummus BOX', discount: 0.600 },
      { id: 'rem_mix_cheese', name: 'Mix Cheese BOX', discount: 0.600 },
      { id: 'rem_white_cheese', name: 'White Cheese BOX', discount: 0.600 },
      { id: 'rem_labane', name: 'Labane & Zathar BOX', discount: 0.600 },
      { id: 'rem_jam_cream', name: 'Jam-Cream BOX', discount: 0.750 }
    ]
  },
  {
    id: 'pkg_arabic_10000',
    categoryId: 'arabic_breakfast_packages',
    name: 'Arabic Breakfast 10.000 KD Package',
    nameAr: 'باقة الفطور العربي الملكية 10.000 د.ك (18 صنف)',
    description: 'Grand corporate executive breakfast platter containing 18 dishes. Any removed item is dynamically discounted!',
    basePrice: 10.000,
    image: '/src/assets/images/Maoun.jpg',
    isPackage: true,
    packageItemCount: 18,
    extras: packageExtras,
    removals: [
      { id: 'rem_falafel', name: 'Falafel BOX', discount: 0.500 },
      { id: 'rem_eggplant', name: 'Eggplant BOX', discount: 0.500 },
      { id: 'rem_cauliflower', name: 'Cauliflower BOX', discount: 0.500 },
      { id: 'rem_chips', name: 'Potato Chips BOX', discount: 0.500 },
      { id: 'rem_fried_egg', name: 'Fried Egg BOX', discount: 0.500 },
      { id: 'rem_boiled_egg', name: 'Boiled Egg BOX', discount: 0.500 },
      { id: 'rem_shakshuka', name: 'Shakshuka BOX', discount: 0.600 },
      { id: 'rem_foul', name: 'Foul Mudammas BOX', discount: 0.500 },
      { id: 'rem_halloumi', name: 'Halloumi BOX', discount: 0.750 },
      { id: 'rem_hotdog', name: 'Hotdog BOX', discount: 0.750 },
      { id: 'rem_salad', name: 'Salad BOX', discount: 0.500 },
      { id: 'rem_hummus', name: 'Hummus BOX', discount: 0.600 },
      { id: 'rem_mix_cheese', name: 'Mix Cheese BOX', discount: 0.600 },
      { id: 'rem_white_cheese', name: 'White Cheese BOX', discount: 0.600 },
      { id: 'rem_labane', name: 'Labane & Zathar BOX', discount: 0.600 },
      { id: 'rem_jam_cream', name: 'Jam-Cream BOX', discount: 0.750 }
    ]
  },


];

// Initial mock orders to populate live Kitchen Operations Portal immediately
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1001',
    orderNumber: 'MAB-1042',
    customerName: 'Eng. Ahmad Al-Kandari',
    employeeNumber: 'KNPC-78210',
    deliveryLocation: 'Operations Control Center (OCC)',
    mobileNumber: '99881234',
    items: [
      {
        cartId: 'c1',
        menuItem: INITIAL_MENU_ITEMS.find(i => i.id === 'sw_falafel')!,
        quantity: 3,
        selectedBread: { id: 'saj_bread', name: 'Saj Bread', priceDelta: 0.050 },
        selectedExtras: [{ id: 'daqoos', name: 'Spicy Kuwaiti Daqoos', price: 0.000 }],
        selectedRemovals: [{ id: 'no_potato', name: 'No Potato', discount: 0 }],
        unitPrice: 0.150,
        totalPrice: 0.450
      },
      {
        cartId: 'c2',
        menuItem: INITIAL_MENU_ITEMS.find(i => i.id === 'sw_omelette')!,
        quantity: 2,
        selectedBread: { id: 'samoon', name: 'Kuwaiti Samoon', priceDelta: 0.000 },
        selectedExtras: [],
        selectedRemovals: [],
        unitPrice: 0.120,
        totalPrice: 0.240
      }
    ],
    totalAmount: 0.690,
    status: 'in_kitchen',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    notes: 'Please pack in insulated thermal bag for OCC console desk.'
  },
  {
    id: 'ord_1002',
    orderNumber: 'MAB-1043',
    customerName: 'Khaled Bou-Rashed',
    employeeNumber: 'KNPC-54902',
    deliveryLocation: 'Building 101 - Head Office / Administration',
    mobileNumber: '66554411',
    items: [
      {
        cartId: 'c3',
        menuItem: INITIAL_MENU_ITEMS.find(i => i.id === 'pkg_arabic_7500')!,
        quantity: 1,
        selectedExtras: [{ id: 'ex_daqoos', name: 'Spicy Kuwaiti Daqoos (Sauce)', price: 0.250 }],
        selectedRemovals: [
          { id: 'rem_chips', name: 'Potato Chips BOX', discount: 0.500 },
          { id: 'rem_salad', name: 'Salad BOX', discount: 0.500 }
        ],
        unitPrice: 6.750,
        totalPrice: 6.750
      }
    ],
    totalAmount: 6.750,
    status: 'ready',
    createdAt: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
    notes: 'Board meeting room 2nd floor.'
  },
  {
    id: 'ord_1003',
    orderNumber: 'MAB-1044',
    customerName: 'Fatima Al-Enezi',
    employeeNumber: 'KNPC-91244',
    deliveryLocation: 'Central Laboratory & Quality Inspection',
    mobileNumber: '55112299',
    items: [
      {
        cartId: 'c4',
        menuItem: INITIAL_MENU_ITEMS.find(i => i.id === 'club_halloumi')!,
        quantity: 2,
        selectedBread: { id: 'brown_toast', name: 'Brown Toast', priceDelta: 0.000 },
        selectedExtras: [],
        selectedRemovals: [{ id: 'no_potato', name: 'No Potato', discount: 0.250 }],
        unitPrice: 1.000,
        totalPrice: 2.000
      },
      {
        cartId: 'c5',
        menuItem: INITIAL_MENU_ITEMS.find(i => i.id === 'box_hummus')!,
        quantity: 1,
        selectedExtras: [],
        selectedRemovals: [],
        unitPrice: 0.600,
        totalPrice: 0.600
      }
    ],
    totalAmount: 2.600,
    status: 'received',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    notes: 'Please include extra napkins.'
  }
];
