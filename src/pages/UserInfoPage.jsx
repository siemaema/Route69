import React from 'react'
import { useSelector } from 'react-redux';
export default function UserInfoPage() {
    const user = useSelector((state)=> state.user.currentUser || {})
  return (
    <div className='bg-neutral-900 rounded-3xl h-3/4 w-2/4 mx-auto text-yellow-400 items-center'>
        <h1 className='text-center'>Twoje Dane</h1>
        <h1 className='text-center'>Imie : {user.name}</h1>
        <h1 className='text-center'>Nazwisko : {user.surname}</h1>
        <h1 className='text-center'>Email : {user.email}</h1>
        <h1 className='text-center'>Adres : {user.adress.street} {user.adress.city} {user.adress.postalcode}</h1>
        <h1 className='text-center'>Numer telefonu : {user.phone}</h1>

    </div>
  )
}
