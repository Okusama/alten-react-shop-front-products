const getHeader = (data: any) => {

    return {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    }

}

export const fetchRoute:any = async (url: string, data: any) => {

    try {
        const header = data.length > 0 ? getHeader(data) : {};
        const response = await fetch(url, header);
        if (!response.ok){ console.error(`HTTP error status: ${response.status}`)}
        return await response.json();
    } catch (err: any){
        console.error(`Fetch error: ${err.message}`);
    }

}