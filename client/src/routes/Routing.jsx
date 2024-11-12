// src/routes.js
import { Routes, Route } from 'react-router-dom'
import Admin from '@/pages/Admin'
import Home from '@/pages/Home'
import Auth from '@/pages/Auth'
import Personal from '@/pages/Personal'
import Dashboard from '@/pages/Admin/Dashboard/Dashboard'
import Setting from '@/pages/Admin/Setting/Setting'
import Login from '@/pages/Auth/Login/Login'
import Register from '@/pages/Auth/Register/Register'
import Favorites from '@/pages/Home/Favorites/Favorites'
import Main from '@/pages/Home/Main/Main'
import PrivateRoute from './PrivateRoute'
import Verify from '@/pages/Auth/Verify/Verify'
import NotFoundPage from '@/pages/Error/NotFoundPage'
import PublicRoute from './PublicRoute'
import Search from '@/pages/Search'
import Summary from '@/pages/Search/Summary/Summary'
import AllUser from '@/pages/Search/AllUsers/AllUser'
import ViewPost from '@/pages/Home/ViewPost/ViewPost'
import MyPersonal from '@/pages/Personal/MyProfile/MyPersonal'
import UserPersonal from '@/pages/Personal/Other/UserPersonal'
import Chat from '@/pages/Chat'
import User from '@/pages/Admin/User/User'
import AdminRoute from './AdminRoute'
import UsersTable from '@/pages/Admin/User/Content/UsersTable'
import EditUserForm from '@/pages/Admin/User/Content/EditUserForm'
import Report from '@/pages/Admin/Report/Report'
import Violations from '@/pages/Admin/Report/Violation/Violations/Violations'
import UserViolations from '@/pages/Admin/Report/Violation/Violations/UserViolations'
import ResolvedReports from '@/pages/Admin/Report/Reports/Resolved/ResolvedReports'
import PendingReportS from '@/pages/Admin/Report/Reports/Pending/PendingReports'
import Violation from '@/pages/Admin/Report/Violation/Violation'
import SpamViolations from '@/pages/Admin/Report/Violation/SpamViolations/SpamViolations'
import History from '@/pages/Admin/Report/History/History'
import Trash from '@/pages/Home/Trash/Trash'
import ReProcessReport from '@/pages/Admin/Report/Reports/ReProcess/ReProcessReport'

function Routing() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />}>
          <Route path='/' element={<Main />} />
          <Route path='favorite' element={<Favorites />} />
          <Route path='trash' element={<Trash />} />
          <Route path='post/:postId' element={<ViewPost />} />
        </Route>
        <Route path='/chat' element={<Chat />} />
        <Route path='/personal' element={<Personal />}>
          <Route path='/personal' element={<MyPersonal />} />
          <Route path='/personal/:userId' element={<UserPersonal />} />
        </Route>
        <Route path='/search/:query' element={<Search />}>
          <Route path='/search/:query' element={<Summary />} />
          <Route path='/search/:query/people' element={<AllUser />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route path='/admin' element={<Admin />}>
          <Route path='/admin/' element={<Dashboard />} />
          <Route path='/admin/user' element={<User />}>
            <Route path='/admin/user' element={<UsersTable />} />
            <Route path='/admin/user/:userID' element={<EditUserForm />} />
          </Route>
          <Route path='/admin/report' element={<Report />}>
            <Route path='/admin/report/pending' element={<PendingReportS />} />
            <Route path='/admin/report/reprocess' element={<ReProcessReport />} />
            <Route path='/admin/report/resolved' element={<ResolvedReports />} />
          </Route>
          <Route path='/admin/violation' element={<Violation />}>
            <Route path='/admin/violation/reported' element={<Violations />} />
            <Route path='/admin/violation/reported/:userId' element={<UserViolations />} />
            <Route path='/admin/violation/spamViolation' element={<SpamViolations />} />
          </Route>
          <Route path='/admin/history' element={<History />} />

          <Route path='/admin/setting' element={<Setting />} />
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route path='/auth' element={<Auth />}>
          <Route path='/auth' element={<Login />} />
          <Route path='/auth/signup' element={<Register />} />
          <Route path='/auth/verify' element={<Verify />} />
        </Route>
      </Route>
      {/* Route for 404 Not Found */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default Routing
