import { FormComponent } from "../../FormComponent";

export function AddNewChatPage() {
  return (
    <FormComponent
      title={"Название нового чата"}
      label={"Введите название чата"}
      addButton={"Создать"}
      cancelButton={"Отмена"}
    />
  );
}
