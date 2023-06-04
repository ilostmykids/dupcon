import React from 'react';
import { Routes, Route, Navigate} from "react-router-dom"
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainPage, { languageOptions, markOptions } from './pages/MainPage/MainPage';
import ReminderPage from './pages/InfoPage/ReminderPage';
import ReminderControl from './pages/AddPage/ReminderControl';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/main' element={<MainPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/info/:id' element={<ReminderPage />}/>
          <Route path='/edit/:id' element={<ReminderControl
          markOptions={markOptions}
          languageOptions={languageOptions}
          type='edit'
          />}/>
          <Route path='/add' element={<ReminderControl 
          markOptions={markOptions} 
          languageOptions={languageOptions}
          type='add'
          />}/>
          <Route path="*" element={<Navigate to='/main'/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
