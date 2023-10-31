<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\PostResourceCollection;
use App\Mail\TestMail;
use App\Models\Image;
use App\Models\Post;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Mail;
use PHPUnit\Util\Test;
use Ramsey\Uuid\Exception\UnableToBuildUuidException;

class PostController extends Controller
{
    public function create(Request $request)
    {
//test        Mail::to("chelidze.givia@gmail.com")->send(new TestMail());

        $this->authorize('create', Post::class);

        $user = $request->user();

        $data = $request->validate([
            'body' => ['required', 'max:255'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg', 'max:2048']
        ]);

        $post = Post::create([
            'body' => $data['body'],
            'user_id' => $user->id,
            'category_id' => $user->category->id
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
            'message' => 'Your post has been published',
            'data' => new PostResource($post)
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
        $posts = Post::query()->latest()->filter(request(['category', 'keyword']))->paginate(10);
        return new PostResourceCollection($posts);
//        return $posts->map(function ($post) {
//            return [
//                'id' => $post->id,
//                'body' => $post->body,
//                'author' => $post->author,
//                'category' => $post->category,
//                'likes' => $post->totalLikes(),
//                'dislikes' => $post->totalDislikes(),
////                'comments' => $post->comments,
//                'created_at' => $post->created_at->diffForHumans()
//            ];
//        });
    }

}
