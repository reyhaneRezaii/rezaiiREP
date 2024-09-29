import Products from "./components/Products/Products";
import Comments from "./components/comments/Comments";
import Users from "./components/users/Users";
import Orders from "./components/Orders/Orders";

const routes=[
    {path:'/products', element:<Products /> },
    {path:'/comments', element:<Comments /> },
    {path:'/users', element:<Users /> },
    {path:'/orders', element:<Orders /> },
]
export default routes