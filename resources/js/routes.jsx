import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/Products/ProductList";
import CreateProduct from "./components/Products/CreateProduct";
import EditProduct from "./components/Products/EditProduct";
import NotFound from "./components/NotFound";

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
);

export default AppRoutes;
