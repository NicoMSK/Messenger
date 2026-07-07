import {
  MessageAuthor,
  MessageHeader,
  MessageItem,
  MessagesWrapper,
  MessageText,
  MessageTime,
} from "./Messages.styles";

type MessageProps = {
  userName: string;
  createdAt: number;
  content: string;
};

const formatter = new Intl.DateTimeFormat("ru", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const Messages = (props: MessageProps) => {
  const { userName: author, createdAt: time, content: text } = props;
  const formattedTime = formatter.format(new Date(time));

  return (
    <MessagesWrapper>
      <MessageItem>
        <MessageHeader>
          <MessageAuthor>{author} </MessageAuthor>
          <MessageTime className="message-time">{formattedTime}</MessageTime>
        </MessageHeader>
        <MessageText>{text}</MessageText>
      </MessageItem>
    </MessagesWrapper>
  );
};
