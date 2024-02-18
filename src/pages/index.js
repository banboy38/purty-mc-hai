import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Home() {

  const {register, handleSubmit} = useForm()
  const router = useRouter()

  function submitForm(data){
    // console.log(data);
    router.push(`/slotScheduling/${data.id}`)
  }

  return (
    <>
      <div>Login</div>
      <form onSubmit={handleSubmit(submitForm)}>
        <input required type='text' placeholder='Employee ID' {...register("id")} />
        <button>Submit</button>
      </form>
    </>

  );
}
