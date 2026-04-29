import Button from "@mui/material/Button";

type ExitButtonProps = {
  clickHandler: () => void;
};

export function ExitButton({ clickHandler }: ExitButtonProps) {
  return (
    <Button variant="outlined" color="error" onClick={clickHandler}>
      Выйти
    </Button>
  );
}
