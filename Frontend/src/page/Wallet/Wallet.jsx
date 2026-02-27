import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import { CopyIcon, DollarSign, DownloadIcon, ShuffleIcon, UploadIcon, WalletIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import TopupForm from './TopupForm'
import WithdrawalForm from './WithdrawalForm'
import TransferForm from './TransferForm'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { depositMoney, getUserWallet, getWalletTransactions } from '@/State/Wallet/Action'
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector(store => store);
  const query = useQuery();
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id");
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchUserWallet();
    handleFetchWalletTransaction();
  }, []);

  useEffect(() => {

    if (orderId) {
      dispatch(depositMoney({
        jwt: localStorage.getItem("jwt"),
        orderId,
        paymentId: paymentId,
        navigate
      }))
    }
  }, [orderId, paymentId])

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")))
  };

  const handleFetchWalletTransaction = () => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }))
  }

  return (
    <div className="flex flex-col items-center">
      <div className='pt-10 w-full lg:w-[60%]'>

        <Card>
          <CardHeader className="pb-9">
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-5'>
                <WalletIcon size={30} />
                <div>
                  <CardTitle className="text-2xl">My Wallet</CardTitle>
                  <div className='flex items-center gap-2'>
                    <p className='text-gray-200 text-sm'>
                      #{wallet.userWallet?.id}
                    </p>
                    <CopyIcon size={17} className='cursor-pointer hover:text-slate-300' />
                  </div>
                </div>
              </div>
              <div>
                <ReloadIcon onClick={handleFetchUserWallet} className='w-6 h-6 cursor-pointer hover:text-gray-400' />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex items-center'>
              <DollarSign />
              <span className='text-2xl font-semibold'>{wallet.userWallet?.balance}</span>
            </div>
            <div className='flex gap-7 mt-5'>
              <Dialog>
                <DialogTrigger>
                  <div className='h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-gray-700 shadow-md'>
                    <UploadIcon />
                    <span className='text-sm mt-2'>Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Top Up Your Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TopupForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className='h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-gray-700 shadow-md'>
                    <DownloadIcon />
                    <span className='text-sm mt-2'>Withdraw Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <div className='h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-gray-700 shadow-md'>
                    <ShuffleIcon />
                    <span className='text-sm mt-2'>Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Transfer To Other Wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <div className='py-5 pt-10'>
          <div className='flex gap-2 items-center pb-5'>
            <h1 className='text-2xl font-semibold'> History </h1>
            <UpdateIcon className='h-6 w-6 p-0 cursor-pointer hover:text-gray-400' />
          </div>

          <div className='space-y-2'>

            {wallet.transactions?.map((item, i) => <div key={i}>
              <Card className="px-5 flex justify-between items-center p-2">
                <div className='flex w-full items-center gap-5'>

                  <Avatar onClick={handleFetchWalletTransaction}>
                    <AvatarFallback>
                      <ShuffleIcon />
                    </AvatarFallback>
                  </Avatar>

                  <div className='w-full space-y-1'>
                    <h1>{item.type || item.purpose}</h1>
                    <p className='text-sm text-[var(--grey)]'>{item.date}</p>
                  </div>

                  <div className='w-fit'>
                    <p className='text-[var(--green)]'>
                      <span>{item.amount}&nbsp;</span>
                      <span>USD</span>
                    </p>
                  </div>

                </div>
              </Card>
            </div>
            )}

          </div>
        </div>
      </div>

    </div>
  )
}

export default Wallet