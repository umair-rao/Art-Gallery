'use client'


import { UserAuth } from "../context/AuthContext";


const Navbar = () => {

  const { user, googleSignIn, logOut } = UserAuth();

  const handleSignIn = async () =>  {
      try {
          await googleSignIn();
      } catch (error) {
          console.log(error)
      }
  }

  const handleSignOut = async () => {
      try {
          await logOut()
      } catch (error) {
          console.log(error)
      }
  };


  return (
    <div className="flex justify-between items-center pl-10 pr-10 h-14 bg-teal sticky top-0">
      <div className="flex cursor-pointer">
        <img src="/zimo-icon.png" alt="Zimo-icon" />
        <h1>Zimo Art Gallery</h1>
      </div>
      <div>
      {!user ? (      <ul className="flex">
        <li onClick={handleSignIn} className="pr-5 cursor-pointer hover:text-2xl hover:text-white">
            Login / SignUp
        </li>
      </ul>) : (
        <div>
            <p>User: {user.displayName}</p>
            <p className="cursor-pointer" onClick={handleSignOut} >Sign out</p>
        </div>
      ) }
      </div>
    </div>
  )
}

export default Navbar
