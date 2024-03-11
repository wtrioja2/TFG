<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ComposicionCorporalCollection;
use App\Models\ComposicionCorporal;
use Illuminate\Http\Request;

class ComposicionCorporalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ComposicionCorporalCollection
     */
    public function index()
    {
        return new ComposicionCorporalCollection(ComposicionCorporal::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ComposicionCorporal $composicioncorporal)
    {
        return response()->json($composicioncorporal, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ComposicionCorporal $composicioncorporal)
    {
        ComposicionCorporal::where('id', $composicioncorporal->id)->delete();

        return $this->displayMessage('La composición corporal has sido borrada', 200, 'Status');
    }

}
