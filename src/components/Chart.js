import React, { useContext, useLayoutEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CryptoContext } from '../context/CryptoContext';

function CustomTooltip({ payload, label, active, currency }) {
    if (active && payload && payload.length > 0) {
        return (
            <div className="custom-tooltip">
                <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 5,
                }).format(payload[0].value)
                    }`}</p>
            </div>
        )
    }
}

const ChartComponent = ({ data, currency, type }) => {

    return (
        <ResponsiveContainer height={"90%"}>
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey={type} stroke='#14ffec' strokeWidth={"1px"} />
                <CartesianGrid stroke='#323232' />
                <XAxis dataKey="date" hide />
                <YAxis dataKey={type} hide domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip currency={currency} />} cursor={false} wrapperStyle={{ outline: "none" }} />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    )
}

const Chart = ({ id }) => {
    let { currency } = useContext(CryptoContext);
    const [chartData, setChartData] = useState();
    const [type, setType] = useState("prices");
    const [days, setDays] = useState(7);

    useLayoutEffect(() => {
        const getChartData = async (id) => {
            try {
                const data = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}&interval=daily`
                ).then(res => res.json()).then(json => json);

                let convertedData = data[type].map(item => {
                    return {
                        date: new Date(item[0]).toLocaleDateString(),
                        [type]: item[1],
                    }
                }
                )

                setChartData(convertedData);
            } catch (error) {
                console.log(error);
            }
        }

        getChartData(id);
    }, [id, type, days])

    return (
        <div className=' w-full h-[60%]'>
            <ChartComponent currency={currency} data={chartData} type={type} />
            <div className=' flex'>
                <button className={` text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === "prices" ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setType("prices")}>Price</button>
                <button className={` text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === "market_caps" ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setType("market_caps")}>Market cap</button>
                <button className={` text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === "total_volumes" ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setType("total_volumes")}>total volume</button>

                <button className={` text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${days === 7 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setDays(7)}>7d</button>
                <button className={` text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${days === 14 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setDays(14)}>14d</button>
                <button className={` text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${days === 30 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setDays(30)}>30d</button>
            </div>
        </div>
    )
}

export default Chart