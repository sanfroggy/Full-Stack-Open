import { useQuery } from '@apollo/client'
import { ME } from '../services/queries'

const useUser = () => {

    const [user, setUser] = useQuery(ME)

    const getFavorite = () => {
        return user.favoriteGenre
    }

    return getFavorite
}

export { useUser }
