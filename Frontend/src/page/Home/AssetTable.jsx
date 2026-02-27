import React, { useEffect } from 'react'
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useNavigate } from 'react-router-dom'
import { getCoinList } from '@/State/Coin/Action'
import { useDispatch } from 'react-redux'
import { ScrollArea } from '@/components/ui/scroll-area'

const AssetTable = ({ coin, category }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (

        <Table>
            <ScrollArea className={category == "all" ? "h-[65vh] " : "h-[82vh]"}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Coin</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Market Cap</TableHead>
                        <TableHead>24Hr (%)</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {coin.map((item, index) => <TableRow key={item.id}>
                        <TableCell onClick={() => navigate(`/market/${item.id}`)} className="font-medium items-center flex gap-2">
                            <Avatar>
                                <AvatarImage src={item.image} />
                            </Avatar>
                            <span>{item.name}</span>
                        </TableCell>
                        <TableCell className="text-left">{item.symbol}</TableCell>
                        <TableCell className="text-left">{item.total_volume}</TableCell>
                        <TableCell className="text-left">{item.market_cap}</TableCell>
                        <TableCell className="text-left">{item.price_change_percentage_24h}</TableCell>
                        <TableCell className="text-right">${item.current_price}</TableCell>
                    </TableRow>)}

                </TableBody>
            </ScrollArea>
        </Table>
    )
}

export default AssetTable;
