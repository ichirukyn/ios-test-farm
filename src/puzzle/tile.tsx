import { FC } from "react"

interface ITileProps {
    number: number
    onClick: () => void
}

const Tile:FC<ITileProps> = (props) => {
    const { number, onClick } = props
    return (
    <div className={`tile focus:border-none ${number === 0 ? 'empty' : ''}`} onClick={onClick}>
      {number !== 0 && number}
    </div>
  );
}

export default Tile