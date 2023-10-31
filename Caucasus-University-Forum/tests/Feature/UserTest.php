<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    private function createUser()
    {
        return User::factory()->create();
    }

//    public function test_user_registration()
//    {
//        $user = $this->createUser();
//        $response = $this->post('/signup', array($user));
//        $response->assertStatus(201);
//    }
//    public function test_login_user()
//    {
//        $credentials = ['email' => $user->email, 'password' => $user->password];
//        $response = $this->post('api/login', $credentials);
//        $response->assertStatus(200);
////        $credentials = ['email' => $user['email'], 'password' => $user['password']];
////        $this->assertTrue(User::attempt($credentials));
//    }
}
