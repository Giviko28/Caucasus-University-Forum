<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Like extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    // Check if the user has liked or disliked the post
    public static function getIfUserLiked(Request $request, Post $post)
    {
        return Like::query()
            ->where('user_id', $request->user()->id)
            ->where('post_id', $post->id)
            ->whereIn('is_like', [0,1])
            ->first();
    }
}
