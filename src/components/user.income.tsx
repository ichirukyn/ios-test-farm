import { FC } from "react"

interface IUserBalanceProps {
    income: number
}

const UserIncome:FC<IUserBalanceProps> = (props) => {
    const { income } = props
    return (
        <div className="flex flex-row gap-3 h-full items-center">
            <div className="text-primary text-2xl">{income}</div>
            <img className="w-8 bg-primary rounded-md" src='./coin-vector-svg.svg'></img>
            <div className="text-primary text-md">в час</div>
        </div>        
    )
}

export default UserIncome