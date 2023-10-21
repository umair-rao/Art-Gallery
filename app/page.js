'use client'

import { UserAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import WelcomePage from "./components/WelcomePage";
import DisplayPage from "./components/DisplayPage";

export default function Home() {

  const { user } = UserAuth();

  return (
    <main>
      <Navbar/>
      {user ? (<DisplayPage/>) : (<WelcomePage/>)}
    </main>
  )
}
