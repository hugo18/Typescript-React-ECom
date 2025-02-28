import { useState, useEffect } from 'react'

interface Author {
  name: string
  isFollowing: boolean
  image: string
}

const TopSellers = () => {
    const [authors, setAuthors] = useState<Author[]>([])

    const fetchData = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/?results=5')
            const data = await response.json()
            const authorsData: Author[] = data.results.map((user: any) => ({
            name: `${user.name.first} ${user.name.last}`,
            isFollowing: false,
            image: user.picture.medium,
            }))
    
            setAuthors(authorsData)
  
        } catch (error) {
            console.error('Erro ao buscar vendedores:', error)
        }
    }
  
    useEffect(() => {
        fetchData()
    }, [])

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author)
    )
  }

  return (
    <div className='bg-white p-5 mx-5 mt-[5rem] border w-[20rem] rounded ml-3'>
      <h2 className='text-xl font-bold mb-5'>Vendedores</h2>
      <ul>
        {authors.map((author, index) => (
          <li key={index} className='flex items-center justify-between mb-4'>
            <section className='flex justify-center items-center'>
              <img
                src={author.image}
                className='w-[25%] h-[25%] justify-center rounded-full'
                alt={author.name}
              />
              <span className='ml-4'>{author.name}</span>
            </section>
            <button
              onClick={() => handleFollowClick(index)}
              className={`py-1 px-3 rounded ${
                author.isFollowing
                  ? 'bg-red-500 text-white'
                  : 'bg-black text-white'
              }`}
            >
              {author.isFollowing ? 'Parar' : 'Seguir'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellers