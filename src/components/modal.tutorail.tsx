import {FC, useState} from "react";

interface IModalTutorialProps {
  isOpen: boolean;
  close: () => void;
}

const tutorialArray = [
  {
    img: 'tutorial/slide-1.webp',
    blur: '#858585',
    blur_2: 'rgba(246,184,90,0.55)',
    title: 'Hello',
    titleIcon: '👋',
    subtitle: 'Open boxes and win different prizes from them!',
  },
  {
    img: 'tutorial/slide-2.webp',
    blur: 'rgba(78,212,129,0.95)',
    title: 'Rewards',
    titleIcon: '🎁',
    subtitle: 'Win Tokens, USDT, More Keys and Upcoming NFTs or Cryptocurrencies!',
  },
  {
    img: 'tutorial/slide-3.webp',
    blur: 'rgba(80,105,231,0.63)',
    title: 'Invite friends',
    titleIcon: '🤝',
    subtitle: 'More friends claim more tokens!',
  },
]

const ModalTutorial: FC<IModalTutorialProps> = ({isOpen, close}) => {
  const [tutorial, setTutorial] = useState(1)
  const tutorialCount = 3;

  const closeTutorial = () => {
    localStorage.setItem('tutorial_complete', 'true')
    close()
  }

  const nextTutorial = () => {
    setTutorial(tutorial + 1)

    if (tutorial >= tutorialCount) closeTutorial()
  }

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-tutorial relative w-full h-full flex flex-col justify-between">
        <div className="modal-tutorial-circle">
          <div className="modal-tutorial-circle-large"></div>
          <div className="modal-tutorial-circle-medium"></div>
          <div className="modal-tutorial-circle-small"></div>
        </div>

        {tutorialArray.map(({img, blur, blur_2, title, titleIcon, subtitle}, index) => (
          <>
            <div className="relative flex w-full justify-center" style={{display: tutorial === index + 1 ? 'flex' : 'none'}}>
              <div className="modal-tutorial-icon-blur" style={{background: blur}}></div>
              <img className="relative" src={img} alt="slide"/>
              <div className="modal-tutorial-icon-blur-2" style={{background: blur_2}}></div>
            </div>

            <div className="flex-col items-center gap-2" style={{display: tutorial === index + 1 ? 'flex' : 'none'}}>
              <h3 className="modal-tutorial-title uppercase"><span>{title}</span>{titleIcon}</h3>
              <p className="modal-tutorial-subtitle">{subtitle}</p>
            </div>
          </>
        ))}


        <div className="flex flex-col items-center gap-5">
          <div className="w-full flex">
            <div
              className="function-btn flex items-center justify-center uppercase w-full"
              onClick={nextTutorial}
            >
              next
            </div>
            <div
              className="function-btn flex items-center justify-center uppercase"
              onClick={closeTutorial}
            >
              skip
            </div>
          </div>

          <div className="modal-tutorial-pagination flex gap-1">
            {tutorialArray.map(({img}, index) => (
              <div className={`modal-tutorial-pagination-bullet ${tutorial === index + 1 && 'active'}`} key={img}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalTutorial;