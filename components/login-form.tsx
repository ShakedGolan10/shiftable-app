'use client'

import { useForm } from '@/hooks/useForm'
import { useAuth } from './UserContextProvider';
import { useRouter } from 'next/navigation';


export function LoginForm({ toggleLoginModal }) {

    const [credentials, handleInputChange] = useForm<Credentials>({ email: '', password: '' })
    const { login } = useAuth();
    const router = useRouter()
    const onLogin = async (ev: React.FormEvent) => {
        ev.preventDefault()
        try {
            await login(credentials)
            router.push('/main')
        } catch (error) {

        }
    }
    return (
        <section className='login-modal'>

            <div onClick={toggleLoginModal} className={`back-screen fixed opacity-100 z-5 inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-300`}></div>

            <div className="fixed flex z-10 inset-0 overflow-y-auto min-h-fit min-w-fit items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg opacity-100 translate-y-0 sm:scale-100 ease-out duration-300`}>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">כניסה למערכת</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={onLogin} className="space-y-6" action="#" method="POST">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input value={credentials.email} onChange={handleInputChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input value={credentials.password} onChange={handleInputChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                            </div>
                        </form>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button onClick={() => toggleLoginModal()} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-red px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white sm:mt-0 sm:w-auto">Close</button>
                    </div>
                </div>
            </div>
        </section>

    )
}


// <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
// <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//     {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
//     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">כניסה למערכת</h2>
// </div>

// <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//     <form onSubmit={onLogin} className="space-y-6" action="#" method="POST">
//         <div>
//             <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
//             <div className="mt-2">
//                 <input value={credentials.email} onChange={handleInputChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//             </div>
//         </div>

//         <div>
//             <div className="flex items-center justify-between">
//                 <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
//                 <div className="text-sm">
//                     <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
//                 </div>
//             </div>
//             <div className="mt-2">
//                 <input value={credentials.password} onChange={handleInputChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//             </div>
//         </div>

//         <div>
//             <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
//         </div>
//     </form>

//     <p className="mt-10 text-center text-sm text-gray-500">
//         Not a member? Conatact us -
//         <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> 053-530-2345</a>
//     </p>
// </div>
// </div>