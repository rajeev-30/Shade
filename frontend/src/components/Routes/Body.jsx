import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../../pages/Home'
import Feed from '../Post/Feed'
import Search  from '../../pages/Search'
import Profile from '../../pages/Profile'
import Followings from '../Profile/Followings'
import Followers from '../Profile/Followers'
import Notifications from '../../pages/Notifications'
import OpenPost from '../Post/OpenPost'

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