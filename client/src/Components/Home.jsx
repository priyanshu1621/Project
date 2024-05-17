import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate();

  return (
    <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 overscroll-behavior: none; '>

      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
              MatchingOrder-StockExchange

              {/* <span className="sm:block"> Increase Conversion. </span> */}
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Order management system with buyer-seller matching and transaction processing.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button onClick={() => navigate('/tables')}
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"

              >
                Get Started
              </button>


            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home