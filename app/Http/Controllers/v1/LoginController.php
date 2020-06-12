<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
       $validate = $this->validate($request,[
            'email'=>'required|exists:users',
            'password' =>'required'
        ]);

       if (!auth()->attempt($validate)){
           return response([
               'data'=>'اطلاعات صحیح نیست!'
           ]);
       }
       return auth()->user();
    }
}
