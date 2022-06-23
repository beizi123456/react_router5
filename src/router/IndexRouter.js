import React from 'react'

import { HashRouter,Redirect,Switch, Route } from 'react-router-dom'

import Login from '../views/Login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import News from '../views/news/News'
import Detail from '../views/news/Detail'


export default function indexRouter() {
   return (
       <HashRouter>
           <Switch>
               <Route path='/login' component={Login}></Route>
               <Route path='/news' component={News}></Route>
               <Route path='/detail/:id' component={Detail}></Route>
               <Route path='/' render={() =>
                   localStorage.getItem('token')?<NewsSandBox/>:<Redirect to='/login'/>
               }></Route>
             </Switch>
     </HashRouter>
   )
 }
