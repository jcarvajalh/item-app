import React        from "react";
import navTop       from "./navTop.jsx";
import NavBar       from "./NavBar.jsx";
import SectionItem  from "./SectionItem.jsx";


function App(){
    return (
        <div className="app">
            <navTop />
            <NavBar />
            <SectionItem />
        </div>
    );
}

export default App;