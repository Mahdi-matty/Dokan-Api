const {Merchant, Client, Category, Product} = require ('../models')
const bcrypt = require("bcryptjs");

const sequelize = require ('../config/connection')

const clientData = [
    {
    username: `David`,
    password: `password`,
    email: `santiago1.dsrr@gmail.com`
    },
    {
    username: `Mahdi`,
    password: `password`,
    email: `mmiq69@gmail.com`
    },
    {
    username: `Morad`,
    password: `password`,
    email: `morad@gmail.com`
    },
    {
    username: `maral`,
    password: `password`,
    email: `maral@gmail.com`
    },
    {
    username: `shir`,
    password: `password`,            
    email: ` shir@gmail.com`
    },
];
for (let clientObj of clientData) {
    clientObj.password = bcrypt.hashSync(clientObj.password, 6)
};
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
        price: 1999
    },
    {
        title: 'AhmadTea',
        content: 'ahmad black tea',
        price: 6.99
    },
    {
        title: 'Samsung s23',
        content: 'samsung newest galaxy model',
        price: 1899
    },
    {
        title: 'Airpod',
        content: 'latest apple ear bud',
        price: 399
    }, 
    {
        title: 'Monster energy',
        content: 'monster energy drink',
        price: 3.99
    },
    {
        title: 'armani suit',
        content: 'black armani suit',
        price: 499
    },
    {
        title: 'mk boots',
        content: 'mk women boots',
        price: 1099
    }
]

const seedMe = async ()=>{
    await sequelize.sync({ force: false });
    const dbClients = await Client.bulkCreate(clientData);
    const dbMerchants = await Merchant.bulkCreate(merchantData);
    const dbCategory = await Category.bulkCreate(categoryData);
    const dbProducts= await Product.bulkCreate(productData);


    await dbMerchants[0].addProducts([0, 2, 3]); 
    await dbMerchants[1].addProducts([1, 4, 5, 6]); 
    await dbCategory[0].addProducts([2]);
    await dbCategory[1].addProducts([0]);
    await dbCategory[2].addProducts([3]);
    await dbCategory[3].addProducts([5]);
    await dbCategory[4].addProducts([6]);
    await dbCategory[5].addProducts([1]);
    await dbCategory[6].addProducts([4]);
    


    console.log(`Seeding completed`);
    process.exit(0)
}

seedMe();