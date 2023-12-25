import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import {Suspense} from "react";
import {LazyAdmin} from "@/pages/admin/Aadmin.lazy";
import {someUtil} from "@packages/shared/src/utils/someUtil";

const routes = [
    {
        path: '/admin',
        element: <App />,
        children: [
            {
                path: '/admin/main',
                element: (
                    <Suspense fallback="Loading...">
                        <LazyAdmin />
                    </Suspense>
                ) // separate chunk js will be created bcs its lazy
            },
            {
                path: '/admin/main/inside-main',
                element: (<div>/main/inside-main {someUtil()}</div>)
            },
        ]
    }
]

const router = createBrowserRouter(routes);

export {router};

export default routes