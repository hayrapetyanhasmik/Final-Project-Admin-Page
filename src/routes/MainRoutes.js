import { Route, Routes } from "react-router-dom";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Users from "../components/Users";
import CreateCategory from "../components/CreateCategory";
import CreateProduct from "../components/CreateProduct";
import ProtectedRoutes from "./ProtectedRoutes";
import Header from "../components/Header";

export default function MainRoutes(){

    return(
        <>
        <Header /> 
        <Routes>
            <Route path="/" element={<Home/>} /> 
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login/>} /> 
            <Route path="/admin" element={<ProtectedRoutes><Admin/></ProtectedRoutes>} /> 
            <Route path="/categories" element={<ProtectedRoutes><Categories/></ProtectedRoutes>} /> 
            <Route path="/createCategory" element={<ProtectedRoutes><CreateCategory/></ProtectedRoutes>} /> 
            <Route path="/products" element={<ProtectedRoutes><Products/></ProtectedRoutes>} /> 
            <Route path="/createProduct" element={<ProtectedRoutes><CreateProduct/></ProtectedRoutes>} /> 
            <Route path="/users" element={<ProtectedRoutes><Users/></ProtectedRoutes>} /> 
        </Routes>
        </>
    )
}