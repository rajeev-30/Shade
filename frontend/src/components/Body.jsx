import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import Feed from './Feed'

const Body = () => {

    const router = createBrowserRouter([
        {
            path:'/',
            element: <Home/>,
            children: [
                {
                    path: '',
                    element: <Feed/>
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