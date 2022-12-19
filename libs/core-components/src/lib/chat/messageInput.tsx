import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export const MessageInput = ({ onSubmit }: { onSubmit: (x: string) => void }) => {
    const [message, setMessage] = useState<string>();
    return(
      <InputGroup onSubmit={(e) => console.log(e)}>
        <Form.Control
          placeholder="message"
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <Button
          variant="primary"
          id="button-addon2"
          onClick={() => message && onSubmit(message)}
        >
          Send
        </Button>
      </InputGroup>
  )
  }
  