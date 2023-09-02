<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class LikeController extends Controller
{
    public function like(Request $request, Post $post)
    {
        $like = Like::getIfUserLiked($request, $post);

        $likeInstance = new Like([
            'user_id' => $request->user()->id,
            'post_id' => $post->id,
            'is_like' => 1
        ]);

        if (!$like) {
            // Shevqmnat laiqi tu ar arsebobs
            $likeInstance->save();
        } else {
             // gavaketot unlike tu dalaiqebulia, da tu dadislike-ebulia mashin dislike wavshalot da mere davalaiqot
            if($like->is_like === 1) {$like->delete();}
            else {$like->delete(); $likeInstance->save();}
        }

    }
    public function dislike(Request $request, Post $post)
    {
        $like = Like::getIfUserLiked($request, $post);

        $dislikeInstance = new Like([
            'user_id' => $request->user()->id,
            'post_id' => $post->id,
            'is_like' => 0
        ]);

        if (!$like) {
            // Shevqmnat dislaiqi tu ar arsebobs
            $dislikeInstance->save();
        } else {
            // gavaketot un-dislike
            if($like->is_like === 0) {$like->delete();}
            else {$like->delete(); $dislikeInstance->save();}
        }

    }
}
