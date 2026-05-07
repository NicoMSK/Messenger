import {
  ErrorLink,
  ErrorText,
  ErrorTitle,
  ErrorTitleCode,
  NotFoundContainer,
} from "./NotFoundPage.styles";

export function NotFoundPage() {
  return (
    <NotFoundContainer>
      <ErrorTitleCode>404</ErrorTitleCode>
      <ErrorTitle>Страница не найдена</ErrorTitle>
      <ErrorText>Упс, кажется такой страницы не существует.💁‍♂️</ErrorText>
      <ErrorLink to={"/login"}>Вернуться на главную</ErrorLink>
    </NotFoundContainer>
  );
}
