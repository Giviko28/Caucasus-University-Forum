<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $with = ['author', 'category', 'images',];
    protected $guarded = [];

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['category'])) {
            $query->where('category_id', $filters['category']);
        }
        if (isset($filters['keyword'])) {
            $query->where(fn($query) =>
            $query->where('body', 'like', '%' . $filters['keyword'] . '%')
                ->orWhereHas('author', fn($query) =>
                $query->where('name', 'like', '%' . $filters['keyword'] . '%' )));
        }
    }
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function images()
    {
        return $this->hasMany(Image::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public function totalLikes()
    {
        return $this->likes()->where('is_like', 1)->count();
    }
    public function totalDislikes()
    {
        return $this->likes()->where('is_like', 0)->count();
    }
}
