import React from 'react'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@/components/ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { maskAccountNumber } from '@/lib/utils';
import { withdrawalRequest } from '@/State/Withdrawal/Action';

const WithdrawalForm = () => {

  const dispatch = useDispatch();
  const {wallet, withdrawal} = useSelector(store => store);

  const [amount, setAmount] = React.useState('');

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(withdrawalRequest({amount, jwt:localStorage.getItem("jwt")}))
    console.log(amount);
  };

  return (
    <div className='pt-10 space-y-5'>
      <div className='flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4'>
        <p>Available balance</p>
        <p>${wallet.userWallet?.balance}</p>
      </div>

      <div className='flex flex-col items-center gap-2'>
        <h1>Enter withdrawal amount</h1>

        <div className='flex items-center justify-center'>

          <Input onChange={handleChange} value={amount} placeholder="Enter amount" type="number"
            className="withdrawalInput py-5 h-6 border-none outline-none focus:outline-none px-0 text-2xl text-center" />

        </div>
      </div>

      <div>
        <p className='pb-2'>Transfer to </p>

        <div className='flex items-center gap-5 border px-5 py-2 rounded-md'>

          <img className='h-8 w-8' src="data:image/png;base64,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" />

          <div>
            <p className='text-xl font-bold'>{withdrawal.paymentDetails?.bankName}</p>
            <p className='text-xs'>{maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}</p>
          </div>

        </div>
      </div>
      <DialogClose className="w-full">
        <button className="w-full h-12 py-1 bg-white rounded-md text-black text-xl" onClick={handleSubmit}>
          Withdraw
        </button>
      </DialogClose>

    </div>
  );
};

export default WithdrawalForm