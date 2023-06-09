import MadeByButton from '@/app/components/MadeByButton'
import StartButton from './StartButton'

interface AboutProps {
    userId: string
}

const About: React.FC<AboutProps> = ({ userId }) => {
    return (
        <div className="flex flex-col justify-center items-center text-center">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-neutral-100 mb-1">0xVenture Capitalist</h1>
                <h2 className="text-lg text-neutral-300">
                    Accumulate wealth and become the world's richest crypto tycoon!
                </h2>
                <div className="mt-[1rem]">
                    <StartButton userId={userId} />
                </div>
            </div>
            {/* HOW TO PLAY */}
            <div className="mt-[1rem]">
                <div className="text-2xl font-bold text-neutral-200 mb-1">How To Play</div>
                <div className="text-neutral-300">
                    <div>Start with a single lemonade stand, and expand your business empire by purchasing more businesses, upgrading them, and hiring managers to run them for you.</div>
                </div>
            </div>
            {/* LAST SECTION */}
            <div className="mt-[1rem]">
                <div className="text-2xl font-bold text-neutral-200 mb-1">About 0xVC</div>
                <div className="text-neutral-300">0xVC is an idle clicker game where players learn about investing in cryptocurrencies, DeFi, and NFTs, while playing a fun game. Earn virtual currency, unlock valuable assets, and become a real blockchain tycoon!</div>
            </div>
            {/* LAST SECTION */}
            <div className="mt-[1rem]">
                <MadeByButton />
            </div>
        </div>
    )
}

export default About