
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

//fetch data from db
const useFetchCollection = (collectionName) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  

    const getCollection = () => {
        setIsLoading(true);
    
        try {
          //get data from firestore db
          const docRef = collection(db, collectionName);
          //Order and limit data
          const q = query(docRef, orderBy("createdAt", "desc")); //query or order for products from db based on the time they were created but in descending order.
          //Listen to multiple documents in a collection
          onSnapshot(q, (snapshot) => {
            //onSnapShot helps us monitor the docs in our db
            //console.log(snapshot);
            //console.log(snapshot.docs);
            const allData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            //console.log(allData);
            setData(allData);
            setIsLoading(false);
          });
        } catch (error) {
          setIsLoading(false);
          toast.error(error.messsage);
        }
    };

    useEffect(() => {
      getCollection();
    }, []);
    
    return {data, isLoading};
      
}

export default useFetchCollection

