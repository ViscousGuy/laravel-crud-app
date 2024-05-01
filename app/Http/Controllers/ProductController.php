<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use App\Models\Product;

class ProductController extends Controller
{
    //show product page
    public function index() {
        $products = Product::orderBy('created-at', 'DESC')->get();
        return view('products.list', [
            'products' =>  $products
        ]);


    }

    //show create product page
    public function create() {
        return view('products.create');
    }

    //store a product in db
    public function store(Request $request) {
        $rules = [
            'name' => 'required|string|min:5',
            'sku' => 'required|string|min:3',
            'price' => 'required|numeric|min:0',
            'image' => 'required'

        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()) {
            return redirect()->route('products.create')->withInput()->withErrors($validator);
        }

        //we will store product in db
        $product = new Product();
        $product->name = $request->name;
        $product->sku = $request->sku;
        $product->price = $request->price;
        $product->description = $request->description;
        if($request->hasFile('image')) {
            //here we will store image
            $imageFile = $request->file('image'); 
            $ext = $imageFile->getClientOriginalExtension(); 
            $imageName = time().'.'.$ext; //unique image name

            //save images to products directort 
            $imageFile->move(public_path('uploads/products'), $imageName);

            //save image name in database
            $product->image = $imageName;
        }
        $product->save();



        return redirect()->route('products.index')->with('success', 'Product added successfully.');
    }

    public function edit($id){
        $product = Product::findOrFail($id);
        return view('products.edit', [
            'product' => $product
        ]);

    }

    public function update($id, Request $request) {
        $product = Product::findOrFail($id);


        $rules = [
            'name' => 'required|string|min:5',
            'sku' => 'required|string|min:3',
            'price' => 'required|numeric|min:0',
            'image' => 'required'

        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()) {
            return redirect()->route('products.edit', $product->id)->withInput()->withErrors($validator);
        }

        //we will update product in db
        $product->name = $request->name;
        $product->sku = $request->sku;
        $product->price = $request->price;
        $product->description = $request->description;
        if($request->hasFile('image')) {
            //delete old image
            File::delete(public_path('uploads/products/'.$product->image));
            //here we will update image
            $imageFile = $request->file('image'); 
            $ext = $imageFile->getClientOriginalExtension(); 
            $imageName = time().'.'.$ext; //unique image name

            //save images to products directory
            $imageFile->move(public_path('uploads/products'), $imageName);

            //save image name in database
            $product->image = $imageName;
        }
        $product->save();



        return redirect()->route('products.index')->with('success', 'Product updated successfully.');


    }

    public function destroy($id){
        $product = Product::findOrFail($id);

        //delete image
        File::delete(public_path('uploads/products/'.$product->image));

        //delete product 
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');


    }

}
