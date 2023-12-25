import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
// @ts-ignore
import shopRoutes from 'shop/Router'
// @ts-ignore
import adminRoutes from 'admin/Router'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            ...shopRoutes,
            ...adminRoutes
        ]
    }
]);

export {router}