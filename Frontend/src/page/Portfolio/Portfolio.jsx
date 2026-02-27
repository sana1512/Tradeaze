import React, { useEffect } from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAssets } from '@/State/Asset/Action'


const Portfolio = () => {
    const dispatch = useDispatch();
    const {asset} = useSelector(store => store)

    useEffect(() => {
        dispatch(getUserAssets(localStorage.getItem("jwt")))
    },[])
    
  return (
    <div className='p-5 lg:p-20 '>
      <h1 className='font-medium text-2xl mb-4'>Portfolio</h1>
      <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Change(%)</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {asset.userAssets.map((item,index) => <TableRow key={index}>
                    <TableCell className="font-medium items-center flex gap-2">
                        <Avatar>
                            <AvatarImage src={item.coin.image} />
                        </Avatar>
                        <span>{item.coin.name}</span>
                    </TableCell>
                    <TableCell className="text-left">{item.coin.symbol.toUpperCase()}</TableCell>
                    <TableCell className="text-left">{item.coin.current_price}</TableCell>
                    <TableCell className="text-left">{item.quantity}</TableCell>
                    {/* <TableCell className="text-left">{item.coin.price_change_24h}</TableCell>
                    <TableCell className="text-left">{item.coin.price_change_percentage_24h}</TableCell> */}

                    <TableCell
                    className={`${
                      item.coin.price_change_percentage_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.coin.price_change_24h}
                  </TableCell>
                  <TableCell
                    className={`${
                      item.coin.price_change_percentage_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.coin.price_change_percentage_24h}%
                  </TableCell>

                  
                    <TableCell className="text-right">{item.coin.current_price * item.quantity}</TableCell>
                </TableRow>)}
                
            </TableBody>
        </Table>
    </div>
  )
}

export default Portfolio