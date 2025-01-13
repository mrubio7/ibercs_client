import { User_Auth } from "@/entities/user"
import { Token } from "@/entities/Token"

const ApiLocalStorage = {
    Token: {
        Save: (value:Token) => {
            localStorage.setItem("token", JSON.stringify(value))
        },
        Get: () : Token | null => {
            const data = localStorage.getItem("token")
            if (data != null)
                return JSON.parse(data)
            return null
        },
        Remove: () => {
            localStorage.removeItem("token")
        }
    },
    User: {
        Save: (user:User_Auth) => {
            const data = btoa(JSON.stringify(user))
            localStorage.setItem("usermetadata", data)
        },
        Get: () => {
            const b = localStorage.getItem("usermetadata")
            if (b != null) {
                const data = atob(b)
                return JSON.parse(data)
            }
        },
        Remove: () => {
            localStorage.removeItem("usermetadata")
        }
    },
    Save: (key:string, value:any) => {
        localStorage.setItem(key, JSON.stringify(value))
    },
    Get: (key:string) => {
        const data = localStorage.getItem(key)
        if (data != null)
            return JSON.parse(data)
        return null
    }
}

export default ApiLocalStorage