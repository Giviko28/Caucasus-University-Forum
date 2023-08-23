<?php

namespace App\Http\Controllers;

use App\Models\Image;
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
            'images.*' => ['image', 'mimes:jpeg,png,jpg', 'max:2048']
        ]);

        $post = Post::create([
            'body' => $data['body'],
            'user_id' => $user->id,
            'category_id' => rand(1,10)
        ]);

        if (isset($data['images'])) {
            foreach ($data['images'] as $image) {
                $path = $image->store('post_pictures', 'public');
                Image::create([
                    'path' => $path,
                    'post_id' => $post->id
                ]);
            }
        }

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
        $posts = Post::query()->latest()->filter(request(['category', 'keyword']))->get();
        return $posts->map(function ($post) {
            return [
                'id' => $post->id,
                'body' => $post->body,
                'author' => $post->author,
                'category' => $post->category,
                'created_at' => $post->created_at->diffForHumans()
            ];
        });
    }

}
