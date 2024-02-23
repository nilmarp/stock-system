import React from "react";
import Home from "./pages/home";

export default function Routing({ name }) {

    const routes = [
        {
            name: 'home',
            component: <Home />
        },
        {
            name: 'not-found',
            component: <Home />
        }
    ]

    route = {}

    route = routes.find((e) => e.name == name)

    console.log(route)

    // early return
    if (name == '' || name == undefined || name == 'undefined') { return routes[0].component }

    return route.component

}