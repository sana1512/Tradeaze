import React, { useEffect } from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForUser } from '@/State/Order/Action'
import { calculateProfit } from '@/lib/utils'

const Activity = () => {
  const dispatch = useDispatch();
  const {order} = useSelector(store => store)

  useEffect(() => {
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }))
  }, [])
  return (
    <div className='p-5 lg:p-20 '>
      <h1 className='font-medium text-2xl mb-4'>Activity</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="py-5">Date & Time</TableHead>
            <TableHead>Coin</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Order Type</TableHead>
            <TableHead>Profit/Loss</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.orders.map((item, index) =>
            <TableRow key={index}>
              <TableCell className="text-left">
                <p>2025/05/31</p>
                <p className='text-gray-400'>12:39:32</p>
              </TableCell>
              <TableCell className="font-medium items-center flex gap-2">
                <Avatar>
                  <AvatarImage src={item.orderItem.coin.image} />
                </Avatar>
                <span>{item.orderItem.coin.name}</span>
              </TableCell>
              <TableCell className="text-left">${item.orderItem.coin.buyPrice}</TableCell>
              <TableCell className="text-left">${item.orderItem.coin.sellPrice}</TableCell>
              <TableCell className="text-left">{item.orderType}</TableCell>
              <TableCell className="text-left">{calculateProfit(item)}</TableCell>
              <TableCell className="text-right">${item.price}</TableCell>
            </TableRow>)}

        </TableBody>
      </Table>
    </div>
  )
}

export default Activity