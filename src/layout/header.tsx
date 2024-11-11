import { FC, PropsWithChildren } from "react";

const Header: FC <PropsWithChildren> = ({ children }) => {
    return <header className="w-full absolute top-0">{children}</header>
}
export default Header