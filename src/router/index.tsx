import { createHashRouter } from 'react-router-dom';
import { Layouts } from '../editor/layouts';
import { Preview } from '../preview';

const router = createHashRouter([
  {
    path: '/',
    element: <Layouts/>,
  },
  {
    path: '/preview',
    element: <Preview/>
  }
]);

export default router;