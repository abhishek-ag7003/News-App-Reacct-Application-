import React, {  useState } from 'react'
import Navbar from "./components/navbar/Navbar"
import News from './components/news/News'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'


export default function App () {
  // let apiKey2=process.env.API_KEY
  let pageSize=12;
  
  const apiKey = "13e5176ae2134a099a529be400b1c621"
  const [progress, setProgress] = useState(0)
  
  const setProgressbar= (prog)=>{
    setProgress(prog)
  }
    return(
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
        color='#f11946'
        progress={progress}
      />
              <Routes>
                <Route exact path='/' element={<News apiKey={apiKey} setProgress={setProgressbar} key="general" pageSize={pageSize} country="in" categoryType="general"/>}/>       
                <Route exact path='/general' element={<News apiKey={apiKey}setProgress={setProgressbar}key="general" pageSize={pageSize} country="in" categoryType="general"/>}/>       
                <Route exact path='/entertainment' element={<News apiKey={apiKey}setProgress={setProgressbar}key="entertainment" pageSize={pageSize} country="in" categoryType="entertainment"/>}/>          
                <Route exact path='/business' element={<News apiKey={apiKey}setProgress={setProgressbar}key="business" pageSize={pageSize} country="in" categoryType="business"/>}/>
                <Route exact path='/health' element={<News apiKey={apiKey}setProgress={setProgressbar}key="health" pageSize={pageSize} country="in" categoryType="health"/>}/>
                <Route exact path='/science' element={<News apiKey={apiKey}setProgress={setProgressbar}key="science" pageSize={pageSize} country="in" categoryType="science"/>}/>
                <Route exact path='/sports' element={<News apiKey={apiKey}setProgress={setProgressbar}key="sports" pageSize={pageSize} country="in" categoryType="sports"/>}/>
                <Route exact path='/technology'element={<News apiKey={apiKey}setProgress={setProgressbar}key="technology" pageSize={pageSize} country="in" categoryType="technology"/>}/>        
              </Routes>
        </Router>
      </div>
    )
  }


