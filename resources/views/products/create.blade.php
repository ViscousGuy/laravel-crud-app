<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>A Minimal CRUD App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
  </head>
  <body>
    <div class="bg-dark" py-3>
        <h3 class="text-white text-center">CRUD App</h3>
    </div>
    <div class="container">
    <div class="row justify-content-center mt-4">
            <div class="col-md-10 d-flex justify-content-end">
                <a href="{{ route('products.index') }}" class="btn btn-dark">Back</a>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-md-10"> 
                <div class="card border-0 shadow-lg my-4">
                    <div class="card-header bg-dark">
                        <h3 class="text-white">Create Product</h3>
                    </div>
                    <form enctype="multipart/form-data" action="{{ route('products.store') }}" method="post">
                        @csrf 
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="" class="form-label  h5">Name</label>
                                <input value="{{ old('name') }}" type="text" class="@error('name') is-invalid @enderror form-control form-control-lg" placeholder="Name" name="name">
                                @error('name')
                                    <p class="invalid feedback">{{ $message }}</p>
                                @enderror
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label h5">SKU</label>
                                <input value="{{ old('sku') }}" type="text" class="@error('sku') is-invalid @enderror form-control form-control-lg" placeholder="Sku" name="sku">
                                @error('sku')
                                    <p class="invalid feedback">{{ $message }}</p>
                                @enderror
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label h5">Price</label>
                                <input value="{{ old('price') }}" type="text" class="@error('price') is-invalid @enderror form-control form-control-lg" placeholder="Price" name="price">
                                @error('price')
                                    <p class="invalid feedback">{{ $message }}</p>
                                @enderror
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label h5">Description</label>
                                <textarea class="form-control" name="description" id="" cols="30" rows="5" placeholder="Decription">{{ old('description') }}</textarea>
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label h5">Image</label>
                                <input type="file" class="@error('image') is-invalid @enderror form-control form-control-lg" name="image">
                                @error('image')
                                    <p class="invalid feedback">{{ $message }}</p>
                                @enderror
                            </div>
                            <div class="d-grid">
                                <button class="btn btn-lg btn-primary">Submit</button>
                            </div>
                        </div>
                   </form>
                </div>

            </div>
        </div>
    </div>
  </body>
</html>