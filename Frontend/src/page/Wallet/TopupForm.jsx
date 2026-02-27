import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { paymentHandler } from '@/State/Wallet/Action'
import { DotFilledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useDispatch } from 'react-redux'

const TopupForm = () => {
  const [amount, setAmount] = React.useState('');

  const [paymentMethod, setPaymentMethod] = React.useState("STRIPE");

  const dispatch = useDispatch();

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    console.log(amount, paymentMethod);
    dispatch(paymentHandler({ jwt: localStorage.getItem("jwt"), 
      paymentMethod,
      amount
    }))
  };

  return (
    <div className='pt-10 space-y-5'>

      <div>
        <h1 className='pb-1'> Enter Amount </h1>
        <Input
          onChange={handleChange}
          value={amount}
          className="py-7 text-lg"
          placeholder="$100" />
      </div>

      <div>
        <h1 className='pb-1'>Select payment method</h1>
        <RadioGroup onValueChange={(value) => handlePaymentMethodChange(value)} className="flex" defaultValue="STRIPE">
          <div className='flex h-12 items-center space-x-2 border px-3 rounded-md'>
            <RadioGroupItem icon={DotFilledIcon} className="h-5 w-5" value="STRIPE" id="r1" />
            <Label htmlFor="r1">
              <div className='bg-white h-7 rounded-md px-5 py-1 w-22'>
                <img className="h-5" src="data:image/png;base64,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" />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button className="w-full py-7 bg-white text-black text-xl" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default TopupForm