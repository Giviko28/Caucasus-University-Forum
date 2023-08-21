<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function updatePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048']
        ]);

        $user = Auth::user();

        $profilePicturePath = $request->file('profile_picture')->store('profile_pictures', 'public');

        $user->update([
            'profile_picture' => $profilePicturePath
        ]);

        return response([
            'message' => 'Profile uploaded succesfully'
        ], 200);
    }
}
