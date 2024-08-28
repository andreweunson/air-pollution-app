import { useState, useEffect } from "react";

function DataContainer() {
    const [ data, setData ] = useState([]);
    useEffect(() => {
        fetch("https://api.purpleair.com/v1/sensors/175509/?fields=name,pm2.5")
        .then(response => response.json())
        .then(data => {
            setData(data);})
        .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>PM2.5 Data</h1>
            <p>{data}</p>
        </div>
    );
}

export default DataContainer;