import { Stack } from 'react-bootstrap';
import { ChatProps } from './chat';

export function ChatBox({ messages, currentUserName, className }: ChatProps) {
  return (
    <div
      className={`d-flex justify-content-start flex-column-reverse ${className}`}
      style={{ height: '190px', overflowY: 'scroll' }}
    >
      {messages.map((m, i) => (
        <Stack direction="horizontal" gap={1} className="" key={i}>
          <div
            className={(() => {
              switch (m.name) {
                case currentUserName:
                  return 'text-secondary';
                case 'System':
                  return 'text-white text-opacity-25';
                default:
                  return 'text-light';
              }
            })()}
          >
            {m.name}:
          </div>
          <div className="text-white">{m.message}</div>
        </Stack>
      ))}
    </div>
  );
}
