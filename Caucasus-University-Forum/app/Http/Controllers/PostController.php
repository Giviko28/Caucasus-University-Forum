<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Ramsey\Uuid\Exception\UnableToBuildUuidException;

class PostController extends Controller
{
    public function create(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'body' => ['required', 'max:255'],
        ]);

        Post::create([
            'body' => $data['body'],
            'user_id' => $user->id,
            'category_id' => rand(1,10)
        ]);

        return response([
            'message' => 'Your post has been published'
        ], 201);

    }

    public function delete(Post $post, Request $request)
    {
//        $data = $request->validate([
//            'id' => ['required']
//        ]) ;
//        $post = Post::find($data['id']);
//
//        if (!$post) {
//            return response([
//                'message' => 'Post not found'
//            ], 404);
//        }
        $this->authorize('delete', $post);

        $post->delete();

        return response([
            'message' => 'Post deleted successfully'
        ], 200);
    }
    public function show()
    {
        return Post::query()->latest()->filter(request(['category']))->get();
    }
}
