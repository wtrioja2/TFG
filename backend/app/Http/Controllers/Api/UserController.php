<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return UserCollection
     */
    public function index()
    {
        return new UserCollection(User::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Create the validator
        $validator = Validator::make($request->all(),[
            'first_name' => ['required'],
            'last_name' => ['required'],
            'email' => ['required','email', Rule::unique('users', 'email')],
            'password' => ['required'],
            'rol' => 'required|in:atleta,entrenador,admin'
        ]);

        // Block or catch any validation failure if there are any
        if ($validator->fails()){
            return response()->json([
                'message' => 'There are some fields that are required!',
                'errors' => $validator->errors(),
            ]);
        }

        // Add hash password to the request data
        $requestData = array_merge($request->all(),[
            'password' => Hash::make($request->password),
        ]);

        // Create user
        $user = User::create($requestData);

        return response()->json([
            'data' => $user,
            'message' => 'Sucessfully added the user!'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        // Count the requests
        if(count($request->all())< 1){
            return $this->displayMessage('Pass at least one field value in the request');
        }
        // Initializa reques data variable
        $requestData = [];

        // If not empty, add to the request data
        if (!empty($request->first_name)){
            $requestData['first_name'] = $request->first_name;
        }
        if (!empty($request->last_name)){
            $requestData['last_name'] = $request->last_name;
        }
        if (!empty($request->email)){
            $requestData['email'] = $request->email;
        }
        if (!empty($request->password)){
            $requestData['password'] = Hash::make($request->password);
        }
        if (!empty($request->rol)){
            $requestData['rol'] = $request->rol;
        }

        // Update the record
        $data = tap(DB::table('users')->where('id', $user->id))
            ->update($requestData)
            ->first();

        return response()->json([
            'data' => $data,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        // Delete the user
        User::where('id', $user->id)->delete();

        return $this->displayMessage('The user was successfully deleted!', 200, 'Status');

    }
}
