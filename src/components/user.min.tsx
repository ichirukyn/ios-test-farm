import { FC } from "react"

interface IUserMinProps {
    photoUrl: string
    fullname?: string
    username: string
}

const UserMin:FC<IUserMinProps> = (props) => {
    const { photoUrl, fullname, username } = props
    return (
        <div className="h-full w-full flex flex-row"
        >
            <div className="pl-2 pt-2">
                <img className="rounded-full w-10 h-10" src={photoUrl} />
            </div>
            <div>
                {fullname && <div className="fullname">{fullname}</div>}
                {username.length && <div className="username">@{username}</div>}
            </div>
        </div>       
    )
}

export default UserMin