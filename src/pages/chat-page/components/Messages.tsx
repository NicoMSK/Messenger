import {
  MessageAuthor,
  MessageHeader,
  MessageItem,
  MessagesWrapper,
  MessageText,
  MessageTime,
} from "./Messages.styles";

type MessagesProps = {
  author: string;
  time: string;
  text: string;
};

export const Messages = (props: MessagesProps) => {
  const { author, time, text } = props;

  return (
    <MessagesWrapper>
      <MessageItem>
        <MessageHeader>
          <MessageAuthor>{author} </MessageAuthor>
          <MessageTime className="message-time">{time}</MessageTime>
        </MessageHeader>
        <MessageText>{text} </MessageText>
      </MessageItem>
    </MessagesWrapper>
  );
};
