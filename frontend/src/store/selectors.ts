import type { RootState } from "./store";

export function getCurrentUserName(state: RootState): string | undefined {
  return state.auth.currentUser?.name;
}
