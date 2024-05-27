import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        price: "",
        description: "",
        image: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("sku", formData.sku);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("image", formData.image);

        try {
            await axios.post("/api/products", formDataToSend);
            navigate("/");
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Error creating product:", error);
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
                        <a href="/" className="btn btn-dark">
                            Back
                        </a>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10">
                        <div className="card border-0 shadow-lg my-4">
                            <div className="card-header bg-dark">
                                <h3 className="text-white">Create Product</h3>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="name"
                                            className="form-label h5"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg ${
                                                errors.name ? "is-invalid" : ""
                                            }`}
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="sku"
                                            className="form-label h5"
                                        >
                                            SKU
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg ${
                                                errors.sku ? "is-invalid" : ""
                                            }`}
                                            id="sku"
                                            name="sku"
                                            value={formData.sku}
                                            onChange={handleChange}
                                        />
                                        {errors.sku && (
                                            <div className="invalid-feedback">
                                                {errors.sku}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="price"
                                            className="form-label h5"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg ${
                                                errors.price ? "is-invalid" : ""
                                            }`}
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                        />
                                        {errors.price && (
                                            <div className="invalid-feedback">
                                                {errors.price}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="description"
                                            className="form-label h5"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            rows="5"
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="image"
                                            className="form-label h5"
                                        >
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            className={`form-control form-control-lg ${
                                                errors.image ? "is-invalid" : ""
                                            }`}
                                            id="image"
                                            name="image"
                                            onChange={handleImageChange}
                                        />
                                        {errors.image && (
                                            <div className="invalid-feedback">
                                                {errors.image}
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-grid">
                                        <button
                                            type="submit"
                                            className="btn btn-lg btn-primary"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
