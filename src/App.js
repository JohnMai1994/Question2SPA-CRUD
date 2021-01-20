import React from 'react';
import { Button } from 'antd';
import './App.css';
import MainTable from "./components/MainTable";

class App extends React.Component{

    render() {
        return (
            <div className="App">
                <MainTable/>
            </div>
        )
    }

}

export default App;