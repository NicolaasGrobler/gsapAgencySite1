import React, {Fragment, useEffect, useState} from "react";
import {Route} from 'react-router-dom';
import gsap from 'gsap';
import "./styles/App.scss";

//Components
import Header from "./components/header";
import Navigation from "./components/navigation";

//Pages
import Home from "./pages/home";
import CaseStudies from './pages/caseStudies';
import Approach from './pages/approach';
import Services from './pages/services';
import About from './pages/about';

//routes
const routes = [
    {
        path: '/',
        name: 'Home',
        Component: Home
    }, {
        path: '/case-studies',
        name: 'Case Studies',
        Component: CaseStudies
    }, {
        path: '/approach',
        name: 'Approach',
        Component: Approach
    }, {
        path: '/services',
        name: 'Services',
        Component: Services
    }, {
        path: '/about-us',
        name: 'About',
        Component: About
    }
];

function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments)
        }, ms)
    }
}

function App() {
    const [dimensions,
        setDimensions] = useState({height: window.innerHeight, width: window.innerWidth})

    useEffect(() => {
        //prevent flashing
        gsap.to('body', 0, {
            css: {
                visibility: "visible"
            }
        });

        let vh = dimensions.height * .01;
        document
            .documentElement
            .style
            .setProperty('--vh', `${vh}px`);

        const debouncedHandleResize = debounce(function handleResize() {
            setDimensions({height: window.innerHeight, width: window.innerWidth});
        }, 1000);

        window.addEventListener('resize', debouncedHandleResize);

        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    });

    return (
        <Fragment>
            <Header dimensions={dimensions}/>
            <div className="App">
                {routes.map(({path, Component}) => (
                    <Route key={path} exact path={path}>
                        <Component/>
                    </Route>
                ))}
            </div>
            <Navigation/>
        </Fragment>
    );
}

export default App;
