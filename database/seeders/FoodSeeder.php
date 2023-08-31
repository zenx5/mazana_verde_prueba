<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Food;

class FoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Food::create([
            'name' => 'Pizza',
            'description' => 'Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients which is then baked at a high temperature, traditionally in a wood-fired oven.',
            'price' => 10.99,
            'image' => 'https://loremflickr.com/640/480/Pizza',
        ])->create([
            'name' => 'Sushi',
            'description' => 'Sushi is a traditional Japanese dish of prepared vinegared rice, usually with some sugar and salt, accompanying a variety of ingredients, such as seafood, often raw, and vegetables.',
            'price' => 12.99,
            'image' => 'https://loremflickr.com/640/480/Sushi',
        ])->create([
            'name' => 'Burger',
            'description' => 'A hamburger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
            'price' => 8.99,
            'image' => 'https://loremflickr.com/640/480/Burger',
        ])->create([
            'name' => 'Pasta',
            'description' => 'Pasta is a type of food typically made from an unleavened dough of wheat flour mixed with water or eggs, and formed into sheets or other shapes, then cooked by boiling or baking.',
            'price' => 9.99,
            'image' => 'https://loremflickr.com/640/480/Pasta',
        ])->create([
            'name' => 'Salad',
            'description' => 'A salad is a dish consisting of pieces of food in a mixture, with at least one raw ingredient. It is often dressed, and is typically served at room temperature or chilled, though some can be served warm.',
            'price' => 7.99,
            'image' => 'https://loremflickr.com/640/480/Salad',
        ]);

    }
}
