import React from 'react'

const Shimmer = () => {
  return (
    <div className='w-full flex justify-center pt-28'>

        <div>
        <span className='loader'></span>
        </div>

        {/* // user shimmer effect //  */}
          {/* <div className="flex w-full px-4 flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-1">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-12"></div>
              </div>
            </div>
            <div>
              <div className="skeleton h-8 w-20"></div>
            </div>
          </div> */}
    </div>
  )
}

export default Shimmer