import React from 'react'
import './MyOrders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
const MyOrders = () => {

    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const availableOutlets = [
        {
            x:0,
            y:0,
            name:"Outlet1"
        },
        {
            x:0,
            y:19,
            name:"Outlet2"
        },
        {
            x:19,
            y:0,
            name:"Outlet3"
        },
        {
            x:19,
            y:19,
            name:"Outlet4"
        },
    ]

    const shortestPath = (sourceX, sourceY) => {
        try{
            const distance = Array.from({length:20},()=>Array(20).fill(Infinity))
            const visited = Array.from({length:20},()=>Array(20).fill(0))
            visited[sourceX][sourceY] = 1;
            distance[sourceX][sourceY] = 0;
            const queue = [];
            queue.push([0,sourceX,sourceY]);

            const row = [0,-1,0,1];
            const col = [-1,0,1,0];

            while(queue.length > 0){
                const [dist, x, y] = queue.shift();

                for(let i=0; i<4; i++){
                    const r = x+row[i];
                    const c = y+col[i];
                    if(r>=0 && r<20 && c>=0 && c<20){
                        if(visited[r][c] == 0 && dist+1 < distance[r][c]){
                            distance[r][c] = dist+1;
                            queue.push([dist+1, r, c]);
                            visited[r][c] = 1;
                        }
                    }
                }
            }
            return distance;
        }catch(error){
            console.log("function error" )
        }
    }

    const calculate = (sourceX, sourceY) => {

        sourceX = Number(sourceX);
    sourceY = Number(sourceY);
        // Validate input coordinates: must be integers within the grid
        if (!Number.isInteger(sourceX) || !Number.isInteger(sourceY) || sourceX < 0 || sourceY < 0 || sourceX >= 20 || sourceY >= 20) {
            return null;
        }

        try {
            const dist = shortestPath(sourceX, sourceY);
            let minDistance = Infinity;
            let nearestOutlet = null;

            for (const outlet of availableOutlets) {
                // Guard against malformed outlet coords or missing distance rows
                if (!outlet || typeof outlet.x !== 'number' || typeof outlet.y !== 'number') continue;
                if (!dist || !dist[outlet.x] || typeof dist[outlet.x][outlet.y] !== 'number') continue;

                const d = dist[outlet.x][outlet.y];
                if (d < minDistance) {
                    minDistance = d;
                    nearestOutlet = outlet.name;
                }
            }
            return nearestOutlet;
        } catch (err) {
            console.error('calculate error:', err);
            return null;
        }
    }

   


    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders", {},{headers:{token}});
        setData(response.data.data);
        
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])


  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index) => {
                const nearest = order && order.address ? calculate(order.address.srcX, order.address.srcY) : null;
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, index)=>{
                            if(index === order.items.length-1){
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+", "
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b> </p>
                        {nearest && (
                            <p>
                                from {nearest}
                            </p>
                        )}
                        

                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders