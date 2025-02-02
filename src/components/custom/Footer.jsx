import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#540561] text-white py-4 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Made by Kritika.
      </p>
    </footer>
  );
}

export default Footer