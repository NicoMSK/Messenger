import {
  MessageAuthor,
  MessageHeader,
  MessageItem,
  MessagesWrapper,
  MessageText,
  MessageTime,
} from "./chatPageStyle";

export const Messages = () => {
  return (
    <MessagesWrapper>
      <MessageItem>
        <MessageHeader>
          <MessageAuthor>НИК нейм</MessageAuthor>
          <MessageTime className="message-time">12:45 03.03.2026</MessageTime>
        </MessageHeader>
        <MessageText>Сообщение</MessageText>
      </MessageItem>
    </MessagesWrapper>
  );
};
