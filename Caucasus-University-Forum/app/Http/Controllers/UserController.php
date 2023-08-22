<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
//    public function currentUser(Request $request)
//    {
//        return $request->user();
//    }
    public function getUsers(Request $request)
    {
        $keyword = $request->query('keyword');
        if (isset($keyword)) {
            return User::query()->where('name', 'like', '%' . $keyword . '%')->with('category')->get();
        }

    }
}
