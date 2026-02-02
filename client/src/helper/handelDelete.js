import axiosInstance from "./axiousInstance";


export const deletedata = async(endpoint)=>{
	if(!window.confirm("Are you sure you want to delete?")) return false;
	
	try {
		const {data} = await axiosInstance.delete(endpoint);
		
		if(!data.success){
		    alert(data.message || "Failed to delete");
			return false;
		}

		return true
	} catch (error) {
		console.log(error)
		return false
	}

}