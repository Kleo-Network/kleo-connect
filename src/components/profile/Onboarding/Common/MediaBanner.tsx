import { useState, useEffect } from 'react'
import { ReactComponent as ThirdParty } from '../../../../assets/images/third.svg'
import { ReactComponent as Airdrop } from '../../../../assets/images/airdrop.svg'

export const MediaBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const titles = ['Extension Privacy', 'Wallet Connect']

  const description = [
    'Our code is open source, giving you the power to truly own your data.<br /> Take control of your digital identity with full transparency and trust.',
    'Sign the transaction to receive 10,000 SVANA. Secure your<br /> reward and unlock new possibilities.'
  ]
  useEffect(() => {
    // const interval = setInterval(nextSlide, 3000) // Change slide every 3 seconds
    // return () => clearInterval(interval)
  }, [activeIndex])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute bottom-[10%] left-[4%] z-50">
        <h1 className="text-white text-3xl">{titles[activeIndex]}</h1>

        <p
          className="text-gray-200"
          dangerouslySetInnerHTML={{ __html: description[activeIndex] }}
        ></p>
      </div>
      <div className="absolute bottom-[3%] left-[33%] z-50">
        <div
          key={`1`}
          className={`h-2 bg-white rounded-full mx-2 cursor-pointer active relative ${
            activeIndex == 0 ? 'w-14' : 'w-3 bg-opacity-50'
          }`}
          onClick={() => goToSlide(0)}
        ></div>
        <div
          key={`2`}
          className={`bottom-[8px] relative h-2 bg-white rounded-full ${
            activeIndex == 0 ? 'left-[63px]' : 'left-[18px]'
          } mx-2 cursor-pointer ${
            1 === activeIndex ? 'active bg-white w-14' : 'bg-opacity-50 w-3'
          }`}
          onClick={() => goToSlide(1)}
        ></div>
      </div>
      {activeIndex === 0 && <Airdrop className="w-full h-full" />}
      {activeIndex === 1 && <ThirdParty className="w-full h-full" />}
    </div>
  )
}
