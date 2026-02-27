import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import AssetTable from './AssetTable'
import StockChart from './StockChart'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Cross1Icon, DotIcon } from '@radix-ui/react-icons'
import { MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { getCoinList, getTop50CoinList } from '@/State/Coin/Action'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"


const Home = () => {
    const [category, setCategory] = React.useState("all")
    const [inputValue, setInputValue] = React.useState("");
    const [isBotRelease, setIsBotRelease] = React.useState(false);
    const { coin } = useSelector(store => store);
    const dispatch = useDispatch();

    const handleBotRelease = () => setIsBotRelease(!isBotRelease);

    const handleCategory = (value) => {
        setCategory(value)
    };
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleKeyPress = (event) => {
        if (event.key == "Enter") {
            console.log(inputValue);
        }
        setInputValue("");
    };

    useEffect(() => {

        dispatch(getTop50CoinList())
    }, [category])

    useEffect(() => {
        dispatch(getCoinList(1))
    }, [])

    return (
        <div className='relative'>
            <div className='lg:flex'>
                <div className='lg:w-[50%] lg:border-r'>
                    <div className='p-3 flex items-center gap-4'>
                        <Button onClick={() => handleCategory("all")}
                            variant={category == "all" ? "default" : "outline"}
                            className="rounded-full">All</Button>

                        <Button onClick={() => handleCategory("top50")}
                            variant={category == "top50" ? "default" : "outline"}
                            className="rounded-full">Top 50</Button>

                        <Button onClick={() => handleCategory("topGainers")}
                            variant={category == "topGainers" ? "default" : "outline"}
                            className="rounded-full">Top Gainers</Button>

                        <Button onClick={() => handleCategory("topLosers")}
                            variant={category == "topLosers" ? "default" : "outline"}
                            className="rounded-full">Top Losers</Button>
                    </div>
                    <AssetTable coin={category == "all" ? coin.coinList : coin.top50} category={category} />
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
                <div className='hidden lg:block lg:w-[50%] p-5'>
                    <StockChart coinId={"bitcoin"} />

                    <div className='flex gap-5 items-center'>
                        <div>
                            <Avatar className='w-12 h-12'>
                                <AvatarImage className='w-12 h-12' src={"data:image/png;base64,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"} />
                            </Avatar>
                        </div>
                        <div>
                            <div className='flex items-center gap-2'>
                                <p>ETH</p>
                                <DotIcon className='text-gray-400' />
                                <p className='text-gray-400'>Ethereum</p>
                            </div>
                            <div className='flex items-end gap-2'>
                                <p className='text-xl font-bold'> 5464</p>
                                <p className='text-[var(--red)]'>
                                    <span>-1319049822.578</span>
                                    <span>(-0.29803%)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className='fixed bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2'>

                {isBotRelease &&
                    <div className='rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900'>
                        <div className='flex justify-between items-center border-b px-6 h-[12%]'>
                            <p>Chat Bot</p>
                            <Button onClick={handleBotRelease} variant="ghost" size="icon">
                                <Cross1Icon />
                            </Button>
                        </div>
                        <div className='h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container'>
                            <div className='self-start pb-5 w-auto'>
                                <div className='justify-end text-left self-end px-5 py-2 rounded-md bg-slate-800 w-auto'>
                                    <p>hi, Ram Arora</p>
                                    <p>you can ask crypto related any question</p>
                                    <p>like, price, market cap extra...</p>
                                </div>
                            </div>

                            {
                                [1, 1, 1, 1, 1, 1, 1, 1].map((item, i) => (<div key={i} className={`${i % 2 == 0 ? "self-start" : "self-end"} "pb-5 w-auto"`}>
                                    {i % 2 == 0 ? <div className='justify-end text-left self-end px-5 py-2 rounded-md bg-slate-800 w-auto'>
                                        <p>prompt who are you</p>
                                    </div> :
                                        <div className='justify-end text-left self-end px-5 py-2 rounded-md bg-slate-800 w-auto'>
                                            <p>This is answer</p>
                                        </div>
                                    }
                                </div>))
                            }

                        </div>
                        <div className='h-[12%] border-t '>
                            <Input className="w-full h-full border-none outline-none" placeholder="Type your message"
                                onChange={handleChange} value={inputValue} onKeyPress={handleKeyPress} />
                        </div>
                    </div>}

                <div className="relative w-[10rem] cursor-pointer group">

                    <Button variant="outline" onClick={handleBotRelease}
                        className="w-full h-[3rem] flex gap-2 items-center justify-center">
                        <MessageCircle size={36} className="fill-[#b698da] -rotate-90 stroke-none group-hover:fill-[#1a1a1a] flez-shrink-0" />
                        <span className='text-xl'>Chat Bot</span>
                    </Button>
                </div>

            </section>
        </div>
    )
}

export default Home;