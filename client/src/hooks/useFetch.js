import axiosInstance from "@/helper/axiousInstance";
import { useEffect, useState } from "react"

export const useFetch =  (url, options={}, dependencies = []) => {

	const [data, setData] = useState();
	const [loading, setloading] = useState(false)
	const[error, setError] = useState()

	
	useEffect(()=>{
		const fetData = async () => {
			setloading(true)
			
			try {
				const response = await axiosInstance.get(url, options)				
				// console.log("response Data",response.data.data);
				
				if(!response.data.success){
					throw new Error("Failed to fetch data")
				}
				
				setData(response.data)
				setError()

			} catch (error) {
				setError(error)
			}finally{
				setloading(false)
			}

		}
		fetData()
	},dependencies)	
	
	return {data, loading, error}
}


