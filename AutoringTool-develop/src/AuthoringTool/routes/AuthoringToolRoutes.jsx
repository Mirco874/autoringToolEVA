import {Routes,Route} from 'react-router-dom';
import { EditorPage } from '../pages';

export const AuthoringToolRoutes = () => {
  return (
<>
        <Routes>
            <Route path='' element={<EditorPage/>}/>
        </Routes>
</>
  )
}
