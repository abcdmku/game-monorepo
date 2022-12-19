import { User } from "@game-mr/helpers";
import { Card, Row, Col } from "react-bootstrap";
import { ChatProps } from "./chat";
import { ChatBox } from "./chatBox";
import { MessageInput } from "./messageInput";
import { UserList } from "./userList";

interface SocialProps extends ChatProps {
    users: User[];
    onSend: (x: string) => void 
  }
    
export const Social = ({ users, messages, currentUserName, onSend, className }: SocialProps) => {
    return (
      <Card className={`bg-dark p-2 ${className}`}>
        <Row>
          <div style={{width: '140px'}}>
            <div className="fw-bold text-light">Users Online:</div>
            <UserList users={users} />
          </div>
          <Col>
            <ChatBox currentUserName={currentUserName} messages={messages} className='mb-2'/>
            <MessageInput onSubmit={msg => onSend(msg)}/>
          </Col>
        </Row>
      </Card>
    );
  };
  