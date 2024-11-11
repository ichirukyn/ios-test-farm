//import { getRoleByLevel } from "@/local"
import { FC, SyntheticEvent } from "react"

interface IUserEnergyProps {
    progress: number
    level: number
    onClick: () => void
}

const UserLevel:FC<IUserEnergyProps> = (props) => {
    const { progress, level, onClick } = props

    const onLevelClick = (e: SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault()
        onClick()
    }

    return (
        <div className="w-96 h-16 pr-4 cursor-pointer" onClick={onLevelClick}>
            <div className="flex flex-row justify-between w-full pt-3 level-text">
                {"Промоутер >"}
                <span className="">{level} / 4</span>
            </div>
            <progress className="
            mt-4
            progress progress-warning
            w-full border-2 
            border-white rounded" value={progress} max="100"></progress>
        </div>        
    )
}
export default UserLevel

