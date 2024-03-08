const {Merchant, Client, Category, Product} = require ('../models')
const bcrypt = require("bcryptjs");

const sequelize = require ('../config/connection')


const merchantData = [
    {
    username: `joe`,
    password: `password`,
    email: `joe@gmail.com`
    },
    {
    username: `shiva`,
    password: `password`,
    email: `shiva@gmail.com`
    },
];
for (let merchantObj of merchantData) {
    merchantObj.password = bcrypt.hashSync(merchantObj.password, 6)
};

const categoryData = [
        
            {
                name: 'electronics',
                sub: 'celphone'
            },
            {
                name: 'electronics',
                sub: 'computers'
            },
            {
                name: 'electronics',
                sub: 'accessory'
            },
            {
                name: 'clothing',
                sub: 'men'
            },
            {
                name: 'clothing',
                sub: 'women'
            },
            {
                name: 'fda',
                sub: 'tea'
            },
            {
                name: 'fda',
                sub: 'energydrink'
            }
        ]

const productData = [
    {
        title: 'Macbook',
        content: 'apple notebook',
        price: 1999,
        stock: 25
    },
    {
        title: 'AhmadTea',
        content: 'ahmad black tea',
        price: 6.99,
        stock: 30
    },
    {
        title: 'Samsung s23',
        content: 'samsung newest galaxy model',
        price: 1899,
        stock: 50
    },
    {
        title: 'Airpod',
        content: 'latest apple ear bud',
        price: 399,
        stock: 2
    }, 
    {
        title: 'Monster energy',
        content: 'monster energy drink',
        price: 3.99,
        stock: 5
    },
    {
        title: 'armani suit',
        content: 'black armani suit',
        price: 499,
        stock: 9
    },
    {
        title: 'mk boots',
        content: 'mk women boots',
        price: 1099,
        stock: 15
    },
    {
        title: 'earl grey tea',
        content: 'black silan tea',
        price: 10,
        stock: 15
    },
    {
        title: 'playstation 5',
        content: 'gaming console',
        price: 1099,
        stock: 15
    },
    {
        title: 'beats headphone',
        content: 'premium headphone',
        price: 499,
        stock: 15
    },
]

const seedMe = async ()=>{
    await sequelize.sync({ force: false });
    const dbMerchants = await Merchant.bulkCreate(merchantData);
    const dbCategories = await Category.bulkCreate(categoryData);
    const dbProducts= await Product.bulkCreate(productData);


    await dbCategories[0].addProducts([dbProducts[2]]); // Electronics - Cellphones
    await dbCategories[1].addProducts([dbProducts[0]]); // Electronics - Computers
    await dbCategories[1].addProducts([dbProducts[8]]); // Electronics - Computers
    await dbCategories[2].addProducts([dbProducts[3]]); // Electronics - Accessories
    await dbCategories[2].addProducts([dbProducts[9]]); // Electronics - Accessories
    await dbCategories[3].addProducts([dbProducts[6]]); // Clothing - Men
    await dbCategories[4].addProducts([dbProducts[5]]); // Clothing - Women
    await dbCategories[5].addProducts([dbProducts[1]]); // FDA - Tea
    await dbCategories[5].addProducts([dbProducts[7]]); // FDA - Tea
    await dbCategories[6].addProducts([dbProducts[4]]); // FDA - Energy Drink

    // Associate products with merchants
    await dbMerchants[0].addProducts([dbProducts[0]]);
    await dbMerchants[0].addProducts([dbProducts[2]]);
    await dbMerchants[0].addProducts([dbProducts[3]])
    await dbMerchants[0].addProducts([dbProducts[7]])
    await dbMerchants[0].addProducts([dbProducts[8]])
    await dbMerchants[0].addProducts([dbProducts[9]])
    await dbMerchants[1].addProducts([dbProducts[1], dbProducts[4], dbProducts[5], dbProducts[6]]);

    console.log(`Seeding completed`);
    process.exit(0);
};

seedMe();