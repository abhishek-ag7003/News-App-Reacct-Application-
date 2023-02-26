import React, { Component } from 'react'
import Navbar from "./components/navbar/Navbar"
import News from './components/news/News'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  apiKey2=process.env.API_KEY
  pageSize=12;
  apiKey = "13e5176ae2134a099a529be400b1c621"
  state ={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render(){
    return(
      <div>
        <Router>
          <div>{this.apiKey2}.....</div>
          <Navbar/>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
              <Routes>
                <Route exact path='/' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" categoryType="general"/>}/>       
                <Route exact path='/general' element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="general" pageSize={this.pageSize} country="in" categoryType="general"/>}/>       
                <Route exact path='/entertainment' element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="entertainment" pageSize={this.pageSize} country="in" categoryType="entertainment"/>}/>          
                <Route exact path='/business' element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="business" pageSize={this.pageSize} country="in" categoryType="business"/>}/>
                <Route exact path='/health' element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="health" pageSize={this.pageSize} country="in" categoryType="health"/>}/>
                <Route exact path='/science' element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="science" pageSize={this.pageSize} country="in" categoryType="science"/>}/>
                <Route exact path='/sports' element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="sports" pageSize={this.pageSize} country="in" categoryType="sports"/>}/>
                <Route exact path='/technology'element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="technology" pageSize={this.pageSize} country="in" categoryType="technology"/>}/>        
              </Routes>
        </Router>
      </div>
    )
  }
}


