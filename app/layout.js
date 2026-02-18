import './globals.css'
import Navbar from '../components/Navbar'


export const metadata = {
  title: 'Smart Bookmark App'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        {children}
      </body>
    </html>
  )
}