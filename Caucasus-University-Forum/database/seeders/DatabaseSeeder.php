<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $schools = ['CSB', 'CSL', 'CSM', 'CST', 'CSA', 'CSG', 'CSH', 'CTS', 'CMS', 'CSE', 'CES'];
        foreach($schools as $index => $school) {
            Category::factory()->create([
                'name' => $school,
                'id' => $index+1
            ]);
        }
        Post::factory(100)->create();
    }
}
