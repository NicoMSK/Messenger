import { FormComponent } from "../../components/FormComponent";

type AddChatProp = {
  addChat: (inputValue: string) => void;
  clouseForm: () => void;
};

export function AddNewChatPage({ addChat, clouseForm }: AddChatProp) {
  return (
    <FormComponent
      title={"Название нового чата"}
      label={"Введите название чата"}
      addButton={"Создать"}
      cancelButton={"Отмена"}
      addInputValue={addChat}
      clouseForm={clouseForm}
    />
  );
}
