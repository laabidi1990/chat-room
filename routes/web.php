<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('chat');
});

Route::get('/home', 'HomeController@index')->name('home');

Route::get('chat', 'ChatController@index')->middleware('auth');

Route::group(['middleware' => ['auth']], function () {

    Route::post('send', 'ChatController@send');

    Route::post('save-to-session', 'ChatController@saveToSession');

    Route::post('get-old-messages', 'ChatController@getOldMessages');

    Route::post('clear-messages', 'ChatController@clear');

});

