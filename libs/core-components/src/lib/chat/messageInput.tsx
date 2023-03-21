import { useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

export const MessageInput = ({
  onSubmit,
}: {
  onSubmit: (x: string) => void;
}) => {
  const [message, setMessage] = useState<string>();

  return (
    <Form 
      onSubmit={(e) => (e.preventDefault(), message && onSubmit(message), e.currentTarget.reset(), setMessage(undefined))}
    >
      <InputGroup>
        <Form.Control
          placeholder="message"
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <Button type='submit' variant="primary" id="button-addon2">
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};
