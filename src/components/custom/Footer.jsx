import React from 'react'

function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 py-6 text-center text-muted-foreground">
      <p className="text-sm">
        © {new Date().getFullYear()} Made by Kritika.
      </p>
    </footer>
  );
}

export default Footer