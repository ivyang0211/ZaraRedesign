// js/products_data.js

const ALL_PRODUCTS_DATA = [
    // --- Products from home.html ---
    {
        id: 'clothes1',
        name: "Flowing Wide-leg Trousers",
        price: 749000,
        category: "WOMAN",
        image: "assets/clothes1.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "green", label: "GREEN"}, {code: "blue", label: "BLUE"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "These elegant flowing wide-leg trousers offer ultimate comfort and style for any occasion. Made from a breathable blend, perfect for both casual and formal wear.",
        material: "Linen Blend",
        care: "Machine wash cold",
        origin: "Made in Turkey"
    },
    {
        id: 'clothes2',
        name: "Beach Party Dress",
        price: 1099900,
        category: "WOMAN",
        image: "assets/clothes2.jpg",
        colors: [{code: "blue", label: "BLUE"}, {code: "pink", label: "PINK"}, {code: "yellow", label: "YELLOW"}, {code: "purple", label: "PURPLE"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "A vibrant and flowy dress, perfect for beach parties or summer outings. Lightweight fabric ensures maximum comfort even on the hottest days.",
        material: "Viscose",
        care: "Hand wash only",
        origin: "Made in India"
    },
    {
        id: 'clothes3',
        name: "Pleated Trousers",
        price: 799900,
        category: "WOMAN",
        image: "assets/clothes3.jpg",
        colors: [{code: "white", label: "WHITE"}, {code: "black", label: "BLACK"}, {code: "gray", label: "GRAY"}, {code: "beige", label: "BEIGE"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Classic pleated trousers offering a sophisticated silhouette. Ideal for office wear or a chic casual look. Features a comfortable high-waist design.",
        material: "Polyester Blend",
        care: "Dry clean recommended",
        origin: "Made in Spain"
    },
    {
        id: 'clothes4',
        name: "A-Line Trousers",
        price: 749900,
        category: "WOMAN",
        image: "assets/clothes4.jpg",
        colors: [{code: "brown", label: "BROWN"}, {code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "navy", label: "NAVY"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Comfortable A-line trousers with a modern cut. Flattering on all body types, these trousers combine elegance with everyday practicality.",
        material: "Cotton Elastane",
        care: "Machine wash cold",
        origin: "Made in Vietnam"
    },
    {
        id: 'clothes5',
        name: "Polkadots Pants",
        price: 559900,
        category: "WOMAN",
        image: "assets/clothes5.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "red", label: "RED"}, {code: "blue", label: "BLUE"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Playful polkadot pants that add a touch of fun to your wardrobe. Soft fabric ensures all-day comfort.",
        material: "Viscose",
        care: "Machine wash delicate",
        origin: "Made in China"
    },
    {
        id: 'clothes6',
        name: "Polkadots Halter Top",
        price: 350900,
        category: "WOMAN",
        image: "assets/clothes6.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "pink", label: "PINK"}, {code: "green", label: "GREEN"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Chic halter top featuring a charming polkadot pattern. Perfect for summer days or layering under a jacket.",
        material: "Cotton",
        care: "Machine wash cold",
        origin: "Made in India"
    },
    {
        id: 'clothes7',
        name: "Contrast Topstitching Trousers",
        price: 999900,
        category: "WOMAN",
        image: "assets/clothes7.jpg",
        colors: [{code: "gray", label: "GRAY"}, {code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "red", label: "RED"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Modern trousers with distinctive contrast topstitching. A unique piece that stands out, offering both style and durability.",
        material: "Denim",
        care: "Machine wash inside out",
        origin: "Made in Bangladesh"
    },
    {
        id: 'clothes8',
        name: "Stripped Sequin Trousers",
        price: 999900,
        category: "WOMAN",
        image: "assets/clothes8.jpg",
        colors: [{code: "white", label: "WHITE"}, {code: "black", label: "BLACK"}, {code: "gold", label: "GOLD"}, {code: "silver", label: "SILVER"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Dazzling stripped sequin trousers perfect for a night out. Catch the light with every move, making a bold fashion statement.",
        material: "Polyester Sequins",
        care: "Hand wash carefully",
        origin: "Made in China"
    },
    {
        id: 'clothes9',
        name: "Linen Blend Wide-leg Trousers",
        price: 799900,
        category: "WOMAN",
        image: "assets/clothes9.jpg",
        colors: [{code: "beige", label: "BEIGE"}, {code: "white", label: "WHITE"}, {code: "black", label: "BLACK"}, {code: "navy", label: "NAVY"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Lightweight and breathable linen blend trousers with a wide-leg cut. Ideal for warm weather, offering a relaxed yet polished look.",
        material: "Linen Blend",
        care: "Machine wash gentle",
        origin: "Made in Portugal"
    },

    // --- Products from product.html (SWEATSHIRTS category) ---
    {
        id: 'clothes16',
        name: "Basic Sweatshirt",
        price: 599900,
        category: "WOMAN", // Assuming SWEATSHIRTS is under WOMAN for now
        image: "assets/clothes16.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "navy", label: "NAVY"}, {code: "grey", label: "GREY"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "A comfortable and versatile basic sweatshirt. Perfect for everyday wear, offering warmth and style.",
        material: "100% Cotton Fleece",
        care: "Machine wash cold",
        origin: "Made in Bangladesh"
    },
    {
        id: 'clothes17',
        name: "Oversized Hoodie",
        price: 649900,
        category: "WOMAN",
        image: "assets/clothes17.jpg",
        colors: [{code: "beige", label: "BEIGE"}, {code: "black", label: "BLACK"}, {code: "pink", label: "PINK"}, {code: "blue", label: "BLUE"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Trendy oversized hoodie for a relaxed and stylish look. Features a soft interior and adjustable drawstrings.",
        material: "Cotton Blend",
        care: "Machine wash cold",
        origin: "Made in China"
    },
    {
        id: 'clothes18',
        name: "Cropped Sweatshirt",
        price: 499900,
        category: "WOMAN",
        image: "assets/clothes18.jpg",
        colors: [{code: "green", label: "GREEN"}, {code: "yellow", label: "YELLOW"}, {code: "white", label: "WHITE"}, {code: "black", label: "BLACK"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Fashionable cropped sweatshirt, perfect for pairing with high-waisted bottoms. Offers a modern and comfortable fit.",
        material: "Cotton",
        care: "Machine wash cold",
        origin: "Made in Turkey"
    },
    {
        id: 'clothes19',
        name: "Printed Sweatshirt",
        price: 799900,
        category: "WOMAN",
        image: "assets/clothes19.jpg",
        colors: [{code: "red", label: "RED"}, {code: "black", label: "BLACK"}, {code: "grey", label: "GREY"}, {code: "brown", label: "BROWN"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "A unique sweatshirt featuring a captivating print. Express your style with this comfortable and eye-catching piece.",
        material: "Polyester Cotton Blend",
        care: "Machine wash delicate",
        origin: "Made in Portugal"
    },
    {
        id: 'clothes20',
        name: "Crew Neck Sweatshirt",
        price: 549900,
        category: "WOMAN",
        image: "assets/clothes20.jpg",
        colors: [{code: "purple", label: "PURPLE"}, {code: "white", label: "WHITE"}, {code: "black", label: "BLACK"}, {code: "blue", label: "BLUE"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Classic crew neck sweatshirt, a timeless addition to any casual wardrobe. Soft and cozy for all-day comfort.",
        material: "Cotton",
        care: "Machine wash cold",
        origin: "Made in Vietnam"
    },
    {
        id: 'clothes21',
        name: "Zip-Up Hoodie",
        price: 699900,
        category: "WOMAN",
        image: "assets/clothes21.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "pink", label: "PINK"}, {code: "grey", label: "GREY"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Practical and stylish zip-up hoodie, perfect for layering. Features a comfortable fit and a full-length zipper.",
        material: "Cotton Blend",
        care: "Machine wash cold",
        origin: "Made in India"
    },
    {
        id: 'clothes22',
        name: "Embroidered Sweatshirt",
        price: 749900,
        category: "WOMAN",
        image: "assets/clothes22.jpg",
        colors: [{code: "navy", label: "NAVY"}, {code: "red", label: "RED"}, {code: "white", label: "WHITE"}, {code: "black", label: "BLACK"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Soft sweatshirt adorned with intricate embroidery, adding a touch of elegance to a casual piece. Ideal for a refined everyday look.",
        material: "Cotton Terry",
        care: "Machine wash delicate",
        origin: "Made in Portugal"
    },
    {
        id: 'clothes23',
        name: "Distressed Sweatshirt",
        price: 629900,
        category: "WOMAN",
        image: "assets/clothes23.jpg",
        colors: [{code: "green", label: "GREEN"}, {code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "yellow", label: "YELLOW"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Edgy distressed sweatshirt for a cool and contemporary vibe. Features unique worn-out details for a lived-in feel.",
        material: "Cotton",
        care: "Hand wash",
        origin: "Made in Bangladesh"
    },
    {
        id: 'clothes24',
        name: "Collared Sweatshirt",
        price: 589900,
        category: "WOMAN",
        image: "assets/clothes24.jpg",
        colors: [{code: "grey", label: "GREY"}, {code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "red", label: "RED"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "A sophisticated sweatshirt with a classic collar. Blends casual comfort with a refined aesthetic, suitable for various settings.",
        material: "Cotton Pique",
        care: "Machine wash cold",
        origin: "Made in Vietnam"
    },
    {
        id: 'clothes25',
        name: "Half-Zip Sweatshirt",
        price: 729900,
        category: "WOMAN",
        image: "assets/clothes25.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "pink", label: "PINK"}, {code: "beige", label: "BEIGE"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Versatile half-zip sweatshirt, perfect for layering and adjusting to temperature changes. Features a high neck and soft interior.",
        material: "Polyester Cotton Blend",
        care: "Machine wash gentle",
        origin: "Made in China"
    },
    {
        id: 'clothes26',
        name: "Graphic Sweatshirt",
        price: 679900,
        category: "WOMAN",
        image: "assets/clothes26.jpg",
        colors: [{code: "orange", label: "ORANGE"}, {code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "blue", label: "BLUE"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Bold graphic sweatshirt that adds a pop of personality to your casual look. Comfortable and eye-catching.",
        material: "Cotton",
        care: "Machine wash cold",
        origin: "Made in Bangladesh"
    },
    {
        id: 'clothes27',
        name: "Sporty Sweatshirt",
        price: 599900,
        category: "WOMAN",
        image: "assets/clothes27.jpg",
        colors: [{code: "white", label: "WHITE"}, {code: "black", label: "BLACK"}, {code: "red", label: "RED"}, {code: "navy", label: "NAVY"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Athletic-inspired sweatshirt designed for comfort and mobility. Ideal for active lifestyles or a sporty-chic ensemble.",
        material: "Polyester Spandex",
        care: "Machine wash cold",
        origin: "Made in Vietnam"
    },
    {
        id: 'clothes28',
        name: "Vintage Feel Sweatshirt",
        price: 769900,
        category: "WOMAN",
        image: "assets/clothes28.jpg",
        colors: [{code: "green", label: "GREEN"}, {code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "brown", label: "BROWN"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "A sweatshirt with a retro aesthetic and a soft, worn-in feel. Perfect for a casual, laid-back style.",
        material: "Garment-dyed Cotton",
        care: "Machine wash cold",
        origin: "Made in Turkey"
    },
    {
        id: 'clothes29',
        name: "Luxury Blend Sweatshirt",
        price: 999900,
        category: "WOMAN",
        image: "assets/clothes29.jpg",
        colors: [{code: "grey", label: "GREY"}, {code: "black", label: "BLACK"}, {code: "purple", label: "PURPLE"}, {code: "blue", label: "BLUE"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Indulge in comfort with this luxury blend sweatshirt. Offers a premium feel and elegant drape, perfect for elevated casual wear.",
        material: "Cashmere Cotton Blend",
        care: "Dry clean only",
        origin: "Made in Italy"
    },
    {
        id: 'clothes11', // From cart.html Similar Products
        name: "Striped Midi Skirt",
        price: 699900,
        category: "WOMAN",
        image: "assets/clothes11.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "red", label: "RED"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Elegant striped midi skirt, perfect for a chic and comfortable look. Features a flowing silhouette and versatile design.",
        material: "Cotton Blend",
        care: "Machine wash cold",
        origin: "Made in Portugal"
    },
    {
        id: 'clothes12', // From cart.html Similar Products
        name: "Willow Breeze Maxi Dress",
        price: 459900,
        category: "WOMAN",
        image: "assets/clothes12.jpg",
        colors: [{code: "blue", label: "BLUE"}, {code: "green", label: "GREEN"}, {code: "yellow", label: "YELLOW"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "A light and airy maxi dress that captures the essence of summer. Its soft fabric and flowing design make it ideal for warm days.",
        material: "Viscose",
        care: "Hand wash cold",
        origin: "Made in India"
    },
    {
        id: 'clothes13', // From cart.html Similar Products
        name: "Linen Blend Jacket",
        price: 1299900,
        category: "WOMAN",
        image: "assets/clothes13.jpg",
        colors: [{code: "gray", label: "GRAY"}, {code: "black", label: "BLACK"}, {code: "beige", label: "BEIGE"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "A sophisticated jacket crafted from a breathable linen blend. Perfect for adding a touch of elegance to any outfit, suitable for transitional weather.",
        material: "Linen Blend",
        care: "Dry clean only",
        origin: "Made in Italy"
    },
    {
        id: 'clothes14', // From cart.html Similar Products
        name: "Knitted Cardigan",
        price: 899900,
        category: "WOMAN",
        image: "assets/clothes14.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "brown", label: "BROWN"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Cozy and stylish knitted cardigan, perfect for layering. Its soft texture provides warmth and a comfortable fit, ideal for cooler days.",
        material: "Acrylic Blend",
        care: "Hand wash",
        origin: "Made in China"
    },
    {
        id: 'clothes15', // From cart.html Similar Products
        name: "Satin Slip Dress",
        price: 799900,
        category: "WOMAN",
        image: "assets/clothes15.jpg",
        colors: [{code: "olive", label: "OLIVE"}, {code: "navy", label: "NAVY"}, {code: "burgundy", label: "BURGUNDY"}],
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        description: "Luxurious satin slip dress, designed for elegance and comfort. Perfect for evening wear or as a sophisticated layering piece.",
        material: "100% Polyester Satin",
        care: "Dry clean recommended",
        origin: "Made in Vietnam"
    },
    // --- Products from catalogue-kids.html (KIDS products) ---
    {
        id: 'kids2', // Placeholder as "Flowing Wide-leg Trousers" in kids-catalogue html is clearly a WOMAN product image
        name: "Kids Floral Dress",
        price: 349900,
        category: "KIDS",
        image: "assets/kids2.jpg",
        colors: [{code: "pink", label: "PINK"}, {code: "blue", label: "BLUE"}, {code: "white", label: "WHITE"}],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
        description: "A delightful floral dress for kids, made from soft, breathable cotton. Perfect for playtime and special occasions.",
        material: "100% Cotton",
        care: "Machine wash cold",
        origin: "Made in India"
    },
    {
        id: 'kids11',
        name: "Kids Striped T-Shirt",
        price: 189900,
        category: "KIDS",
        image: "assets/kids11.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "red", label: "RED"}],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
        description: "Classic striped t-shirt for kids, comfortable and durable for everyday adventures. Made with soft cotton for sensitive skin.",
        material: "100% Cotton",
        care: "Machine wash cold",
        origin: "Made in Bangladesh"
    },
    {
        id: 'kids12',
        name: "Kids Denim Shorts",
        price: 279900,
        category: "KIDS",
        image: "assets/kids12.jpg",
        colors: [{code: "blue", label: "BLUE"}, {code: "green", label: "GREEN"}, {code: "yellow", label: "YELLOW"}],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
        description: "Durable denim shorts for kids, perfect for play. Features an adjustable waistband for a comfortable fit.",
        material: "Denim",
        care: "Machine wash cold",
        origin: "Made in Pakistan"
    },
    {
        id: 'kids13',
        name: "Kids Hooded Jacket",
        price: 529900,
        category: "KIDS",
        image: "assets/kids13.jpg",
        colors: [{code: "gray", label: "GRAY"}, {code: "black", label: "BLACK"}, {code: "beige", label: "BEIGE"}],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
        description: "Warm hooded jacket for kids, ideal for cooler weather. Soft lining provides extra comfort and warmth.",
        material: "Polyester Fleece",
        care: "Machine wash cold",
        origin: "Made in China"
    },
    {
        id: 'kids14',
        name: "Kids Animal Print Leggings",
        price: 219900,
        category: "KIDS",
        image: "assets/kids14.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "brown", label: "BROWN"}],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
        description: "Fun animal print leggings for kids, stretchy and comfortable for all activities. A stylish addition to any playful wardrobe.",
        material: "Cotton Elastane",
        care: "Machine wash cold",
        origin: "Made in Turkey"
    },
    {
        id: 'kids7', // Assuming this is also a kids product from the reference
        name: "Kids Graphic Hoodie",
        price: 499900,
        category: "KIDS",
        image: "assets/kids7.jpg",
        colors: [{code: "olive", label: "OLIVE"}, {code: "navy", label: "NAVY"}, {code: "burgundy", label: "BURGUNDY"}],
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
        description: "Cool graphic hoodie for kids, perfect for a casual and trendy look. Soft and warm for everyday wear.",
        material: "Cotton Blend",
        care: "Machine wash cold",
        origin: "Made in Vietnam"
    },

    // --- Products from catalogue-men.html (MAN products) ---
    {
        id: 'clothes33',
        name: "Essential Cotton Crewneck Tee",
        price: 299900,
        category: "MAN",
        image: "assets/clothes33.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "green", label: "GREEN"}, {code: "blue", label: "BLUE"}],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "A versatile essential crewneck tee for men, made from soft, breathable cotton. Perfect for layering or wearing on its own.",
        material: "100% Cotton",
        care: "Machine wash cold",
        origin: "Made in Portugal"
    },
    {
        id: 'clothes41', // From men's similar product section
        name: "Black Knit Coat",
        price: 699900,
        category: "MAN",
        image: "assets/clothes41.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "red", label: "RED"}],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Stylish black knit coat, a perfect addition for cooler weather. Offers a comfortable fit and a sophisticated look.",
        material: "Wool Blend",
        care: "Dry clean only",
        origin: "Made in Italy"
    },
    {
        id: 'clothes32', // From men's similar product section
        name: "Linen Stripes Shirt",
        price: 459900,
        category: "MAN",
        image: "assets/clothes32.jpg",
        colors: [{code: "blue", label: "BLUE"}, {code: "green", label: "GREEN"}, {code: "yellow", label: "YELLOW"}],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Lightweight linen shirt with classic stripes, ideal for summer. Offers a relaxed fit and breathable comfort.",
        material: "Linen",
        care: "Machine wash gentle",
        origin: "Made in India"
    },
    {
        id: 'clothes37', // From men's similar product section
        name: "Men's Cargo Pants",
        price: 899900,
        category: "MAN",
        image: "assets/clothes37.jpg",
        colors: [{code: "gray", label: "GRAY"}, {code: "black", label: "BLACK"}, {code: "beige", label: "BEIGE"}],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Durable and stylish cargo pants for men, perfect for outdoor activities or a rugged casual look. Features multiple utility pockets.",
        material: "Cotton Twill",
        care: "Machine wash cold",
        origin: "Made in Bangladesh"
    },
    {
        id: 'clothes39', // From men's similar product section
        name: "Men's Denim Jacket",
        price: 1199900,
        category: "MAN",
        image: "assets/clothes39.jpg",
        colors: [{code: "black", label: "BLACK"}, {code: "white", label: "WHITE"}, {code: "brown", label: "BROWN"}],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "A classic denim jacket for men, a timeless piece that adds an edgy touch to any outfit. Durable and designed for long-lasting wear.",
        material: "100% Cotton Denim",
        care: "Machine wash cold",
        origin: "Made in Turkey"
    },
    {
        id: 'clothes30', // From men's similar product section
        name: "Ivory Office Trousers",
        price: 799900,
        category: "MAN", // Assuming this is also a men's product based on context
        image: "assets/clothes30.jpg",
        colors: [{code: "olive", label: "OLIVE"}, {code: "navy", label: "NAVY"}, {code: "burgundy", label: "BURGUNDY"}],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Sophisticated ivory office trousers for men, offering a sharp and polished look. Ideal for professional settings or smart-casual events.",
        material: "Polyester Viscose Blend",
        care: "Dry clean recommended",
        origin: "Made in Spain"
    },
];

// Export the data so it can be imported by other JS files
window.ALL_PRODUCTS_DATA = ALL_PRODUCTS_DATA;