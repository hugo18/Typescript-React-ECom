import { useEffect, useState } from 'react'
import { useFilter } from './FilterContext'
import { Tally3 } from 'lucide-react'
import axios from 'axios'
import BookCard from './BookCard'
function MainContent(){
     const {
            searchQuery,
            selectedCategory,
            minPrice,
            maxPrice,
            keyword
        } = useFilter()
    
    const [products, setProducts] = useState<any[]>([])
    const [filter, setFilter] = useState<string>('todos')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
    const itemsPerPage = 12
   

    useEffect(() => {
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`
        if(keyword){
            url = `https://dummyjson.com/products/search?q=${keyword}`
            setCurrentPage(1)
        }
        axios.get(url).then(response => {
            setProducts(response.data.products)
        }).catch(error => console.error('Erro ao buscar os dados '+error))
    }, [currentPage, keyword])
    
  
    const getFilteredProducts = () => {
        let filteredProducts = products
        
        if(selectedCategory){
          filteredProducts = filteredProducts.filter(product => product.category === selectedCategory)
        }
        if(minPrice){
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice)
        }  
        if(maxPrice){
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice)
        }  
        if(searchQuery){
            filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }  
        
        switch(filter){
            case 'caro': return filteredProducts.sort((a, b) => b.price - a.price)
            case 'barato': return filteredProducts.sort((a, b) => a.price - b.price)
            case 'popular': return filteredProducts.sort((a, b) => b.rating - a.rating)
            default: return filteredProducts
        }
        
    }
    const filteredProducts = getFilteredProducts()
    //console.log(filteredProducts)

    const totalProducts = 100;
    const totalPages = Math.ceil(totalProducts / itemsPerPage)
  
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }
  
    const getPaginationButtons = () => {
        const buttons: number[] = []
        let startPage = Math.max(1, currentPage - 2)
        let endPage = Math.min(totalPages, currentPage + 2)
  
        for (let page = startPage; page <= endPage; page++) {
            buttons.push(page)
        }
  
        return buttons
    }

    return (<>
        <section className='xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
            <div className='mb-5'>
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <div className='relative mb-5 mt-5'>
                        <button className='border px-4 py-2 rounded-full flex items-center' onClick={() => setDropDownOpen(!dropDownOpen)}>
                            <Tally3 className='mr-2'/>
                        {filter.charAt(0).toUpperCase() + filter.slice(1) }
                        </button>
                        {dropDownOpen && (
                            <div className='absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40'>
                                  <button onClick={() => setFilter('todos')} className='block px-4 py-2 w-full text-left hover:bg-gray-200'>Todos</button>

                                <button onClick={() => setFilter('barato')} className='block px-4 py-2 w-full text-left hover:bg-gray-200'>Barato</button>

                                <button onClick={() => setFilter('caro')} className='block px-4 py-2 w-full text-left hover:bg-gray-200'>Caro</button>

                                <button onClick={() => setFilter('popular')} className='block px-4 py-2 w-full text-left hover:bg-gray-200'>Popular</button>

                            
                            </div>


                        
                        )}

                    </div>
                </div>

                <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5'>
                    {filteredProducts.map(product => (
                        <BookCard key={product.id} id={product.id} title={product.title} image={product.images[0]} price={product.price} />
                    ))}
                </div>
            
                <div className='flex flex-col sm:flex-row justify-between items-center mt-5'>
                    
                    <button onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1} className='border px-4 py-2 mx-2 rounded-full'>
                        Anterior
                    </button>

                    <div className='flex flex-wrap justify-center'>
                        {getPaginationButtons().map((page) => (
                            <button key={page}
                            onClick={() => handlePageChange(page)}
                            className={`border px-4 py-2 mx-1 rounded-full ${
                            page === currentPage ? 'bg-black text-white' : ''
                            }`}>
                                {page}
                            </button>
                        ))}
                    </div>

                    <button onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='border px-4 py-2 mx-2 rounded-full'>
                        Próxima
                    </button>
                </div>
            
            
            </div>
        </section>
    </>)
}

export default MainContent