import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useEffect } from 'react'
import PaymentDetailsForm from './PaymentDetailsForm'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentDetails } from '@/State/Withdrawal/Action'
import { maskAccountNumber } from '@/lib/utils'

const PaymentDetails = () => {
  const { withdrawal } = useSelector(store => store);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }))
  }, []);

  return (
    <div className='px-20'>
      <h1 className='text-2xl font-semibold py-6'>Payment Details</h1>
      {withdrawal.paymentDetails ? (<Card>
        <CardHeader>
          <CardTitle>
            {withdrawal.paymentDetails?.bankName.toUpperCase()}
          </CardTitle>
          <CardDescription>A/C Number : {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center'>
            <p className='w-32'>A/C Holder</p>
            <p className='text-[var(--grey)]'>: {withdrawal.paymentDetails?.accountHolderName}</p>
          </div>
          <div className='flex items-center'>
            <p className='w-32'>IFSC</p>
            <p className='text-[var(--grey)]'>: {withdrawal.paymentDetails?.ifsc.toUpperCase()}</p>
          </div>
        </CardContent>
      </Card>) : (
        <Dialog open={open} onOpenChange={setOpen}>

          <DialogTrigger asChild className="pt-4">
            <Button className="py-6 bg-white text-black">Add payment details</Button>
          </DialogTrigger>

          <DialogContent className="bg-[var(--purple2)]">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>)}

    </div>
  );
};

export default PaymentDetails