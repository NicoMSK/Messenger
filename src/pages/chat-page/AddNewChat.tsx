import { Dialog } from "@mui/material";
import { FormComponent } from "../../shared/components/FormComponent";

type AddChatProp = {
  openDialog: boolean;
  addChat: (inputValue: string) => void;
  clouseForm: () => void;
};
export function AddNewChat({ openDialog, addChat, clouseForm }: AddChatProp) {
  return (
    <Dialog open={openDialog} onClose={clouseForm}>
      <FormComponent
        title={"Название нового чата"}
        label={"Введите название чата"}
        addButton={"Создать"}
        cancelButton={"Отмена"}
        addInputValue={addChat}
        closeForm={clouseForm}
      />
    </Dialog>
  );
}
