import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatInTimeZone } from "date-fns-tz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            setSuccessMessage("");
        }
    }, [successMessage]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`/api/products/${id}`);
                setProducts(products.filter((product) => product.id !== id));
                setSuccessMessage("Product deleted successfully!");
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };
    return (
        <div>
            <div className="bg-dark py-3">
                <h3 className="text-white text-center">CRUD App</h3>
            </div>
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <div className="col-md-10 d-flex justify-content-end">
                        <Link to="/products/create" className="btn btn-dark">
                            Create
                        </Link>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10">
                        <div className="card border-0 shadow-lg my-4">
                            <div className="card-header bg-dark">
                                <h3 className="text-white">Products</h3>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th></th>
                                            <th>Name</th>
                                            <th>SKU</th>
                                            <th>Price</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>
                                                    {product.image && (
                                                        <img
                                                            width="50"
                                                            src={`/uploads/products/${product.image}`}
                                                            alt="Product"
                                                        />
                                                    )}
                                                </td>
                                                <td>{product.name}</td>
                                                <td>{product.sku}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    {formatInTimeZone(
                                                        new Date(
                                                            product.created_at
                                                        ),
                                                        "Asia/Kolkata",
                                                        "dd MMM, yyyy hh:mm a"
                                                    )}
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/products/${product.id}/edit`}
                                                        className="btn btn-dark me-2"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="btn btn-dark"
                                                        onClick={() =>
                                                            deleteProduct(
                                                                product.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProductList;
