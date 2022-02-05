import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes, Route, Link } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import Processing from "../Processing/Processing";


function App() {
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Test Excel Parsing
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Routes>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/" element={<Processing/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
