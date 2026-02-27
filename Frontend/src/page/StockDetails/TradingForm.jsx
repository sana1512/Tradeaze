// import React from 'react'

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DotIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserWallet } from '@/State/Wallet/Action'
import { getAssetDetails } from "@/State/Asset/Action"
import { payOrder } from "@/State/Order/Action"


const TradingForm = () => {
  const [orderType, setOrderType] = useState("BUY")
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { coin, wallet, asset } = useSelector(store => store);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const amount = e.target.value;
    setAmount(amount);
    const volume = calculateBuyCost(
      amount,
      coin.coinDetails.market_data.current_price.usd,
    );
    setQuantity(volume)
  };

  const calculateBuyCost = (amount, price) => {
    let volume = amount / price;
    let decimalPlaces = Math.max(2, price.toString().split(".")[0].length)
    return volume.toFixed(decimalPlaces);
  };

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(getAssetDetails({ coinId: coin.coinDetails.id, jwt: localStorage.getItem("jwt") }));
  }, [])

  const handleBuyCrypto = () => {
    dispatch(payOrder({
      jwt: localStorage.getItem("jwt"),
      amount,
      orderData: {
        coinId: coin.coinDetails?.id,
        quantity,
        orderType
      },
    }))
  }
  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 focus:outline-none"
            placeholder="Enter Amount..."
            onChange={handleChange}
            type="number"
            name="amount" />
          <div>
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">{quantity}</p>
          </div>
        </div>
        {true && <h1 className="text-[var(--red)] text-center pt-4">Insufficient wallet balance</h1>}
      </div>

      <div className="flex gap-5 items-center">

        <div>
          <Avatar>
            <AvatarImage src={""} />
          </Avatar>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p>BTC</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">Bitcoin</p>
          </div>

          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">${coin.coinDetails.market_data.current_price.usd}</p>
            <p className="text-[var(--red)]">
              <span>-131598742655.2697</span>
              <span>(-0.29841%)</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p>{orderType == "BUY" ? "Available cash" : "Available Quantity"}</p>
        <p>
          {orderType == "BUY" ? "$" + wallet.userWallet?.balance : (asset.assetDetails?.quantity || 0)}
        </p>
      </div>

      <div>
        <Button
          onClick={handleBuyCrypto}
          className={`"w-full py-4" ${orderType == "SELL" ? "w-full bg-[var(--red)] text-white" : "w-full bg-[#94c61f] text-[var(--purple)]"}`}>
          {orderType}
        </Button>

        <Button
          variant="link"
          className="w-full mt-5 text-lg"
          onClick={() => setOrderType(orderType == "BUY" ? "SELL" : "BUY")}>
          {orderType == "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  )
}

export default TradingForm