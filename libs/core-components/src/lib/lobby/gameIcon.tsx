import { Card } from 'react-bootstrap';

interface gameIconProps {
  icon?: JSX.Element;
  children?: JSX.Element | JSX.Element[];
  title: string;
  onClick: Function;
}

export const GameIcon = ({ children, title, onClick, icon }: gameIconProps) => {
  return (
    <Card
      role="button"
      className="game-card border-dark rounded-3 text-center m-4"
      style={{ width: '120px', height: '120px' }}
      onClick={() => onClick()}
    >
      {children}
      {icon}
      <div className="text-white">{title}</div>
    </Card>
  );
};
