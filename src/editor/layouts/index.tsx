import './index.css';
import { Header } from './header';
import { Material } from './material';
import { Stage } from './stage';
import { Setting } from './setting';

export const Layouts = () => {
  return (
    <div className="main">
      <div className="header-wrap">
        <Header/>
      </div>
      <div className="container">
        <div className="material-wrap">
          <Material/>
        </div>
        <div className="stage-wrap">
          <Stage/>
        </div>
        <div className="setting-wrap">
          <Setting/>
        </div>
      </div>
    </div>
  );
};