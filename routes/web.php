<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


//api routes
Route::prefix('api')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});

// Catch-all route for React application
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');
