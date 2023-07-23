import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHouse,
    faUserGroup,
    faMoneyCheckDollar,
    faFilm,
    faRightFromBracket
 } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const SidebarAdmin = () => {
  return (
    <>
<aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2" style={{height: '90.5vh'}} x-show="asideOpen">
  <Link to="/admin/" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
    <span className="text-2xl"><i className="bx bx-home" /></span>
    <FontAwesomeIcon icon={faHouse} />
    <span className="pl-2">แดชบอร์ด</span>
  </Link>
  <Link to="/admin/manageusers" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
    <span className="text-2xl"><i className="bx bx-cart" /></span>
    <FontAwesomeIcon icon={faUserGroup} />
    <span className="pl-2">จัดการผู้ใช้งานระบบ</span>
  </Link>
  <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
    <span className="text-2xl"><i className="bx bx-shopping-bag" /></span>
    <FontAwesomeIcon icon={faFilm} />
    <span className="pl-2">จัดการภาพยนตร์</span>
  </a>
  <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
    <span className="text-2xl"><i className="bx bx-heart" /></span>
    <FontAwesomeIcon icon={faMoneyCheckDollar} />
    <span className="pl-2">การเงิน</span>
  </a>
  <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
    <span className="text-2xl"><i className="bx bx-user" /></span>
    <FontAwesomeIcon icon={faRightFromBracket} />
    <span className="pl-2">ออกจากระบบ</span>
  </a>
</aside>

    </>
  )
}

export default SidebarAdmin