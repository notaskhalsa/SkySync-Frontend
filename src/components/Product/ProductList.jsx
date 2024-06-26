import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";


  export default function ProductList() {
    const [products, setProjects] = useState([]);
    

    const getData = useCallback(async() => {
      try{
        const resp = await axios.get('http://localhost:8000/product/getProducts')
        const data = resp.data.products
        setProjects(data)
      }catch(err){
        console.log(err)
      }
    })

    useEffect(() => {
      getData()
    },[])

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">T-shirts</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link
                to={`/product/find/${product._id}`}
                aria-current="page"
                data-cy="dashboard"
                state={product}
              >
                <div key={product._id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.img[0]}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.img[0]}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500"></p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
  