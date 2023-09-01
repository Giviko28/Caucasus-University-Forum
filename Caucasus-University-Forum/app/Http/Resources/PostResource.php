<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public $preserveKeys = true;

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'author' => $this->author,
            'category' => $this->category,
            'likes' => $this->totalLikes(),
            'dislikes' => $this->totalDislikes(),
//                'comments' => $post->comments,
            'created_at' => $this->created_at->diffForHumans()
        ];
    }
}
