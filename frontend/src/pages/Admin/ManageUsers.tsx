
import TableAllUsers from '../../components/Admin/TableAllUsers'

const ManageUser = () => {
  return (
    <>
      <div className="w-full p-4">
        <h1 className="text-xl font-bold">จัดการผู้ใช้งาน</h1>
        <div className="mx-auto mt-5">
        <TableAllUsers />
        </div>
    </div>
    </>
  )
}

export default ManageUser