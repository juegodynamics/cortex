// src/App.tsx
import {
    BrowserRouter,
    Route,
    Router,
    RouterProvider,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
    useLocation,
} from "react-router-dom";
import "./App.css";
import Factory from "./views/Factory";
import { Wiki } from "./views/Wiki";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const View = () => {
    const query = useQuery();

    const viewId = query.get("view");
    switch (viewId) {
        case "factory":
            return <Factory />;
        default:
            return <Wiki />;
    }
};

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <>
//             <Route path="/cortex-web-app" element={<Wiki />} />
//             <Route path="/cortex-web-app/wiki" element={<Wiki />} />
//             <Route path="/cortex-web-app/factory" element={<Factory />} />
//         </>
//     )
// );

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="cortex-web-app" element={<View />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;
