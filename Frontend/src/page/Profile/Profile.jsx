import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { VerifiedIcon } from 'lucide-react'
import React from 'react'
import AccountVerificationForm from './AccountVerificationForm'
import { useSelector } from 'react-redux'


const Profile = () => {

  const {auth} = useSelector(store=>store);

  const handleTwoStepVerification=()=>{
    console.log("Two step verification")
  }

  return (
    <div className='flex flex-col items-center mb-5'>

      <div className='pt-10 w-full lg:w-[60%]'>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='lg:flex gap-36'>
              <div className='space-y-7'>
                <div className='flex'>
                  <p className='w-[9rem]'>Email : </p>
                  <p className='text-[var(--grey)]'>{auth.user?.email}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Full Name : </p>
                  <p className='text-[var(--grey)]'>{auth.user?.fullname}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>D.O.B : </p>
                  <p className='text-[var(--grey)]'>1999-12-31</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Nationality : </p>
                  <p className='text-[var(--grey)]'>Indian</p>
                </div>
              </div>
              <div className='space-y-7'>
                <div className='flex'>
                  <p className='w-[9rem]'>Address : </p>
                  <p className='text-[var(--grey)]'>sandy resides</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>City : </p>
                  <p className='text-[var(--grey)]'>Etobicoke</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Postal code : </p>
                  <p className='text-[var(--grey)]'>L6P 1J2</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Country : </p>
                  <p className='text-[var(--grey)]'>India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='mt-6 pt-3'>
          <Card className='w-full'>
            <CardHeader className="pb-7">
              <div className='flex items-center gap-3'>
                <CardTitle>2 Step Verification</CardTitle>
                {true ? <Badge className='sp-x-2 text-white bg-green-600'>
                  <VerifiedIcon />
                  <span>
                    Enabled
                  </span>
                </Badge> :
                  <Badge className='bg-orange-500'>
                    Disabled
                  </Badge>}
              </div>
            </CardHeader>

            <CardContent>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button className='bg-white text-black'>
                      Enable Two Step Verification
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='bg-[var(--purple)]'>
                    <DialogHeader>
                      <DialogTitle>Verify your account</DialogTitle>
                    </DialogHeader>

                    <AccountVerificationForm handleSubmit={handleTwoStepVerification}/>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default Profile