import { useEffect, useState} from 'react'
import { useFilter } from './FilterContext'

interface Product{
    category: string
}

interface FetchResponse{
    products: Product[]
}

function Sidebar() {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword
    } = useFilter()
    
    const [categories, setCategories] = useState<string[]>([])
    const [keywords] = useState<string[]>(['apple', 'watch', 'fashion', 'trend', 'shoes', 'shirt'])
    
    useEffect(() => {
        const fetchCaregories = async () => {
            try{
                const response = await fetch('http://dummyjson.com/products')
                const data: FetchResponse = await response.json()
                const uniqueCategories = Array.from(new Set(data.products.map(product => product.category)))
                setCategories(uniqueCategories);
            }catch(error){
                    console.error('Erro ao buscar produtos')
                } 
        }
        fetchCaregories()
    }, [])

    return (
    <>
      
        <div className="w-64 p-5 h-screen">
            <h1 className="text-2xl font-bold mb-10 mt4">Loja React</h1>
            <section>
                <input type="text" className="border-2 rounded px-2 sm:mb-0" placeholder="Procurar produto"
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
                
                <div className="flex justify-center items-center">
                    <input type="text" className="border-2 mr-4 px-4 py-3 mb-3 w-full" placeholder="Mínimo"/>
                    <input type="text" className="border-2 px-4 py-3 mb-3 w-full" placeholder="Máximo"/>
                </div>

                <div className="mb-5">
                    <h2 className="text-xl font-semibold mb-3">Categorias</h2>
                </div>
                <section>
                    {categories.map((category, index) => (
                        <label key={index} className="block mb-2">
                            <input type="radio" name="category" value={category} className="mr-2 w-[16px] h-[16px]"/>
                            {category} 
                        </label>
                
                    ))}
                </section>

                <div className="mb-5 mt-4">
                    <h2 className="text-xl font-semibold mb-3">Palavras-chave</h2>
                    <div>
                        {keywords.map((keyword, index) => (
                            <button key={index} className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200">
                                {keyword}
                            </button>
                        ))}
                    </div>
                </div>
                <button className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5">Redefinir filtros</button>
            </section>
           
        
        </div>
  
       
    </>
    )
  }
  
  export default Sidebar
  