import React, { useEffect } from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getWithdrawalHistory } from '@/State/Withdrawal/Action'

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { wallet, withdrawal} = useSelector(store => store)

  useEffect(()=>{
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")))
  }, [])
  return (
    <div className='p-5 lg:px-20 '>
      <h1 className='font-medium text-2xl mb-4'>Withdrawal</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="py-5">Date & Time</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawal.history.map((item, index) => 
          <TableRow key={index}>
            <TableCell className="text-left">
              <p>{item.date.toString()}</p>
            </TableCell>
            
            <TableCell className="text-left">Bank Account</TableCell>
            <TableCell className="text-left">${item.amount}</TableCell>
            <TableCell className="text-right">{item.status}</TableCell>
          </TableRow>)}

        </TableBody>
      </Table>
    </div>
  )
}

export default Withdrawal