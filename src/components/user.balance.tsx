import { FC } from "react"

interface IUserBalanceProps {
    balance: number
}

const UserBalance:FC<IUserBalanceProps> = (props) => {
    const { balance } = props
    return (
        <div className="flex flex-row gap-4 h-full items-center">
            <div className="text-primary text-2xl">{balance}</div>
            <img className="w-12 bg-primary rounded-md" src='./coin-vector-svg.svg'></img>
        </div>
       
        
    )
}

export default UserBalance