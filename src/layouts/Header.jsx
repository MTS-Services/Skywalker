import React from "react";

export const Header = () => {
  return (
    <div className="text-2xl font-bold text-red-800">
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-white">
          <div className="text-xl font-semibold">Your Logo</div>
          <div className="space-x-6">
            <a href="/" className="hover:text-gray-400">
              Home
            </a>
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
            <a href="/services" className="hover:text-gray-400">
              Services
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
          </div>
        </div>
      </nav>{" "}
    </div>
  );
};
