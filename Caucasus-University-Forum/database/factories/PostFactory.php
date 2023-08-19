<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory()->create()->id,
            'category_id' => Category::factory()->create()->id,
            'body' => $this->faker->paragraph(2),
            'likes' => $this->faker->numberBetween(10, 200),
            'dislikes' => $this->faker->numberBetween(1,30)
        ];
    }
}
