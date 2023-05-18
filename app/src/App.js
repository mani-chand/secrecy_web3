import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Notes from "./Pages/Notes";
import {Home} from "./Pages/Home";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/notes",
      element: <Notes/>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
