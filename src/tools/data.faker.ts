import { faker } from '@faker-js/faker';

const names = [
    'Pizza',
    'Sushi',
    'Hamburguesa',
    'Enchiladas',
    'Pasta',
    'Sopa de pollo',
    'Tacos',
    'Lasagna',
    'Pad Thai',
    'Risotto',
]

const products = [...Array(10)].map(( el, index) => ({
    id: index + 1,
    name: names[index],
    description: faker.lorem.sentences(2),
    price: faker.commerce.price(10, 100, 2),
    image: faker.image.food(null,null, true),
}));


export { products }