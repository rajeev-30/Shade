import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import Feed from './Feed'
import Search  from './Search'
import Profile from './Profile'
import Followings from './Followings'
import Followers from './Followers'
import Notifications from './Notifications'
import OpenPost from './OpenPost'

const Body = () => {

    const router = createBrowserRouter([
        {
            path:'/',
            element: <Home/>,
            children: [
                {
                    path: '',
                    element: <Feed/>
                },
                {
                    path: '/search',
                    element: <Search/>
                },
                {
                    path: '/notifications',
                    element: <Notifications/>
                },
                {
                    path:'/post/:id',
                    element:<OpenPost/>
                },
                {
                    path: '/profile/:id',
                    element: <Profile/>
                },
                {
                    path: '/followings/:id',
                    element:<Followings/>
                },
                {
                    path:'/followers/:id',
                    element:<Followers/>
                }
            ]
        }
    ])

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default Body