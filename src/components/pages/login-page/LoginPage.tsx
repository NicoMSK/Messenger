import { FormComponent } from "../../FormComponent";

export function LoginPage() {
  return (
    <FormComponent
      title={"Добро пожаловать"}
      label={"Введите ваше имя"}
      addButton={"Войти"}
    />
  );
}
