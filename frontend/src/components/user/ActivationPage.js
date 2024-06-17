import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


const ActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`http://localhost:4000/api/v1/activation`, {
                        activation_token
                    });
                    console.log(res.data.message)
                } catch (error) {
                    console.log(error.response.data.message)
                    setError(true)
                }
            };
            activationEmail();
        }
    }, [activation_token])

    return (
        <div className='w-full h-screen flex justify-center items-center text-sm font-semibold'>
            {
                error ? (
                    <p>Your token is Expired!!</p>
                ) : (
                    <p>Account is creaed successfully</p>
                )
            }
        </div>
    )
}

export default ActivationPage;