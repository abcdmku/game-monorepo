import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface gameIconProps {
  icon?: JSX.Element;
  children?: JSX.Element | JSX.Element[];
  title: string;
}

const titleToNS = (str:string) => '/' + str.replace(/\W+/g, '-').toLowerCase();

export const GameIcon = ({ children, title, icon }: gameIconProps) => {
  const navigate = useNavigate();

  return (
    <Card
      role="button"
      className="game-card border-dark rounded-3 text-center m-4"
      style={{ width: '120px', height: '120px' }}
      onClick={() => navigate(titleToNS(title))}
    >
      {children}
      {icon}
      <div className="text-white">{title}</div>
    </Card>
  );
};
