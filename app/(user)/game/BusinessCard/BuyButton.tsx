'use client'

import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import useSound from 'use-sound'

import { useStore } from "@/app/store/GameStore"
import FormatNumber from "@/app/components/FormatNumber"

interface BuyButtonProps {
    id: string,
    name: string,
    cost: number,
    multiplier: number,
    quantity: number,
    index: number,
    userId: string,
    coins: number,
}

const BuyButton: React.FC<BuyButtonProps> = ({ id, name, cost, multiplier, quantity, index, userId, coins }) => {
    const [popSound, { stop: stopPopSound }] = useSound('/audio/pop.mp3', { volume: 0.75 })
    const [deniedSound] = useSound('/audio/denied.mp3', { volume: 0.4 })
    const [tadaLowSound] = useSound('/audio/tada-low.mp3')
    const [tadaMidSound] = useSound('/audio/tada-mid.mp3')
    const [tadaHighSound] = useSound('/audio/tada-high.mp3')

    // for increasing pitch on every click
    const [playbackRate, setPlaybackRate] = useState(0.75);
    const [coinSound] = useSound('/audio/coin.mp3', {
        playbackRate,
        // `interrupt` ensures that if the sound starts again before it's
        // ended, it will truncate it. Otherwise, the sound can overlap.
        interrupt: true,
    })

    const [
        userCoins,
        addCoins,
        bizQuantities,
        addBizQuantities,
        bizTime,
        setBizTime,
        bizRevenue,
        setBizRevenue,
        buyQuantity,
    ] = useStore(
        (state) => [
            state.userCoins,
            state.addCoins,
            [
                state.biz1Quantity,
                state.biz2Quantity,
                state.biz3Quantity,
                state.biz4Quantity,
                state.biz5Quantity,
                state.biz6Quantity,
                state.biz7Quantity,
                state.biz8Quantity,
                state.biz9Quantity,
                state.biz10Quantity,
            ],
            [
                state.addBiz1Quantity,
                state.addBiz2Quantity,
                state.addBiz3Quantity,
                state.addBiz4Quantity,
                state.addBiz5Quantity,
                state.addBiz6Quantity,
                state.addBiz7Quantity,
                state.addBiz8Quantity,
                state.addBiz9Quantity,
                state.addBiz10Quantity,
            ],
            [
                state.biz1Time,
                state.biz2Time,
                state.biz3Time,
                state.biz4Time,
                state.biz5Time,
                state.biz6Time,
                state.biz7Time,
                state.biz8Time,
                state.biz9Time,
                state.biz10Time,
            ],
            [
                state.setBiz1Time,
                state.setBiz2Time,
                state.setBiz3Time,
                state.setBiz4Time,
                state.setBiz5Time,
                state.setBiz6Time,
                state.setBiz7Time,
                state.setBiz8Time,
                state.setBiz9Time,
                state.setBiz10Time,
            ],
            [
                state.biz1Revenue,
                state.biz2Revenue,
                state.biz3Revenue,
                state.biz4Revenue,
                state.biz5Revenue,
                state.biz6Revenue,
                state.biz7Revenue,
                state.biz8Revenue,
                state.biz9Revenue,
                state.biz10Revenue,
            ],
            [
                state.setBiz1Revenue,
                state.setBiz2Revenue,
                state.setBiz3Revenue,
                state.setBiz4Revenue,
                state.setBiz5Revenue,
                state.setBiz6Revenue,
                state.setBiz7Revenue,
                state.setBiz8Revenue,
                state.setBiz9Revenue,
                state.setBiz10Revenue,
            ],
            state.buyQuantity,
        ]
    )

    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentPriceFormatted, setCurrentPriceFormatted] = useState("");
    const [currentQuantity, setCurrentQuantity] = useState(0)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        // console.log(`userCoins has changed to ${userCoins}`)
        setCurrentQuantity(bizQuantities[index])

        const currentPrice = (cost * (((multiplier ** bizQuantities[index]) * (multiplier ** buyQuantity - 1)) / (multiplier - 1)))
        setCurrentPrice(Number(currentPrice.toFixed(2)))

        let priceAsNumber = Number(currentPrice)
        let formattedNumber = FormatNumber(priceAsNumber, false)
        setCurrentPriceFormatted(formattedNumber)


    }, [userCoins, quantity, bizQuantities[index], buyQuantity])

    const purchaseHandler = async () => {
        setIsLoading(true)

        // if player doesn't have enough coins, return
        if (userCoins < currentPrice) {
            toast.error(`You have not enough coins!`)
            deniedSound()
            setIsLoading(false)
            return
        }

        // if player has enough coins, then purchase
        try {
            const response = await fetch(`/api/player/business/buy/${userId}?quantity=${buyQuantity}&amount=${currentPrice}&businessId=${id}&quantityBefore=${bizQuantities[index]}`)

            let quantityBefore = bizQuantities[index]
            let quantityAfter = quantityBefore + buyQuantity

            if (
                quantityBefore < 25 && quantityAfter >= 25
            ) {
                toast.success(`2x speed on your ${name}!`)
                tadaLowSound()
                // set store's bizTime[index] to x0.5
                setBizTime[index](bizTime[index] / 2)
            }
            if (
                quantityBefore < 50 && quantityAfter >= 50
            ) {
                toast.success(`2x speed on your ${name}!`)
                tadaLowSound()
                // set store's bizTime[index] to x0.5
                setBizTime[index](bizTime[index] / 2)
            }
            if (
                quantityBefore < 100 && quantityAfter >= 100 ||
                quantityBefore < 200 && quantityAfter >= 200 ||
                quantityBefore < 300 && quantityAfter >= 300 ||
                quantityBefore < 400 && quantityAfter >= 400
            ) {
                toast.success(`2x speed on your ${name}!`)
                tadaLowSound()
                // set store's bizTime[index] to x0.5
                setBizTime[index](bizTime[index] / 2)
            }
            if (
                quantityBefore < 500 && quantityAfter >= 500 ||
                quantityBefore < 600 && quantityAfter >= 600 ||
                quantityBefore < 700 && quantityAfter >= 700 ||
                quantityBefore < 800 && quantityAfter >= 800 ||
                quantityBefore < 900 && quantityAfter >= 900 ||
                quantityBefore < 1100 && quantityAfter >= 1100 ||
                quantityBefore < 1200 && quantityAfter >= 1200 ||
                quantityBefore < 1300 && quantityAfter >= 1300 ||
                quantityBefore < 1400 && quantityAfter >= 1400 ||
                quantityBefore < 1500 && quantityAfter >= 1500 ||
                quantityBefore < 1600 && quantityAfter >= 1600 ||
                quantityBefore < 1700 && quantityAfter >= 1700 ||
                quantityBefore < 1800 && quantityAfter >= 1800 ||
                quantityBefore < 1900 && quantityAfter >= 1900
            ) {
                toast.success(`4x revenue on your ${name}!`)
                tadaMidSound()
                // set store's bizRevenue[index] to x4
                setBizRevenue[index](bizRevenue[index] * 4)
            }
            if (
                quantityBefore < 2250 && quantityAfter >= 2250 ||
                quantityBefore < 2500 && quantityAfter >= 2500 ||
                quantityBefore < 2750 && quantityAfter >= 2750 ||
                quantityBefore < 3250 && quantityAfter >= 3250 ||
                quantityBefore < 3500 && quantityAfter >= 3500 ||
                quantityBefore < 3750 && quantityAfter >= 3750 ||
                quantityBefore < 4250 && quantityAfter >= 4250 ||
                quantityBefore < 4500 && quantityAfter >= 4500 ||
                quantityBefore < 4750 && quantityAfter >= 4750
            ) {
                toast.success(`2x revenue on your ${name}!`)
                tadaMidSound()
                // set store's bizRevenue[index] to x2
                setBizRevenue[index](bizRevenue[index] * 2)
            }
            if (
                quantityBefore < 1000 && quantityAfter >= 1000 ||
                quantityBefore < 2000 && quantityAfter >= 2000 ||
                quantityBefore < 3000 && quantityAfter >= 3000 ||
                quantityBefore < 4000 && quantityAfter >= 4000 ||
                quantityBefore < 5000 && quantityAfter >= 5000
            ) {
                toast.success(`5x revenue on your ${name}!`)
                tadaHighSound()
                // set store's bizRevenue[index] to x5
                setBizRevenue[index](bizRevenue[index] * 2)
            }

            addCoins(-currentPrice)
            addBizQuantities[index](buyQuantity)

            toast(`Purchased ${buyQuantity} ${name}!`, {
                icon: '🛒',
            })
            coinSound()

        } catch (error) {

        } finally {
            setIsLoading(false)
            setPlaybackRate(playbackRate + 0.1);
        }

    }

    return (
        <div
            onClick={isLoading ? undefined : () => purchaseHandler()}
            onMouseEnter={() => popSound()}
            onMouseLeave={() => stopPopSound()}
            className={`
                overflow-hidden
                border-[3px] border-slate-700 rounded-xl flex justify-between md:p-[0.5rem] sm:p-[4px] p-[5px] md:h-[45px] sm:h-[55px] h-[50px]
                ${isLoading
                    ? ('disabled hover:cursor-not-allowed bg-gray-400 hover:bg-gray-600')
                    : ('')
                }
                ${userCoins >= currentPrice && !isLoading ? (
                    'bg-orange-400 hover:cursor-pointer hover:bg-orange-500 hover:border-slate-600 hover:shadow-xl'
                ) : (
                    'bg-[#857d75] hover:cursor-not-allowed hover:bg-gray-600'
                )}
                
            `}
        >
            <div className="pr-[2px] sm:text-[12px] text-[10px]">Buy x{buyQuantity}</div>
            <div className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]">
                ${currentPriceFormatted}
            </div>
        </div>
    )
}

export default BuyButton