import React from "react";

function Header() {
  return (
    <header className="py-4 max-w-7xl px-20 mx-auto items-center flex justify-between">
      <a href="/">
        <img
          className="w-32"
          src="https://www.exsquared.com/hs-fs/hubfs/Canva%20images/0001-23648734599.png?width=600&name=0001-23648734599.png"
        ></img>
      </a>
      <ul className="flex gap-16">
        <li className="transition-all ease-linear hover:text-red-400 font-normal ">
          <a href="/country">Country</a>
        </li>
        <li className="transition-all ease-linear hover:text-red-400 font-normal">
          <a href="#">Symptoms</a>
        </li>
        <li className="transition-all ease-linear hover:text-red-400 font-normal">
          <a href="#">Patients</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
