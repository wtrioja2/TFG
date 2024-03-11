<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function index(Request $request)
    {
        // Simply delete the token from the database
        $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'You have successfully logged out!',
            ]);
    }
}