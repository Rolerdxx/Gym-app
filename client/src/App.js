import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Login';
import Members from './Members';
import Contract from './Contract';
import DocumentPDF from './DocumentPDF';
import Stats from './Stats';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
          <Route path="/Members" element={<Members />} />
          <Route path="/Contract/:id" element={<Contract />} />
          <Route path="/Contractpdf/:id" element={<DocumentPDF />} />
          <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
