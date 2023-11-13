<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::group(['prefix' => '/post'], function() {
        Route::post('', [PostController::class, 'create']);
        Route::delete('/{post}', [PostController::class, 'delete']);
        Route::post('/like/{post}', [LikeController::class, 'like']);
//        Route::post('/like/isLiked/{post}', [LikeController::class, 'getIsLiked']);
        Route::post('/dislike/{post}', [LikeController::class, 'dislike']);
    });

    Route::get('/comments/{post}', [CommentController::class, 'show']);
    Route::post('/comment/{post}', [CommentController::class, 'create']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
//    Route::post('/post', [PostController::class, 'create']);
//    Route::post('/post/delete/{post}', [PostController::class, 'delete']);
    Route::post('/logout', [AuthController::class, 'logout']);
//    Route::post('/post/comment/{post}', [CommentController::class, 'create']);
//    Route::post('/post/like/{post}', [LikeController::class, 'like']);
//    Route::post('/post/dislike/{post}', [LikeController::class, 'dislike']);


    Route::post('/profile/uploadImage', [ProfileController::class, 'updatePicture']);
});


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/users',[UserController::class, 'getUsers']);

Route::get('/posts', [PostController::class, 'show']);
//Route::get('/post/{post}/comments', [CommentController::class, 'show']);
Route::get('/categories', function() {
    return Category::all();
});
