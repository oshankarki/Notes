import { createBrowserRouter } from "react-router-dom";
import Home from "client/home/views/Index";
import Login from "auth/Login";
import Register from "auth/Register";
import ClientLayout from "client/common/Layout"
import AdminLayout from "admin/common/Layout"
import Predict from "Notes/create";
import User from "admin/user";
import Create from "admin/user/create";
import View from "Notes";
import Update from "Notes/edit";


const router = createBrowserRouter([{
    element: < ClientLayout / > ,
    children: [{
            path: "/",
            element: < Home / > ,
        },
        {
            path: "login",
            element: < Login / > ,
        },
        {
            path: "register",
            element: < Register / > ,
        },
        {
            path: "createNote",
            element: < Predict / > ,
        },
        {
            path: "note",
            element: < View / > ,
        },
        {
            path: "updateNote/:id",
            element: < Update / > ,
        },

    ],
}, {
    path: "/admin",
    element: < AdminLayout / > ,
    children: [{
            path: "",
            element: < User / >
        },
        {
            path: "user",
            element: < User / >
        },
        {
            path: "user/create",
            element: < Create / >
        }
    ]
}]);



export default router;