import type { Message } from "../../../store/slices/messagesSlice";
import {
  MessageAuthor,
  MessageHeader,
  MessageItem,
  MessagesWrapper,
  MessageText,
  MessageTime,
} from "./Messages.styles";

export const Messages = (props: Message) => {
  const { author, time, text } = props;

  return (
    <MessagesWrapper>
      <MessageItem>
        <MessageHeader>
          <MessageAuthor>{author} </MessageAuthor>
          <MessageTime className="message-time">{time}</MessageTime>
        </MessageHeader>
        <MessageText>{text}</MessageText>
      </MessageItem>
    </MessagesWrapper>
  );
};
