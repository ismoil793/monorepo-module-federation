import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import {Suspense} from "react";
import {LazyShop} from "@/pages/shop/Shop.lazy";

const routes = [
    {
        path: '/shop',
        element: <App />,
        children: [
            {
                path: '/shop/main',
                element: (
                    <Suspense fallback="Loading...">
                        <LazyShop />
                    </Suspense>
                )
            },
            {
                path: '/shop/main/inside-main',
                element: (<div>shop inside main</div>)
            },
        ]
    }
]

// this is for bootstrap
export const router = createBrowserRouter(routes);

// this is needed for host container to use shop rotes
export default routes