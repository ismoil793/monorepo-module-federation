import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {router} from "@/router/Router";

const root = document.querySelector('#root');

if (!root) {
  throw new Error('root element NOT found!');
}

const container = createRoot(root);

container.render(<RouterProvider router={router} />);
