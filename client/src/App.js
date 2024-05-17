import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Components/Home';

import Tables from './Components/Tables';

function App() {
    
    return (
        <BrowserRouter>
            <div>

                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/tables' element={<Tables/>}/>
                </Routes>




                
            </div>
        </BrowserRouter>
    );
}

export default App;
