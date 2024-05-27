<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use App\Models\Product;

class ProductController extends Controller
{
    //show product page
    public function index()
    {
        $products = Product::orderBy('created-at', 'DESC')->get();
        return response()->json($products);
    }
    public function show(Product $product)
    {
        return response()->json($product);
    }

    //show create product page
    public function create()
    {
        return view('products.create');
    }

    //store a product in db
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|min:5',
            'sku' => 'required|string|min:3',
            'price' => 'required|numeric|min:0',
            'image' => 'required'

        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        //we will store product in db
        $product = new Product();
        $product->name = $request->name;
        $product->sku = $request->sku;
        $product->price = $request->price;
        $product->description = $request->description;
        if ($request->hasFile('image')) {
            //here we will store image
            $imageFile = $request->file('image');
            $ext = $imageFile->getClientOriginalExtension();
            $imageName = time() . '.' . $ext; //unique image name

            //save images to products directort 
            $imageFile->move(public_path('uploads/products'), $imageName);

            //save image name in database
            $product->image = $imageName;
        }
        $product->save();
        return response()->json($product, 201);
    }
    // public function update($id, Request $request)
    public function update(Request $request, Product $product)
    {
        $rules = [
            'name' => 'required|string|min:5',
            'sku' => 'required|string|min:3',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable',
            'image' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $product->name = $request->name;
        $product->sku = $request->sku;
        $product->price = $request->price;
        $product->description = $request->description;

        if ($request->hasFile('image')) {
            if ($product->image) {
                File::delete(public_path('uploads/products/' . $product->image));
            }

            $imageFile = $request->file('image');
            $imageName = time() . '.' . $imageFile->getClientOriginalExtension();
            $imageFile->move(public_path('uploads/products'), $imageName);
            $product->image = $imageName;
        }

        $product->save();

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            File::delete(public_path('uploads/products/' . $product->image));
        }

        $product->delete();
        return response()->json(null, 204);
    }
}
