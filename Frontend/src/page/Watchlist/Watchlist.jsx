import React, { useEffect } from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useDispatch } from 'react-redux'
import { addItemToWatchlist, getUserWatchlist } from '@/State/Watchlist/Action'
import { useSelector } from 'react-redux';
import { existInWatchlist } from '@/lib/utils'

const Watchlist = () => {
  const {watchlist} = useSelector(store => store)
  const dispatch = useDispatch();
  const handleRemoveFromWatchlist = (value) => {
    dispatch(addItemToWatchlist({coinId:value, jwt:localStorage.getItem("jwt")}))
    console.log(value);
  };

  useEffect(()=>{
    dispatch(getUserWatchlist(localStorage.getItem("jwt")))
  },[])

  return (
    <div className='p-5 lg:p-20 '>
      <h1 className='font-medium text-2xl mb-4'>Watchlist</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="py-5">Coin</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>24Hr</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right text-[#e52020]">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.items.map((item, index) => <TableRow key={index}>
            <TableCell className="font-medium items-center flex gap-2">
              <Avatar>
                <AvatarImage src={item.image} />
              </Avatar>
              <span>{item.name}</span>
            </TableCell>
            <TableCell className="text-left">{item.symbol}</TableCell>
            <TableCell className="text-left">{item.total_volume}</TableCell>
            <TableCell className="text-left">{item.market_cap}</TableCell>
            <TableCell className="text-left">{item.price_change_percentage_24h}%</TableCell>
            <TableCell className="text-left">${item.current_price}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => handleRemoveFromWatchlist(item.id)} size="icon" className="h-10 w-10">
                
                <BookmarkFilledIcon />
              </Button>
            </TableCell>
          </TableRow>)}

        </TableBody>
      </Table>
    </div>
  )
}

export default Watchlist