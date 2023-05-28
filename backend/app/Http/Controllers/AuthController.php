<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){

        $data = $request->validated();
        
        $user = User::create([
            'name'      => $data['name'],
            'email'     => $data['email'],
            'password'  => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    public function login(LoginRequest $request){

        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!auth()->attempt($credentials, $remember)){
            return response()->json([
                'error'  => 'The provided credentials are not correct',
            ],422);
        }

        $user   = auth()->user();
        $token  = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request){
        $user = auth()->user();

        $user->currentAcessToken()->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
