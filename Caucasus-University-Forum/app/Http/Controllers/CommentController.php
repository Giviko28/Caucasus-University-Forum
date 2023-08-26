<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function create(Request $request, Post $post)
    {
        $data = $request->validate([
           'body' => ['required', 'max:255', 'string'],
        ]);

        $user = $request->user();

        Comment::create([
            'body' => $data['body'],
            'user_id' => $user->id,
            'post_id' => $post->id
        ]);

        return response([
            'message' => 'Comment submitted'
        ], 200);
    }
//    public function show(Post $post)
//    {
//        return Comment::where('post_id', '=', $post->id);
//    }
}
