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
    public function show(Post $post)
    {
        $comments = Comment::where('post_id', '=', $post->id)->get();
        return $comments->map(function ($comment) {
            return [
                'id' => $comment->id,
                'body' => $comment->body,
                'user_id' => $comment->user_id,
                'author' => $comment->author,
                'post_id' => $comment->post_id,
                'created_at' => $comment->created_at->diffForHumans()
            ];
        });
    }
}
